

const mongoDB = require('mongodb')

const MongoClient = mongoDB.MongoClient
const ObjectID = mongoDB.ObjectID

const createCourse = (payload, res) => {
  const url = 'mongodb://localhost:27017/course'
  MongoClient.connect(url, function(err, db) {
    if (err) throw err
    db.collection('courses').insertOne(payload, (err, DBres) => {
      if (err) throw err
      console.log('1 record updated', DBres)
      db.close()
      res.write('====== finish create course =======')
      res.end()
    })

  })
}

module.exports = createCourse
