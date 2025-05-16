//import clientPromise from '../../../lib/mongodb';

//export default async function handler(req, res) {
  //if (req.method !== 'POST') {
    //return res.status(405).json({ error: 'Méthode non autorisée' });
  //}

  //try {
  //  const client = await clientPromise;
  //  const db = client.db();
    //await db.collection('items').deleteMany({});
  //  res.status(200).json({ message: 'Tous les items ont été supprimés.' });
  //} catch (error) {
    //res.status(500).json({ error: 'Erreur serveur' });
//  }
//}