const BACKEND_URL = "/api";

let allBooks = [];


// Load books directly from frontend VM
async function loadBooks() {

    try {

        const response = await fetch("/books");

        allBooks = await response.json();

        displayBooks(allBooks);

    } catch (error) {

        document.getElementById("books-container").innerHTML =
            "<p>Unable to load books.</p>";

        console.error(error);
    }
}


// Display books
function displayBooks(books) {

    const container =
        document.getElementById("books-container");

    container.innerHTML = "";

    if (books.length === 0) {

        container.innerHTML =
            "<p>No books found.</p>";

        return;
    }


    books.forEach(book => {

        const card =
            document.createElement("div");

        card.className = "book-card";

        card.innerHTML = `
            <h3>📖 ${book.title}</h3>

            <p>
                <strong>Author:</strong>
                ${book.author}
            </p>

            <p>
                <strong>Category:</strong>
                ${book.category}
            </p>

            <p>
                <strong>Year:</strong>
                ${book.year}
            </p>
        `;

        container.appendChild(card);

    });

}


// Search
function searchBooks() {

    const searchText =
        document
            .getElementById("search")
            .value
            .toLowerCase();


    const filteredBooks =
        allBooks.filter(book =>

            book.title
                .toLowerCase()
                .includes(searchText)

            ||

            book.author
                .toLowerCase()
                .includes(searchText)

            ||

            book.category
                .toLowerCase()
                .includes(searchText)

        );


    displayBooks(filteredBooks);
}


// Add book
document
    .getElementById("book-form")
    .addEventListener("submit", async (event) => {

        event.preventDefault();


        const book = {

            title:
                document
                    .getElementById("title")
                    .value,

            author:
                document
                    .getElementById("author")
                    .value,

            category:
                document
                    .getElementById("category")
                    .value,

            year:
                Number(
                    document
                        .getElementById("year")
                        .value
                )
        };


        try {

            const response = await fetch(
                `${BACKEND_URL}/books`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify(book)
                }
            );


            const result =
                await response.json();


            document.getElementById("message")
                .textContent =
                result.message ||
                result.error;


            document
                .getElementById("book-form")
                .reset();


            loadBooks();

        } catch (error) {

            document.getElementById("message")
                .textContent =
                "Unable to add book.";

            console.error(error);

        }

    });


loadBooks();