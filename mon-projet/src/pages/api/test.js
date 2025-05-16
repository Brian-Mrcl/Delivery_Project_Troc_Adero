import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db(); // utilise le nom par défaut de la DB dans l'URI
    const collections = await db.collections(); // récupère les collections existantes

    res.status(200).json({
      message: "Connexion MongoDB réussie ✅",
      collections: collections.map((c) => c.collectionName),
    });
  } catch (error) {
    console.error("Erreur de connexion MongoDB ❌", error);
    res.status(500).json({ error: 'Erreur de connexion à MongoDB' });
  }
}
