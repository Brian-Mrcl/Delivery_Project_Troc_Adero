import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const itemTagsMap = {
  Books: ['Sci-fi', 'Romance', 'Fantasy', 'Mystery', 'Slice of Life'],
  CDs: ['Rock', 'Jazz', 'Pop', 'Classical'],
  Figurines: ['Anime', 'Marvel', 'Star Wars', 'Game Characters']
};

export default function Preferences() {
  const [selectedItems, setSelectedItems] = useState('');
  const [selectedTags, setSelectedTags] = useState({});
  const [itemSearch, setItemSearch] = useState('');
  const [tagSearch, setTagSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    const savedItem = localStorage.getItem('preferredItem') || '';
    const savedTags = JSON.parse(localStorage.getItem('preferredTagsMap') || '{}');
    setSelectedItems(savedItem);
    setSelectedTags(savedTags);
  }, []);

  useEffect(() => {
    localStorage.setItem('preferredItem', selectedItems);
    localStorage.setItem('preferredTagsMap', JSON.stringify(selectedTags));
  }, [selectedItems, selectedTags]);

  const handleItemClick = (item) => {
    setSelectedItems(item);
    setTagSearch('');
  };

  const handleTagClick = (tag) => {
    setSelectedTags(prev => {
      const currentTags = prev[selectedItems] || [];
      const updatedTags = currentTags.includes(tag)
        ? currentTags.filter(t => t !== tag)
        : [...currentTags, tag];
      return { ...prev, [selectedItems]: updatedTags };
    });
  };

  const filteredItems = itemSearch
    ? Object.keys(itemTagsMap).filter(item =>
        item.toLowerCase().includes(itemSearch.toLowerCase())
      )
    : [];

  const tagsForItem = selectedItems ? itemTagsMap[selectedItems] || [] : [];
  const filteredTags = tagSearch
    ? tagsForItem.filter(tag =>
        tag.toLowerCase().includes(tagSearch.toLowerCase())
      )
    : [];

  const activeTags = selectedTags[selectedItems] || [];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      minHeight: '100vh',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f9f9f9'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>
        My Preferences
      </h1>

      <button
        onClick={() => router.push('/account')}
        style={{
          marginBottom: '2rem',
          backgroundColor: '#333',
          color: 'white',
          padding: '0.6rem 1.2rem',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Back to Account
      </button>

      {/* Search and Select Items */}
      <div style={{
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '600px',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <h2>1. Search & Choose an Item Type</h2>
        <input
          type="text"
          placeholder="Search items..."
          value={itemSearch}
          onChange={e => setItemSearch(e.target.value)}
          style={{
            padding: '0.5rem',
            marginTop: '1rem',
            marginBottom: '1rem',
            width: '80%',
            maxWidth: '300px',
            borderRadius: '5px',
            border: '1px solid #ccc'
          }}
        />
        {filteredItems.length > 0 && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'center'
          }}>
            {filteredItems.map(item => (
              <button
                key={item}
                onClick={() => handleItemClick(item)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: selectedItems === item ? '#0cb8b1' : '#ccc',
                  border: 'none',
                  borderRadius: '5px',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Search and Select Tags */}
      {selectedItems && (
        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '600px',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <h2>2. Search & Choose Tags for "{selectedItems}"</h2>
          <input
            type="text"
            placeholder="Search tags..."
            value={tagSearch}
            onChange={e => setTagSearch(e.target.value)}
            style={{
              padding: '0.5rem',
              marginTop: '1rem',
              marginBottom: '1rem',
              width: '80%',
              maxWidth: '300px',
              borderRadius: '5px',
              border: '1px solid #ccc'
            }}
          />
          {filteredTags.length > 0 && (
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              justifyContent: 'center'
            }}>
              {filteredTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  style={{
                    padding: '0.4rem 0.8rem',
                    backgroundColor: activeTags.includes(tag) ? '#2196f3' : '#eee',
                    border: 'none',
                    borderRadius: '5px',
                    color: activeTags.includes(tag) ? 'white' : '#333',
                    cursor: 'pointer'
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Summary */}
      <div style={{
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '600px',
        textAlign: 'center'
        }}>
        <h2>3. Summary</h2>
        {Object.entries(selectedTags)
            .filter(([_, tags]) => tags.length > 0)
            .map(([item, tags]) => (
            <p key={item}>
                <strong>{item}:</strong> {tags.join(', ')}
            </p>
        ))}
        {Object.values(selectedTags).every(tags => tags.length === 0) && (
            <p>No preferences selected yet.</p>
        )}
        </div>
    </div>
  );
}
