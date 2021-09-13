import { validate } from "class-validator";
import { Response, Request } from "express";
import _ from "lodash";
import { User } from "../models/user";
import UserRepository from "../repository/user.repository";
import UserService from "../services/user.service";

export default class UserController {
  
  public static create(req: Request, res: Response) {
    if (!_.isEmpty(req.body)) {
      const  _userRepository = new UserRepository();
      const user = new User(req.body);
      return UserService.createUserHandler(user, res, _userRepository);
    }
    return res.json({message: 'Fields are required'});
  }
}
