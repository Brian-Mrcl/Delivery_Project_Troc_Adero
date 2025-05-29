import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "@/styles/Edit.module.css"; 

export default function EditProfile() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (session) {
      const fetchData = async () => {
        const res = await fetch(`/api/user?email=${session.user.email}`);
        const data = await res.json();
        setName(data.name || "");
        setCity(data.city || "");
        setDescription(data.description || "");
      };
      fetchData();
    }
  }, [session]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/user", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: session.user.email,
        name,
        city,
        description,
      }),
    });

    const data = await res.json();
    setMessage(data.message);
    if (res.ok) router.push("/Account");
  };

  if (status === "loading") return <p>Chargement...</p>;
  if (!session) return <p>Non autorisé</p>;

  return (
    <div className={styles.container}>
        <h2 className={styles.title}>Modifier mon profil</h2>
        <form onSubmit={handleUpdate} className={styles.form}>
        <input
            type="text"
            placeholder="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={styles.input}
        />
        <input
            type="text"
            placeholder="Ville"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={styles.input}
        />
        <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.textarea}
        />
        <button type="submit" className={styles.button}>Enregistrer</button>
        </form>
        {message && <p className={styles.message}>{message}</p>}
    </div>
);

}
