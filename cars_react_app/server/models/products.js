const mongoose = require(`mongoose`)

let imagesSchema = new mongoose.Schema(
    {
        filename:{type:[]}
    })

let ProductSubSchema = new mongoose.Schema(
    {
        size : {type: String, required:true},
	    price : {type: String, required:true},
	    stockLevel : {type: String, required:true}
        // no id field as mongo/ mongoose does it on its own
        // embedded stuff should only makes sense as a child of its parent
        // pull down whole thing and then get the embedded object from the array
    }
)

let notes = new mongoose.Schema(
    {
        topNotes : {type: []},
	    heartNotes : {type: []},
	    baseNotes : {type: []}
    }
)


let ProductSchema = new mongoose.Schema(
    {
        brand: {type: String, required:true},
        name: {type: String, required:true},
        description: {type: String, required:true},
        gender: {type: String, required:true},
        images: [imagesSchema],
        products: [ProductSubSchema]
	    //notes: notes
    },
    {
        collection: `products`
    })

module.exports = mongoose.model(`products`, ProductSchema)