import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    const client = await clientPromise;
    const db = client.db(); // nom de la base depuis ton URI
    const collection = db.collection('items'); // nom de ta collection

    const data = req.body;

    // Vérifie que les champs attendus sont présents
    if (!data.name || !data.description) {
      return res.status(400).json({ error: 'Champs manquants' });
    }

    const result = await collection.insertOne(data);

    res.status(201).json({ message: 'Objet ajouté !', id: result.insertedId });
  } catch (error) {
    console.error('Erreur ajout MongoDB:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}
