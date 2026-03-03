import {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
} from '../services/commentService.js';

export async function getAllCommentsHandler(req, res) {
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
  const comments = await getAllComments(options);
  res.status(200).json(comments);
}

export async function getCommentByIdHandler(req, res) {
  let id = parseInt(req.params.id);
  let comment = await getCommentById(id);
  res.status(200).json(comment);
}

export async function createCommentHandler(req, res) {
  const { postId, content } = req.body;
  const newComment = await createComment({ postId, content });
  res.status(201).json(newComment);
}

export async function updateCommentHandler(req, res) {
  let id = parseInt(req.params.id);
  const { content } = req.body;
  const updatedComment = await updateComment(id, { content });
  res.status(200).json(updatedComment);
}

export async function deleteCommentHandler(req, res) {
  let id = parseInt(req.params.id);
  await deleteComment(id);
  res.status(204).send();
}
