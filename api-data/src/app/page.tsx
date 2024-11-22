'use client';

import { useEffect, useState } from 'react';

type Book = {
  id: number;
  title: string;
  author: string;
};

export default function Page() {
  const [books, setBooks] = useState<Book[]>([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [idToUpdate, setIdToUpdate] = useState<number | null>(null);

  // Fetch books
  const fetchBooks = async () => {
    const res = await fetch('/api/books');
    const data: Book[] = await res.json();
    setBooks(data);
  };

  // Add a new book
  const addBook = async () => {
    await fetch('/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, author }),
    });
    setTitle('');
    setAuthor('');
    fetchBooks();
  };

  // Update a book
  const updateBook = async () => {
    if (idToUpdate === null) return; // Prevent updates if no id is selected

    await fetch('/api/books', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: idToUpdate, title, author }),
    });
    setTitle('');
    setAuthor('');
    setIdToUpdate(null);
    fetchBooks();
  };

  // Delete a book
  const deleteBook = async (id: number) => {
    await fetch('/api/books', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchBooks();
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Book Management</h1>

      <div className="max-w-2xl mx-auto bg-white p-6 rounded-md shadow-md">
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 p-2 rounded-md"
          />
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border border-gray-300 p-2 rounded-md"
          />
          <button
            onClick={idToUpdate ? updateBook : addBook}
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            {idToUpdate ? 'Update Book' : 'Add Book'}
          </button>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Books</h2>
          <ul>
            {books.map((book) => (
              <li
                key={book.id}
                className="flex justify-between items-center bg-gray-100 p-2 mb-2 rounded-md"
              >
                <div>
                  <p className="font-medium">{book.title}</p>
                  <p className="text-sm text-gray-500">{book.author}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setIdToUpdate(book.id);
                      setTitle(book.title);
                      setAuthor(book.author);
                    }}
                    className="bg-yellow-500 text-white py-1 px-3 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteBook(book.id)}
                    className="bg-red-500 text-white py-1 px-3 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
