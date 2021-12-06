'use strict'

const fileSystem = require('../../file-system')
const uuid = require('uuid')
const request = require('supertest')

process.env.npm_lifecycle_event = 'file-system'
const app = require('../../app')
jest.mock('../../file-system')
jest.mock('uuid')

afterAll(() => app.close())

describe('app', () => {
    describe('GET /api/todos', () => {
        describe('completedが指定されていない場合', () => {
            test('fetchAll()で取得したTodoの配列を返す', async () => {
                const todos = [
                    {id: 'a', title: 'gura', completed: false},
                    {id: 'b', title: 'Bee Ame', completed: true}
                ]

                fileSystem.fetchAll.mockResolvedValue(todos)

                const res = await request(app).get('/api/todos')

                expect(res.statusCode).toBe(200)
                expect(res.body).toEqual(todos)
            })

            test('fetchAll()が失敗したらエラーを返す', async () => {
                fileSystem.fetchAll.mockRejectedValue(new Error('失敗なのら～'))

                const res = await request(app).get('/api/todos')

                expect(res.statusCode).toBe(500)
                expect(res.body).toEqual({error: '失敗なのら～'})
            })
        })

        describe('completedが指定された場合', () => {
            test('fetchBYCompleted()で取得したTodoの配列を返す', async () => {
                const todos = [
                    {id: 'a', title: 'gura', completed: false},
                    {id: 'b', title: 'Bee Ame', completed: true}
                ]

                fileSystem.fetchByCompleted.mockResolvedValue(todos)

                for (const completed of [true, false]) {
                    const res = await request(app)
                    .get('/api/todos')
                    .query({completed})

                    expect(res.statusCode).toBe(200)
                    expect(res.body).toEqual(todos)
                    expect(fileSystem.fetchByCompleted)
                    .toHaveBeenCalledWith(completed)
                }
            })

            test('fetchByCompleted()が失敗したらエラーを返す', async () => {
                fileSystem.fetchByCompleted
                .mockRejectedValue(new Error('失敗にぇ……'))

                const res = await request(app)
                .get('/api/todos').query({completed: true})

                expect(res.statusCode).toBe(500)
                expect(res.body).toEqual({error: '失敗にぇ……'})
            })
        })
    })

    describe('POST /api/todos', () => {
        test('指定したタイトルでcreate()を実行', async () => {
            uuid.v4.mockReturnValue('a')
            fileSystem.create.mockResolvedValue()

            const res = await request(app)
            .post('/api/todos')
            .send({title: 'スバ友'})

            const expectedTodo = {id: 'a', title: 'スバ友', completed: false}
            expect(res.statusCode).toBe(201)
            expect(res.body).toEqual(expectedTodo)
            expect(fileSystem.create).toHaveBeenCalledWith(expectedTodo)
        })

        test('パラメータにタイトルが指定されていない場合、400エラーを返す', async () => {
            for(const title of['', undefined]) {
                const res = await request(app)
                .post('/api/todos')
                .send({title})

                expect(res.statusCode).toBe(400)
                expect(res.body).toEqual({error: 'title is required'})
                expect(fileSystem.create).not.toHaveBeenCalled()
            }
        })

        test('create()が失敗したらエラーを返す', async() => {
            fileSystem.create.mockRejectedValue(new Error('失敗しゅばああああああああ'))

            const res = await request(app)
            .post('/api/todos')
            .send({title: 'shubashuba'})

            expect(res.statusCode).toBe(500)
            expect(res.body).toEqual({error: '失敗しゅばああああああああ'})
        })
    })
    
    describe('POST /api/todos/:id/completed', () =>{
        test('update()が成功したらTodoを返す', async () => {
            const todo = {id: 'a', title: 'gura', completed: true}
            fileSystem.update.mockResolvedValue(todo)

            const res = await request(app)
            .put('/api/todos/a/completed')

            expect(res.statusCode).toBe(200)
            expect(res.body).toEqual(todo)
            expect(fileSystem.update).toHaveBeenCalledWith('a', {completed: true})
        })

        test('ToDoが存在しない場合エラーを返す', async () =>{
            fileSystem.update.mockResolvedValue()//null

            const res = await request(app)
            .put('/api/todos/a/completed')

            expect(res.statusCode).toBe(404)
            expect(res.body).toEqual({error: 'ToDo not found'})
            expect(fileSystem.update).toHaveBeenCalledWith('a', {completed: true})
        })

        test('update()が失敗した場合、エラーを返す', async () => {
            fileSystem.update.mockRejectedValue(new Error('Error'))

            const res = await request(app)
            .put('/api/todos/a/completed')

            expect(res.statusCode).toBe(500)
            expect(res.body).toEqual({error: 'Error'})
            expect(fileSystem.update).toHaveBeenCalledWith('a', {completed: true})
        })
    })
    describe('DELETE /api/todos/:id/completed', () =>{
        test('update()が成功したらTodoを返す', async () => {
            const todo = {id: 'a', title: 'gura', completed: true}
            fileSystem.update.mockResolvedValue(todo)

            const res = await request(app)
            .delete('/api/todos/a/completed')

            expect(res.statusCode).toBe(200)
            expect(res.body).toEqual(todo)
            expect(fileSystem.update).toHaveBeenCalledWith('a', {completed: false})
        })

        test('ToDoが存在しない場合エラーを返す', async () =>{
            fileSystem.update.mockResolvedValue()

            const res = await request(app)
            .delete('/api/todos/a/completed')

            expect(res.statusCode).toBe(404)
            expect(res.body).toEqual({error: 'ToDo not found'})
            expect(fileSystem.update).toHaveBeenCalledWith('a', {completed: false})
        })

        test('update()が失敗した場合、エラーを返す', async () => {
            fileSystem.update.mockRejectedValue(new Error('Error'))

            const res = await request(app)
            .delete('/api/todos/a/completed')

            expect(res.statusCode).toBe(500)
            expect(res.body).toEqual({error: 'Error'})
            expect(fileSystem.update).toHaveBeenCalledWith('a', {completed: false})
        })
    })

    describe('DELETE /api/todos/:id', () => {
        test('removeが成功したとき', async () => {
            fileSystem.remove.mockResolvedValue('a')

            const res = await request(app)
            .delete('/api/todos/a')

            expect(res.statusCode).toBe(204)
            expect(res.body).toEqual({})
            expect(fileSystem.remove).toHaveBeenCalledWith('a')
        })

        test('idがnullだったとき', async () => {
            fileSystem.remove.mockResolvedValue(null)

            const res = await request(app)
            .delete('/api/todos/b')

            expect(res.statusCode).toBe(404)
            expect(res.body).toEqual({error: 'Todo not found'})
            expect(fileSystem.remove).toHaveBeenCalledWith('b')
        })

        test('remove()が失敗したとき', async () => {
            fileSystem.remove.mockRejectedValue(new Error('えらーだにぇ…おじたん…'))

            const res = await request(app)
            .delete('/api/todos/a')

            expect(res.statusCode).toBe(500)
            expect(res.body).toEqual({error: 'えらーだにぇ…おじたん…'})
            expect(fileSystem.remove).toHaveBeenCalledWith('a')
        })
    })
})