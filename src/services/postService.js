import {
  getAll,
  getById,
  create,
  update,
  remove,
} from '../repositories/postRepo.js';

export async function getAllPosts(options) {
  return getAll(options);
}

export async function getPostById(id) {
  const post = await getById(id);
  if (post) return post;
  else {
    const error = new Error(`Post ${id} not found`);
    error.status = 404;
    throw error;
  }
}

export async function createPost(postData) {
  return create(postData);
}

export async function updatePost(id, updatedData) {
  const updatedPost = await update(id, updatedData);
  if (updatedPost) return updatedPost;
  else {
    const error = new Error(`Post ${id} not found`);
    error.status = 404;
    throw error;
  }
}

export async function deletePost(id) {
  const result = await remove(id);
  if (result) return;
  else {
    const error = new Error(`Post ${id} not found`);
    error.status = 404;
    throw error;
  }
}
