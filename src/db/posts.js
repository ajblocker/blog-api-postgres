export const posts = [
  {
    id: 1,
    title: 'My First Blog',
    content: 'This is my first blog post.',
    createdAt: '2026-01-01T09:00:00.000Z',
  },
  {
    id: 2,
    title: 'Learning NodeJS',
    content: 'NodeJS is a powerful backend runtime.',
    createdAt: '2026-01-02T10:30:00.000Z',
  },
  {
    id: 3,
    title: 'Express Tutorial',
    content: 'Express makes building APIs easy and fast.',
    createdAt: '2026-01-03T14:15:00.000Z',
  },
  {
    id: 4,
    title: 'REST API Best Practices',
    content: 'Learn how to structure REST APIs efficiently.',
    createdAt: '2026-01-04T08:45:00.000Z',
  },
  {
    id: 5,
    title: 'JavaScript Tips',
    content: 'Some handy JavaScript tricks for everyday coding.',
    createdAt: '2026-01-05T16:20:00.000Z',
  },
  {
    id: 6,
    title: 'Async/Await Deep Dive',
    content: 'Understanding asynchronous programming in JS.',
    createdAt: '2026-01-06T11:00:00.000Z',
  },
  {
    id: 7,
    title: 'Testing with Postman',
    content: 'Postman helps you test your API endpoints easily.',
    createdAt: '2026-01-07T09:30:00.000Z',
  },
  {
    id: 8,
    title: 'Handling Errors in Express',
    content: 'Learn to use centralized error handlers effectively.',
    createdAt: '2026-01-08T15:45:00.000Z',
  },
  {
    id: 9,
    title: 'Filtering and Sorting',
    content: 'Techniques for filtering and sorting API responses.',
    createdAt: '2026-01-09T13:10:00.000Z',
  },
  {
    id: 10,
    title: 'Pagination Tips',
    content: 'Implementing efficient pagination in your APIs.',
    createdAt: '2026-01-10T12:00:00.000Z',
  },
];
let nextId = posts.length;

export function getNextId() {
  nextId++;
  return nextId;
}

export function resetDb() {
  posts.length = 0;
  nextId = posts.length;
}
