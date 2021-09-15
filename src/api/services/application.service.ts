import { IApplication } from "@models/application";
import ApplicationRepository from "@repository/application.repository";
import SystemConstants from "@utils/constants/system/system.constants";
import { ObjectId } from "mongodb";
import {  Response } from "express";
import _ from "lodash";
export default class ApplicationService {

    public static async createApplicationHandler(applicationReqData: any, res: Response, _userRepository: ApplicationRepository): Promise<Response<any, Record<string, any>>>{
        try {
            applicationReqData.userId = new ObjectId(applicationReqData.userId);
            const userResult = await _userRepository.insertOne(applicationReqData);
            if (userResult.acknowledged) {
                return res.status(200).json({
                    statusCode: 200,
                    message: SystemConstants.REGISTER_SUCCESS_MSG
                })
            }
            throw new Error().message = SystemConstants.RECORD_UN_SUCCESS_MSG;
        } catch (error: unknown) {
            return res.status(SystemConstants.CUSTOM_STATUS_CODE).json(error)
        }
    }

    public static async updateApplicationHandler(reqQueryData:Record<string, any>, updateData: IApplication, res: Response, _applicationRepository: ApplicationRepository): Promise<Response<any, Record<string, any>>>{
        try {

            if(reqQueryData.id) {
                const filterQuery = { _id: new ObjectId(reqQueryData.id) }
                const application = await _applicationRepository.findOne(filterQuery)
    
                if (!_.isEmpty(application)) {
                    updateData.modifiedDate = new Date();
                    const applicationResult = await _applicationRepository.updateOne(filterQuery, {$set: updateData});
                    if (applicationResult.acknowledged) {
                        return res.status(200).json({
                            statusCode: 200,
                            message: SystemConstants.UPDATE_SUCCESS_MSG
                        })
                    }
                    throw new Error().message = SystemConstants.RECORD_UN_SUCCESS_MSG;
                } else {
                    throw new Error().message = SystemConstants.RECORD_NOT_FOUND_MSG
                }
            } else {
                throw new Error().message = SystemConstants.ID_REQUIRE_MSG
            }
        } catch (error: unknown) {
            return res.status(SystemConstants.CUSTOM_STATUS_CODE).json(error)
        }
    }
}
