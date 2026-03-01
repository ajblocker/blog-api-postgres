import {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
} from '../services/commentService.js';

export function getAllCommentsHandler(req, res) {
  const {
    postId,
    search = '',
    sortBy = 'id',
    order = 'asc',
    offset = 0,
    limit = 5,
  } = req.query;

  const options = {
    postId: postId ? parseInt(postId) : undefined,
    search,
    sortBy,
    order,
    offset: parseInt(offset),
    limit: parseInt(limit),
  };
  const comments = getAllComments(options);
  res.status(200).json(comments);
}

export function getCommentByIdHandler(req, res) {
  let id = parseInt(req.params.id);
  let comment = getCommentById(id);
  res.status(200).json(comment);
}

export function createCommentHandler(req, res) {
  const { postId, content } = req.body;
  const newComment = createComment({ postId, content });
  res.status(201).json(newComment);
}

export function updateCommentHandler(req, res) {
  let id = parseInt(req.params.id);
  const { content } = req.body;
  const updatedComment = updateComment(id, { content });
  res.status(200).json(updatedComment);
}

export function deleteCommentHandler(req, res) {
  let id = parseInt(req.params.id);
  deleteComment(id);
  res.status(204).send();
}
