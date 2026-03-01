import {
  getAll,
  getById,
  create,
  update,
  remove,
} from '../repositories/commentRepo.js';

export function getAllComments(options) {
  return getAll(options);
}

export function getCommentById(id) {
  const comment = getById(id);
  if (comment) return comment;
  else {
    const error = new Error(`Comment ${id} not found`);
    error.status = 404;
    throw error;
  }
}

export function createComment(data) {
  return create(data);
}

export function updateComment(id, data) {
  const updatedComment = update(id, data);
  if (updatedComment) return updatedComment;
  else {
    const error = new Error(`Comment ${id} not found`);
    error.status = 404;
    throw error;
  }
}

export function deleteComment(id) {
  const result = remove(id);
  if (result) return;
  else {
    const error = new Error(`Comment ${id} not found`);
    error.status = 404;
    throw error;
  }
}
