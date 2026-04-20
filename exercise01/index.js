import express from "express";
import fs from "fs";

const app = express();
const PORT = 3000;


app.get("/books", (req, res) => {
  try {
    const { author, year } = req.query;


    const data = fs.readFileSync("./books.json", "utf-8");
    let books = JSON.parse(data);

    if (author) {
      books = books.filter(book =>
        book.author.toLowerCase().includes(author.toLowerCase())
      );
    }

    if (year) {
      books = books.filter(book =>
        book.year === Number(year)
      );
    }

    return res.status(200).json({
      success: true,
      count: books.length,
      data: books
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error reading books"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});