// loads the variables from the ".env" file
// and make them accessible through "process.env"
require("dotenv").config();
const app = require("./app");

const { PORT = 4000 } = process.env;

app.listen(PORT, () =>
  console.info(`Backend server is up and running on port ${PORT}`)
);
