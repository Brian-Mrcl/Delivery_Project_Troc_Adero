import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Messages() {
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [to, setTo] = useState(""); // email du destinataire
  const [users, setUsers] = useState([]);

  // Récupère tous les utilisateurs (hors soi-même)
  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(data => {
        setUsers(data.filter(u => u.email !== session?.user?.email));
      });
  }, [session]);

  // ... (le reste ne change pas)

  return (
    <div>
      <label>
        Send to:&nbsp;
        <select value={to} onChange={e => setTo(e.target.value)}>
          <option value="">-- Choose a user --</option>
          {users.map(u => (
            <option key={u.email} value={u.email}>
              {u.name || u.email}
            </option>
          ))}
        </select>
      </label>
      {/* ...le reste du formulaire... */}
    </div>
  );
}