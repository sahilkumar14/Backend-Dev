// server.js
import express from "express";

const app = express();
const PORT = 3000;


const books = [
  { id: 1, title: "Book A", author: "John Doe", year: 2020 },
  { id: 2, title: "Book B", author: "Jane Smith", year: 2021 },
  { id: 3, title: "Book C", author: "John Doe", year: 2021 },
  { id: 4, title: "Book D", author: "Alice", year: 2019 },
  { id: 5, title: "Book E", author: "Bob", year: 2022 },
  { id: 6, title: "Book F", author: "John Doe", year: 2023 }
];


app.get("/books", (req, res) => {

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;


  if (page < 1 || limit < 1) {
    return res.status(400).json({
      error: "page and limit must be positive integers",
    });
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedBooks = books.slice(startIndex, endIndex);

  res.json({
    page,
    limit,
    total: books.length,
    totalPages: Math.ceil(books.length / limit),
    data: paginatedBooks,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});