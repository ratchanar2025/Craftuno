const Event = require("../models/Event");

const createEvent = async (req, res) => {

  try {

    const event = await Event.create({
      ...req.body,
      organizer: req.user.id,
    });

    res.status(201).json({
      success: true,
      event,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

const getEvents = async (req, res) => {

  try {

    const events = await Event
      .find({
        isPublished: true,
      })
      .populate(
        "organizer",
        "name email"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: events.length,
      events,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

const getEvent = async (req, res) => {

  try {

    const event = await Event
      .findById(req.params.id)
      .populate(
        "organizer",
        "name email"
      );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      event,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

const markInterested = async (req, res) => {

  try {

    const event = await Event.findById(
      req.params.id
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    const alreadyInterested =
      event.interestedVendors.includes(
        req.user.id
      );

    if (alreadyInterested) {
      return res.status(400).json({
        success: false,
        message:
          "Already marked interested",
      });
    }

    event.interestedVendors.push(
      req.user.id
    );

    await event.save();

    res.status(200).json({
      success: true,
      message:
        "Interest recorded successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

const joinEvent = async (req, res) => {

  try {

    const event = await Event.findById(
      req.params.id
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    const alreadyJoined =
      event.participants.includes(
        req.user.id
      );

    if (alreadyJoined) {
      return res.status(400).json({
        success: false,
        message:
          "Already joined event",
      });
    }

    event.participants.push(
      req.user.id
    );

    await event.save();

    res.status(200).json({
      success: true,
      message:
        "Joined event successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

const publishEvent = async (req, res) => {

  try {

    const event = await Event.findById(
      req.params.id
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    event.isPublished = true;
    event.status = "approved";

    await event.save();

    res.status(200).json({
      success: true,
      message:
        "Event published successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

module.exports = {
  createEvent,
  getEvents,
  getEvent,
  markInterested,
  joinEvent,
  publishEvent,
};