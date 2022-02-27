const mongoose = require(`mongoose`)

let userSchema = new mongoose.Schema(
    {
        firstName: {type: String, required:true},
        lastName: {type: String},
        sex: {type: String},
        address: {type: String},
        email: {type: String, required:true},
        dateBirth: {type: Date},
        password: {type: String, required:true},
        accessLevel: {type: Number, default:parseInt(process.env.ACCESS_LEVEL_NORMAL_USER)}
    },
    {
        collection: `user`
    })

module.exports = mongoose.model(`user`, userSchema)