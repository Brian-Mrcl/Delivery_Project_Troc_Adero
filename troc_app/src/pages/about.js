import Image from "next/image";

export default function About() {
  return (
    <div style={{ maxWidth: 900, margin: "2rem auto", padding: 24, background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px #eee" }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        {/* Remplace le src par le chemin de ton logo si besoin */}
        <Image src="/logo.png" alt="Troc'Adéro Logo" width={100} height={100} />
        <h1 style={{ marginTop: 16 }}>À propos de Troc’Adéro</h1>
        <p style={{ color: "#888" }}>Projet étudiant – TI 450 - INT3-C3</p>
      </div>

      <section>
        <h2>Résumé</h2>
        <p>
          Troc’Adéro vise à rassembler des personnes autour d’intérêts communs pour faciliter l’échange d’objets culturels sans argent. Notre plateforme permet de donner une seconde vie à vos livres, vinyles, CDs, figurines, etc., tout en favorisant l’entraide, la réduction des inégalités et la consommation responsable.
        </p>
        <ul>
          <li>Réduit les inégalités (ODD 10)</li>
          <li>Consommation durable (ODD 12)</li>
          <li>Renforce les communautés (ODD 11)</li>
        </ul>
      </section>

      <section>
        <h2>Notre vision</h2>
        <p>
          L’idée est née du désir d’échanger des objets rares ou exclusifs. Nous avons compris que ce modèle profite autant aux collectionneurs qu’aux personnes en difficulté financière, et à la planète. Troc’Adéro s’inscrit dans une démarche écologique et sociale, en s’opposant à la surconsommation.
        </p>
      </section>

      <section>
        <h2>Fonctionnement</h2>
        <ul>
          <li>Échanges sans argent, uniquement du troc</li>
          <li>Pas de livraison : remise en main propre ou dépôt dans un point “Collect”</li>
          <li>Respect du RGPD pour la protection des données</li>
        </ul>
      </section>

      <section>
        <h2>Technologies utilisées</h2>
        <ul>
          <li>React, Next.js, HTML, CSS pour le front-end</li>
          <li>MongoDB pour la base de données</li>
        </ul>
      </section>

      <section>
        <h2>Notre équipe</h2>
        <ul>
          <li><b>Léo Carouge</b> – Chef de projet</li>
          <li><b>Brian Marcel</b> – Responsable développement</li>
          <li>+ Membres de l’équipe projet</li>
        </ul>
        <p>
          Nos valeurs : intégrité, curiosité, empathie, solidarité. Nous sommes une équipe motivée, prête à relever tous les défis !
        </p>
      </section>

      <section>
        <h2>Perspectives</h2>
        <p>
          Notre ambition : devenir la référence du partage de médias en France, puis à l’international. Nous pensons que ce modèle peut transformer la façon dont nous consommons et partageons la culture.
        </p>
      </section>
    </div>
  );
}