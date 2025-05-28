import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import styles from '../styles/itempage.module.css';
import Link from 'next/link';

const ItemForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    genre: '',
    description: '',
    condition: 'excellent',
    category: 'books',
    location: '',
    images: []
  });

  const categories = [
    { value: 'books', label: '📚 Livres & Romans', icon: '📚' },
    { value: 'dvd', label: '🎬 DVD & Films', icon: '🎬' },
    { value: 'music', label: '🎵 Musique & Vinyles', icon: '🎵' },
    { value: 'other', label: '🌍 Autres', icon: '🌍' }
  ];

  const conditions = [
    { value: 'excellent', label: 'Excellent état' },
    { value: 'good', label: 'Bon état' },
    { value: 'fair', label: 'État correct' },
    { value: 'poor', label: 'État passable' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/addItem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('✅ Objet ajouté avec succès!');
        setFormData({
          title: '',
          type: '',
          genre: '',
          description: '',
          condition: 'excellent',
          category: 'books',
          location: '',
          images: []
        });
      } else {
        setMessage('❌ Erreur lors de l\'ajout de l\'objet');
      }
    } catch (error) {
      setMessage('❌ Erreur de connexion');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    
    <div className={styles.page}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <img src="/logo.svg" alt="Troc'Adero Logo" className={styles.logoImg} />
          <span className={styles.logoText}>Troc'Adero</span>
        </div>
        <div className={styles.navLinks}>
          <Link href="/product">Product</Link>
          <Link href="/about">About us</Link>
          <Link href="/account">Account</Link>
          <Link href="/collection">My Collection</Link>
          <Link href="/social">Our Social Medias</Link>
          <Link href="/community">Community</Link>
          <Link href="/messages">Messagerie</Link>
          <button className={styles.cta}>Échanger maintenant</button>
        </div>
      </nav>
    
      
    <div>
      <div className={styles.header}>
      <h1 className={styles.title}>Troc'Adero</h1>
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Ajouter un objet</h2>
        <p className="text-gray-600">Partagez vos trésors culturels avec la communauté</p>
      </div>
      </div>
      

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Category Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Catégorie
          </label>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((cat) => (
              <label key={cat.value} className="cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value={cat.value}
                  checked={formData.category === cat.value}
                  onChange={handleInputChange}
                  className={styles.card}
                />
                <div className={`p-4 rounded-lg border-2 text-center transition-all ${
                  formData.category === cat.value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <div className="text-2xl mb-1">{cat.icon}</div>
                  <div className="text-sm font-medium">{cat.label.replace(/^[^\s]+ /, '')}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Titre *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className={styles.searchBar}
            placeholder="Ex: Harry Potter à l'école des sorciers"
          />
        </div>

        {/* Type and Genre Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
              Type
            </label>
            <input
              type="text"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className={styles.searchBar}
              placeholder="Ex: Roman, Film, Album"
            />
          </div>
          <div>
            <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-2">
              Genre
            </label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleInputChange}
              className={styles.searchBar}
              placeholder="Ex: Fantastique, Comédie, Rock"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className={styles.searchBar}
            placeholder="Décrivez votre objet, son état, ce qui vous a plu..."
          />
        </div>

        {/* Condition and Location Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-2">
              État
            </label>
            <select
              id="condition"
              name="condition"
              value={formData.condition}
              onChange={handleInputChange}
              className={styles.searchBar}
            >
              {conditions.map((cond) => (
                <option key={cond.value} value={cond.value}>
                  {cond.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Localisation
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className={styles.searchBar}
              placeholder="Ex: Paris 15e, Lyon"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.searchBar}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Ajout en cours...
              </>
            ) : (
              <>
                <PlusCircle size={20} />
                Ajouter l'objet
              </>
            )}
          </button>
        </div>

        {/* Success/Error Message */}
        {message && (
          <div className={`p-4 rounded-lg text-center font-medium ${
            message.includes('✅') 
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message}
          </div>
        )}
      </form>
    </div>
    <footer className={styles.footer}>
        <p>&copy; 2025 Troc'Adero — Échangeons avec sens</p>
      </footer>
    </div>
  );
};

export default ItemForm;