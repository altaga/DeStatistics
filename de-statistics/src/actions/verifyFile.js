"use server";

const OLLAMA_URL = process.env.OLLAMA_URL;

const myHeaders = new Headers();
myHeaders.append("X-API-Key", process.env.OLLAMA_APIKEY);
myHeaders.append("Content-Type", "application/json");

export default async function verifyDB(context) {

  const raw = JSON.stringify({
    message:"",
    context,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return new Promise((resolve, reject) => {
    fetch(`${OLLAMA_URL}/verify_database`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        resolve(res.response.answer === "True" || res.response.answer === true);
      })
      .catch((error) => resolve("error"));
  });
}
