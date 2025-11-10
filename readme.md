# ⚙️ PawMart - Server-Side API

This repository contains the back-end API for the PawMart project. It is built with Node.js, Express, and MongoDB and serves all data required by the PawMart client application.

**Live Server URL:** [https://pawmart-server.vercel.app](https://pawmart-server.vercel.app)

---

### 💻 Technologies Used

- **Node.js:** The runtime environment for the server.
- **Express.js:** The framework used to build the API, manage routes, and handle requests.
- **MongoDB:** The NoSQL database used to store all `listings` and `orders` data.
- **CORS:** Middleware to allow the client-side application (on Netlify) to make requests to this server.
- **Dotenv:** Used to manage environment variables (database credentials, port).

---

### 📡 API Endpoints

All data is served as JSON. The base URL is your live server URL.

#### `listings` Collection (`/all-products`)

- `GET /all-products`: Get all product and pet listings.
- `GET /all-products/:id`: Get a single listing by its unique `_id`.
- `GET /all-products/category/:categoryName`: Get all listings that match a specific category (e.g., "Pets", "Pet Food").
- `GET /api/listings/recent`: (Or your equivalent) Get the 6 most recently added listings for the home page.
- `GET /my-listings/:email`: Get all listings posted by a specific user's email.
- `POST /all-products`: Add a new listing to the database. (Matches your `AddListing` form)
- `PUT /all-products/:id`: Update an existing listing (Used in "My Listings" page).
- `DELETE /all-products/:id`: Delete a listing by its `_id` (Used in "My Listings" page).

#### `orders` Collection (`/orders` or `/orderData`)

- `POST /orderData`: (Or `/orders`) Submit a new order for a pet or product.
- `GET /orders/my-orders/:email`: Get all orders placed by a specific user's email.
- `PUT /orders/:id`: Update an existing order (e.g., address, phone).
- `DELETE /orders/:id`: Cancel (delete) an order.

---

### 🚀 How to Run Locally

1.  **Clone this repository:**

    ```bash
    git clone [your-server-repo-url]
    cd pawmart-server
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Create a `.env` file** in the root directory and add your environment variables:

    ```env
    MONGO_USER=[your-mongodb-username]
    DB_PASSWORD=[your-mongodb-password]
    PORT=5000
    ```

4.  **Start the server:**
    ```bash
    npm start
    ```

The server will be running on `http://localhost:5000`.
