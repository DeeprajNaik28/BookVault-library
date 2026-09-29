const express = require("express");
const cors = require("cors");
const { Storage } = require("@google-cloud/storage");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

const BUCKET_NAME = "bookvault-books-508110";
const FILE_NAME = "books.json";

const storage = new Storage();

const bucket = storage.bucket(BUCKET_NAME);
const file = bucket.file(FILE_NAME);


// Read books from Google Cloud Storage
async function readBooks() {

    const [data] = await file.download();

    return JSON.parse(data.toString());
}


// Write books to Google Cloud Storage
async function writeBooks(books) {

    await file.save(
        JSON.stringify(books, null, 2),
        {
            contentType: "application/json"
        }
    );
}


// Home
app.get("/", (req, res) => {

    res.json({
        message: "BookVault Backend API"
    });

});


// GET books
app.get("/books", async (req, res) => {

    try {

        const books = await readBooks();

        res.json(books);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Unable to read books from storage"
        });

    }

});


// ADD book
app.post("/books", async (req, res) => {

    try {

        const {
            title,
            author,
            category,
            year
        } = req.body;


        const books = await readBooks();


        const newBook = {

            id: Date.now(),

            title,

            author,

            category,

            year
        };


        books.push(newBook);


        await writeBooks(books);


        res.status(201).json({

            message: "Book added successfully",

            book: newBook
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            error: "Unable to add book"
        });

    }

});


// DELETE book
app.delete("/books/:id", async (req, res) => {

    try {

        const id = Number(req.params.id);

        const books = await readBooks();


        const updatedBooks = books.filter(
            book => book.id !== id
        );


        await writeBooks(updatedBooks);


        res.json({

            message: "Book deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            error: "Unable to delete book"
        });

    }

});


app.listen(PORT, "0.0.0.0", () => {

    console.log(
        `BookVault Backend running on port ${PORT}`
    );

});