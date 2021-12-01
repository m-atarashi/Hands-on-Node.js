'use strict'
const { promisify } = require('util')
const { join } = require('path')
const sqlite = process.env.NODE_ENV === 'production'
    ? require('sqlite3')
    : require('sqlite3').verbose()

const db = new sqlite.Database(join(__dirname, 'sqlite'))

const dbGet = promisify(db.get.bind(db))
const dbAll = promisify(db.all.bind(db))
const dbRun = function() {
    return new Promise((resolve, reject) => 
      db.run.apply(db, [
          ...arguments,
          function(err) {
              err ? reject(err) : resolve(this)
          }
      ])
    )
}

dbRun(`CREATE TABLE IF NOT EXISTS todo (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    completed BOOLEAN NOT NULL
)`).catch(err => {
    console.error(err)
    process.exit(1)
})

function rowToTodo(row) {
    return { ...row, completed: !!row.completed }
}

exports.fetchAll = 
    () => dbAll('SELECT * FROM todo').then(rows => rows.map(rowToTodo))

exports.fetchByCompleted = 
    completed => dbAll('SELECT * FROM todo WHERE completed = ?', completed)
    .then(rows => rows.map(rowToTodo))

exports.create = async todo => {
    await dbRun(
        'INSERT INTO todo VALUES (?, ?, ?)',
        todo.id,
        todo.title,
        todo.completed    
    )
}

exports.update = (id, update) => {
    const setColumns = []
    const values = []
    for (const column of ['title', 'completed']) {
        if (column in update) {
            setColumns.push(`${column} = ?`)
            values.push(`${update[column]}`)
        }
    }
    values.push(id)
    return dbRun(`UPDATE todo SET ${setColumns.join()} WHERE id = ?`, values)
        .then(({ changes }) => changes === 1
            ? dbGet('SELECT * FROM todo WHERE id = ?', id).then(rowToTodo)
            : null
        )
}

exports.remove = id => dbRun('DELETE FROM todo WHERE id = ?', id)
    .then(({ changes }) => changes === 1 ? id : null)


function promisifyStatementRun(statement){
    return function() {
        return new Promise((resolve, reject) => {
            statement.run.apply(statement, [
                ...arguments,
                function(err) {
                    err ? reject(err) : resolve(this)
                }
            ])
        })
    }
}

const selectStatement = db.prepare('SELECT * FROM todo WHERE id = ?')
const statementGet = promisify(selectStatement.get.bind(selectStatement))

// 動的プレースホルダを用いたupdate()の実装
exports.update = (id, update) => {
    const setColumns = []
    const values = []
    for (const column of ['title', 'completed']) {
        if (column in update) {
            setColumns.push(`${column} = ?`)
            values.push(`${update[column]}`)
        }
    }
    values.push(id)
    const statement = db.prepare(`UPDATE todo SET ${setColumns.join()} WHERE id = ?`)
    return promisifyStatementRun(statement)(values)
    .then(({ changes }) => changes === 1
        ? statementGet(id).then(rowToTodo)
        : null
    )
}
