import { NextResponse } from 'next/server';

let books = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
  { id: 2, title: '1984', author: 'George Orwell' },
  { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
];

// GET: Fetch all books
export async function GET() {
  return NextResponse.json(books);
}

// POST: Add a new book
export async function POST(request: Request) {
  const newBook = await request.json();
  books.push({ ...newBook, id: books.length + 1 });
  return NextResponse.json({ message: 'Book added successfully', books });
}

// PUT: Update a book
export async function PUT(request: Request) {
  const { id, title, author } = await request.json();
  const index = books.findIndex((book) => book.id === id);

  if (index === -1) {
    return NextResponse.json({ message: 'Book not found' }, { status: 404 });
  }

  books[index] = { id, title, author };
  return NextResponse.json({ message: 'Book updated successfully', books });
}

// DELETE: Remove a book
export async function DELETE(request: Request) {
  const { id } = await request.json();
  books = books.filter((book) => book.id !== id);
  return NextResponse.json({ message: 'Book deleted successfully', books });
}