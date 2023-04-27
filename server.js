const app = require("./app");
const cors = require("cors");
const fs = require("fs");
const port = 8000;

app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "welcome to Frontend and backend project page",
  });
});

const readDataBase = async () => {
  const data = await fs.readFileSync("./data.json");
  const users = JSON.parse(data);
  return users;
};

const writeData = async (olderData, newData) => {
  const data = olderData;
  const existingUser = data.find((user) => user.username === newData.username);
  if (existingUser) {
    throw new Error("User already exists");
  }
  data.push(newData);
  await fs.writeFileSync("./data.json", JSON.stringify(data));
  return data;
};

app.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const olderData = await readDataBase();

  try {
    await writeData(olderData, { username, password });

    res.status(200).json({
      username,
      message: "Registration successful!",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
