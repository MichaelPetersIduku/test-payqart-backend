import { Router } from "express";
import { inputValidator } from "../../util/middleware";
import { PaymentController } from "./payment.controller";
import { paymentBreakDown } from "./payment.validator";

export const paymentRouter = Router();

paymentRouter.get("/", new PaymentController().users);

paymentRouter.get(
  "/breakdown",
  inputValidator({ query: paymentBreakDown }),
  new PaymentController().paymentBreakDown
);
