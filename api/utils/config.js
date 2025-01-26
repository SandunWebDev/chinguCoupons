require("dotenv").config(); // Loading enviroment variables from ".env" file. Pass explicit values if want to override these.

const { NODE_ENV, PORT, SESSION_SECRET, DB_PATH, CORS_WHITELIST } = process.env;

module.exports = {
  nodeEnvironment: NODE_ENV || "development",
  port: PORT || 8080,
  sessionSecret: SESSION_SECRET,
  dbPath: DB_PATH,
  corsWhiteList: CORS_WHITELIST.replace(/\s+/g, "").split(",")
};
