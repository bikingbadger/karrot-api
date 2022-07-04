import express from 'express';

const app = express();
const PORT = process.env.port || 3000;
console.log('app', PORT);

// Start Server
async function start() {
  try {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (e) {
    console.log({ message: e.message });
  }
}

if (process.env.NODE_ENV === 'development') {
  start();
}

export { app };
