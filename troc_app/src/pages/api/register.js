import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Méthode non autorisée" });
  }

  const { email, password, name, city, description } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Champs requis manquants" });
  }

  try {
    const client = await clientPromise;
    const db = client.db("ClusterProject");

    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Cet email est déjà utilisé" });
    }

    await db.collection("users").insertOne({
      email,
      password,
      name: name || "",
      city: city || "",
      description: description || "",
    });

    res.status(201).json({ message: "Utilisateur créé avec succès" });
  } catch (err) {
    console.error("Erreur API register:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
}
