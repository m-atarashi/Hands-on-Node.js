'use strict'
const { assert } = require('chai')

for (const dataStorageName of ['file-system', 'sqlite', 'leveldb']) {
    const { fetchAll, fetchByCompleted, create, update, remove } = require(`../../${dataStorageName}`) 

    describe(dataStorageName, () => {
        // 毎回のテスト実行時にすべてのTodoを削除
        // Todoが1件もない状態でテストケースをスタートするため
        // 非同期処理なのでasync付ける
        beforeEach(async () => {
            const allTodos = await fetchAll()
            await Promise.all(allTodos.map(({ id }) => remove(id)))
        })

        describe('create(), fetchAll()', () => {
            it('create()で作成したTodoをfetchAllで取得できる', async () => {
                // 初期状態の確認
                assert.deepEqual(await fetchAll(), []) 
                
                // Todoを1件追加
                const todo1 = { id: 'a', title: 'サメです', completed: false }
                await create(todo1)
                assert.deepEqual(await fetchAll(), [todo1])

                // Todoをさらに2件追加
                const todo2 = { id: 'b', title: 'What a Bae.', completed: false }
                await create(todo2)
                const todo3 = { id: 'c', title: 'hiC', completed: false }
                await create(todo3)
                assert.sameDeepMembers(await fetchAll(), [todo1, todo2, todo3])
            })
        })

        describe('fetchByCompleted()', () => {
            it('completedの値が引数で指定したものと等しいTodoだけを取得できる', async () => {
                assert.deepEqual(await fetchByCompleted(true), [])
                assert.deepEqual(await fetchByCompleted(false), [])

                const todo1 = { id: 'a', title: 'サメです', completed: false }
                await create(todo1)
                const todo2 = { id: 'b', title: 'What a Bae.', completed: false }
                await create(todo2)
                const todo3 = { id: 'c', title: 'hiC', completed: true }
                await create(todo3)

                assert.deepEqual(await fetchByCompleted(true), [todo3])
                assert.sameDeepMembers(await fetchByCompleted(false), [todo1, todo2])
            })
        })

        describe('update()', () => {
            const todo1 = { id: 'a', title: 'サメです', completed: false }
            const todo2 = { id: 'b', title: 'What a Bae.', completed: false }
            
            beforeEach(async () => {
                await create(todo1)
                await create(todo2)
            })

            it('指定したIDのTodoを更新し、更新後のTodoを返す.', async () => {
                // completedの更新
                assert.deepEqual(await update('a', {completed: true}),
                {id: 'a', title: 'サメです', completed: true})
                assert.deepEqual(await fetchByCompleted(true),
                [{id: 'a', title: 'サメです', completed: true}])
                assert.deepEqual(await fetchByCompleted(false), [todo2])

                // titleの更新
                assert.deepEqual(await update('b', {title: 'Ame Bee'}), 
                {id: 'b', title: 'Ame Bee', completed: false})
                assert.deepEqual(await fetchByCompleted(true),
                [{id: 'a', title: 'サメです', completed: true}])
                assert.deepEqual(await fetchByCompleted(false),
                [{id: 'b', title: 'Ame Bee', completed: false}])
            })

            it('存在しないidを指定するとnull', async() => {
                assert.isNull(await update('c', {completed: true}))
                assert.deepEqual(await fetchByCompleted(true), [])
                assert.sameDeepMembers(await fetchByCompleted(false), [todo1, todo2])
            })
        })

        describe('remove()', () => {
            const todo1 = { id: 'a', title: 'サメです', completed: false }
            const todo2 = { id: 'b', title: 'What a Bae.', completed: false }
            beforeEach(async () => {
                await create(todo1)
                await create(todo2)
            })

            it('指定したIDのTODOを削除する', async () => {
                assert.strictEqual(await remove('b'), 'b')
                assert.deepEqual(await fetchAll(), [todo1])
            })

            it('存在しないIDを指定するとnull', async() => {
                assert.strictEqual(await remove('c'), null)
                assert.sameDeepMembers(await fetchAll(), [todo1, todo2])
            })
        })
    })

}