import { Model, DataTypes, Sequelize } from "sequelize";

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
  cropsPlanted: number;
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
  public cropsPlanted!: number;
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
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      arableArea: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      vegetationArea: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      cropsPlanted: {
        type: DataTypes.NUMBER,
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
