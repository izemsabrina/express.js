import express from "express";
import Datastore from "nedb";

//BDD
const db = new Datastore({ filename: 'perso' })
db.loadDatabase()

//start express
const PORT= 8000
const app = express()
app.use(express.json())

//API CRUD
//CREAT

app.post('/api/perso', (req, res) => {
    db.insert(req.body)
    console.log(req.body)
    res.send(req.body)
})

//READ ALL
app.get('/api/perso', (req, res) => {
    db.find({}, (err, docs) => {
        if (err) console.log(err)
        res.send(docs)
    })
})
app.listen(PORT, () => {
    console.log(`le serveur est lancé sur le port :${PORT}`)
})