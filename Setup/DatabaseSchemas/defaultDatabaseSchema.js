const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const databasePath = path.resolve(__dirname, "../../propertiesDB.sqlite3");

const createConsoleLog = require("../../Utils/createConsoleLog");
const ensureDirectoryExists = require("../../Utils/ensureDirectoryExists");

const initializeDatabase = async () => {
  await ensureDirectoryExists(databasePath);

  const db = new sqlite3.Database(databasePath);

  db.run("PRAGMA foreign_keys=off;");

  db.run("BEGIN TRANSACTION;");

  db.run(`
    CREATE TABLE IF NOT EXISTS placeholder_table_name_to_be_replaced (
      MLS TEXT PRIMARY KEY,
      PropertyType,
      TimestampSql,
      PhotoCount,
      PhotoLink JSON,
      MinListPrice,
      MaxListPrice,
      PriceTracker JSON,
      SearchAddress,
      )
  `);

  db.run("COMMIT;", () => {
    db.close();
  });

  createConsoleLog(__filename, "database initialized");
};

module.exports = initializeDatabase;
