import clientPromise from '../../../lib/mongodb'; // adapte selon ton import MongoDB
require('dotenv').config();

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db(); // ou donne le nom de ta DB: client.db('nom_db')
    const items = await db.collection('items').find({}).toArray();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
}