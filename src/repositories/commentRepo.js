import { comments, getNextId } from '../db/comments.js';
import { postExists } from '../repositories/postRepo.js';

export function getAll({ postId, search, sortBy, order, offset, limit }) {
  let results = [...comments];
  if (postId) {
    results = results.filter((comment) => comment.postId === postId);
  }

  if (search) {
    results = results.filter((comment) =>
      comment.content.toLowerCase().includes(search.toLowerCase()),
    );
  }

  results.sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return order === 'asc' ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return order === 'asc' ? 1 : -1;
    return 0;
  });

  const endIndex = offset + limit;
  results = results.slice(offset, endIndex);
  return results;
}

export function getById(id) {
  let comment = comments.find((comment) => comment.id === id);
  return comment;
}

export function create(data) {
  if (postExists(data.postId)) {
    const newComment = {
      id: getNextId(),
      postId: data.postId,
      content: data.content,
      createdAt: new Date().toISOString(),
    };
    comments.push(newComment);
    return newComment;
  } else {
    const error = new Error(
      `Cannot create comment: referenced post with id ${data.postId} does not exist`,
    );
    error.status = 400;
    throw error;
  }
}

export function update(id, updatedData) {
  const comment = comments.find((c) => c.id === id);
  if (!comment) return undefined;
  comment.content = updatedData.content;
  return comment;
}

export function remove(id) {
  const index = comments.findIndex((comment) => comment.id === id);
  if (index === -1) return false;
  comments.splice(index, 1);
  return true;
}
