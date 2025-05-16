import { useState, useEffect } from 'react';

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [genre, setGenre] = useState('');

  // Fetch items from API
  useEffect(() => {
    fetch('/api/getItems')
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !type || !genre) return;
    await fetch('/api/addItem', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, type, genre }),
    });
    setTitle('');
    setType('');
    setGenre('');
    // Refresh items
    fetch('/api/getItems')
      .then(res => res.json())
      .then(data => setItems(data));
  };

  return (
    <div>
      <h1>Items</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
        />
        <input
          value={type}
          onChange={e => setType(e.target.value)}
          placeholder="Type"
        />
        <input
          value={genre}
          onChange={e => setGenre(e.target.value)}
          placeholder="Genre"
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            <strong>{item.title}</strong> — {item.type} — {item.genre}
          </li>
        ))}
      </ul>
    </div>
  );
}