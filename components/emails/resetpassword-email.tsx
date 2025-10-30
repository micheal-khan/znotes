import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";

interface Props {
  userName: string;
  resetPasswordUrl: string;
}
const PasswordResetEmail = (props: Props) => {
  const { userName, resetPasswordUrl } = props;

  return (
    <Html lang="en" dir="ltr">
      <Preview>Reset your password - Action required</Preview>
      <Tailwind>
        <Head />
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[12px] shadow-lg max-w-[600px] mx-auto overflow-hidden">
            {/* Header Section */}
            <Section className="bg-gradient-to-r from-blue-600 to-purple-600 px-[40px] py-[32px] text-center">
              <Heading className="text-white text-[28px] font-bold m-0 mb-[8px]">
                Password Reset Request
              </Heading>
              <Text className="text-blue-100 text-[16px] m-0">
                Secure your account with a new password
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="px-[40px] py-[32px]">
              <Text className="text-gray-800 text-[18px] font-semibold mb-[16px] m-0">
                Hello {userName},
              </Text>

              <Text className="text-gray-600 text-[16px] leading-[24px] mb-[24px] m-0">
                We received a request to reset the password for your account. If
                you made this request, click the button below to create a new
                password. This link will expire in 24 hours for security
                reasons.
              </Text>

              {/* Reset Button */}
              <Section className="text-center mb-[32px]">
                <Button
                  href={resetPasswordUrl}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border inline-block shadow-lg"
                >
                  Reset My Password
                </Button>
              </Section>

              {/* Alternative Link */}
              <Text className="text-gray-500 text-[14px] leading-[20px] mb-[24px] m-0">
                If the button doesn&apos;t work, copy and paste this link into your
                browser:
              </Text>
              <Text className="text-blue-600 text-[14px] break-all mb-[32px] m-0">
                <Link
                  href={resetPasswordUrl}
                  className="text-blue-600 underline"
                >
                  {resetPasswordUrl}
                </Link>
              </Text>

              {/* Security Notice */}
              <Section className="bg-amber-50 border-l-[4px] border-amber-400 px-[20px] py-[16px] rounded-[4px] mb-[24px]">
                <Text className="text-amber-800 text-[14px] font-semibold mb-[8px] m-0">
                  🔒 Security Notice
                </Text>
                <Text className="text-amber-700 text-[14px] leading-[20px] m-0">
                  If you didn&apos;t request this password reset, please ignore this
                  email. Your account remains secure and no changes have been
                  made.
                </Text>
              </Section>

              <Text className="text-gray-600 text-[14px] leading-[20px] m-0">
                For your security, this password reset link will expire in 24
                hours. If you need help or have questions, please contact our
                support team.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="bg-gray-50 px-[40px] py-[24px] border-t border-gray-200">
              <Text className="text-gray-500 text-[14px] leading-[20px] text-center mb-[16px] m-0">
                Best regards,
                <br />
                The Security Team
              </Text>

              <Text className="text-gray-400 text-[12px] text-center mb-[8px] m-0">
                This email was sent to khanzaidan786@gmail.com
              </Text>

              <Text className="text-gray-400 text-[12px] text-center m-0">
                © 2024 Your Company Name. All rights reserved.
                <br />
                123 Security Street, Tech City, TC 12345
                <br />
                <Link href="#" className="text-gray-400 underline">
                  Unsubscribe
                </Link>{" "}
                |
                <Link href="#" className="text-gray-400 underline">
                  {" "}
                  Privacy Policy
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default PasswordResetEmail;
