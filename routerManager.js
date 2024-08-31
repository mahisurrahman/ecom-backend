const mainRoute = require("./routes/mainRoute/mainRoute.js");
const { app } = require("./app.js");
const userRoute = require("./routes/userRoutes/userRoutes.js");
const productRoute = require("./routes/productRoutes/productRoute");
const categoryRoute = require("./routes/categoryRoutes/categoyRoutes.js");
const stockRoute = require("./routes/stockRoutes/stockRoutes.js");
const salesRoute = require("./routes/salesRoutes/salesRoutes.js");
const receiptsRoute = require("./routes/receiptRoutes/receiptRoutes.js");
const customerReceiptRoute = require("./routes/customerReceiptRoutes/customerReceiptsRoutes.js");
const ratingRoute = require("./routes/ratingRoutes/ratingRoutes.js");
const cartRoute = require("./routes/cartRoutes/cartRoutes.js");
const orderRoute = require("./routes/orderRoutes/orderRoutes.js");
const discountRoute = require ("./routes/discountRoutes/discountRoutes.js");

const routerManager = () => {
  //Home Route//
  app.use("/", mainRoute);

  //User Route//
  app.use("/api/v1/users", userRoute);

  //Products Route//
  app.use("/api/v1/products", productRoute);

  //Category Route//
  app.use("/api/v1/categories", categoryRoute);

  //Stock Route//
  app.use("/api/v1/stocks", stockRoute);

  //Ratings Route//
  app.use("/api/v1/ratings", ratingRoute);

  //Sales Route//
  app.use("/api/v1/sales", salesRoute);

  //Receipt Route//
  app.use("/api/v1/receipts", receiptsRoute);

  //Customer Receipt Route//
  app.use("/api/v1/customerReceipts", customerReceiptRoute);

  //Cart Routes//
  app.use("/api/v1/carts", cartRoute);

  //Order Routes//
  app.use("/api/v1/orders", orderRoute);

  //Discount Routes//
  app.use("/api/v1/discount", discountRoute);
};

module.exports = routerManager;
