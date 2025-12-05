const fs = require("fs").promises;
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function generateUniqueId() {
  const rand = Math.floor(Math.random() * 1000);
  const ts = Date.now().toString().slice(-3);
  return ts + rand.toString().padStart(3, "0");
}

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function run() {
  try {
    console.log(":: ADD DATA ENTRY FOR REGISTER APP ::\n\n");
    const id = generateUniqueId();
    const title = await ask("Enter Title: ");
    const author = await ask("Enter Author: ");
    const category = await ask("Enter Category: ");
    const popularity = await ask("Enter Popularity(0-10): ");
    const description = await ask("Enter App Description: ");
    const iconUrl = await ask("Enter Icon URL: ");
    const repoUrl = await ask("Enter Source/Repo URL: ");
    const authorUrl = await ask("Enter Author URL: ");

    // Read existing JSON or start with empty array
    let data = [];
    try {
      const file = await fs.readFile("./data/repo.json", "utf8");
      data = JSON.parse(file);
    } catch {}

    // Append new user data
    data.push({
      id,
      title,
      author,
      category,
      popularity,
      description,
      iconUrl,
      repoUrl,
      authorUrl,
    });

    // Save JSON
    await fs.writeFile("./data/repo.json", JSON.stringify(data, null, 2));

    console.log("Data saved!");
    rl.close();
  } catch (err) {
    console.error(err);
    rl.close();
  }
}

run();
