import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("ClusterProject");

  if (req.method === "POST") {
    const { email, title, description, image } = req.body;

    if (!email || !title || !description || !image) {
      return res.status(400).json({ message: "Champs manquants" });
    }

    await db.collection("items").insertOne({
      email,
      title,
      description,
      image,
      createdAt: new Date(),
    });

    return res.status(201).json({ message: "Annonce créée" });
  }

  if (req.method === "GET") {
    const { email } = req.query;
    const items = await db.collection("items").find({ email }).toArray();
    return res.status(200).json(items);
  }

  res.status(405).json({ message: "Méthode non autorisée" });
}
