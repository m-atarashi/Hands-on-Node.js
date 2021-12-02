'use strict'
const chai = require('chai')
const sinon = require('sinon')
const fileSystem = require('../../file-system')

process.env.npm_lifecycle_event = 'file-system'
// app.jsでデフォルトエキスポートしたやつ？app.listen(3000)？
const app = require('../../app')

const assert = chai.assert
sinon.assert.expose(assert, {prefix: ''})

chai.use(require('chai-http'))

afterEach(() => sinon.restore())

describe('app', () => {
    describe('GET /api/todos', () => {
        describe('completedが指定されていない場合', () => {
            it('fechAllので取得したToDoの配列を返すかどうかのテスト', async () => {
                const todos = [
                    {id: 'a', title: 'Gawr Gura', completed: false},
                    {id: 'b', title: 'Ame Bee', completed: false}
                ]
                sinon.stub(fileSystem, 'fetchAll').resolves(todos)

                const res = await chai.request(app).get('/api/todos')
                assert.strictEqual(res.status, 200)
                assert.deepEqual(res.body, todos)
            })
            it('fetchAllが失敗したらエラーが返ってほしい', async() => {
                sinon.stub(fileSystem, 'fetchAll').rejects(new Error('fetchAll()失敗ぺこ……'))
                
                const res = await chai.request(app).get('/api/todos')
                assert.strictEqual(res.status, 500)
                assert.deepEqual(res.body, { error: 'fetchAll()失敗ぺこ……'})
            })
        })

        describe('completedが指定されているとき', () => {
            it('fetchByCompletedを実行してTodoを取得', async() => {
                const todos = [
                    {id: 'a', title: "shaaaark", completed: false},
                    {id: 'd', title: 'deadbeats', completed: true}
                ]
                sinon.stub(fileSystem, 'fetchByCompleted').resolves(todos)

                for (const completed of [true, false]){
                    const res = await chai.request(app)
                    .get('/api/todos')
                    .query({completed})

                    assert.strictEqual(res.status, 200)
                    assert.deepEqual(res.body, todos)
                    assert.calledWith(fileSystem.fetchByCompleted, completed)
                }
            })

            it('fetchByCompleted失敗', async () => {
                sinon.stub(fileSystem, 'fetchByCompleted')
                .rejects(new Error('fetchBycompleted失敗でござる…'))

                const res = await chai.request(app)
                .get('/api/todos')
                .query({completed: true})

                assert.strictEqual(res.status, 500)
                assert.deepEqual(res.body, {error: 'fetchBycompleted失敗でござる…'})

            })
        })
    })

    describe('POST /api/todos', () => {
        it('create。タイトルを引数にとる', async () => {
            sinon.stub(fileSystem, 'create').resolves()

            const res = await chai.request(app)
            .post('/api/todos')
            .send({title: 'どうも、サメです'})

            assert.strictEqual(res.status, 201)
            assert.strictEqual(res.body.title, 'どうも、サメです')
            assert.strictEqual(res.body.completed, false)

            assert.calledWith(fileSystem.create, res.body)
        })
        it('パラメータにタイトルが指定されていない場合エラーを返す。', async () => {
            sinon.spy(fileSystem, 'create')

            for(const title of ['', undefined]){
                const res = await chai.request(app)
                .post('/api/todos')
                .send({title})

                assert.strictEqual(res.status, 400)
                assert.deepEqual(res.body, {error: 'title is required'})
                assert.notCalled(fileSystem.create)
            }
        })
        it('create()が失敗したらエラーを返す', async () => {
            sinon.stub(fileSystem, 'create').rejects(new Error('create()失敗だぞ'))

            const res = await chai.request(app)
            .post('/api/todos')
            .send({title: '疲れたぺこな～'})

            assert.strictEqual(res.status, 500)
            assert.deepEqual(res.body, {error: 'create()失敗だぞ'})
        })
    })
})