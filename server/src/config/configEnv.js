require("dotenv").config();

function validateEnv() {
  const PORT = process.env.PORT || 8080;
  const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/at";

  const portNum = parseInt(PORT, 10);
  if (isNaN(portNum) || portNum < 0 || portNum > 65535) {
    throw new Error(
      `Invalid PORT: "${PORT}" - must be a number between 0 and 65535`,
    );
  }

  if (typeof MONGO_URI !== "string" || MONGO_URI.trim() === "") {
    throw new Error("MONGO_URI must be a non-empty string");
  }

  return { PORT: portNum, MONGO_URI };
}

module.exports = validateEnv();
