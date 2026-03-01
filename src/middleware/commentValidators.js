import { param, body, query } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

export const validateId = [
  param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer'),

  handleValidationErrors,
];

export const validateCreateComment = [
  body('content')
    .exists({ values: 'falsy' })
    .withMessage('Content is required')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('Content must be a string')
    .bail()
    .isLength({ min: 10 })
    .withMessage('Content must be at least 10 characters'),

  body('postId')
    .exists({ values: 'falsy' })
    .withMessage('postId is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('postId must be a positive integer'),

  handleValidationErrors,
];

export const validateUpdateComment = [
  body('content')
    .exists({ values: 'falsy' })
    .withMessage('Content is required')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('Content must be a string')
    .bail()
    .isLength({ min: 10 })
    .withMessage('Content must be at least 10 characters'),

  handleValidationErrors,
];

export const validateCommentsQuery = [
  query('postId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('postId must be a positive integer'),

  query('sortBy')
    .optional()
    .isIn(['id', 'postId', 'content', 'createdAt'])
    .withMessage('sortBy must be one of id, postId, content, createdAt'),

  query('order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('order must be either asc or desc'),

  query('offset')
    .optional()
    .isInt({ min: 0 })
    .withMessage('offset must be a non-negative integer'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('limit must be an integer between 1 and 50'),

  handleValidationErrors,
];
