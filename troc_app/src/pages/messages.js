import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Messages() {
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [to, setTo] = useState("");
  const [users, setUsers] = useState([]);

  // Récupère tous les utilisateurs (pour la démo, on récupère les emails distincts des messages)
  useEffect(() => {
    fetch("/api/messages")
      .then(res => res.json())
      .then(data => {
        setMessages(data);
        // Liste des utilisateurs distincts (hors soi-même)
        const emails = Array.from(new Set(data.flatMap(m => [m.from, m.to])));
        setUsers(emails.filter(e => e !== session?.user?.email));
      });
  }, [session]);

  // Rafraîchit les messages après envoi
  const refreshMessages = () => {
    fetch("/api/messages")
      .then(res => res.json())
      .then(setMessages);
  };

  const handleSend = async () => {
    if (!input.trim() || !to) return;
    await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to, text: input }),
    });
    setInput("");
    refreshMessages();
  };

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>You must be logged in.</p>;

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2>Messaging</h2>
      <div style={{ marginBottom: 16 }}>
        <label>
          Send to:&nbsp;
          <select value={to} onChange={e => setTo(e.target.value)}>
            <option value="">-- Choose a user --</option>
            {users.map(u => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </label>
      </div>
      <div style={{ minHeight: 200, marginBottom: 20, background: "#f9f9f9", padding: 10, borderRadius: 4 }}>
        {messages.length === 0 && <div>No messages yet.</div>}
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            <span style={{ color: "#888", fontSize: 12 }}>
              {msg.date ? new Date(msg.date).toLocaleString() : ""} | {msg.from} ➔ {msg.to} :
            </span>
            <br />
            {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Type your message…"
        style={{ width: "70%", marginRight: 8 }}
      />
      <button onClick={handleSend} disabled={!to || !input.trim()}>Send</button>
    </div>
  );
}