import express from 'express';
import {
  validateId,
  validateCreateComment,
  validateUpdateComment,
  validateCommentsQuery,
} from '../middleware/commentValidators.js';

import {
  getAllCommentsHandler,
  getCommentByIdHandler,
  createCommentHandler,
  updateCommentHandler,
  deleteCommentHandler,
} from '../controllers/commentController.js';

const router = express.Router();

router.get('/', validateCommentsQuery, getAllCommentsHandler);

router.get('/:id', validateId, getCommentByIdHandler);

router.post('/', validateCreateComment, createCommentHandler);

router.put('/:id', validateId, validateUpdateComment, updateCommentHandler);

router.delete('/:id', validateId, deleteCommentHandler);

export default router;
