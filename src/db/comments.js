export const comments = [
  {
    id: 1,
    postId: 1,
    content: 'This is a new comment.',
    createdAt: '2026-01-02T10:30:00.000Z',
  },
  {
    id: 2,
    postId: 1,
    content: 'Another comment',
    createdAt: '2026-01-04T14:00:00.000Z',
  },
  {
    id: 3,
    postId: 2,
    content: 'Interesting perspective.',
    createdAt: '2026-01-03T20:00:00.000Z',
  },
];
let nextId = comments.length;

export function getNextId() {
  nextId++;
  return nextId;
}

export function resetDb() {
  comments.length = 0;
  nextId = comments.length;
}
