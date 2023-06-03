const socketConnection = (io) => {
  io.on("connection",  (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on("message",  (data) => {
      socket.broadcast.emit("messageReturn", data);
    });

    socket.on("disconnect", () => {
      console.log("🔥: A user disconnected");
      socket.disconnect();
    });
  });
};
export default socketConnection;
