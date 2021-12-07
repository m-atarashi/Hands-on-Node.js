'use strict'
require('express')()
.get('/', (req, res) => res.send('Hello World!ぺこ！！'))
.listen(process.env.PORT || 3000)
