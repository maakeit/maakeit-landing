import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Button,
  Hr,
  Img,
  Preview,
  Font,
} from "@react-email/components";

interface CreatorWelcomeProps {
  name?: string;
}

export default function CreatorWelcome({ name }: CreatorWelcomeProps) {
  const calendlyLink = "https://calendly.com/bassygoodluck/meet-with-bassey-goodluck";

  return (
    <Html>
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Arial"
          webFont={{
            url: "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Welcome to Maakeit! Book your onboarding call to get started.</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={logoText}>Maakeit</Text>
          </Section>

          {/* Hero Section */}
          <Section style={heroSection}>
            <div style={celebrationIcon}>🎉</div>
            <Heading style={heroHeading}>
              Congratulations, {name || "Creator"}!
            </Heading>
            <Text style={heroSubtext}>
              You&apos;re officially part of the Maakeit creator community
            </Text>
          </Section>

          {/* Main Content */}
          <Section style={contentSection}>
            <Text style={paragraph}>
              We&apos;re thrilled to welcome you to Maakeit – the platform designed to help creators like you connect with amazing brands and grow your creative business.
            </Text>

            <Text style={paragraph}>
              As a creator on our platform, you&apos;ll have access to:
            </Text>

            {/* Features List */}
            <Section style={featuresList}>
              <div style={featureItem}>
                <span style={featureIcon}>✨</span>
                <Text style={featureText}>Curated brand partnerships that match your niche</Text>
              </div>
              <div style={featureItem}>
                <span style={featureIcon}>💰</span>
                <Text style={featureText}>Transparent pricing and secure payments</Text>
              </div>
              <div style={featureItem}>
                <span style={featureIcon}>🚀</span>
                <Text style={featureText}>Tools to showcase your portfolio and grow your reach</Text>
              </div>
              <div style={featureItem}>
                <span style={featureIcon}>🤝</span>
                <Text style={featureText}>A supportive community of fellow creators</Text>
              </div>
            </Section>

            <Hr style={divider} />

            {/* CTA Section */}
            <Section style={ctaSection}>
              <Heading as="h2" style={ctaHeading}>
                Let&apos;s Get You Started
              </Heading>
              <Text style={ctaText}>
                Book a quick onboarding call with our team. We&apos;ll walk you through the platform, answer your questions, and help you set up your profile for success.
              </Text>
              <Button href={calendlyLink} style={ctaButton}>
                Book Your Onboarding Call
              </Button>
              <Text style={ctaSubtext}>
                Takes only 15 minutes • Completely free
              </Text>
            </Section>

            <Hr style={divider} />

            {/* Questions Section */}
            <Section style={questionsSection}>
              <Text style={questionsText}>
                Have questions before our call? Simply reply to this email – we&apos;re here to help!
              </Text>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Welcome to the future of creator-brand collaboration.
            </Text>
            <Text style={footerSignature}>
              — The Maakeit Team
            </Text>
            <Hr style={footerDivider} />
            <Text style={footerDisclaimer}>
              © {new Date().getFullYear()} Maakeit. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles matching Maakeit design system
const main = {
  backgroundColor: "#F5EFE7",
  fontFamily: "'Inter', Arial, sans-serif",
};

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "600px",
};

const header = {
  textAlign: "center" as const,
  paddingBottom: "24px",
};

const logoText = {
  fontSize: "28px",
  fontWeight: "700",
  color: "#4A392A",
  fontFamily: "'DM Serif Display', Georgia, serif",
  margin: "0",
};

const heroSection = {
  backgroundColor: "#FFFFFF",
  borderRadius: "16px",
  padding: "40px 32px",
  textAlign: "center" as const,
  marginBottom: "24px",
  boxShadow: "0 4px 12px -1px rgba(93, 68, 39, 0.1)",
};

const celebrationIcon = {
  fontSize: "48px",
  marginBottom: "16px",
};

const heroHeading = {
  fontSize: "28px",
  fontWeight: "700",
  color: "#4A392A",
  margin: "0 0 8px 0",
  lineHeight: "1.3",
};

const heroSubtext = {
  fontSize: "16px",
  color: "#6D5A4C",
  margin: "0",
};

const contentSection = {
  backgroundColor: "#FFFFFF",
  borderRadius: "16px",
  padding: "32px",
  boxShadow: "0 4px 12px -1px rgba(93, 68, 39, 0.1)",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#4A392A",
  margin: "0 0 16px 0",
};

const featuresList = {
  margin: "24px 0",
};

const featureItem = {
  display: "flex",
  alignItems: "flex-start",
  marginBottom: "12px",
};

const featureIcon = {
  fontSize: "18px",
  marginRight: "12px",
  lineHeight: "1.6",
};

const featureText = {
  fontSize: "15px",
  lineHeight: "1.6",
  color: "#6D5A4C",
  margin: "0",
};

const divider = {
  borderColor: "#E8DED2",
  borderWidth: "1px",
  margin: "24px 0",
};

const ctaSection = {
  textAlign: "center" as const,
  padding: "16px 0",
};

const ctaHeading = {
  fontSize: "22px",
  fontWeight: "600",
  color: "#4A392A",
  margin: "0 0 12px 0",
};

const ctaText = {
  fontSize: "15px",
  lineHeight: "1.6",
  color: "#6D5A4C",
  margin: "0 0 24px 0",
};

const ctaButton = {
  backgroundColor: "#5A4634",
  color: "#FFFFFF",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "14px 32px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px -1px rgba(90, 70, 52, 0.25)",
};

const ctaSubtext = {
  fontSize: "13px",
  color: "#8B7355",
  margin: "16px 0 0 0",
};

const questionsSection = {
  textAlign: "center" as const,
  padding: "8px 0",
};

const questionsText = {
  fontSize: "14px",
  color: "#6D5A4C",
  margin: "0",
};

const footer = {
  textAlign: "center" as const,
  padding: "32px 0 0 0",
};

const footerText = {
  fontSize: "15px",
  color: "#6D5A4C",
  fontStyle: "italic",
  margin: "0 0 8px 0",
};

const footerSignature = {
  fontSize: "15px",
  fontWeight: "600",
  color: "#4A392A",
  margin: "0",
};

const footerDivider = {
  borderColor: "#E8DED2",
  borderWidth: "1px",
  margin: "24px 0 16px 0",
};

const footerDisclaimer = {
  fontSize: "12px",
  color: "#8B7355",
  margin: "0",
};
