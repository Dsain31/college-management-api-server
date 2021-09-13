import { config } from "@config/index";
import { Db, MongoClient } from "mongodb";
export let _mongoDB: Db;
export default class DatabaseConnection {
 public static async mongoDbConnection(): Promise <Db> {
    try {
      const client = await MongoClient.connect(config.mongoConnectionURL);
      const db = client.db();
      _mongoDB = db;
      console.log('database connection successfully');
      return _mongoDB;
    } catch(error) {
      console.error(error);
      process.exit()
    }
  
  }
}
