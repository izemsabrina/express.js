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

// Read one
app.get('/api/perso/:id', (req, res) => {
    db.find({_id:req.params.id}, (err, docs) => {
        if (err) console.log(err)
        res.send(docs)
    })
})

// Update
app.patch('/api/perso/:id', (req, res) => {
    db.update({ _id: req.params.id }, { $set: { ...req.body } })
    res.send(req.body)
})
app.listen(PORT, () => {
    console.log(`le serveur est lancé sur le port :${PORT}`)
})