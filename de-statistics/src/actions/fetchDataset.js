"use server";

import { parseCSVtoJSON_t1 } from "@/utils/lib";
import { ethers } from "ethers";
import { RecallClient } from "@recallnet/sdk/client";
import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { testnet } from "@recallnet/chains";

const wallet = ethers.Wallet.fromMnemonic(process.env.RECALL_PRIVKEY);
const { privateKey } = wallet;
const walletClient = createWalletClient({
  account: privateKeyToAccount(privateKey),
  chain: testnet,
  transport: http(),
});
const client = new RecallClient({ walletClient });

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
      console.log(object);
      if (object === null) return reject("error");
      const bucket = object.bucket;
      const DB = await fetchDB(RECALL_BASE_URL + bucket + "/database");
      if (DB === null) return reject("error");
      let parsed = parseCSVtoJSON_t1(DB);
      resolve({ ...parsed, ...object });
    } catch (e) {
      console.log(e);
      reject("error");
    }
  });
}

export async function getAllDBs() {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(GeneralDB.data);
    } catch (e) {
      console.log(e);
      reject("error");
    }
  });
}

updateDB()
  .then(() => console.log("DB updated successfully"))
  .catch((err) => console.log(err));
