import crypto from "crypto";
import {
  // createUserTokenService,
  // getAdminUserResetPasswordTokenService,
  // getEmployeeResetPasswordTokenService,
} from "../services";
import { sendEmail } from "../utils";
import { getAdminUserResetPasswordTokenService } from "../services/auth-service";

export const sendEmailVerificationLinkEmail = async (data: {
  email: string;
}) => {
  const token = crypto.randomBytes(32).toString("hex");
  // await createUserTokenService(data.id, token);
  // const verificationURL = `${process.env.FRONTEND_BASE_URL}/login/${data.id}/${token}`;
  const message = `
      <h1>Your account has been created with Outcess ATS</h1>
      <p>Please click on the link below to verify your email. 🙃😎🔥</p>
      <a href=https://google.com clicktracking=off>Google</a>
    `;

  sendEmail({
    to: data.email,
    subject: "Outcess ATS",
    html: message,
  });
};

export const sendDefaultEmail = async (data: {
  email: any;
  subject: string;
  message: string;
}) => {
  const messageBody = `
      <p>${data.message}</p>
    `;

  sendEmail({
    to: data.email,
    subject: data.subject,
    html: messageBody,
  });
};

export const sendAdminUserSetPasswordLinkEmail = async (
  userID: string,
  email: string
) => {
  const token = await getAdminUserResetPasswordTokenService(email, false);
  const setPasswordLink = `${process.env.DASHBOARD_BASE_URL}/set-password/${userID}/${token}`;

  const message = `
        <h1>An admin has invited you to join OUTCESS-ATS</h1>
        <p>Please click on the link below to set your password. 😋🤡🔥</p>
        <a href=${setPasswordLink} clicktracking=off>${setPasswordLink}</a>
    `;

  sendEmail({
    to: email,
    subject: "Outcess-ATS Email verification",
    html: message,
  });
};