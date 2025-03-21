"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { getAllDBs } from "@/actions/fetchDataset";

export default function Main() {
  const [data, setData] = useState([""]);

  const setupDBs = async () => {
    try {
      const res = await getAllDBs();
      setData(res);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setupDBs();
  }, []);

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
        {data.map((topic, index) => (
          <button onClick={() => window.location.href = `/statistics?db=${topic.key}`} key={index} className={styles.topicButton}>
            {topic.title}
          </button>
        ))}
      </div>
    </div>
  );
}
