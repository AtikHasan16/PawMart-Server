const express = require("express");
const cors = require("cors");
const app = express();
const { default: client } = require("./mongoClient");
const { ObjectId } = require("mongodb");
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Operation for test
app.get("/", (req, res) => {
  res.send("Server is running!");
});

async function run() {
  try {
    // await client.connect();
    const database = client.db("pawmart_db");
    const productsCollection = database.collection("listings");
    const orderCollection = database.collection("orders");

    // Function for posting product
    app.post("/all-products", async (req, res) => {
      const listingData = req.body;
      const result = await productsCollection.insertOne(listingData);
      res.send(result);
    });

    // Function for getting all products
    app.get("/all-products", async (req, res) => {
      const result = await productsCollection.find().toArray();
      res.send(result);
    });

    // Function for getting data category-wise
    app.get("/all-products/category/:categoryName", async (req, res) => {
      const categories = req.params.categoryName;
      console.log(categories);

      const query = { category: categories };
      const result = await productsCollection.find(query).toArray();

      res.send(result);
    });

    // Function for finding data with Id
    app.get("/all-products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      console.log(query);
      const result = await productsCollection.findOne(query);
      res.send(result);
    });
    // // Function for getting order data
    app.get("/all-products/user/:myEmail", async (req, res) => {
      const userEmail = req.params.myEmail;
      const query = { email: userEmail };
      const result = await productsCollection.find(query).toArray();
      res.send(result);
    });

    // Function for delete listing data by id
    app.delete("/all-products/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await productsCollection.deleteOne(filter);
      res.send(result);
      console.log(result);
    });

    // Function for update listing data
    app.put("/all-products/:id", async (req, res) => {
      const updatedData = req.body;
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const update = { $set: updatedData };
      const result = await productsCollection.updateOne(query, update);
      res.send(result);
    });

    // Function for getting recent Items
    app.get("/recent-listings", async (req, res) => {
      const result = await productsCollection
        .find()
        .sort({ date: -1 })
        .limit(6)
        .toArray();

      res.send(result);
    });

    // Function for posting order data

    app.post("/orderData", async (req, res) => {
      const orderData = req.body;
      const result = await orderCollection.insertOne(orderData);
      res.send(result);
    });
    // // Function for getting order data
    app.get("/orderData/:myEmail", async (req, res) => {
      const userEmail = req.params.myEmail;
      const query = { buyerEmail: userEmail };
      const result = await orderCollection.find(query).toArray();
      res.send(result);
    });

    // // Function for delete order data by id
    // app.delete("/orderData/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const filter = { _id: new ObjectId(id) };
    //   const result = await orderCollection.deleteOne(filter);
    //   res.send(result);
    //   console.log(result);
    // });

    // // Function for update order data
    // app.put("/orderData/:id", async (req, res) => {
    //   const updatedData = req.body;
    //   const id = req.params.id;
    //   const query = { _id: new ObjectId(id) };
    //   const update = { $set: updatedData };
    //   const result = await orderCollection.updateOne(query, update);
    //   res.send(result);
    // });

    // await client.db("admin").command({ ping: 1 });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);
// Function for server log
app.listen(port, () => {
  console.log(`Running or ${port}`);
});
