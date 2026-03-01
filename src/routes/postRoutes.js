import express from 'express';
import {
  getAllPostsHandler,
  getPostByIdHandler,
  createPostHandler,
  updatePostHandler,
  deletePostHandler,
} from '../controllers/postController.js';

import {
  validateId,
  validateCreatePost,
  validateUpdatePost,
  validatePostQuery,
} from '../middleware/postValidators.js';

const router = express.Router();
router.get('/', validatePostQuery, getAllPostsHandler);
router.get('/:id', validateId, getPostByIdHandler);
router.post('/', validateCreatePost, createPostHandler);
router.put('/:id', validateId, validateUpdatePost, updatePostHandler);
router.delete('/:id', validateId, deletePostHandler);

export default router;
