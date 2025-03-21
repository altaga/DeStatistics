"use client";
import { getDB } from "@/actions/fetchDataset";
import SimpleCharts from "@/app/statistics/components/chart";
import Chat from "@/app/statistics/components/chat";
import styles from "@/app/statistics/page.module.css";
import { useEffect, useState } from "react";

export default function Statistic() {

  // States
  const [data, setData] = useState({});

  async function getData(key) {
    const response = await getDB(key);
    setData(response);
  }

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    getData(urlParams.get("db"));
  }, []);

  return (
    <div className={styles.fullContainer}>
      <div className={styles.title}>
        {" "}
        {data.title} {"->"} {data.description}
      </div>
      <div className={styles.container}>
        <div className={styles.chartContainer}>
          <SimpleCharts data={data} />
        </div>
        <div className={styles.chatContainer}>
          <Chat bucket = {data.bucket}/>
        </div>
      </div>
    </div>
  );
}
