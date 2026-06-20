const Message = require("../models/Message");

const sendMessage = async (req, res) => {
  try {

    const { receiver, text } = req.body;

    const message =
      await Message.create({
        sender: req.user.id,
        receiver,
        text,
      });

    res.status(201).json({
      success: true,
      message,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getConversation = async (
  req,
  res
) => {
  try {

    const messages =
      await Message.find({
        $or: [
          {
            sender: req.user.id,
            receiver: req.params.userId,
          },
          {
            sender: req.params.userId,
            receiver: req.user.id,
          },
        ],
      }).sort({
        createdAt: 1,
      });

    res.status(200).json({
      success: true,
      messages,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
    sendMessage,
    getConversation
};