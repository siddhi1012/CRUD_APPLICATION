const express = require('express')
const mongoose = require('mongoose')
const app = express();
const book = require('./book')
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/assignment1").then(() => { console.log("connected to mongodb") })
    .catch(() => {
        console.log("Error to connect mongodb")
    })

//Q1. Create a new book record (POST)
app.post('/books', async(req, res) => {
    try {
        const books = new book(req.body)
        const result = await books.save()
        res.status(200).send(result);
    } catch (err) {
        res.status(404).send(err)

    }
})

//Q2. Fetch all books (GET)
app.get('/books', async(req, res) => {
    const result = await book.find()
    res.send(result)
})


// Q3. Fetch a single book by ID (GET)
app.get('/book/:id', async(req, res) => {
    const bookid = await book.findById(req.params.id)
    if (!bookid) return res.status(404).send("Id not found")
    res.send(bookid)
})


//Q4. Update book availability (PUT)
app.put('/book/:id', async(req, res) => {
    try {
        const bookid = await book.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!bookid) return res.status(404).send('failed to update')
        res.send(bookid)
    } catch (err) {
        res.status(404).send(err)
    }
})

// Q5. Delete a book record (DELETE)
app.delete('/delete/:id', async(req, res) => {
    try {
        const bookid = await book.findByIdAndDelete(req.params.id)
        if (!bookid) return res.status(404).send("book id not found")
        res.send({ message: "Deleted Successfully", bookid })
    } catch (err) {
        res.send(err);
    }
})

// Q6. Fetch books by author name
app.get('/author/:name', async(req, res) => {
    const author = await book.find({ author: req.params.name })
    if (!author) return res.status(404).send("author not found")
    res.send(author)
})


app.listen(3000, () => {
    console.log("server running on port number 3000");
})