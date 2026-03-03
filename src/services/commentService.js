import {
  getAll,
  getById,
  create,
  update,
  remove,
} from '../repositories/commentRepo.js';

export async function getAllComments(options) {
  return getAll(options);
}

export async function getCommentById(id) {
  const comment = await getById(id);
  if (comment) return comment;
  else {
    const error = new Error(`Comment ${id} not found`);
    error.status = 404;
    throw error;
  }
}

export async function createComment(data) {
  return create(data);
}

export async function updateComment(id, data) {
  const updatedComment = await update(id, data);
  if (updatedComment) return updatedComment;
  else {
    const error = new Error(`Comment ${id} not found`);
    error.status = 404;
    throw error;
  }
}

export async function deleteComment(id) {
  const result = await remove(id);
  if (result) return;
  else {
    const error = new Error(`Comment ${id} not found`);
    error.status = 404;
    throw error;
  }
}
