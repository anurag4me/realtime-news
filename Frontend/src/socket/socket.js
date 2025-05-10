import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_API_URL, {
  withCredentials: true,
  autoConnect: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

// Track current subscriptions
let currentSubscriptions = new Set();

socket.on('connect', () => {
  // Resubscribe to all categories when reconnected
  currentSubscriptions.forEach(category => {
    socket.emit('subscribe', category);
  });
});

export const subscribeToCategory = (category) => {
  if (!currentSubscriptions.has(category)) {
    socket.emit('subscribe', category);
    currentSubscriptions.add(category);
  }
};

export const unsubscribeFromCategory = (category) => {
  if (currentSubscriptions.has(category)) {
    socket.emit('unsubscribe', category);
    currentSubscriptions.delete(category);
  }
};

export default socket;