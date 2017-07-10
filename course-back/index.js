
const http = require('http')

const loginHandler = require('./loginHandler.js')
const updateProfile = require('./updateProfile.js')

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
          break
        case '/update-profile':
          updateProfile(obj, res)
          break
        default:
          res.write('======== unknown endpoint ==========')
          res.end()

      }
    } else {
      res.write('======== not post endpoint ==========')
      res.end()
    }
  })

}).listen(8080)
