"use client";

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function PrivacyPage() {
  return (
    <Box minH="100vh" pt={20}>
      {/* Hero Section */}
      <Box bg="gray.900" color="white" py={16}>
        <Container maxW="5xl" textAlign="center">
          <MotionBox variants={fadeInUp} initial="hidden" animate="visible">
            <Heading as="h1" fontSize={{ base: "4xl", md: "5xl" }} mb={4}>
              Privacy Policy
            </Heading>
            <Text fontSize="lg" color="gray.300">
              Last updated: January 2024
            </Text>
          </MotionBox>
        </Container>
      </Box>

      {/* Privacy Content */}
      <Container maxW="5xl" py={16}>
        <VStack gap={8} align="stretch">
          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Text color="gray.700" fontSize="lg" mb={8}>
              At Ontour Travels, we are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, store, and protect your data when you use our website and services.
            </Text>
          </MotionBox>

          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Heading as="h2" fontSize="2xl" mb={4} color="gray.900">
              1. Information We Collect
            </Heading>
            <VStack gap={3} align="stretch">
              <Text color="gray.700">
                <strong>1.1 Personal Information:</strong> When you book our services, we collect personal information including: Full name (as on passport), Email address, Phone number (including WhatsApp), Date of birth, Passport number and expiry date (for international bookings), Nationality, Payment information (processed securely by Paystack/Flutterwave), and Emergency contact details (for tours).
              </Text>
              <Text color="gray.700">
                <strong>1.2 Booking Information:</strong> We collect details about your bookings including travel dates, destinations, flight preferences, accommodation choices, special requests (meal preferences, accessibility needs, etc.), and Payment history.
              </Text>
              <Text color="gray.700">
                <strong>1.3 Automatically Collected Information:</strong> When you visit our website, we automatically collect: IP address, Browser type and version, Device information, Pages visited and time spent, Referring website, and Cookies and similar tracking technologies.
              </Text>
              <Text color="gray.700">
                <strong>1.4 Communication Records:</strong> We keep records of communications with you via email, WhatsApp, phone, or our contact forms for customer service and quality assurance purposes.
              </Text>
            </VStack>
          </MotionBox>

          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Heading as="h2" fontSize="2xl" mb={4} color="gray.900">
              2. How We Use Your Information
            </Heading>
            <VStack gap={3} align="stretch">
              <Text color="gray.700">
                <strong>2.1 Service Provision:</strong> We use your information to: Process and confirm your bookings, Issue tickets and vouchers, Coordinate with airlines, hotels, and tour operators, Provide customer support, Send booking confirmations and travel documents, and Manage changes, cancellations, and refunds.
              </Text>
              <Text color="gray.700">
                <strong>2.2 Payment Processing:</strong> Payment information is processed securely by our payment partners (Paystack/Flutterwave). We do not store complete credit card details on our servers.
              </Text>
              <Text color="gray.700">
                <strong>2.3 Communication:</strong> We use your contact information to: Send booking confirmations and updates, Provide travel reminders and check-in notifications, Respond to inquiries and support requests, Share important travel advisories, and Send promotional offers and newsletters (you can opt out anytime).
              </Text>
              <Text color="gray.700">
                <strong>2.4 Legal Compliance:</strong> We may use your information to comply with legal obligations, enforce our Terms & Conditions, prevent fraud and abuse, and respond to legal requests from authorities.
              </Text>
              <Text color="gray.700">
                <strong>2.5 Service Improvement:</strong> We analyze anonymized data to improve our website, optimize user experience, understand customer preferences, and develop new services.
              </Text>
            </VStack>
          </MotionBox>

          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Heading as="h2" fontSize="2xl" mb={4} color="gray.900">
              3. Information Sharing & Disclosure
            </Heading>
            <VStack gap={3} align="stretch">
              <Text color="gray.700">
                <strong>3.1 Service Partners:</strong> We share necessary information with: Airlines (for ticket issuance and passenger manifests), Hotels and accommodation providers, Tour operators and local guides, Ground transportation services, Travel insurance providers, and Visa processing agencies.
              </Text>
              <Text color="gray.700">
                <strong>3.2 Payment Processors:</strong> Payment information is shared with Paystack and Flutterwave to process transactions securely. These partners are PCI-DSS compliant and protect your financial data.
              </Text>
              <Text color="gray.700">
                <strong>3.3 Technology Providers:</strong> We use third-party services for: Website hosting and maintenance, Email communications, WhatsApp Business API, Analytics (Google Analytics), and Booking systems (Amadeus API).
              </Text>
              <Text color="gray.700">
                <strong>3.4 Legal Requirements:</strong> We may disclose information when required by law, to comply with legal processes, to protect our rights and property, to prevent fraud or security threats, and in connection with business transfers or acquisitions.
              </Text>
              <Text color="gray.700">
                <strong>3.5 No Selling of Data:</strong> We do not sell, rent, or trade your personal information to third parties for marketing purposes.
              </Text>
            </VStack>
          </MotionBox>

          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Heading as="h2" fontSize="2xl" mb={4} color="gray.900">
              4. Data Security
            </Heading>
            <VStack gap={3} align="stretch">
              <Text color="gray.700">
                <strong>4.1 Security Measures:</strong> We implement industry-standard security measures to protect your information including: SSL/TLS encryption for data transmission, Secure servers with firewalls and intrusion detection, Regular security audits and updates, Access controls limiting employee access to sensitive data, and Secure backup systems.
              </Text>
              <Text color="gray.700">
                <strong>4.2 Payment Security:</strong> All payment transactions are processed through PCI-DSS compliant payment gateways. We do not store complete credit card information on our systems.
              </Text>
              <Text color="gray.700">
                <strong>4.3 Limitations:</strong> While we take reasonable precautions, no internet transmission or electronic storage is 100% secure. We cannot guarantee absolute security but will notify you promptly of any data breaches as required by law.
              </Text>
            </VStack>
          </MotionBox>

          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Heading as="h2" fontSize="2xl" mb={4} color="gray.900">
              5. Data Retention
            </Heading>
            <VStack gap={3} align="stretch">
              <Text color="gray.700">
                <strong>5.1 Retention Period:</strong> We retain your personal information for as long as necessary to: Fulfill the purposes described in this policy, Maintain records for tax and accounting purposes (typically 7 years), Comply with legal obligations, and Resolve disputes and enforce agreements.
              </Text>
              <Text color="gray.700">
                <strong>5.2 Deletion Requests:</strong> You can request deletion of your personal data at any time (subject to legal and contractual obligations). Contact us via email or WhatsApp to request deletion.
              </Text>
            </VStack>
          </MotionBox>

          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Heading as="h2" fontSize="2xl" mb={4} color="gray.900">
              6. Your Rights & Choices
            </Heading>
            <VStack gap={3} align="stretch">
              <Text color="gray.700">
                <strong>6.1 Access & Correction:</strong> You have the right to: Access your personal information, Request corrections to inaccurate data, Update your contact preferences, and Request a copy of your data in a portable format.
              </Text>
              <Text color="gray.700">
                <strong>6.2 Marketing Communications:</strong> You can opt out of promotional emails and messages at any time by: Clicking "unsubscribe" in our emails, Replying "STOP" to SMS messages, Contacting us directly via WhatsApp or email. Note: You will still receive transactional communications related to your bookings.
              </Text>
              <Text color="gray.700">
                <strong>6.3 Cookies:</strong> You can control cookies through your browser settings. Disabling cookies may affect website functionality.
              </Text>
              <Text color="gray.700">
                <strong>6.4 Data Deletion:</strong> You can request deletion of your account and personal data. We will comply within 30 days, except where retention is required by law.
              </Text>
            </VStack>
          </MotionBox>

          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Heading as="h2" fontSize="2xl" mb={4} color="gray.900">
              7. Cookies & Tracking Technologies
            </Heading>
            <VStack gap={3} align="stretch">
              <Text color="gray.700">
                <strong>7.1 Types of Cookies:</strong> We use: Essential cookies (required for website functionality), Analytics cookies (to understand user behavior via Google Analytics), Functional cookies (to remember your preferences), and Marketing cookies (to show relevant ads).
              </Text>
              <Text color="gray.700">
                <strong>7.2 Third-Party Cookies:</strong> Some cookies are placed by third-party services we use (Google Analytics, payment processors, etc.). These are governed by the respective third parties' privacy policies.
              </Text>
              <Text color="gray.700">
                <strong>7.3 Cookie Management:</strong> You can control cookies through your browser settings. Most browsers allow you to refuse cookies or alert you when cookies are being sent.
              </Text>
            </VStack>
          </MotionBox>

          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Heading as="h2" fontSize="2xl" mb={4} color="gray.900">
              8. Children's Privacy
            </Heading>
            <VStack gap={3} align="stretch">
              <Text color="gray.700">
                <strong>8.1 Age Restriction:</strong> Our services are not intended for children under 18. We do not knowingly collect personal information from minors without parental consent.
              </Text>
              <Text color="gray.700">
                <strong>8.2 Parental Consent:</strong> If booking travel for minors, you must be their parent or legal guardian and provide consent on their behalf.
              </Text>
            </VStack>
          </MotionBox>

          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Heading as="h2" fontSize="2xl" mb={4} color="gray.900">
              9. International Data Transfers
            </Heading>
            <VStack gap={3} align="stretch">
              <Text color="gray.700">
                <strong>9.1 Cross-Border Transfers:</strong> Your information may be transferred to and processed in countries outside Nigeria (e.g., when booking international flights or hotels). We ensure appropriate safeguards are in place.
              </Text>
              <Text color="gray.700">
                <strong>9.2 Data Protection Standards:</strong> When transferring data internationally, we ensure recipients maintain adequate data protection standards through contractual obligations or adherence to recognized frameworks.
              </Text>
            </VStack>
          </MotionBox>

          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Heading as="h2" fontSize="2xl" mb={4} color="gray.900">
              10. Changes to This Policy
            </Heading>
            <VStack gap={3} align="stretch">
              <Text color="gray.700">
                <strong>10.1 Updates:</strong> We may update this Privacy Policy periodically to reflect changes in our practices, legal requirements, or services. The "Last Updated" date at the top will be revised accordingly.
              </Text>
              <Text color="gray.700">
                <strong>10.2 Notification:</strong> Material changes will be communicated via email or prominent notice on our website. Continued use of our services after changes indicates acceptance of the updated policy.
              </Text>
            </VStack>
          </MotionBox>

          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Heading as="h2" fontSize="2xl" mb={4} color="gray.900">
              11. Contact Us
            </Heading>
            <Text color="gray.700" mb={3}>
              If you have questions about this Privacy Policy or how we handle your data, please contact us:
            </Text>
            <VStack gap={2} align="stretch" color="gray.700">
              <Text><strong>Email:</strong> privacy@ontourtravels.com.ng or info@ontourtravels.com.ng</Text>
              <Text><strong>Phone:</strong> +234 812 345 6789</Text>
              <Text><strong>WhatsApp:</strong> +234 812 345 6789</Text>
              <Text><strong>Address:</strong> Lagos, Nigeria</Text>
            </VStack>
          </MotionBox>

          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Heading as="h2" fontSize="2xl" mb={4} color="gray.900">
              12. Regulatory Compliance
            </Heading>
            <VStack gap={3} align="stretch">
              <Text color="gray.700">
                <strong>12.1 Nigerian Law:</strong> This Privacy Policy complies with the Nigeria Data Protection Regulation (NDPR) 2019 and other applicable Nigerian privacy laws.
              </Text>
              <Text color="gray.700">
                <strong>12.2 Data Protection Authority:</strong> If you believe your data rights have been violated, you may file a complaint with the National Information Technology Development Agency (NITDA) or contact us to resolve the issue.
              </Text>
            </VStack>
          </MotionBox>

          <Box borderTop="1px solid" borderColor="gray.200" pt={8}>
            <Text fontSize="sm" color="gray.600" textAlign="center">
              By using Ontour Travels services, you acknowledge that you have read and understood this Privacy Policy.
            </Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
