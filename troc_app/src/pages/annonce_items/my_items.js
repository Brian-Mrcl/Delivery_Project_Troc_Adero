import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/Myitems.module.css";

export default function MyItemsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch(`/api/items?email=${session?.user?.email}`);
      const data = await res.json();
      setItems(data);
    };
    if (session) fetchItems();
  }, [session]);

  if (status === "loading") return <p>Chargement...</p>;

  if (!session) {
    return (
      <div className={styles.authRequired}>
        <h2 className={styles.authTitle}>Tu dois être connecté pour accéder à tes annonces</h2>
        <button className={styles.authButton} onClick={() => router.push("/auth/signin")}>
          Se connecter
        </button>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>📦 Mes annonces</h1>
      <p>Bienvenue <strong>{session.user.name}</strong></p>

      <div className={styles.actions}>
        <button className={styles.actionButton} onClick={() => router.push("/annonce_items/new")}>
          ➕ Ajouter une annonce
        </button>
      </div>

      <div className={styles.grid}>
        {items.length === 0 ? (
          <p>Aucune annonce pour le moment.</p>
        ) : (
          items.map((item) => (
            <div className={styles.card} key={item._id}>
              <img src={item.image} alt={item.title} className={styles.image} />
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
    
  );
}
