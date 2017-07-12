
const http = require('http')
const fs = require('fs')

const loginHandler = require('./loginHandler.js')
const updateProfile = require('./updateProfile.js')
const createCourse = require('./createCourse.js')

console.log('Start the Server at Port 8080')
//create a server object:
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'
  , 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
  , 'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
  , 'Access-Control-Allow-Origin': '*'
  , 'Access-Control-Max-Age': '86400'})

  if (req.method === 'GET') {
    console.log(req)
    if (req.url.indexOf('.') !== -1) {
      fs.readFile('../course-front/build' + req.url, { encoding: 'utf8' }, function(err, data) {
        res.write(data)
        res.end()
      })
    } else {
      fs.readFile('../course-front/build/index.html', { encoding: 'utf8' }, function(err, data) {
        res.write(data)
        res.end()
      })
    }
  } else if (req.method === 'POST') {
    let payload = ''
    req.on('data', function (data) {
        payload += data
    })
    req.on('end', function () {
      if (payload) {
        const obj = JSON.parse(payload)
        switch (req.url) {
          case '/login':
            loginHandler(obj, res)
            break
          case '/create-course':
            createCourse(obj, res)
            break
          case '/update-profile':
            updateProfile(obj, res)
            break
          default:
            console.log('========= unknown endpoint ===========')
            res.write('======== unknown endpoint ==========')
            res.end()
        }
      } else {
        console.log('========= no payload ===========')
        res.write('======= no payload ============')
        res.end()
      }
    })
  } else {
    console.log('========= other request ===========')
    res.write('======= other request ============')
    res.end()
  }

}).listen(8080)
