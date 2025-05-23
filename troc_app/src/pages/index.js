import styles from '../styles/Home.module.css';
import Link from 'next/link';

export default function Home() {
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

      <header className={styles.header}>
        <h1 className={styles.title}>Troc'Adero</h1>
        <p className={styles.subtitle}>Échange culturel local, simple et humain</p>
        <input
          type="text"
          placeholder="Rechercher un article, un genre, un utilisateur..."
          className={styles.searchBar}
        />
      </header>

      <main className={styles.grid}>
        <div className={styles.card}>
          <h2>🎬 DVD & Films</h2>
          <p>Explorez notre sélection de films vintage, classiques et de réalisateurs cultes.</p>
          <Link href="/categories/films" className={styles.link}>Voir les annonces →</Link>
        </div>

        <div className={styles.card}>
          <h2>📚 Livres & Romans</h2>
          <p>De la science-fiction aux grands classiques, échangez vos livres préférés.</p>
          <Link href="/categories/livres" className={styles.link}>Explorer →</Link>
        </div>

        <div className={styles.card}>
          <h2>📀 Musique & Vinyles</h2>
          <p>Faites tourner la musique avec des vinyles, CDs et cassettes vintage.</p>
          <Link href="/categories/musique" className={styles.link}>Découvrir →</Link>
        </div>

        <div className={styles.card}>
          <h2>🌍 Échange local</h2>
          <p>Favorisez les échanges en main propre dans votre région.</p>
          <Link href="/map" className={styles.link}>Voir la carte →</Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2025 Troc'Adero — Échangeons avec sens</p>
      </footer>
    </div>
  );
}

