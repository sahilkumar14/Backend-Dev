import express from "express";
import fs from "fs";

const app = express();
const PORT = 3000;

// ESM-safe file path
const FILE = new URL("./authors.json", import.meta.url);

app.use(express.json());

// Read authors safely
function getAuthors() {
  try {
    if (!fs.existsSync(FILE)) {
      fs.writeFileSync(FILE, "[]");
      return [];
    }

    const data = fs.readFileSync(FILE, "utf-8");
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Read Error:", err);
    return [];
  }
}

// Write authors safely
function saveAuthors(authors) {
  try {
    fs.writeFileSync(FILE, JSON.stringify(authors, null, 2));
  } catch (err) {
    console.error("Write Error:", err);
  }
}

/**
 * CREATE Author
 */
app.post("/authors", (req, res) => {
  try {
    const { name, birthYear } = req.body;

    if (!name || birthYear === undefined) {
      return res.status(400).json({ error: "name and birthYear required" });
    }

    if (isNaN(birthYear)) {
      return res.status(400).json({ error: "birthYear must be a number" });
    }

    const authors = getAuthors();

    const newAuthor = {
      id: Date.now(),
      name,
      birthYear: Number(birthYear)
    };

    authors.push(newAuthor);
    saveAuthors(authors);

    res.status(201).json(newAuthor);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * READ All Authors
 */
app.get("/authors", (req, res) => {
  try {
    const authors = getAuthors();
    res.json(authors);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * READ Single Author
 */
app.get("/authors/:id", (req, res) => {
  try {
    const authors = getAuthors();
    const id = Number(req.params.id);

    const author = authors.find(a => a.id === id);

    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    res.json(author);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * UPDATE Author
 */
app.put("/authors/:id", (req, res) => {
  try {
    const authors = getAuthors();
    const id = Number(req.params.id);

    const index = authors.findIndex(a => a.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Author not found" });
    }

    const { name, birthYear } = req.body;

    if (birthYear !== undefined && isNaN(birthYear)) {
      return res.status(400).json({ error: "birthYear must be a number" });
    }

    if (name !== undefined) authors[index].name = name;
    if (birthYear !== undefined) authors[index].birthYear = Number(birthYear);

    saveAuthors(authors);

    res.json(authors[index]);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * DELETE Author
 */
app.delete("/authors/:id", (req, res) => {
  try {
    const authors = getAuthors();
    const id = Number(req.params.id);

    const index = authors.findIndex(a => a.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Author not found" });
    }

    const deleted = authors.splice(index, 1);
    saveAuthors(authors);

    
    res.json({
      message: "Author deleted",
      author: deleted[0]
    });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 