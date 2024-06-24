import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Send a two factor token to the user
export async function sendTwoFactorToken(email: string, token: string) {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm Two-factor Auth",
    html: `<p>Your two-factor token is: ${token}</p>`,
  });
}

// Send a verification email to the user
export async function sendVerificationEmail(email: string, token: string) {
  const confirmationLink = `${process.env.BASE_URL}/email-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email address",
    html: `<p><a href="${confirmationLink}">Click here</a> to verify your email address.</p>`,
  });
}

// Send a password reset email to the user
export async function sendResetEmail(email: string, token: string) {
  const resetLink = `${process.env.BASE_URL}/reset-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `<p><a href="${resetLink}">Click here</a> to reset your password.</p>`,
  });
}
