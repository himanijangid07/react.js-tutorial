import express from 'express'

const app = express()

app.get('/api/products', (req, res) => {
  const jokes = [
    { id: 1, title: "A joke", content: "This is a joke" },
    { id: 2, title: "Another joke", content: "This is another joke" },
    { id: 3, title: "Third joke", content: "This is third joke" },
    { id: 4, title: "Fourth joke", content: "This is fourth joke" },
    { id: 5, title: "Fifth joke", content: "This is fifth joke" },
  ];

  try {
    const search = req.query.search?.toLowerCase();

    if (search) {
      const filteredJokes = jokes.filter(joke =>
        joke.title?.toLowerCase().includes(search)
      );
      return res.send(filteredJokes);
    }

    setTimeout(() => {
      res.send(jokes);
    }, 3000);

  } catch (err) {
    console.error("Error in /api/products:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log("Server running on port", port)
})