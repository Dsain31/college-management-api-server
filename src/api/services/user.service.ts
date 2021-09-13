/* eslint-disable no-useless-catch */
import { Response } from "express";
import UserRepository from "@repository/user.repository";
import { IUser } from "@models/user";

export default class UserService {

    public static async createUserHandler(user: IUser, res: Response, _userRepository: UserRepository) {
        try {
            const userResult = await _userRepository.insertOne(user);
            if (userResult.acknowledged) {
                return res.status(200).json({message: 'Record created successfully'})
            }
            throw new Error('Record could not created');
        } catch (error: unknown) {
            res.send(error);
        }
    }
}