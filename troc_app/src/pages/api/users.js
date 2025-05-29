import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db();
  // On récupère tous les utilisateurs (nom + email)
  const users = await db.collection("users").find({}, { projection: { name: 1, email: 1, _id: 0 } }).toArray();
  res.status(200).json(users);
}