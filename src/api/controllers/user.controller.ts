import { Response, Request } from "express";
import _ from "lodash";
import UserRepository from "@repository/user.repository";
import UserService from "@services/user.service";
import { User } from "@models/user";

export default class UserController {
  private static readonly _userRepository = new UserRepository();
  
  public static create(req: Request, res: Response) {
    if (!_.isEmpty(req.body)) {
      const user = new User(req.body);
      return UserService.createUserHandler(user, res, this._userRepository);
    }
    return res.json({message: 'Fields are required'});
  }
}
