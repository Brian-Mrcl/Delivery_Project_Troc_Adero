import { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Register.module.css";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  // Ajoute ces lignes dans ton composant RegisterPage
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");


  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name, city, description }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Compte créé ! Redirection...");
      setTimeout(() => router.push("/auth/signin"), 1500);
    } else {
      setMessage(data.message || "Erreur inconnue");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Créer un compte</h2>
            <form onSubmit={handleRegister} className={styles.form}>
                <input
                    type="email"
                    placeholder="Adresse email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                    required
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                    required
                />
                <input
                    type="text"
                    placeholder="Nom complet"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    placeholder="À propos de moi"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={styles.textarea}
                />

                <button type="submit" className={styles.button}>S’inscrire</button>
                {message && <p className={styles.message}>{message}</p>}
            </form>
      </div>
    </div>
  );
}
