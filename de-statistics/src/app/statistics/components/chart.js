import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { BarChart } from "@mui/x-charts/BarChart";
import React, { useEffect, useState } from "react";
import styles from "./chart.module.css";

export default function SimpleCharts({ data }) {
  const [selector, setSelector] = useState(0);
  const [dataset, setDataset] = useState({
    rowKey: "",
    columnKey: "",
    rows: [""],
    columns: [""],
    data: [[0]],
  });

  useEffect(() => {
    if (JSON.stringify(data) === "{}") return;
    setDataset(data);
    console.log(data.data[selector].map((row) => ({ data: [row] })));
  }, [data]);

  return (
    <React.Fragment>
      <div className={styles.headerTitle}>
        {dataset.rowKey}:{" "}
        <Select
          sx={{ color: "black" }}
          labelId="data-select-label"
          id="data-select"
          value={selector}
          onChange={(event) => setSelector(event.target.value)}
        >
          {dataset.columns.map((column, index) => (
            <MenuItem key={index} value={index}>
              {column}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className={styles.chartSubContainer}>
        <BarChart
          xAxis={[{ scaleType: "band", data: dataset.rows }]}
          series={[{ data: dataset.data[selector].map((row) => row) }]}
          width={500}
          height={400}
        />
      </div>
    </React.Fragment>
  );
}
