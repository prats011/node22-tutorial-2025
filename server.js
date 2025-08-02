require('dotenv').config();

const express = require('express')
const app = express()
const PORT = process.env.PORT || 4999;


//middleware
app.use(express.json())
app.use(express.static('public'))
app.use(require('cors')())
app.use(mw)

function mw(req, res, next){
    console.log('Hit the MIDDLEWARE')
    const {id} = req.query
    if(id != 8){
        return res.sendStatus(403)
    }
    next()
}

//TEMP DATABASE
const db = []

//SCHEDULER
function cron(ms, fn){
    async function cb(){
        clearTimeout(timeout)
        await fn()
        timeout = setTimeout(cb, ms)
    }
    let timeout = setTimeout(cb, ms)
    return () => { }
}

function consoleDB(){
    console.log('. DB= ', db)
}

cron(1000, consoleDB)

// GET POST PATCH PUT DELETE 
//This gets overrun by the html file when
//  there is app.use(express.static('public'))
app.get('/', (req,res) => {
    console.log("You have reached the home route: GET ")
    res.status(200).send({"message": "Hi mom"})
})

app.post('/api/info', (req, res) => {
    const {information}  = req.body
    console.log('The posted message: ', information)
    db.push(information)
    console.log('DB: ', db)
    res.status(201).json({"yourMessage": information})
})

app.put('/api', (req, res) => {
    const {word} = req.query
    const {information}  = req.body
    db.push(information)
    console.log('DB: ', db)
    res.status(201).json({"yourMessage": information})
    console.log(word)
    res.sendStatus(200)
})

app.delete('/delete', (req,res) => {
    db.splice(db,0)
    console.log('DB: ', db)
    res.status(200).send('deleted:')

})

app.listen(PORT, () => console.log(`Server has started on port: ${PORT}`))