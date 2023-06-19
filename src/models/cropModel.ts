import { Model, DataTypes, Sequelize } from "sequelize";
import RuralProducer from "./ruralProducerModel";

interface CropAttributes {
  id?: number;
  producerId: number;
  cropName: string;
  area: number;
}

interface CropCreationAttributes extends CropAttributes {}

class Crop extends Model<CropAttributes, CropCreationAttributes> {
  public id!: number;
  public producerId!: number;
  public cropName!: string;
  public area!: number;

  public static associate(models: any) {
    Crop.belongsTo(models.RuralProducer, {
      foreignKey: "producerId",
      as: "producer",
    });
  }
}

export const initCrop = (sequelize: Sequelize): void => {
  Crop.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      producerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cropName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      area: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "Crops",
    }
  );
};

export default Crop;
