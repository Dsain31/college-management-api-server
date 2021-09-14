/* eslint-disable no-useless-catch */
import {  Response } from "express";
import UserRepository from "@repository/user.repository";
import { IUser } from "@models/user";
import SystemConstants from "@utils/constants/system/system.constants";
import _ from "lodash";
import { CommonStatus } from "@utils/constants/common/common.status";
import bcrypt from 'bcrypt';
import { config } from "@config/index";
export default class UserService {

    public static async createUserHandler(userReqData: IUser, res: Response, _userRepository: UserRepository): Promise<Response<any, Record<string, any>>>{
        try {
            const user = await _userRepository.findOne({ email: userReqData.email })
            if (_.isEmpty(user)) {
                const saltRounds = config.BCRYPT_SALT_ROUNDS
                userReqData.password = await bcrypt.hash(userReqData.password!, saltRounds);
                const userResult = await _userRepository.insertOne(userReqData);
                if (userResult.acknowledged) {
                    return res.status(200).json({
                        statusCode: 200,
                        message: SystemConstants.REGISTER_SUCCESS_MSG
                    })
                }
                throw new Error().message = SystemConstants.RECORD_UN_SUCCESS_MSG;
            }
            throw new Error().message = SystemConstants.EMAIL_EXISTS_MSG
        } catch (error: unknown) {
            return res.status(SystemConstants.CUSTOM_STATUS_CODE).json(error)
        }
    }

    public static async findUserByEmail(email: string, res: Response, _userRepository: UserRepository): Promise<Response<any, Record<string, any>> | undefined> {
        try {
            const user = await _userRepository.findOne({email: email});
            if (_.isEmpty(user)) {
                return res.json(
                    {
                        statusCode: 200,
                        message: SystemConstants.EMAIL_IS_ALLOWED
                    })
            }
            throw new Error().message = SystemConstants.EMAIL_EXISTS_MSG
        } catch(error) {
            return res.status(SystemConstants.CUSTOM_STATUS_CODE).json(error)
        }
    }

    public static async loginHandler(userReqData: IUser, res: Response, _userRepository: UserRepository): Promise<Response<any, Record<string, any>> | undefined> {
        try {
            const user = await _userRepository.findOne({
                $or: [
                    { email: userReqData.username },
                    { username: userReqData.username }
                ]
            });
            if (_.isEmpty(user)) {
                throw new Error().message = SystemConstants.USER_NOT_EXISTS_MSG
            } else {
                if(user?.status === CommonStatus.ACTIVE) {
                    const isPasswordValid = bcrypt.compareSync( userReqData.password!, user.password!);
                    if (!isPasswordValid) {
                        throw new Error().message = SystemConstants.PASSWORD_NOT_MATCH_MSG;
                    }
                    return res.json(
                        {
                            statusCode: 200,
                            data: user,
                            message: SystemConstants.LOGIN_SUCCESS_MSG
                        })
                } else {
                    throw new Error().message = SystemConstants.USER_NOT_APPROVE_MSG;
                }
            }
        } catch (error) {
            return res.status(SystemConstants.CUSTOM_STATUS_CODE).json(error)
        }
    }

    public static async getUserListHandler(reqQuery:Record<string, any> ,res: Response, _userRepository: UserRepository): Promise<Response<any, Record<string, any>> | undefined> {
        try {
            const filterOptions: any = {
                limit: +reqQuery.limit || 10,
                skip: +reqQuery.skip || 0,
                sort: {createdDate: -1}
            }
            
            const whereQ: any =  reqQuery?.role ? {userRole: +reqQuery?.role}: {};
            if (reqQuery.status) {
                whereQ.status = {$in: [+reqQuery.status]}
            }
            const userList = await _userRepository.find(whereQ, filterOptions)
            if (!_.isEmpty(userList)) {
                return res.json(
                    {
                        statusCode: 200,
                        data: userList
                    })
            } else {
                throw new Error().message = SystemConstants.RECORD_NOT_FOUND_MSG
            }
        } catch(error) {
            return res.status(SystemConstants.CUSTOM_STATUS_CODE).json(error)
        }
    }
}