const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use((req, res, next) => {
  const startTime = Date.now()
  const startTimeRegular = new Date(startTime)
  console.log('startTime:', startTimeRegular.toLocaleString(), '|', req.method, 'from', req.originalUrl)
  res.on('finish', () => {
    const endTime = Date.now()
    const endTimeRegular = new Date(endTime)
    console.log('endTime:', endTimeRegular.toLocaleString(), '|', req.method, 'from', req.originalUrl, '|', 'total time:', endTime - startTime)
  })
  next()
})

app.get('/', (req, res) => {
  const answer = '列出全部 Todo'
  res.render('index', { answer })
})

app.get('/new', (req, res) => {
  res.send('新增 Todo 頁面')
})

app.get('/:id', (req, res) => {
  res.send('顯示一筆 Todo')
})

app.post('/', (req, res) => {
  res.send('新增一筆  Todo')
})

app.listen(port, () => {
  console.log(`the app is running on localhost:${port}`)
})
