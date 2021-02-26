import { NextFunction, Request, Response } from "express";
import { UniversalsController } from "../../@core/common/universals.controller";
import { PaymentService } from "./payment.service";

export class PaymentController extends UniversalsController {
  public users = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { ip, method, originalUrl } = req;
    try {
      const response = await new PaymentService().payment(
        { ip, method, originalUrl },
        req
      );
      this.controllerResponseHandler(response, res);
    } catch (error) {
      this.controllerErrorHandler(req, res, error);
    }
  };

  public paymentBreakDown = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { ip, method, originalUrl } = req;
    try {
      const response = await new PaymentService().paymentBreakDown(
        { ip, method, originalUrl },
        req
      );
      this.controllerResponseHandler(response, res);
    } catch (error) {
      this.controllerErrorHandler(req, res, error);
    }
  };
}
