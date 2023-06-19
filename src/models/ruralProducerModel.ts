import { Model, DataTypes, Sequelize } from "sequelize";
import Crop from "./cropModel";
interface RuralProducerAttributes {
  id?: number;
  producerName: string;
  farmName: string;
  taxId: string;
  taxIdType: string;
  city: string;
  state: string;
  totalArea: number;
  arableArea: number;
  vegetationArea: number;
}

interface RuralProducerCreationAttributes extends RuralProducerAttributes {}

class RuralProducer extends Model<
  RuralProducerAttributes,
  RuralProducerCreationAttributes
> {
  public id!: number;
  public producerName!: string;
  public farmName!: string;
  public taxId!: string;
  public taxIdType!: string;
  public city!: string;
  public state!: string;
  public totalArea!: number;
  public arableArea!: number;
  public vegetationArea!: number;

  public readonly crops?: Crop[]; // Define the association with the Crop model

  public static associate(models: any) {
    RuralProducer.hasMany(models.Crop, {
      foreignKey: "producerId",
      as: "crops",
    });
  }
}

export const initRuralProducer = (sequelize: Sequelize): void => {
  RuralProducer.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      producerName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      farmName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      taxId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      taxIdType: {
        type: DataTypes.ENUM("CPF", "CNPJ"),
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      totalArea: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      arableArea: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      vegetationArea: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "RuralProducers",
    }
  );
};

export default RuralProducer;
