const mongoose = require('mongoose')
mongoose.connect(`mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASS}@cluster0.mhpqg.mongodb.net/${process.env.DB_NAME}`, {useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {console.log("connected to", db.client.s.url)})