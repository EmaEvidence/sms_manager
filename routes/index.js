import { Router } from 'express';

const Route = Router();

Route.get('/', (req, res) => {
  res.json({
    message: 'Welcome to SMS Manager'
  }).status(200);
});

export default Route;
