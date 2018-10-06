import express from 'express';
import Route from './routes/index';

const app = express();

app.use(Route);

const port = process.env.port || 3331;

app.listen(port, () => {
  console.log('We are live on port', port);
});
