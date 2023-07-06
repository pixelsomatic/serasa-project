import app from './app';
import { Server } from 'http';

let server: Server;

export function startServer(): void {
    server = app.listen(3000, () => {
        console.log("Server running on port 3000");
    });
}

export function stopServer(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    server.close(err => {
      if (err) {
          reject(err);
      } else {
          resolve(true);
      }
    });
  });
}

// Start the server when this module is executed directly
if (require.main === module) {
  startServer();
}
