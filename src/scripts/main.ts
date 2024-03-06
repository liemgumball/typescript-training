import { config } from 'dotenv';
config();
import { App } from './app';

document.addEventListener('DOMContentLoaded', () => {
  const app = new App();

  app.start();
});
