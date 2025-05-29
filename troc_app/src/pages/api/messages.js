import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "Unauthorized" });

  const client = await clientPromise;
  const db = client.db();

  if (req.method === "POST") {
    const { to, text } = req.body;
    if (!to || !text) return res.status(400).json({ message: "Missing fields" });
    const message = {
      from: session.user.email,
      to,
      text,
      date: new Date(),
    };
    await db.collection("messages").insertOne(message);
    return res.status(201).json({ message: "Sent" });
  }

  if (req.method === "GET") {
    const user = session.user.email;
    const messages = await db
      .collection("messages")
      .find({ $or: [{ from: user }, { to: user }] })
      .sort({ date: 1 })
      .toArray();
    return res.status(200).json(messages);
  }

  res.status(405).end();
}