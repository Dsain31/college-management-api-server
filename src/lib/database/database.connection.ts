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

// export function connectMongoDB(callback: (arg0: Db) => void): void {
//   MongoClient.connect(config.mongoConnectionURL, {
//       promiseLibrary: Promise,
//   }).then(client => {
//       _mongoDB = client.db()
//       console.log('database connection successfully');
//       callback(_mongoDB);
//   }).catch(err => {
//       console.error('Failed to make database connections!')
//       console.error(err)
//       process.exit(1)
//   })
// }
