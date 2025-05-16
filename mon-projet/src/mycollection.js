import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

const stateColors = ["#ea580c", "#f59e0b", "#84cc16", "#22c55e", "#166534"];
const stateLabels = ["Mauvais", "Correct", "Bon", "Très bon", "Neuf"];

const genresFilms = ["Action", "Animation", "Aventure", "Biographie", "Comédie", "Documentaire", "Drame", "Fantastique", "Historique", "Horreur", "Musical", "Policier", "Romance", "Science-fiction", "Thriller", "Western", "Autre"].sort();
const genresLivres = ["Autobiographie", "Aventure", "Biographie", "Classique", "Conte", "Drame", "Essai", "Fantastique", "Historique", "Horreur", "Jeunesse", "Philosophie", "Poésie", "Policier", "Romance", "Science-fiction", "Théâtre", "Autre"].sort();
const genresMusique = ["Blues", "Classique", "Country", "Disco", "Électro", "Folk", "Funk", "Hip-hop", "Jazz", "Métal", "Pop", "Rap", "Reggae", "Rock", "Soul", "Techno", "Variété", "Autre"].sort();

export default function MyCollection() {
  const [articles, setArticles] = useState([]);
  const [form, setForm] = useState({ title: "", desc: "", type: "", image: null });
  const [selectedState, setSelectedState] = useState(0);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [specificFields, setSpecificFields] = useState([]);

  useEffect(() => {
    if (form.type === "Livre") {
      setSpecificFields([
        { id: "author", placeholder: "Auteur" },
        { id: "date", placeholder: "Date de publication" },
        { genres: genresLivres },
      ]);
    } else if (form.type === "DVD") {
      setSpecificFields([
        { id: "director", placeholder: "Réalisateur" },
        { id: "date", placeholder: "Date de sortie" },
        { genres: genresFilms },
      ]);
    } else if (form.type === "CD" || form.type === "Vinyle") {
      setSpecificFields([
        { id: "artist", placeholder: "Artiste" },
        { genres: genresMusique },
      ]);
    } else {
      setSpecificFields([]);
    }
  }, [form.type]);

  const toggleGenre = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleAddArticle = () => {
    if (!form.title || !form.desc || !form.type || selectedState === 0) {
      alert("Merci de remplir tous les champs obligatoires.");
      return;
    }

    const article = {
      ...form,
      genres: selectedGenres,
      state: selectedState,
    };

    const updated = [...articles];
    if (editIndex !== null) {
      updated[editIndex] = article;
    } else {
      updated.push(article);
    }
    setArticles(updated);
    resetForm();
  };

  const resetForm = () => {
    setForm({ title: "", desc: "", type: "", image: null });
    setSelectedGenres([]);
    setSelectedState(0);
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    const a = articles[index];
    setForm(a);
    setSelectedState(a.state);
    setSelectedGenres(a.genres || []);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    if (confirm("Supprimer cet article ?")) {
      setArticles(articles.filter((_, i) => i !== index));
    }
  };

  return (
    <>
      <Head>
        <title>Troc'Adero - Proposer un objet</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>

      <body className="bg-gray-100 text-gray-800">
        <header className="bg-yellow-500 text-white text-center py-6 shadow-md">
          <h1 className="text-4xl font-bold tracking-wide">Troc'Adero</h1>
          <p className="text-lg">Plateforme d'échange culturel local</p>
        </header>

        <nav className="bg-white shadow flex justify-center space-x-6 py-4">
          <Link href="/" className="text-gray-700 font-semibold hover:text-yellow-500">Accueil</Link>
          <Link href="/espace" className="text-gray-700 font-semibold hover:text-yellow-500">Mes échanges</Link>
          <Link href="/mycollection" className="text-gray-700 font-semibold hover:text-yellow-500">Proposer un objet</Link>
          <Link href="#" className="text-gray-700 font-semibold hover:text-yellow-500">Recherche</Link>
          <a href="/mail.html" className="text-gray-700 font-semibold hover:text-yellow-500">Mail</a>
        </nav>

        <main className="max-w-5xl mx-auto p-6">
          <h2 className="text-2xl font-semibold mb-4">Ajouter ou modifier un article</h2>

          <div className="bg-white p-6 rounded-xl shadow space-y-4">
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Titre de l'article"
              className="block w-full p-3 border rounded-lg shadow-sm"
            />

            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="block w-full p-3 border rounded-lg shadow-sm"
            >
              <option value="">Type d'article</option>
              <option value="Vinyle">Vinyle</option>
              <option value="DVD">DVD</option>
              <option value="CD">CD</option>
              <option value="Livre">Livre</option>
              <option value="Magazine">Magazine</option>
              <option value="Jeu de société">Jeu de société</option>
              <option value="Partition musicale">Partition musicale</option>
              <option value="Autre">Autre</option>
            </select>

            <textarea
              value={form.desc}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
              placeholder="Description"
              className="block w-full p-3 border rounded-lg shadow-sm"
            />

            {specificFields.map((field, idx) =>
              field.genres ? (
                <div key={idx}>
                  <label className="block mb-1 font-medium">Genres</label>
                  <div className="flex flex-wrap gap-2">
                    {field.genres.map((g) => (
                      <button
                        key={g}
                        type="button"
                        className={`px-2 py-1 border rounded ${
                          selectedGenres.includes(g) ? "bg-blue-500 text-white" : ""
                        }`}
                        onClick={() => toggleGenre(g)}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <input
                  key={field.id}
                  type="text"
                  placeholder={field.placeholder}
                  className="block w-full p-2 border rounded"
                  value={form[field.id] || ""}
                  onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                />
              )
            )}

            <div>
              <label className="block mb-1 font-medium">Photo</label>
              <input type="file" onChange={handleImageChange} className="block w-full" />
            </div>

            <div>
              <label className="block mb-1 font-medium">État :</label>
              <div className="flex items-center space-x-2">
                {stateColors.map((color, i) => (
                  <span
                    key={i}
                    className={`w-5 h-5 rounded-full cursor-pointer ${
                      i < selectedState ? "border border-black" : "opacity-50"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedState(i + 1)}
                  ></span>
                ))}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                <span style={{ color: "#ea580c" }}>●</span> Mauvais,
                <span style={{ color: "#f59e0b" }}>●</span> Correct,
                <span style={{ color: "#84cc16" }}>●</span> Bon,
                <span style={{ color: "#22c55e" }}>●</span> Très bon,
                <span style={{ color: "#166534" }}>●</span> Neuf
              </div>
            </div>

            <button
              onClick={handleAddArticle}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow"
            >
              Valider
            </button>
          </div>

          {/* Articles listés */}
          <h2 className="text-2xl font-semibold mt-10">Mes articles en ligne</h2>
          <div className="space-y-4 mt-4">
            {articles.map((article, index) => (
              <div key={index} className="bg-white p-4 rounded-xl shadow">
                {article.image && (
                  <img
                    src={article.image}
                    alt="Article"
                    className="w-32 h-32 object-cover rounded mb-2"
                  />
                )}
                <p className="text-sm italic text-gray-700 mb-1">Type : {article.type}</p>
                <h3 className="text-xl font-bold">{article.title}</h3>
                <p className="text-sm text-gray-600 mb-1">{article.description}</p>
                {article.author && <p className="text-sm">Auteur : {article.author}</p>}
                {article.director && <p className="text-sm">Réalisateur : {article.director}</p>}
                {article.artist && <p className="text-sm">Artiste : {article.artist}</p>}
                {article.date && <p className="text-sm">Date : {article.date}</p>}
                {article.genres?.length > 0 && (
                  <p className="text-sm">Genres : {article.genres.join(", ")}</p>
                )}
                <p className="text-sm">
                  État :
                  <span
                    className="inline-block w-3 h-3 rounded-full ml-1"
                    style={{ backgroundColor: stateColors[article.state - 1] }}
                  ></span>{" "}
                  {stateLabels[article.state - 1]}
                </p>
                <div className="mt-2 space-x-3">
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-blue-600 underline"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-600 underline"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>

        <footer className="text-center py-4 bg-yellow-500 text-white mt-10">
          &copy; 2025 Troc'Adero - Tous droits réservés
        </footer>
      </body>
    </>
  );
}
