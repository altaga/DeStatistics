"use client";
import styles from "./page.module.css";

const trendingTopics = [
  "Artificial Intelligence",
  "Climate Change",
  "Cryptocurrency",
  "Mental Health Awareness",
  "Space Exploration",
  "Quantum Computing",
  "Biotechnology",
  "Cybersecurity",
  "Augmented Reality",
  "Virtual Reality",
  "5G Technology",
  "Internet of Things",
  "Blockchain",
  "Sustainable Energy",
  "Multimodal AI",
];

export default function Main() {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <div className={styles.title}>
          Empowering <span className={styles.titleSoft}>human knowledge</span>
        </div>
        <div className={styles.titleMiniSoft}>
          through decentralization and cutting-edge AI
        </div>
      </div>

      <div className={styles.searchBarContainer}>
        <input type="text" placeholder="Search" className={styles.searchBar} />
        <button className={styles.searchButton}>Search</button>
      </div>
      <div className={styles.buttonsContainer}>
        {trendingTopics.map((topic, index) => (
          <button key={index} className={styles.topicButton}>
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
}
