'use strict'
const http = require('http')
const next = require('next')
const Server = require('socket.io')

let todos = [
    {id: 1, title: '組長のVtuberデビュー配信', completed: false},
    {id: 2, title: 'ぺこーらの配信', completed: true}
]

let id = 2

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })

nextApp.prepare().then(
    () => {
        const server = http.createServer(nextApp.getRequestHandler()).listen(4000)

        const io = Server(server)
        const ioTodos = io.of('/todos')
        ioTodos.on('connection', socket => {
            console.log('connected')
            socket.emit('todos', todos)
        
            socket
            .on('createTodo', title => {
                if (typeof title !== 'string' || !title) {
                    return
                }
                const todo = {id: ++id, title, completed: false}
                todos.push(todo)
                ioTodos.emit('todos', todos)
            })
            .on('updateCompleted', (id, completed) => {
                todos = todos.map(todo => 
                    todo.id === id ? { ...todo, completed} : todo
                )
                ioTodos.emit('todos', todos)
            })
            .on('deleteTodo', del_id => {
                todos = todos.filter(todo => todo.id !== del_id)
                ioTodos.emit('todos', todos)
            })
        })
    },
    err => {
        console.error(err)
        process.exit(1)
    }
)