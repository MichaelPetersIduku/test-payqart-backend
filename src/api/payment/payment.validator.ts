import joi from "joi";

export const paymentBreakDown = joi.object({
  employmentType: joi.string().allow("paid", "self", "corporate").required(),
  totalCartValue: joi.number().required(),
  userDownPayment: joi.number().required().allow(""),
  tenure: joi.string().allow("1", "2", "3", "4", "5", "6").required(),
});
