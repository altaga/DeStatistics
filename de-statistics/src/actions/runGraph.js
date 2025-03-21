"use server";

const OLLAMA_URL = process.env.OLLAMA_URL;

const myHeaders = new Headers();
myHeaders.append("X-API-Key", process.env.OLLAMA_APIKEY);

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

export default async function runGraph(message, context = "") {
  const tempContext = context === `{"uploader":"","description":"","columns":[""],"row":[""],"dbKey":"","data":[[0]]}` ? "" : context;
  return new Promise((resolve, reject) => {
    fetch(
      `${OLLAMA_URL}/run_graph?message=${message}&context=${tempContext}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => resolve(res.response))
      .catch((error) => reject(error));
  });
}
