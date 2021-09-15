import { Application } from "@models/application";
import { Response, Request } from "express";
import ApplicationRepository from "@repository/application.repository";
import SystemConstants from "@utils/constants/system/system.constants";
import ApplicationService from "@services/application.service";

export default class ApplicationController {
  public static create(req: Request, res: Response) {
    const _applicationRepository = new ApplicationRepository();
    if (!_.isEmpty(req.body)) {
      const applicationReqData = new Application(req.body);
      return ApplicationService.createApplicationHandler(applicationReqData, res, _applicationRepository);
    }
    return res.json({ message: SystemConstants.FIELDS_REQUIRED_MSG });
  }

  public static updateById(req: Request, res: Response) {
    const _applicationRepository = new ApplicationRepository();
    if (!_.isEmpty(req.body)) {
      const updateApplicationData = req.body;
      const filterQuery = req.query;
      return ApplicationService.updateApplicationHandler(filterQuery, updateApplicationData, res, _applicationRepository);
    }
    return res.json({ message: SystemConstants.FIELDS_REQUIRED_MSG });
  }
}
