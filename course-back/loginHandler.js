
const mongoDB = require('mongodb')

const MongoClient = mongoDB.MongoClient

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

module.exports = loginHandler
