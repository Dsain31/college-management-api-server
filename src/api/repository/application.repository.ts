import DatabaseRepository from "@lib/repository/database.repository";
import { Application } from "@models/application";

export default class ApplicationRepository extends DatabaseRepository<Application> {
    constructor() {
        super('Application');
    }
}