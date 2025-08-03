import { Sequelize } from "sequelize";
const sequelize = new Sequelize("assigment6", "root", "root", {
    host: "localhost",
    dialect: "mysql"
});

export const connectDB = async () => {
    try {
      await sequelize.authenticate();
      console.log("Database connected");
    } catch (err) {
      console.error("DB connection failed:", err.message);
    }
  };
  
  export const syncDB = async () => {
    try {
      await sequelize.sync({ alter: true });
      console.log("All models synced");
    } catch (err) {
      console.error("Sync failed:", err.message);
    }
  };

export default sequelize;
