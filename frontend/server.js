const express = require("express");
const path = require("path");
const { Storage } = require("@google-cloud/storage");

const app = express();

const PORT = 3000;

const BUCKET_NAME = "bookvault-books-508110";
const FILE_NAME = "books.json";

const storage = new Storage();

const bucket = storage.bucket(BUCKET_NAME);
const file = bucket.file(FILE_NAME);


// Serve frontend files
app.use(express.static(path.join(__dirname)));


// Frontend reads books from private bucket
app.get("/books", async (req, res) => {

    try {

        const [data] = await file.download();

        const books = JSON.parse(data.toString());

        res.json(books);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Unable to read books"
        });

    }

});


app.listen(PORT, "0.0.0.0", () => {

    console.log(
        `BookVault Frontend running on port ${PORT}`
    );

});