import express from 'express';
import morgan from 'morgan';
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
if (process.env.NODE_ENV !== 'test') app.use(morgan('tiny'));

app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  if (!err.status) {
    err.status = 500;
    err.message = 'Internal Server Error';
  }
  res.status(err.status).json({ error: err.message });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

export default app;
