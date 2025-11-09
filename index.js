const express = require("express");
const cors = require("cors");
const app = express();
const { default: client } = require("./mongoClient");
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

async function run() {
  try {
    await client.connect();

    app.get("/", (req, res) => {
      res.send("Server is running!");
    });

    app.listen(port, () => {
      console.log(`Running or ${port}`);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);
