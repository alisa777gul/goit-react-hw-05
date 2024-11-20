import { useState } from 'react';
import css from './SearchBar.module.css';

export default function SearchBar({ onSubmit }) {
  const [input, setInput] = useState('');

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!input.trim()) return alert('Please enter a value!');
    onSubmit(input);
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <input
        className={css.input}
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Search movies..."
        autoFocus
      />
      <button type="submit" className={css.button}>
        Search
      </button>
    </form>
  );
}
