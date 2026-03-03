import { posts, getNextId } from '../db/posts.js';
import pool from '../db/db.js';

export async function getAll({ search, sortBy, order, offset, limit }) {
  //rename created_at to an alias
  //if title includes search, it will be filtered
  let text = `SELECT id, title, content, created_at AS "createdAt" FROM posts`;
  const values = [];
  //build dynamic query
  const conditions = [];
  //if search exists, add conditions and store values in array
  if (search) {
    //push values into values array using filtering
    values.push(`%${search}%`);
    //generates correct placeholder numbers dynamically based on values added
    //values stays aligned with the values array
    conditions.push(
      `(title ILIKE $${values.length} OR content ILIKE $${values.length})`,
    );
  }
  //if there are conditions, append to the end of text
  if (conditions.length > 0) {
    text += ` WHERE ${conditions.join(' AND ')}`;
  }

  //build dynamic query
  //map sortby value from api request to db column
  if (sortBy === 'createdAt') sortBy = 'created_at';
  //append orderby clause
  text += ` ORDER BY ${sortBy} ${order}`;

  //push into values array using pagination
  values.push(limit);
  values.push(offset);
  //append to query set
  text += ` LIMIT $${values.length - 1} OFFSET $${values.length}`;

  //get result
  const result = await pool.query(text, values);
  //get result rows of the array of all posts in database
  return result.rows;
}

export async function getById(id) {
  //use parameterized query where user input is treated as data
  // by redefining sql query using placeholders
  const text = `SELECT id, title, content, created_at AS "createdAt" FROM posts WHERE id = $1`;
  //pass in array id
  const values = [id];

  //write query taking two arguments (query string, and values)
  const result = await pool.query(text, values);
  //return first row to service layer
  return result.rows[0];
}

export async function create(postData) {
  //construct query string by name of columns
  //use two placeholders and return the result with alias
  const text = `INSERT INTO posts (title, content)
                VALUES ($1, $2)
                RETURNING 
                  id,
                  title,
                  content,
                  created_at AS "createdAt"`;
  //values array to include values
  const values = [postData.title, postData.content];
  //get the result
  const result = await pool.query(text, values);
  //return one row at most
  return result.rows[0];
}

export async function update(id, updatedData) {
  //update query string
  //use three placeholders
  //return the first not null value in argument list
  //if updatedData.title is not null, then return the updatedData.title
  //if null, keep current title, same as content
  const text = `UPDATE posts
                  SET
                    title = COALESCE($1, title),
                    content = COALESCE($2, content)
                  WHERE
                    id = $3
                    RETURNING
                      id,
                      title,
                      content,
                      created_at AS "createdAt"`;
  //values array
  const values = [updatedData.title, updatedData.content, id];
  //get the result
  const result = await pool.query(text, values);
  //return first row of updated post. if not exist, undefined
  return result.rows[0];
}

export async function remove(id) {
  //delete query string
  const text = `DELETE FROM posts WHERE id = $1`;
  //values array
  const values = [id];
  //get the result
  const result = await pool.query(text, values);
  //check result count to see how many rows are affected
  //if posts matching id is found, it is true
  return result.rowCount > 0;
}

// export function postExists(id) {
//   return posts.some((p) => p.id === id);
// }
