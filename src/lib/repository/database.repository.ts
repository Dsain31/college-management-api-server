import { _mongoDB } from "@lib/database/database.connection";
import { Collection, Db, InsertOneResult } from "mongodb";

export default class DatabaseRepository<T> {
  private readonly _db: Db;
  private readonly _collection: Collection;
  private readonly _collectionName: string;
  constructor(collectionName: string)  {
    this._db = _mongoDB;
    this._collectionName = (collectionName) ? collectionName : this.constructor.name.replace('Repository', '')
    this._collection = this._db.collection(this._collectionName);
  }

  public async insertOne(doc: T): Promise<InsertOneResult<T>> {
    return await this._collection.insertOne(doc);
  }

}