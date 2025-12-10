import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Preview,
} from "@react-email/components";

interface WaitlistWelcomeProps {
  name?: string;
}

export default function WaitlistWelcome({ name }: WaitlistWelcomeProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Maakeit, You're officially on the waitlist 🎉</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={text}>Hi {name || "there"},</Text>

          <Text style={text}>
            Thank you for joining the Maakeit waitlist, we're excited to have you onboard.
          </Text>

          <Text style={text}>
            Maakeit is designed to help brands find creators who produce high-quality UGC without the friction, uncertainty, or inflated costs that usually come with influencer marketing. While we're still in early build mode, you'll be among the first to access:
          </Text>

          <Text style={listItem}>• Verified creators who consistently deliver quality content</Text>
          <Text style={listItem}>• A transparent campaign workflow with guaranteed outcomes</Text>
          <Text style={listItem}>• A smoother, faster way to run UGC collaborations</Text>
          <Text style={listItem}>• Early product updates and behind-the-scenes progress</Text>

          <Text style={text}>
            We'll keep you posted as we roll out new features and get closer to launch.
          </Text>

          <Text style={text}>
            If you ever want to share what you struggle with in UGC or influencer marketing, just reply, your feedback can directly influence what we prioritize next.
          </Text>

          <Text style={text}>
            Thanks again for being early.
          </Text>

          <Text style={text}>
            We're building something special, and we're glad you're here.
          </Text>

          <Text style={signature}>
            Warm regards,
            <br />
            The Maakeit Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#ffffff",
  fontFamily: "Arial, sans-serif",
};

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "600px",
};

const text = {
  fontSize: "15px",
  lineHeight: "1.6",
  color: "#333333",
  margin: "0 0 16px 0",
};

const listItem = {
  fontSize: "15px",
  lineHeight: "1.6",
  color: "#333333",
  margin: "0 0 8px 0",
  paddingLeft: "8px",
};

const signature = {
  fontSize: "15px",
  lineHeight: "1.8",
  color: "#333333",
  marginTop: "24px",
};
