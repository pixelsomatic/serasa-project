import express, { Application } from "express";
import { Sequelize } from "sequelize";
import ruralProducersRoutes from "./routes/ruralProducers";
import RuralProducer, { initRuralProducer } from "./models/ruralProducerModel";
import Crop, { initCrop } from "./models/cropModel";
import { Config } from "./interface/config";
import configJson from "./config/config";
import path from "path";
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const config: Config = configJson;
const app: Application = express();
const env: keyof Config = (process.env.NODE_ENV ||
  "development") as keyof Config;

const dbConfig = config[env];

let sequelize;
sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);

initRuralProducer(sequelize);
initCrop(sequelize);

// Associate the models
RuralProducer.associate({ Crop });
Crop.associate({ RuralProducer });

// Sync the models with the database
sequelize.sync();

app.use(express.json());
app.use("/rural-producers", ruralProducersRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
