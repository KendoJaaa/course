
var http = require('http')
var MongoClient = require('mongodb').MongoClient


console.log('Start the Server at Port 8080')
//create a server object:
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'
  , 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
  , 'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
  , 'Access-Control-Allow-Origin': '*'
  , 'Access-Control-Max-Age': '86400'})

  let payload = ''
  req.on('data', function (data) {
      payload += data
  });
  req.on('end', function () {
    console.log('====== got some request ========', req.method, payload)
    if (!payload) {
      res.write('======= no payload ============')
      res.end()
    }
    const obj = JSON.parse(payload)
    if (req.method === 'POST') {
      switch (req.url) {
        case '/login':
          loginHandler(obj, res)
          break
        case '/create-course':
          console.log('kendo create course')
          break
        case '/update-profile':
          console.log('kendo update profile')
          break
        default:
          res.write('======== unknown endpoint ==========')
          res.end()

      }
    }
  })

}).listen(8080)

const loginHandler = (payload, res) => {

  const url = 'mongodb://localhost:27017/course'
  const email = payload.email
  const password = payload.password
  const accessToken = payload.accessToken
  MongoClient.connect(url, function(err, db) {
    console.log('Connected to DB')
    if (err) throw err
    db.collection('users').findOne({ email }, function(err, userResult) {
      if (err) throw err

      db.collection('courses').find({}).toArray(function(err, courseResult) {
        if (err) throw err
        console.log('kendo jaa', courseResult)
        db.close()
        if (userResult && (userResult.password === password || userResult.access_token === accessToken)) {
          console.log('======== login success ========')

          const payload = {
            user: userResult,
            courses: courseResult
          }
          res.write(JSON.stringify(payload))
          res.end()
        } else {
          res.write('login fail')
          res.end()
        }
      })
    })
  })
}
