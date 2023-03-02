import { EHttpRsCode, Mailer, R, RouterMiddleware } from "../../shared/deps.ts";

import { getRequestBody } from "../../shared/middlewares/common.ts";
import EmailService from "../services/email.ts";
import { InfraPath } from "../types.ts";

export const sendEmail: RouterMiddleware<InfraPath<"/email/send">> = async (
  ctx,
  next,
) => {
  const bodyOptions = await getRequestBody<Mailer.SendConfig>(ctx, next);
  if (!bodyOptions.value) {
    ctx.response.body = R.fail(
      EHttpRsCode.MISSING_PARAMETER,
      "request body cannot be empty",
    );
    return;
  }
  try {
    await EmailService.send(bodyOptions.value);
    ctx.response.body = R.ok("success");
  } catch (error) {
    console.log("[SendEmailError]", error);
    ctx.response.body = R.fail(
      EHttpRsCode.SYSTEM_INTERNAL_EXCEPTION,
      error?.message || "send email error",
    );
  }
};
