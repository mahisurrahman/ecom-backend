const express = require('express');
const router = express.Router;
const reviewRatingControllers = require ("../../controllers/ratingReview/ratingReview.js");

router.post("/crt", reviewRatingControllers.createRatingReviewController);
router.get("/src/byId/:id", reviewRatingControllers.getSingleRatingReviewController);
router.get("/src/all", reviewRatingControllers.getAllRatingReviewController);
router.post("/upt/byId/:id", reviewRatingControllers.updateSingleRatingReviewController);
router.get("/del/byId/:id", reviewRatingControllers.removeSingleRatingReviewController);
router.get("/del/all", reviewRatingControllers.removeAllRatingReviewController);



module.exports = router;