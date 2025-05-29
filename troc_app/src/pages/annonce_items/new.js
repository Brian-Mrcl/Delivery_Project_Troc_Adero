import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "@/styles/New.module.css";

export default function NewItemPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setImage("");
      setFile(null);
    }
  };

  const handleUrlChange = (e) => {
    setImage(e.target.value);
    setFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: session.user.email,
        title,
        description,
        image,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Annonce ajoutée !");
      setTimeout(() => router.push("/annonce_items/my_items"), 1500);
    } else {
      setMessage(data.message || "Erreur");
    }
  };

  if (status === "loading") return <p>Chargement...</p>;
  if (!session) return <p>Non autorisé</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Ajouter une nouvelle annonce</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Titre de l'article"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
          required
        />
        <textarea
          placeholder="Description de l'article"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.textarea}
          required
        />
        <div style={{ marginBottom: 12 }}>
          <label>
            Image URL&nbsp;
            <input
              type="text"
              placeholder="Lien de l'image (URL)"
              value={file ? "" : image}
              onChange={handleUrlChange}
              className={styles.input}
              disabled={!!file}
            />
          </label>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>
            Ou choisir une image&nbsp;
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={!!image && !file}
            />
          </label>
        </div>
        {image && (
          <div style={{ marginBottom: 12 }}>
            <img
              src={image}
              alt="Aperçu"
              style={{ maxWidth: 200, maxHeight: 200, borderRadius: 8 }}
            />
          </div>
        )}
        <button type="submit" className={styles.submitButton}>
          Ajouter
        </button>
        {message && <p className={styles.message}>{message}</p>}
      </form>
    </div>
  );
}