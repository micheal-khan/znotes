import PasswordResetEmail from "@/components/emails/resetpassword-email";
import AccountVerificationEmail from "@/components/emails/verification-email";
import { db } from "@/db/drizzle";
import { schema, verification } from "@/db/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
interface VerificationEmailParams {
  user: {
    email: string;
    name: string;
    id?: string;
  };
  url: string;
}
export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg", schema }),

  emailAndPassword: {
    verificationTable: verification,
    enabled: true,
    requireEmailVerification: true,
    autoSignIn: false,
    sendResetPassword: async ({ user, url, token }) => {
      await resend.emails.send({
        from: "Znotes <znotes@michealkhan.com>",
        to: [user.email],
        subject: "Reset your password",
        react: PasswordResetEmail({
          userName: user.name,
          resetPasswordUrl: url,
        }),
      });
    },
    onPasswordReset: async ({ user }, request) => {
      // your logic here
      console.log(`Password for user ${user.email} has been reset.`);
    },
  },
  emailVerification: {
    enabled: true,
    sendVerificationEmail: async ({ user, url }: VerificationEmailParams) => {
      console.log("Sending verification email to:", user.email);

      await resend.emails.send({
        from: "Znotes <znotes@michealkhan.com>",
        to: [user.email],
        subject: "Verify your email address",
        react: AccountVerificationEmail({
          userName: user.name,
          userVerificationUrl: url,
        }),
      });
    },
    sendOnSignup: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  plugins: [nextCookies()],
});
