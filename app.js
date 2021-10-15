'use strict'

let todos = [
    {id: 1, title: 'ぺこーらの配信', completed: false},
    {id: 2, title: 'マリンの配信', completed: true},
    {id: 3, title: 'はあちゃまの配信', completed: false}
]

const express = require('express')
const app = express()

app.use(express.json())


app.get('/api/todos', (req, res) => {
    if (!req.query.completed) {
        return res.json(todos)
    }
    const completed = req.query.completed === 'true'
    res.json(todos.filter(todo => todo.completed === completed))
})

// 6-3で追加
let sseSenders = []
let sseId = 1

app.get('/api/todos/events', (req, res) => {
    req.socket.setTimeout(1000);
    res.set({
        'Content-Type': 'text/event-stream'
    })

    const send = (id, data) => res.write(`id: $8u {id}\ndata: ${data}\n\n`)
    sseSenders.push(send)
    send(sseId, JSON.stringify(todos))
    req.on('close', () => {
        res.end()
        sseSenders = sseSenders.filter(_send => _send !== send)
    })
})

function onUpdateTodos() {
    sseId += 1
    const data = JSON.stringify(todos)
    sseSenders.forEach(send => send(sseId, data))
}

let id = todos.length

app.post('/api/todos', (req, res, next) => {
    const { title } = req.body
    if (typeof title != 'string' || !title) {
        const err = new Error('title is required')
        err.statusCode = 400
        return next(err)
    }

    const todo = { id: id += 1, title, completed: false }
    todos.push(todo)
    res.status(201).json(todo)

    onUpdateTodos()
})

app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.statusCode || 500).json({ error: err.message })
})

// 練習問題
// 5-1
app.use('/api/todos/:id(\\d+)', (req, res, next) => {
    const todoID = Number(req.params.id)
    const todo = todos.find(e => e.id === todoID)

    if (!todo) {
        const err = new Error('todo is not found')
        err.statusCode = 404
        return next(err)
    }
    req.todo = todo
    next()
})

// 5-2
app.route('/api/todos/:id(\\d+)/completed')
.put((req, res) => {
    req.todo.completed = true
    res.json(req.todo)
})
.delete((req, res) => {
    req.todo.completed = false
    res.json(req.todo)
})

//5-3
app.delete('/api/todos/:id(\\d+)', (req, res) => {
    todos = todos.filter(todo => todo !== req.todo)
    res.status(204).end()
})


app.listen(3000)


// Next.jsのルーティングのための記述
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({dev})

nextApp.prepare().then(
    () => app.get('*', nextApp.getRequestHandler()),
    err => {
        console.error(err)
        process.exit(1)
    }
)