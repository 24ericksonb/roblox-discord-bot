import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../utils/database";

class Pending extends Model {
  public id!: number;
  public userId!: string;
  public email!: string;
  public attempts!: number;
}

Pending.init(
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
    attempts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "Pending",
    tableName: "pending",
  },
);

export default Pending;
