import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("ClusterProject");
  const users = db.collection("users");

  if (req.method === "GET") {
    const { email } = req.query;
    const user = await users.findOne({ email });
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    const { name, city, description } = user;
    return res.status(200).json({ name, city, description });
  }

  if (req.method === "PUT") {
    const { email, name, city, description } = req.body;

    await users.updateOne(
      { email },
      { $set: { name, city, description } }
    );

    return res.status(200).json({ message: "Profil mis à jour" });
  }

  return res.status(405).json({ message: "Méthode non autorisée" });
}
