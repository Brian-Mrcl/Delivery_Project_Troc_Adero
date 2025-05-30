import Image from "next/image";
import styles from "@/styles/about.module.css";

export default function About() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Image
          src="/logo.png"
          alt="Troc'Adéro Logo"
          width={100}
          height={100}
          className={styles.logo}
        />
        <h1 className={styles.title}>À propos de Troc’Adéro</h1>
        <p className={styles.subtitle}>Projet étudiant – TI 450 - INT3-C3</p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Résumé</h2>
        <p className={styles.paragraph}>
          Troc’Adéro vise à rassembler des personnes autour d’intérêts communs pour faciliter
          l’échange d’objets culturels sans argent. Notre plateforme permet de donner une seconde
          vie à vos livres, vinyles, CDs, figurines, etc., tout en favorisant l’entraide, la
          réduction des inégalités et la consommation responsable.
        </p>
        <ul className={styles.list}>
          <li>Réduit les inégalités (ODD 10)</li>
          <li>Consommation durable (ODD 12)</li>
          <li>Renforce les communautés (ODD 11)</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Notre vision</h2>
        <p className={styles.paragraph}>
          L’idée est née du désir d’échanger des objets rares ou exclusifs. Nous avons compris que
          ce modèle profite autant aux collectionneurs qu’aux personnes en difficulté financière,
          et à la planète. Troc’Adéro s’inscrit dans une démarche écologique et sociale, en
          s’opposant à la surconsommation.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Fonctionnement</h2>
        <ul className={styles.list}>
          <li>Échanges sans argent, uniquement du troc</li>
          <li>Pas de livraison : remise en main propre ou dépôt dans un point “Collect”</li>
          <li>Respect du RGPD pour la protection des données</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Technologies utilisées</h2>
        <ul className={styles.list}>
          <li>React, Next.js, HTML, CSS pour le front-end</li>
          <li>MongoDB pour la base de données</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Notre équipe</h2>
        <ul className={styles.list}>
          <li><b>Léo Carouge</b> – Chef de projet</li>
          <li><b>Brian Marcel</b> – Responsable développement</li>
          <li>+ Membres de l’équipe projet</li>
        </ul>
        <p className={styles.paragraph}>
          Nos valeurs : intégrité, curiosité, empathie, solidarité. Nous sommes une équipe motivée,
          prête à relever tous les défis !
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Perspectives</h2>
        <p className={styles.paragraph}>
          Notre ambition : devenir la référence du partage de médias en France, puis à
          l’international. Nous pensons que ce modèle peut transformer la façon dont nous consommons
          et partageons la culture.
        </p>
      </div>
    </div>
  );
}
