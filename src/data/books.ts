export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  description: string;
  coverImage: string;
  rating: number;
  publishedYear: number;
  available: boolean;
  pricePerDay: number;
  issueDate?: string;
  nextAvailableDate?: string;
}

const genres = ["Fiction", "Science Fiction", "Mystery", "Biography", "History", "Fantasy", "Self-Help", "Philosophy", "Thriller", "Poetry"];
const authors = ["J.K. Rowling", "George Orwell", "Agatha Christie", "Stephen King", "Haruki Murakami", "Jane Austen", "Ernest Hemingway", "Toni Morrison", "Gabriel García Márquez", "Virginia Woolf"];

export const books: Book[] = Array.from({ length: 500 }).map((_, i) => {
  const available = Math.random() > 0.3;
  const issueDate = !available ? new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : undefined;
  const nextAvailableDate = !available ? new Date(Date.now() + Math.random() * 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : undefined;

  return {
    id: `book-${i + 1}`,
    title: `The ${["Lost", "Hidden", "Silent", "Last", "Golden", "Midnight", "Forgotten", "Ancient", "Modern", "Eternal"][i % 10]} ${["Secret", "Journey", "Shadow", "Chronicle", "Legacy", "Whisper", "Echo", "Path", "Flame", "Star"][Math.floor(i / 10) % 10]} Vol. ${Math.floor(i / 20) + 1}`,
    author: authors[i % authors.length],
    genre: genres[Math.floor(i / 16) % genres.length],
    description: `A compelling story about ${["a mysterious traveler", "a forgotten kingdom", "the future of humanity", "a small town secret", "the power of friendship", "an ancient prophecy", "a world beyond our own", "the search for truth", "a daring escape", "the beauty of life"][i % 10]}. This book explores deep themes and takes the reader on an unforgettable journey through time and space.`,
    coverImage: `https://picsum.photos/seed/book-${i + 1}/400/600`,
    rating: Number((3.5 + Math.random() * 1.5).toFixed(1)),
    publishedYear: 1950 + (i % 75),
    available,
    pricePerDay: Math.floor(5 + Math.random() * 11),
    issueDate,
    nextAvailableDate,
  };
});
