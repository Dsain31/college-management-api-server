import DatabaseRepository from "@lib/repository/database.repository";
import { User } from "@models/user";

export default class UserRepository extends DatabaseRepository<User> {
    constructor() {
        super('User');
    }
}