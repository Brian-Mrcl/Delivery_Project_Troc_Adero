import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const { title, type, genre } = req.body;

    if (!title || !type || !genre) {
      return res.status(400).json({ error: 'Tous les champs sont requis' });
    }

    const result = await db.collection('items').insertOne({ title, type, genre });
    res.status(201).json({ message: 'Item ajouté', id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
}