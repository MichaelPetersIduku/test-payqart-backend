import { IResponse } from "../../@core/common/response";
import { UniversalsService } from "../../@core/common/universals.service";
import logger from "../../util/logger/logger";

export class PaymentService extends UniversalsService {
  private interestRate = 0.04;
  private minDownPayment = 0.3;
  public payment = (meta, req): Promise<IResponse> => {
    const { body } = req;
    logger.info(JSON.stringify(body));
    try {
      return this.successResponse("Welcome to payments API");
    } catch (error) {
      return this.serviceErrorHandler(req, error);
    }
  };

  public paymentBreakDown = async (meta, req): Promise<IResponse> => {
    const {
      employmentType,
      totalCartValue,
      userDownPayment,
      tenure,
    } = req.query;
    let downPayment = userDownPayment;
    try {
      const minDownPayment = this.calcDownPayment(totalCartValue);
      if (userDownPayment != "") {
        if (minDownPayment > userDownPayment) downPayment = minDownPayment;
      } else {
        downPayment = minDownPayment;
      }
      if (Number(userDownPayment) > Number(totalCartValue))
        return this.failureResponse(
          "Your down payment must be less than your total cart value"
        );
      const shoppingCredit = this.calcShoppingCredit(
        totalCartValue,
        downPayment
      );
      const monthlyInterestPayable = this.calcMonthlyInterestPayable(
        shoppingCredit
      );
      const totalInterestPayable = this.calcTotalInterestPayable(
        tenure,
        monthlyInterestPayable
      );
      const monthlyRepayment = this.calcMonthlyRepayment(
        shoppingCredit,
        totalInterestPayable,
        tenure
      );

      return this.successResponse("Payment breakdown calculated", {
        shoppingCredit,
        downPayment,
        monthlyRepayment,
        tenure,
        totalInterestPayable,
        monthlyInterestPayable,
        employmentType,
      });
    } catch (error) {
      return this.serviceErrorHandler(req, error);
    }
  };

  private calcDownPayment = (totalCartValue) => {
    return Number(this.minDownPayment) * Number(totalCartValue);
  };

  private calcShoppingCredit = (totalCartValue, downPayment) => {
    return Number(totalCartValue) - Number(downPayment);
  };

  private calcMonthlyInterestPayable = (shoppingCredit) => {
    return Number(this.interestRate) * Number(shoppingCredit);
  };

  private calcTotalInterestPayable = (tenure, monthlyInterestPayable) => {
    return Number(tenure) * Number(monthlyInterestPayable);
  };

  private calcMonthlyRepayment = (
    shoppingCredit,
    totalInterestPayable,
    tenure
  ) => {
    return (Number(shoppingCredit) + Number(totalInterestPayable)) / tenure;
  };
}
