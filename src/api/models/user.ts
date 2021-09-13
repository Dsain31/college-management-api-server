import { IsDate, IsEmpty, IsInt, Max, Min } from "class-validator";
import { CommonStatus, UserRole } from "../utils/constants/common.status";

export class User {
    _id: string | undefined;
    
    fName!: string;

    lName: string | undefined;

    @Max(20)
    username: string | undefined;

    @Min(6)
    @Max(20)
    email: string | undefined;

    @Min(6)
    @Max(16)
    password: string | undefined;

    address: string | undefined;

    @IsInt()
    @Max(10)
    mobileNumber: number | undefined;

    @IsInt()
    @Max(2)
    age: number | undefined;

    userRole!: typeof UserRole;

    education: string | undefined;

    department: string | undefined;

    subject: string | undefined;

    status!: number;


    @IsDate()
    createdDate: Date;

    @IsDate()
    modifiedDate: Date;

    constructor(obj: IUser) {
        if(obj.fName) this.fName = obj.fName.trim();
        if(obj.lName) this.lName = obj.lName.trim();
        if(obj.username) this.username = obj.username.trim();
        if(obj.email) this.email = obj.email.trim();
        if(obj.password) this.password = obj.password.trim();
        if(obj.address) this.address = obj.address.trim();
        if(obj.mobileNumber) this.mobileNumber = obj.mobileNumber;
        if(obj.age) this.age = obj.age;
        if(obj.userRole) this.userRole = obj.userRole;
        if(obj.education) this.education = obj.education.trim();
        if(obj.department) this.department = obj.department.trim();
        if(obj.subject) this.subject = obj.subject.trim();
        this.status = CommonStatus.PENDING;
        this.modifiedDate = obj.createdDate || new Date();
        this.createdDate = obj.modifiedDate || new Date();
    }


}

export type IUser = User