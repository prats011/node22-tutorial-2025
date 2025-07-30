const express = require('express')
const app = express()
const PORT = 4999


// GET POST PATCH PUT DELETE 
app.get('/', (req,res) => {
    console.log("You have reached the home route: GET ")
})

app.delete('/', (req,res) => {
    console.log('What do you want to delete?')
})

app.listen(PORT, () => console.log(`Server has started on port: ${PORT}`))