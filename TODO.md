# TODO: Implement Admin Authentication

- [x] Create .env with ADMIN_PASSWORD=supersecret123
- [x] Update Middleware/AuthMiddleware.js: Change to use req.body.password, rename function to adminAuth
- [x] Create Models/Item.js: Simple Mongoose schema for items
- [x] Create Controllers/itemController.js: CRUD functions (createItem, getItems, getItem, updateItem, deleteItem)
- [x] Create Routes/itemRoutes.js: Routes protected with adminAuth
- [x] Update index.js: Add import and use for authRoutes (/api/auth), and ensure itemRoutes import is correct
