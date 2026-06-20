const users = {};

const socketHandler = (io) => {

  io.on("connection", (socket) => {

    console.log("Connected:", socket.id);

    socket.on("join", (userId) => {

      users[userId] = socket.id;

      console.log(
        `User ${userId} joined`
      );
    });

    socket.on("disconnect", () => {

      Object.keys(users).forEach((userId) => {

        if (users[userId] === socket.id) {
          delete users[userId];
        }

      });

      console.log("Disconnected");
    });

  });

};

module.exports = socketHandler;