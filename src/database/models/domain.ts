import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../utils/database";

class Domain extends Model {
  public id!: number;
  public domain!: string;
  public userId!: string;
}

Domain.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    domain: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Domain",
    tableName: "domains",
  },
);

export default Domain;
