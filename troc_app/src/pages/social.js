import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";

const socialLinks = [
  {
    name: "Facebook",
    url: "https://facebook.com/",
    icon: <Facebook color="#1877f3" size={40} />,
  },
  {
    name: "Instagram",
    url: "https://instagram.com/",
    icon: <Instagram color="#e4405f" size={40} />,
  },
  {
    name: "Twitter",
    url: "https://twitter.com/",
    icon: <Twitter color="#1da1f2" size={40} />,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/",
    icon: <Linkedin color="#0077b5" size={40} />,
  },
  {
    name: "YouTube",
    url: "https://youtube.com/",
    icon: <Youtube color="#ff0000" size={40} />,
  },
];

export default function Social() {
  return (
    <div style={{ maxWidth: 500, margin: "2rem auto", padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2>Nos réseaux sociaux</h2>
      <div style={{ display: "flex", justifyContent: "space-around", marginTop: 30 }}>
        {socialLinks.map((s) => (
          <a
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textAlign: "center", textDecoration: "none", color: "#222" }}
          >
            {s.icon}
            <div style={{ marginTop: 8 }}>{s.name}</div>
          </a>
        ))}
      </div>
    </div>
  );
}