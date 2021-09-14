import { Response, Request } from "express";
import _ from "lodash";
import UserRepository from "@repository/user.repository";
import UserService from "@services/user.service";
import { User } from "@models/user";
import SystemConstants from "@utils/constants/system/system.constants";

export default class UserController {
  
  public static create(req: Request, res: Response) {
    const _userRepository = new UserRepository();
    if (!_.isEmpty(req.body)) {
      const userReqData = new User(req.body);
      return UserService.createUserHandler(userReqData, res, _userRepository);
    }
    return res.json({ message:  SystemConstants.FIELDS_REQUIRED_MSG});
  }

  public static login(req: Request, res: Response) {
    const _userRepository = new UserRepository();
    if (!_.isEmpty(req.body)) {
      const userReqData = new User(req.body);
      return UserService.loginHandler(userReqData, res, _userRepository);
    }
    return res.json({ message:  SystemConstants.FIELDS_REQUIRED_MSG});
  }
  
  public static getUserList(req: Request, res: Response) {
    const _userRepository = new UserRepository();
    return UserService.getUserListHandler(req.query, res, _userRepository);
  }
}
