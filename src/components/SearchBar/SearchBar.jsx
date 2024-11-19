import { useState } from 'react';

export default function SearchBar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!query.trim()) {
      return alert('Please enter a value!');
    }
    onSubmit(query); // Передаємо значення у батьківський компонент
    setQuery(''); // Очищуємо поле вводу
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        placeholder="Search movies..."
        onChange={handleChange}
        autoFocus
      />
      <button type="submit">Search</button>
    </form>
  );
}
