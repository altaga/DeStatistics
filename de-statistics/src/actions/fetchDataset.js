"use server";

import { parseCSVtoJSON_t1 } from "@/utils/lib";

let GeneralDB = {
  data: [],
};

function findObjectByKey(array, key, value) {
  const result = array.find((obj) => obj[key] === value);
  return result || null;
}

const RECALL_BASE_URL = "https://objects.testnet.recall.chain.love/v1/objects/";

const requestOptions = {
  method: "GET",
  redirect: "follow",
};

async function fetchDB(url) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await fetch(url, requestOptions);
      let parsed = await res.text();
      resolve(parsed);
    } catch (e) {
      console.log(e);
      reject(null);
    }
  });
}

async function updateDB() {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await fetch(process.env.RECALL_URL, requestOptions);
      let parsed = await res.json();
      GeneralDB = parsed;
      resolve("ok");
    } catch (e) {
      console.log(e);
      reject(null);
    }
  });
}

export async function getDB(key) {
  return new Promise(async (resolve, reject) => {
    try {
      const object = findObjectByKey(GeneralDB.data, "key", key);
      if (object === null) return reject("error");
      const bucket = object.bucket;
      const DB = await fetchDB(RECALL_BASE_URL + bucket + "/database");
      if (DB === null) return reject("error");
      let parsed = parseCSVtoJSON_t1(DB);
      resolve(parsed);
    } catch (e) {
      console.log(e);
      reject("error");
    }
  });
}

updateDB().then(()=> console.log("DB updated successfully")).catch((err) => console.log(err));