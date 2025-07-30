const express = require('express')
const app = express()
const PORT = 4999

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
    const {word, banana} = req.query
    console.log(word, banana)
    res.sendStatus(200)
})

app.delete('/delete/james/cool', (req,res) => {
    res.sendStatus(200).send('Didnt make it')
})

app.delete('/delete/', mw, (req,res) => {
    const {id} = req.params
    console.log('What do you want to delete? ', id)
    res.sendStatus(200)
})

app.listen(PORT, () => console.log(`Server has started on port: ${PORT}`))