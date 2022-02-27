












/*

            LOTS of work going to be needed for the full conversion

*/





const router = require(`express`).Router()


const productsModel = require(`../models/products`)

const jwt = require('jsonwebtoken')
const fs = require('fs')

const multer  = require('multer')
var upload = multer({dest: `${process.env.UPLOADED_FILES_FOLDER}`})









router.get(`/products`, (req, res) =>
{

    console.log("ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc");

    productsModel.find((error, data) => {
            console.log(`products ${data}`)
            res.json(data)
        })


})

router.get(`/products/photo/:filename`, (req, res) =>
{
    fs.readFile(`${process.env.UPLOADED_FILES_FOLDER}/${req.params.filename}`, 'base64', (err, fileData) =>
    {
        if(fileData)
        {
            res.json({image:fileData})
        }
        else
        {
            res.json({image:null})
        }
    })
})



router.get(`/products/:id`, (req, res) =>
{
    jwt.verify(req.headers.authorization, process.env.JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) =>
    {
        if (err)
        {
            res.json({errorMessage:`User is not logged in`})
        }
    else
    {
        carsModel.findById(req.params.id, (error, data) =>
        {
            res.json(data)
        })
    }
})

})


//  Add new item to products JSON                    *****JWT STYLE*****
router.post(`/products`, upload.array("productsPhotos", parseInt(process.env.MAX_NUMBER_OF_UPLOAD_FILES_ALLOWED)), (req, res) =>
{
    
             
    console.log("INSIDE SERVER AXIOS CALL")


                    /*carsModel.create(req.body, (error, data) => {
                        res.json(data)
                    })*/

                    // Use the new car details to create a new car document
                    let productsDetails = new Object()

                    productsDetails.brand = req.body.brand
                    productsDetails.name = req.body.name
                    productsDetails.description = req.body.description
                    productsDetails.gender = req.body.gender
                

                    // add the car's photos to the carDetails JSON object
                    productsDetails.photos = []

                    req.files.map((file, index) =>
                    {
                        productsDetails.photos[index] = {filename:`${file.filename}`}
                    })


                    



                   // productsDetails.products = req.body.products
                    


                   // productsDetails.products = []
                    //req.body.productz.map((product, index) =>
                    //{
                        //productsDetails.products[index] = {filename:`${file.filename}`}

                      //  productsDetails.products[index] = {size:`${product.size}`, price:`${product.price}`, stockLevel:`${product.stockLevel}`}

                    //})

                    let resultArr = JSON.parse(req.body.products);
                    console.log(resultArr)

                    //productsDetails.products = resultArr
                    //console.log("**********************************************************************************************")
                    //console.log(req.body.products[0].size)
                    //console.log("**********************************************************************************************")




                    productsDetails.products = []

                    resultArr.map((result, index) =>
                    {
                        productsDetails.products[index] =   {size: `${result.size}`, 
                                                            price: `${result.price}`,
                                                            stockLevel: `${result.stockLevel}`}
                    })




                   

                    //productsDetails.products = req.body.products
                    //productsDetails.notes = req.body.notes


                    console.log("**********************************************************************************************")
                    
                    console.log(productsDetails)

                    console.log("**********************************************************************************************")



                    productsModel.create(productsDetails, (error, data) =>
                    {
                       if(error)
                       {
                        console.log("ERROR AT FINAL CREATION STAGE< DETAILS BELOW")
                        console.log(error)
                       }
                       else{
                        res.json(data)
                       }
                    })



              
            
    
})





// Update one record                    *****JWT STYLE*****
router.put(`/products/:id`, (req, res) =>
{
    console.log("checkup WOOOOOOOOOOOOOOOOOOOOOOOOO00000000000000000000000000000000000000000000000000000000000")
    console.log(req.headers)
    console.log("checkup WOOOOOOOOOOOOOOOOOOOOOOOOO00000000000000000000000000000000000000000000000000000000000")
    console.log(req.headers.authorization)


    jwt.verify(req.headers.authorization, process.env.JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) =>
    {
    if(err)
    {
        res.json({errorMessage:`User is not logged in`})
    }
            /*else if(!/^[a-zA-Z]+$/.test(req.body.model))
            {
                res.json({errorMessage:`Model must be a string`});
            }
            else if(!/^[a-zA-Z]+$/.test(req.body.colour))
            {
                res.json({errorMessage:`Colour must be a string`});
            }
            else if(req.body.year < 1990)     // between 1990 and the current year
            {
                res.json({errorMessage:`Year needs to be greater than or equal to 1990`});
            }
           // else if(req.body.year > today.getFullYear())
           // {
           //     res.json({errorMessage:`Year needs to be this year or less`});
           // }
            else if(req.body.price < 1000 || req.body.price > 100000)       // between €1000 and €100000
            {
                res.json({errorMessage:`Price needs to be between €1000 and €100000`});
            }*/
            else
            {
                carsModel.findByIdAndUpdate(req.params.id, {$set: req.body}, (error, data) =>
                {
                    res.json(data)
                })
            }
        })
})





// Delete one record                     *****JWT STYLE*****
router.delete(`/products/:id`, (req, res) =>
{
    jwt.verify(req.headers.authorization, process.env.JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) =>
    {
            if(err)
            {
                res.json({errorMessage:`User is not logged in`})
            }
            else
            {
                if(decodedToken.accessLevel >= process.env.ACCESS_LEVEL_ADMIN)
                {
                    carsModel.findByIdAndRemove(req.params.id, (error, data) =>
                    {
                        res.json(data)
                    })
                }
                else
                {
                    res.json({errorMessage:`User is not an administrator, so they cannot delete records`})
                }
            }
        })
})



module.exports = router