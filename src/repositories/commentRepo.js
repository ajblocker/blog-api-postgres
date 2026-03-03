import { comments, getNextId } from '../db/comments.js';
import pool from '../db/db.js';

export async function getAll({ postId, search, sortBy, order, offset, limit }) {
  //rename created_at to an alias
  let text = `SELECT id, post_id, content, created_at AS "createdAt" FROM comments`;
  const values = [];
  //build dynamic query
  const conditions = [];
  //if postId exists, add conditions and store values in array
  if (postId) {
    //push values into values array using filtering
    values.push(`%${postId}`);
    conditions.push(`post_id ILIKE $${values.length}`);
  }
  //if search exists, add conditions and store values in array
  if (search) {
    //push values into values array using filtering
    values.push(`%${search}`);
    //generates correct placeholder numbers dynamically based on values added
    //values stays aligned with the values array
    conditions.push(`content ILIKE $${values.length}`);
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
  const text = `SELECT id, post_id, content, created_at AS "createdAt" FROM comments WHERE id = $1`;
  //pass in array id
  const values = [id];
  //write query taking two arguments (query string, and values)
  const result = await pool.query(text, values);
  //return first row to service layer
  return result.rows[0];
}

export async function create(data) {
  try {
    //construct query string by name of columns
    //use two placeholders and return the result with alias
    const text = `INSERT INTO comments (post_id, content)
                VALUES ($1, $2)
                RETURNING
                  id,
                  post_id,
                  content,
                  created_at AS "createdAt"`;
    //values array to include values
    const values = [data.postId, data.content];
    //get the result
    const result = await pool.query(text, values);
    //return one row at most
    return result.rows[0];
  } catch (error) {
    //throws new error with status 400
    if (error.code === '23503') {
      const error = new Error(
        `Cannot create comment: referenced post with id ${data.postId} does not exist`,
      );
      error.status = 400;
      throw error;
    } else {
      //rethrow original error
      throw error;
    }
  }
}

export async function update(id, updatedData) {
  //update query string
  //use three placeholders
  //return the first not null value in argument list
  //if updatedData.postId is not null, then return the updatedData.postId
  //if null, keep current postId, same as content
  const text = `UPDATE comments
                  SET
                    post_id = COALESCE($1, post_id),
                    content = COALESCE($2, content)
                  WHERE
                    id = $3
                    RETURNING
                      id,
                      post_id,
                      content,
                      created_at AS "createdAt"`;
  //values array
  const values = [updatedData.postId, updatedData.content, id];
  //get the result
  const result = await pool.query(text, values);
  //return first row of updated post. if not exist, undefined
  return result.rows[0];
}

export async function remove(id) {
  //delete query string
  const text = `DELETE FROM comments WHERE id = $1`;
  //values array
  const values = [id];
  //get the result
  const result = await pool.query(text, values);
  //check result count to see how many rows are affected
  //if posts matching id is found, it is true
  result.rows[0];
}
