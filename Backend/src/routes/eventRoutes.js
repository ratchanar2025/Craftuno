const express = require("express");

const router = express.Router();

const {
  createEvent,
  getEvents,
  getEvent,
  markInterested,
  joinEvent,
  publishEvent,
} = require(
  "../controllers/eventController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

router.post(
  "/",
  protect,
  createEvent
);

router.get(
  "/",
  getEvents
);

router.get(
  "/:id",
  getEvent
);

router.post(
  "/:id/interested",
  protect,
  markInterested
);

router.post(
  "/:id/join",
  protect,
  joinEvent
);

router.post(
  "/:id/publish",
  protect,
  publishEvent
);

module.exports = router;