import { useState } from 'react';
import Link from 'next/link';
import styles from './navbar.module.css';
import { useRouter } from 'next/router';


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const handleExchange = () => {
    setIsOpen(false); // Ferme le menu
    router.push('/'); // Redirige vers la page d'accueil
  };

  return (
    
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src="/logo.png" alt="Troc'Adero Logo" className={styles.logoImg} />
        <span className={styles.logoText}>Troc'Adero</span>
      </div>

      <button 
        className={styles.menuButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      <div className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
        <Link href="/product">Product</Link>
        <Link href="/about">About us</Link>
        <Link href="/Account">Account</Link>
        <Link href="/annonce_items/my_items">My Collection</Link>
        <Link href="/social">Our Social Medias</Link>
        <Link href="/community">Community</Link>
        <Link href="/messages">Messagerie</Link>
        <Link href="/">Echanger maintenant</Link>
      </div>
    </nav>
  );
}