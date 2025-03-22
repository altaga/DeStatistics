"use client";
import { updateMainDB } from "@/actions/updateMainDB";
import { uploadFile, uploadFileDummy } from "@/actions/uploadFile";
import verifyDB from "@/actions/verifyFile";
import styles from "@/app/upload/page.module.css";
import { generateString, getUnixTimestamp } from "@/utils/lib";
import { Box, Button, Input, LinearProgress, TextField } from "@mui/material";
import { usePrivy } from "@privy-io/react-auth";
import React, { useEffect, useState } from "react";

export default function Upload() {
  const { user } = usePrivy();
  const [stage, setStage] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [source, setSource] = useState("");
  const [file, setFile] = useState(null);
  const [fileContent, setFileContent] = useState("");

  // Status
  const [status, setStatus] = useState("Uploading...");
  const [buffer, setBuffer] = useState(0);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setFileContent(reader.result);
      setFile(selectedFile);
    };
    reader.readAsText(selectedFile);
  };


  const uploadAndVerify = async () => {
    setStage(1);
    setStatus("Uploading...");
    const bucket = await uploadFile({ key: "database", file });
    console.log(bucket);
    if (bucket === false) return;
    setBuffer(34);
    setStatus("Verifying...");
    const verified = await verifyDB(fileContent);
    console.log(verified);
    if (verified === "error") return;
    setBuffer(67);
    setStatus("Finalizing...");
    const metadata = {
      key: generateString(10),
      uploader: user.wallet.address,
      source,
      release: getUnixTimestamp(),
      title,
      description,
      bucket,
      verified
    }
    await updateMainDB(metadata);
    setStage(2);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if(stage === 1) {
        if(buffer < 33 && status === "Uploading...") {
          setBuffer(buffer + 1);
        }
        else if(buffer < 66 && status === "Verifying...") {
          setBuffer(buffer + 1);
        }
        else if(buffer < 100 && status === "Finalizing...") {
          setBuffer(buffer + 1);
        }
      } 
    }, 500);
    return () => clearInterval(interval);
  }, [buffer, stage]);



  return (
    <div className={styles.fullContainer}>
      <div className={styles.container}>
        {stage === 0 && (
          <React.Fragment>
            <div className={styles.title}>Upload your dataset</div>
            <TextField
              onChange={(e) => setTitle(e.target.value)}
              label="Title"
              id="title"
              size="small"
              fullWidth
            />
            <TextField
              onChange={(e) => setDescription(e.target.value)}
              label="Description"
              id="description"
              size="small"
              fullWidth
            />
            <TextField
              onChange={(e) => setSource(e.target.value)}
              label="Source"
              id="source"
              size="small"
              fullWidth
            />
            <input
              className={styles.input}
              type="file"
              onChange={(e) => handleFileChange(e)}
              accept="text/csv"
            />
            <div style={{ marginTop: "30px" }} />
            <button
              disabled={!file}
              className={styles.searchButton}
              onClick={() => uploadAndVerify()}
            >
              Upload and Verify
            </button>
          </React.Fragment>
        )}
        {stage === 1 && (
          <React.Fragment>
            <div className={styles.title}>{status}</div>
            <Box sx={{ width: "100%" }}>
              <LinearProgress variant="buffer" value={buffer} valueBuffer={100} />
            </Box>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
