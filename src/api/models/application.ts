import { CommonStatus, UserRole } from "@utils/constants/common/common.status";
import { IsDate, IsInt, Max, Min } from "class-validator";

export class Application {
    _id: string | undefined;
    
    fullName!: string;

    motherName: string | undefined;
    fatherName: string | undefined;

    address: string | undefined;

    @IsInt()
    @Max(10)
    mobileNumber: number | undefined;

    @IsInt()
    @Max(2)
    age: number | undefined;
    
    @IsInt()
    @Max(2)
    seniorClassMarks: number | undefined;

    @IsInt()
    @Max(2)
    secondaryClassMarks: number | undefined;

    userId!: string;

    subject: string | undefined;

    status!: number;

    course: string | undefined;

    commentData: string | undefined;


    @IsDate()
    createdDate: Date;

    @IsDate()
    modifiedDate: Date;

    constructor(obj: IApplication) {
        if(obj.fullName) this.fullName = obj.fullName.trim();
        if(obj.motherName) this.motherName = obj.motherName.trim();
        if(obj.fatherName) this.fatherName = obj.fatherName.trim();
        if(obj.course) this.course = obj.course.trim();
        if(obj.address) this.address = obj.address.trim();
        if(obj.mobileNumber) this.mobileNumber = obj.mobileNumber;
        if(obj.seniorClassMarks) this.seniorClassMarks = obj.seniorClassMarks;
        if(obj.secondaryClassMarks) this.secondaryClassMarks = obj.secondaryClassMarks;
        if(obj.age) this.age = obj.age;
        if(obj.userId) this.userId = obj.userId;
        if(obj.subject) this.subject = obj.subject.trim();
        this.status = CommonStatus.PENDING;
        if(obj.commentData) this.commentData = obj.commentData || '';
        this.modifiedDate = obj.modifiedDate || new Date();
        this.createdDate = obj.createdDate || new Date();
    }


}

export type IApplication = Application