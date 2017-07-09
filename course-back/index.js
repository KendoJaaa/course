
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
      payload += data;
  });
  req.on('end', function () {
    console.log('====== got some request ========', req.method, payload)
    if (req.url === '/login' && req.method === 'POST'){
      if (!payload) {
        res.write('login fail')
        res.end()
      } else {
        const obj = JSON.parse(payload)
        console.log('kendo jaa after', obj)
        loginHandler(obj, res)
      }
    } else {
      res.write('login fail')
      res.end()
    }
  });

}).listen(8080)

const loginHandler = (payload, res) => {

  const url = 'mongodb://localhost:27017/course'
  const email = payload.email
  const password = payload.password
  const accessToken = payload.accessToken
  console.log('kendo jaa payload', email, password)
  MongoClient.connect(url, function(err, db) {
    console.log('Connected to DB')
    if (err) throw err
    db.collection("users").findOne({ email }, function(err, result) {
      if (err) throw err
      db.close();
      console.log('kendo jaa result',result)
      if (result && (result.password === password || result.access_token === accessToken)) {
        console.log('======== login success ========')
        const payload = JSON.stringify(result)
        res.write(payload)
        res.end()
      } else {
        console.log('kendo jaa herherhehrehrehrhehrehrherhehrehrherh')
        res.write('login fail')
        res.end()
      }
    });
  });
}
