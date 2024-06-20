const express = require('express');
const router = express.Router();
const { createOrderController, showOrderController, showSingleOrderController, deleteOrderController, updateOrderController, showAllOrderController, pendingOrderController, cancelledOrderController, confirmedOrderController, showOrdersByUserController, showRefunedOrdersByUserController } = require("../../controllers/orderController/orderController");

router.post("/crt", createOrderController);
router.post("/upt/byid/:id", updateOrderController);
router.get("/confirm/byid/:id", confirmedOrderController);
router.get("/cancel/byid/:id", cancelledOrderController);
router.get("/pending/byid/:id", pendingOrderController);
router.get("/src", showOrderController);
router.get("/src/all", showAllOrderController);
router.get("/src/byid/:id", showSingleOrderController);
router.get("/src/user/byid/:id", showOrdersByUserController);

router.get("/del/byid/:id", deleteOrderController);
router.get("/refunds/byid/:id", showRefunedOrdersByUserController);



module.exports = router;