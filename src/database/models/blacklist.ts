import { sequelize } from "../sequelize";
import { Model, DataTypes } from "sequelize";

class Blacklist extends Model {
  public id!: number;
  public email!: string;
}

Blacklist.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Blacklist",
    tableName: "blacklist",
  },
);

export default Blacklist;
