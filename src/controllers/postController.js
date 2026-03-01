import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from '../services/postService.js';

export async function getAllPostsHandler(req, res) {
  const {
    search = '',
    sortBy = 'id',
    order = 'asc',
    offset = 0,
    limit = 5,
  } = req.query;

  const options = {
    search,
    sortBy,
    order,
    offset: parseInt(offset),
    limit: parseInt(limit),
  };
  let posts = await getAllPosts(options);
  res.status(200).json(posts);
}

export async function getPostByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const post = await getPostById(id);
  res.status(200).json(post);
}

export async function createPostHandler(req, res) {
  const { title, content } = req.body;
  const newPost = await createPost({ title, content });
  res.status(201).json(newPost);
}

export async function updatePostHandler(req, res) {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;
  const updatedPost = await updatePost(id, { title, content });
  res.status(200).json(updatedPost);
}

export async function deletePostHandler(req, res) {
  const id = parseInt(req.params.id);
  await deletePost(id);
  res.status(204).send();
}
