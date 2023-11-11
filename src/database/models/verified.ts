import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../utils/database";

class Verified extends Model {
  public id!: number;
  public domain!: string;
  public email!: string;
}

Verified.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Verified",
    tableName: "verified",
  },
);

export default Verified;
