import { Sequelize } from "sequelize";
import config from "../config/config.env";
import fs from "fs";
import path from "path";
const dbName = config.dbName || "";
const dbUser = config.dbUser || "";
const dbHost = config.dbHost || "";
console.log("dbHost", dbHost);

const sequelize = new Sequelize(
  dbName,
  dbUser,
  config.dbPassword,
  {
    ssl: false,
    host: dbHost,
    port: Number(config.dbPort),
    dialect: "postgres"
  }
);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Conexión establecida correctamente.");
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
  }
}

export { sequelize, testConnection };
