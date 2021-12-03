'use strict'

function sortTodoByid(todos) {
    return todos.sort((a, b) => a.id > b.id ? 1: -1)
}

for (const dataStorageName of ['file-system', 'sqlite', 'leveldb']) {
    const { fetchAll, fetchByCompleted, create, update, remove } = 
        require(`../../${dataStorageName}`)

    describe(dataStorageName, () => {
        beforeEach(async () => {
            const allTodos = await fetchAll()
            await Promise.all(allTodos.map(({id}) => remove(id)))
        })

        describe('create(),fetchAll()', () => {
            test('create()で作成したTodoをfetchAll()で取得できる', async () => {
                expect(await fetchAll()).toEqual([])

                const todo1 = { id: '1pekora', title: 'アーモンドx2', completed: false}
                await create(todo1)

                expect(await fetchAll()).toEqual([todo1])
                
                const todo2 = { id: '2HAACHAMA', title: 'はあちゃまっちゃま～', completed: false}
                await create(todo2)
                const todo3 = { id: '3Laplus', title: 'YMD! YMD!', completed: false}
                await create(todo3)

                expect(sortTodoByid(await fetchAll())).toEqual([todo1, todo2, todo3])
            })
        })

        describe('fetchByCompleted()', () => {
            test('completedが等しいtodoだけを取得できる', async () => {
                expect(await fetchByCompleted(true)).toEqual([])
                expect(await fetchByCompleted(false)).toEqual([])

                const todo1 = { id: '1pekora', title: 'アーモンドx2', completed: true}
                await create(todo1)
                const todo2 = { id: '2HAACHAMA', title: 'はあちゃまっちゃま～', completed: false}
                await create(todo2)
                const todo3 = { id: '3Laplus', title: 'YMD! YMD!', completed: false}
                await create(todo3)

                expect(await fetchByCompleted(true)).toEqual([todo1])
                expect(sortTodoByid(await fetchByCompleted(false))).toEqual([todo2, todo3])
            })
        })

        describe('update()', () => {
            const todo1 = { id: '1pekora', title: 'アーモンドx2', completed: false}
            const todo2 = { id: '2HAACHAMA', title: 'はあちゃまっちゃま～', completed: false}

            beforeEach(async () => {
                await create(todo1)
                await create(todo2)
            })

            test('指定したIDのTodoを更新し、更新後のTodoを返す', async () => {
                expect(await update('1pekora', {completed: true}))
                .toEqual({ id: '1pekora', title: 'アーモンドx2', completed: true})
                expect(await fetchByCompleted(true))
                .toEqual([{ id: '1pekora', title: 'アーモンドx2', completed: true}])
                expect(await fetchByCompleted(false)).toEqual([todo2])

                expect(await update('2HAACHAMA', {title: 'おはルージュ'}))
                .toEqual({ id: '2HAACHAMA', title: 'おはルージュ', completed: false})
                expect(await fetchByCompleted(true))
                .toEqual([{ id: '1pekora', title: 'アーモンドx2', completed: true}])
                expect(await fetchByCompleted(false))
                .toEqual([{ id: '2HAACHAMA', title: 'おはルージュ', completed: false}])
            })

            test('存在しないIDを指定するとnullを返す', async () => {
                expect(await update('shubashuba', {completed: true})).toBeNull
                expect(await fetchByCompleted(true)).toEqual([])
                expect(sortTodoByid(await fetchByCompleted(false))).toEqual([todo1, todo2])
            })
        })

        describe('remove()のテスト', () => {
            const todo1 = { id: '1pekora', title: 'アーモンドx2', completed: false}
            const todo2 = { id: '2HAACHAMA', title: 'はあちゃまっちゃま～', completed: false}

            beforeEach(async () => {
                await create(todo1)
                await create(todo2)
            })

            test('指定したIDのTodoを削除してIDを返す', async () => {
                expect(await remove('1pekora')).toBe('1pekora')
                expect(await fetchAll()).toEqual([todo2])
            })

            test('存在しないIDを指定するとnullを返す', async () => {
                expect(await remove('rushia')).toBeNull
                expect(sortTodoByid(await fetchAll())).toEqual([todo1, todo2])
            })
        })
    })
}