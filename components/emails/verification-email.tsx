import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
  Tailwind,
  Preview,
} from "@react-email/components";

interface Props {
  userName: string;
  userVerificationUrl: string;
}

const AccountVerificationEmail = (props: Props) => {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>
          Verify your account to get started - Just one click away!
        </Preview>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="mx-auto bg-white rounded-[12px] shadow-lg max-w-[600px] overflow-hidden">
            {/* Header Section */}
            <Section className="bg-gradient-to-r from-emerald-600 to-teal-600 px-[40px] py-[32px] text-center">
              <Text className="text-white text-[32px] font-bold m-0 mb-[8px]">
                🔐 Secure Your Account
              </Text>
              <Text className="text-emerald-100 text-[16px] m-0">
                Complete your verification to unlock full access
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="px-[40px] py-[32px]">
              <Text className="text-gray-800 text-[18px] font-semibold mb-[16px] m-0">
                Hi {props.userName || "there"}! 👋
              </Text>

              <Text className="text-gray-600 text-[16px] leading-[24px] mb-[24px] m-0">
                Thanks for signing up! We're excited to have you join our
                community. To ensure the security of your account and unlock all
                features, please verify your email address by clicking the
                button below.
              </Text>

              {/* Verification Button */}
              <Section className="text-center my-[32px]">
                <Button
                  href={props.userVerificationUrl || "#"}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border transition-all duration-200 shadow-lg"
                >
                  ✨ Verify My Account
                </Button>
              </Section>

              {/* Alternative Link */}
              <Section className="bg-gray-50 rounded-[8px] p-[20px] mb-[24px]">
                <Text className="text-gray-700 text-[14px] mb-[8px] m-0 font-semibold">
                  Button not working?
                </Text>
                <Text className="text-gray-600 text-[14px] m-0 leading-[20px]">
                  Copy and paste this link into your browser:
                </Text>
                <Text className="text-blue-600 text-[14px] mt-[8px] m-0 break-all">
                  {props.userVerificationUrl}
                </Text>
              </Section>

              {/* Security Notice */}
              <Section className="border-l-[4px] border-amber-400 bg-amber-50 pl-[16px] pr-[20px] py-[16px] mb-[24px]">
                <Text className="text-amber-800 text-[14px] font-semibold mb-[4px] m-0">
                  🔒 Security Note
                </Text>
                <Text className="text-amber-700 text-[14px] m-0 leading-[20px]">
                  This verification link will expire in 24 hours for your
                  security. If you didn't create this account, please ignore
                  this email.
                </Text>
              </Section>

              {/* Benefits Section */}
              <Text className="text-gray-800 text-[16px] font-semibold mb-[16px] m-0">
                What's next after verification?
              </Text>

              <Section className="mb-[24px]">
                <Text className="text-gray-600 text-[14px] mb-[8px] m-0">
                  🚀 <strong>Complete your profile</strong> - Add your details
                  and preferences
                </Text>
                <Text className="text-gray-600 text-[14px] mb-[8px] m-0">
                  🎯 <strong>Explore features</strong> - Discover all the tools
                  available to you
                </Text>
                <Text className="text-gray-600 text-[14px] mb-[8px] m-0">
                  💬 <strong>Join the community</strong> - Connect with other
                  users
                </Text>
                <Text className="text-gray-600 text-[14px] m-0">
                  📧 <strong>Stay updated</strong> - Get the latest news and
                  updates
                </Text>
              </Section>

              <Text className="text-gray-600 text-[14px] leading-[20px] m-0">
                Need help? Our support team is here for you 24/7. Just reply to
                this email or visit our help center.
              </Text>
            </Section>

            <Hr className="border-gray-200 my-[20px]" />

            {/* Footer */}
            <Section className="px-[40px] pb-[32px] text-center">
              <Text className="text-gray-500 text-[12px] leading-[16px] mb-[16px] m-0">
                This email was sent to {props.userName}
              </Text>

              <Text className="text-gray-400 text-[12px] leading-[16px] mb-[8px] m-0">
                © 2025 Znotes. All rights reserved.
              </Text>

              <Section className="mt-[16px]">
                <Text className="text-gray-400 text-[12px] m-0">
                  <a
                    href="#"
                    className="text-blue-500 no-underline hover:underline"
                  >
                    Unsubscribe
                  </a>{" "}
                  |
                  <a
                    href="#"
                    className="text-blue-500 no-underline hover:underline ml-[8px]"
                  >
                    Privacy Policy
                  </a>{" "}
                  |
                  <a
                    href="#"
                    className="text-blue-500 no-underline hover:underline ml-[8px]"
                  >
                    Help Center
                  </a>
                </Text>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
export default AccountVerificationEmail;
