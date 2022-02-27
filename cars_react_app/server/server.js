// Server-side global variables
require(`dotenv`).config({path:`./config/.env`})


// Express
const express = require(`express`)
const app = express()

app.use(require(`body-parser`).json())
app.use(require(`cors`)({credentials: true, origin: process.env.LOCAL_HOST}))
require(`./config/db`)

// Routers
app.use(require(`./routes/products`))
app.use(require(`./routes/user`))


// Port
const port = process.env.SERVER_PORT;
app.listen(port, () =>
{
    console.log(`Connected to port ` + port)
})


// Error 404
app.use((req, res, next) => {next(createError(404))})

// Other errors
app.use(function (err, req, res, next)
{
    console.error("Testmsg")
    console.error(err.message)
    if (!err.statusCode)
    {
        err.statusCode = 500
    }
    res.status(err.statusCode).send(err.message)
})