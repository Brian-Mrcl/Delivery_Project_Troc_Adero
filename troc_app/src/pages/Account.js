import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "@/styles/Account.module.css";

export default function Account() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [userData, setUserData] = useState({ name: "", city: "", description: "" });

  useEffect(() => {
    if (session) {
      const fetchUserData = async () => {
        const res = await fetch(`/api/user?email=${session.user.email}`);
        const data = await res.json();
        setUserData(data);
      };
      fetchUserData();
    }
  }, [session]);

  if (status === "loading") return <p>Chargement...</p>;

  if (!session) {
    return (
      <div className={styles.authRequired}>
        <h2>Tu dois être connecté pour voir ton compte</h2>
        <div className={styles.authButtons}>
          <button onClick={() => signIn()}>Se connecter</button>
          <button onClick={() => router.push("/auth/register")}>Créer un compte</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <img
          className={styles.avatar}
          src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
          alt="Photo de profil"
        />
        <h1 className={styles.name}>{userData.name || session.user.email}</h1>
        <p className={styles.subtitle}>Zone : {userData.city || "15 km autour de Marseille"}</p>

        <div className={styles.buttons}>
          <button>📦 Voir mes annonces</button>
          <button onClick={() => router.push("/edit")}>⚙️ Modifier mon profil</button>
          <button onClick={() => signOut({ callbackUrl: "/" })}>🚪 Se déconnecter</button>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>À propos de moi</h2>
          <p>{userData.description || "Aucune description renseignée."}</p>
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
        <button
          className={styles.backButton}
          onClick={() => router.push("/")}
        >
          ⬅️ Retour au menu
        </button>
    </div>
  );
}
