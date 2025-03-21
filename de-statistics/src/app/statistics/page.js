"use client";
import { getDB } from "@/actions/fetchDataset";
import SimpleCharts from "@/app/statistics/components/chart";
import Chat from "@/app/statistics/components/chat";
import styles from "@/app/statistics/page.module.css";
import { useEffect, useState } from "react";

export default function Statistic() {

  // States
  const [data, setData] = useState({});

  async function getData() {
    const response = await getDB();
    setData(response);
  }

  useEffect(() => {
    getData();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    console.log(urlParams.get("db"));
  }, []);

  return (
    <div className={styles.fullContainer}>
      <div className={styles.title}>
        {" "}
        Statistics Information {"->"} and Title
      </div>
      <div className={styles.container}>
        <div className={styles.chartContainer}>
          <SimpleCharts data={data} />
        </div>
        <div className={styles.chatContainer}>
          <Chat />
        </div>
      </div>
    </div>
  );
}
