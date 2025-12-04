import {
  Html,
  Text,
  Heading,
  Container,
} from "@react-email/components";

export default function WaitlistWelcome({ name }: { name?: string }) {
  return (
    <Html>
      <Container style={{ padding: "20px", fontFamily: "Arial" }}>
        <Heading>Welcome to Maakeit!</Heading>
        <Text>
          Hey {name || "there"}, thanks for joining the waitlist!
        </Text>
        <Text>
          You're now officially on the early access list for Maakeit, the new
          way for brands and creators to collaborate seamlessly.
        </Text>
        <Text>We'll keep you updated as we roll out new features.</Text>
        <Text>The Maakeit Team</Text>
      </Container>
    </Html>
  );
}

