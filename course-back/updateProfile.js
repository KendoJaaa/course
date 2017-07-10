
import mongoDB from 'mongodb'

const MongoClient = mongoDB.MongoClient
const ObjectID = mongoDB.ObjectID

const updateProfile = (payload, res) => {
  const url = 'mongodb://localhost:27017/course'
  MongoClient.connect(url, function(err, db) {
    if (err) throw err
    const userId = payload._id
    delete payload._id
    db.collection('users').updateOne({ _id: ObjectID(userId) }, payload, (err, DBres) => {
      if (err) throw err
      console.log('1 record updated', DBres)

      db.collection('users').findOne({ _id: ObjectID(userId) }, (err, DBres2) => {

        db.close()
        res.write('====== finish update profile =======')
        res.end()
      })
    })

  })
}

export default updateProfile
