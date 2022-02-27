












/*

            Substantially less work needed for the full conversion compared to products route file

*/





const router = require(`express`).Router()

const userModel = require(`../models/user`)

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
const fs = require('fs')

const multer  = require('multer')
const upload = multer({dest: `${process.env.UPLOADED_FILES_FOLDER}`})

const emptyFolder = require('empty-folder')

/*router.post(`/user/Register`, (req, res) =>
{

        userModel.create(req.body, (error, data) =>
        {
            console.log("test",data);
            res.json(data)
        })


})*/


router.post(`/user/reset_user_collection`, (req,res) =>
{
    userModel.deleteMany({}, (error, data) =>
    {
        if(data)
        {
            const adminPassword = `123!"£qweQWE`

            bcrypt.hash(adminPassword, parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS), (err, hash) =>
            {
                userModel.create({name:"Administrator",username:"admin",password:hash,accessLevel:parseInt(process.env.ACCESS_LEVEL_ADMIN)}, (createError, createData) =>
                {
                    if(createData)
                    {
                        emptyFolder(process.env.UPLOADED_FILES_FOLDER, false, (result) =>
                        {
                            res.json(createData)
                        })
                    }
                    else
                    {
                        res.json({errorMessage:`Failed to create Admin user for testing purposes`})
                    }
                })
            })
        }
        else
        {
            res.json({errorMessage:`User is not logged in`})
        }
    })
})



router.post(`/user/Register/:name/:username/:password`, upload.single("profilePhoto"), (req,res) => {

    if(!req.file)
    {
        res.json({errorMessage:`No file was selected to be uploaded`})
    }
    else if(req.file.mimetype !== "image/png" && req.file.mimetype !== "image/jpg" && req.file.mimetype !== "image/jpeg")
    {
        fs.unlink(`${process.env.UPLOADED_FILES_FOLDER}/${req.file.filename}`, (error) => {res.json({errorMessage:`Only .png, .jpg and .jpeg format accepted`})})
    }
    else // uploaded file is valid
    {

        // If a user with this email does not already exist, then create new user
    userModel.findOne({username: req.params.username}, (uniqueError, uniqueData) => {

        console.log("WEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
        console.log(req.params)

        if (uniqueData) {
            res.json({errorMessage: `User already exists`})
        } else {
            bcrypt.hash(req.params.password, parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS), (err, hash) => {

                console.log("WhOOP WHOOP WHOOP")
                console.log(hash);
                console.log(req.params.name);
                console.log(req.params.username);

                userModel.create({name: req.params.name, username: req.params.username, password: hash, profilePhotoFilename:req.file.filename}, (error, data) => {
                    if (data) {
                        const token = jwt.sign({
                            username: data.username,
                            accessLevel: data.accessLevel
                        }, process.env.JWT_PRIVATE_KEY, {algorithm: 'HS256', expiresIn: process.env.JWT_EXPIRY})


                        fs.readFile(`${process.env.UPLOADED_FILES_FOLDER}/${req.file.filename}`, 'base64', (err, fileData) =>
                        {
                        res.json({name: data.name, accessLevel: data.accessLevel, profilePhoto:fileData, token: token})
                        })

                    } else {
                        console.log("testing testing testing")
                        console.log(data)
                        res.json({errorMessage: error})
                    }
                })
            })
        }
    })
}
})



router.post(`/user/Login/:username/:password`, (req,res) =>
{
    userModel.findOne({username:req.params.username}, (error, data) =>
    {
        if(data)
        {
            bcrypt.compare(req.params.password, data.password, (err, result) =>
            {
                if(result)
                {
                    //req.session.user = {name: data.name, accessLevel:data.accessLevel}
                    //res.json({name: data.name, accessLevel:data.accessLevel})

                    const token = jwt.sign({username: data.username, accessLevel:data.accessLevel}, process.env.JWT_PRIVATE_KEY, {algorithm: 'HS256', expiresIn:process.env.JWT_EXPIRY})

                    //res.json({name: data.name, accessLevel:data.accessLevel, token:token})

                    fs.readFile(`${process.env.UPLOADED_FILES_FOLDER}/${data.profilePhotoFilename}`, 'base64', (err, fileData) =>
                    {
                        if(fileData)
                        {
                            res.json({name: data.name, accessLevel:data.accessLevel, profilePhoto:fileData, token:token})
                        }
                        else
                        {
                            res.json({name: data.name, accessLevel:data.accessLevel, profilePhoto:null, token:token})
                        }
                    })
                }
                else
                {
                    res.json({errorMessage:`User is not logged in`})
                }
            })
        }
        else
        {
            console.log("not found in db")
            res.json({errorMessage:`User is not logged in`})
        }
    })
})



router.post(`/user/logout`, (req,res) =>
{
    res.json({})
})




module.exports = router