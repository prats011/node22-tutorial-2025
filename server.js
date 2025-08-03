require('dotenv').config();

const express = require('express')
const app = express()
const PORT = process.env.PORT || 4999;


//middleware
app.use(express.json())
app.use(express.static('public'))
app.use(require('cors')())
app.use(mw)

function mw(req, res, next) {
    console.log('Hit the MIDDLEWARE')
    const { id } = req.query
    if (id != 8) {
        return res.sendStatus(403)
    }
    next()
}

//TEMP DATABASE
const db = []

//SCHEDULER
function cron(ms, fn) {
    async function cb() {
        clearTimeout(timeout)
        await fn()
        timeout = setTimeout(cb, ms)
    }
    let timeout = setTimeout(cb, ms)
    return () => { }
}

function consoleDB() {
    console.log('DB= ', db)
}

cron(1000, consoleDB)

//This gets overrun by the html file when
// there is app.use(express.static('public'))
app.get('/', (req, res) => {
    console.log("You have reached the home route: GET ")
    res.status(200).send({ "yourMessage": "GET: Opened web" })
})

app.post('/api/info', (req, res) => {
    const { information } = req.body
    console.log('The posted message: ', information)
    db.push(information)
    console.log('DB: ', db)
    res.status(201).json({ "yourMessage": `POST: ${information}` })
})

app.put('/api/create', (req, res) => {
    const { information } = req.body
    db.push(information)
    console.log('Added new item:', information)
    return res.status(201).json({ "yourMessage": `PUT CREATE: ${information}` })
})

app.put('/api/update', (req, res) => {
    const { information } = req.body
    const { newInformation } = req.body
    const index = db.findIndex(newInformation => newInformation === information)

    if (index === -1) {
        return res.status(404).json({ "yourMessage": "PUT UPDATE: error Item not found" })
    }

    db.splice(index, 1, newInformation);
    console.log('Updated new information:', newInformation)
    res.status(200).json({ "yourMessage": `PUT UPDATE: "${information}" to "${newInformation}"` })
});



app.delete('/delete', (req, res) => {
    if (db.length > 0) {
        const info = db[0]
        const deleted = info
        db.splice(0, 1)
        res.status(200).json({ "yourMessage": `DELETE: ${deleted}` })
        console.log('The deleted message: ', info)
    } else {
        console.log('Empty DB LIST')
        res.status(404).json({ "yourMessage": "DELETE: List is Empty" })
    }


})

app.listen(PORT, () => console.log(`Server has started on port: ${PORT}`))