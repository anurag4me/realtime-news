const socketHandler = (io) => {
  // Set up Socket.IO with proper room management
  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    // Handle category subscriptions
    socket.on("subscribe", (category) => {
      socket.join(category?.toLowerCase());
      console.log(`Client ${socket.id} subscribed to ${category}`);
    });

    // Handle unsubscriptions
    socket.on("unsubscribe", (category) => {
      socket.leave(category?.toLowerCase());
      console.log(`Client ${socket.id} unsubscribed from ${category}`);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};

module.exports = socketHandler;
