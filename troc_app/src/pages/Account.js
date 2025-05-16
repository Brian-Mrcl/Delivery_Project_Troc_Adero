import styles from '../styles/Account.module.css';

export default function Account() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <img
          className={styles.avatar}
          src="https://i.pravatar.cc/150?img=12"

          alt="Photo de profil"
        />
        <h1 className={styles.name}>Test Profil</h1>
        <p className={styles.subtitle}>Zone : 15 km autour de Marseille</p>

        <div className={styles.buttons}>
          <button>📦 Voir mes annonces</button>
          <button>⚙️ Modifier mon profil</button>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>À propos de moi</h2>
          <p>
            Passionné de cinéma et de lecture vintage. J’échange des films des années 70 et des romans de science-fiction. J’aime le troc en main propre pour rencontrer des passionnés !
          </p>
        </div>

        <div className={styles.card}>
          <h2>Préférences culturelles</h2>
          <ul>
            <li>📚 Genre préféré : Science-fiction</li>
            <li>📀 Musique : Rock / Jazz</li>
            <li>🎬 Cinéma : Tarantino, Kubrick</li>
          </ul>
        </div>

        <div className={styles.card}>
          <h2>Mes derniers échanges</h2>
          <ul>
            <li>✅ CD “Kind of Blue” échangé avec Sophie</li>
            <li>✅ Livre “Dune” échangé avec Marc</li>
            <li>✅ DVD “Pulp Fiction” échangé avec Claire</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
