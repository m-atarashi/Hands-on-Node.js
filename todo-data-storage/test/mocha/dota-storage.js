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
    })

}