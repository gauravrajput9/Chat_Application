import { Resend } from "resend";

export const resendClient = new Resend(process.env.RESEND_API_KEY)

export const Sender = {
  email:
    process.env.NODE_ENV === "production"
      ? process.env.EMAIL_FROM_PROD
      : process.env.EMAIL_FROM_DEV,
  name:
    process.env.NODE_ENV === "production"
      ? process.env.EMAIL_FROM_NAME_PROD
      : process.env.EMAIL_FROM_NAME_DEV,
};
