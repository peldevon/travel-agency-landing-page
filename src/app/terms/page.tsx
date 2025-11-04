"use client";

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Link,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function TermsPage() {
  return (
    <Box minH="100vh" pt={20}>
      {/* Hero Section */}
      <Box bg="gray.900" color="white" py={16}>
        <Container maxW="5xl" textAlign="center">
          <MotionBox variants={fadeInUp} initial="hidden" animate="visible">
            <Heading as="h1" fontSize={{ base: "4xl", md: "5xl" }} mb={4}>
              Terms & Conditions
            </Heading>
            <Text fontSize="lg" color="gray.300">
              Last updated: January 2024
            </Text>
          </MotionBox>
        </Container>
      </Box>

      {/* Terms Content */}
      <Container maxW="5xl" py={16}>
        <VStack gap={8} align="stretch">
          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Text color="gray.700" fontSize="lg" mb={8}>
              Welcome to Ontour Travels. By accessing or using our website and services, you agree to comply with and be bound by the following terms and conditions. Please read these carefully before making any bookings.
            </Text>
          </MotionBox>

          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Heading as="h2" fontSize="2xl" mb={4} color="gray.900">
              1. General Terms
            </Heading>
            <VStack gap={3} align="stretch">
              <Text color="gray.700">
                <strong>1.1 Company Information:</strong> Ontour Travels is a registered travel agency operating in Nigeria, providing flight bookings, hotel reservations, shortlet accommodations, tour packages, and related travel services.
              </Text>
              <Text color="gray.700">
                <strong>1.2 Acceptance of Terms:</strong> By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions, along with our Privacy Policy.
              </Text>
              <Text color="gray.700">
                <strong>1.3 Changes to Terms:</strong> We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website. Continued use of our services after changes constitutes acceptance of the modified terms.
              </Text>
              <Text color="gray.700">
                <strong>1.4 Eligibility:</strong> You must be at least 18 years old to make bookings through our platform. By booking, you confirm that you are legally able to enter into binding contracts.
              </Text>
            </VStack>
          </MotionBox>

          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Heading as="h2" fontSize="2xl" mb={4} color="gray.900">
              2. Booking & Payment
            </Heading>
            <VStack gap={3} align="stretch">
              <Text color="gray.700">
                <strong>2.1 Booking Process:</strong> All bookings are subject to availability and confirmation. A booking is only confirmed once full payment (or deposit where applicable) has been received and a confirmation email/WhatsApp message has been sent.
              </Text>
              <Text color="gray.700">
                <strong>2.2 Pricing:</strong> All prices are displayed in Nigerian Naira (NGN) or US Dollars (USD) as indicated. Prices are subject to change without notice until booking is confirmed and paid. Prices include applicable taxes unless otherwise stated.
              </Text>
              <Text color="gray.700">
                <strong>2.3 Payment Methods:</strong> We accept payments via Paystack and Flutterwave (credit/debit cards). All payments are processed securely through PCI-DSS compliant gateways.
              </Text>
              <Text color="gray.700">
                <strong>2.4 Payment Schedule:</strong> For tour packages, a 50% deposit is typically required to secure the booking, with the balance due 14-30 days before departure (specific terms will be communicated). Full payment is required for flights and hotels at the time of booking.
              </Text>
              <Text color="gray.700">
                <strong>2.5 Currency Fluctuations:</strong> For international bookings, prices quoted in USD may be subject to exchange rate fluctuations. The final amount charged will be based on the exchange rate at the time of payment processing.
              </Text>
            </VStack>
          </MotionBox>

          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Heading as="h2" fontSize="2xl" mb={4} color="gray.900">
              3. Cancellations & Refunds
            </Heading>
            <VStack gap={3} align="stretch">
              <Text color="gray.700">
                <strong>3.1 Flights:</strong> Flight cancellation policies are set by airlines and vary by ticket type. Economy tickets are typically non-refundable or subject to high cancellation fees. We will assist with cancellations but cannot guarantee refunds. Airline policies apply.
              </Text>
              <Text color="gray.700">
                <strong>3.2 Hotels:</strong> Hotel cancellation policies vary by property and rate type. Most bookings allow free cancellation up to 24-72 hours before check-in. Non-refundable rates cannot be cancelled or modified. Specific policies will be communicated at booking.
              </Text>
              <Text color="gray.700">
                <strong>3.3 Tours:</strong> Tour package cancellations are subject to the following: Cancellations 30+ days before departure: 50% refund. Cancellations 15-30 days before: 25% refund. Less than 15 days: non-refundable. Flight tickets within packages are non-refundable once issued.
              </Text>
              <Text color="gray.700">
                <strong>3.4 Shortlets:</strong> Shortlet cancellations vary by property. Typical policy: Free cancellation 7 days before check-in, 50% refund if cancelled 3-7 days before, no refund within 3 days of check-in. Security deposits are always refundable subject to property inspection.
              </Text>
              <Text color="gray.700">
                <strong>3.5 Refund Processing:</strong> Approved refunds will be processed within 14-30 business days to the original payment method. Bank processing times may vary.
              </Text>
              <Text color="gray.700">
                <strong>3.6 Service Fees:</strong> Ontour Travels service fees are non-refundable in all cancellation scenarios.
              </Text>
            </VStack>
          </MotionBox>

          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Heading as="h2" fontSize="2xl" mb={4} color="gray.900">
              4. Changes & Modifications
            </Heading>
            <VStack gap={3} align="stretch">
              <Text color="gray.700">
                <strong>4.1 Customer-Initiated Changes:</strong> Requests to change dates, names, or other booking details must be submitted as soon as possible. Changes are subject to availability and may incur fees from airlines, hotels, or tour operators, plus an administrative fee from Ontour Travels.
              </Text>
              <Text color="gray.700">
                <strong>4.2 Name Changes:</strong> Flight ticket name changes are generally not permitted. Minor corrections (spelling errors) may be possible with airline fees. Hotel and tour bookings allow name changes subject to availability and potential fees.
              </Text>
              <Text color="gray.700">
                <strong>4.3 Company-Initiated Changes:</strong> In rare cases, we may need to modify your booking due to circumstances beyond our control (airline schedule changes, hotel overbooking, etc.). We will notify you immediately and offer alternatives or full refunds.
              </Text>
            </VStack>
          </MotionBox>

          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Heading as="h2" fontSize="2xl" mb={4} color="gray.900">
              5. Travel Documents & Visas
            </Heading>
            <VStack gap={3} align="stretch">
              <Text color="gray.700">
                <strong>5.1 Passport Validity:</strong> You are responsible for ensuring your passport is valid for at least 6 months beyond your return date. Ontour Travels is not liable for denied boarding due to invalid travel documents.
              </Text>
              <Text color="gray.700">
                <strong>5.2 Visas:</strong> You are responsible for obtaining all required visas and travel permits. We provide visa support and guidance but cannot guarantee visa approval. Visa fees and embassy charges are separate from our service fees.
              </Text>
              <Text color="gray.700">
                <strong>5.3 Health Requirements:</strong> You must comply with all health requirements (vaccinations, COVID-19 tests, etc.) for your destination. Check requirements well in advance and obtain necessary certificates.
              </Text>
              <Text color="gray.700">
                <strong>5.4 Entry Denial:</strong> Ontour Travels is not responsible if you are denied entry to any country due to improper documentation, visa issues, or any other reason. No refunds will be issued in such cases.
              </Text>
            </VStack>
          </MotionBox>

          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Heading as="h2" fontSize="2xl" mb={4} color="gray.900">
              6. Liability & Insurance
            </Heading>
            <VStack gap={3} align="stretch">
              <Text color="gray.700">
                <strong>6.1 Role as Agent:</strong> Ontour Travels acts as an agent for airlines, hotels, tour operators, and other service providers. We are not liable for their acts, errors, omissions, or defaults.
              </Text>
              <Text color="gray.700">
                <strong>6.2 Limitations:</strong> Our liability is limited to the fees paid to Ontour Travels for our services. We are not liable for indirect, consequential, or punitive damages including lost profits, missed connections, or travel disruptions.
              </Text>
              <Text color="gray.700">
                <strong>6.3 Force Majeure:</strong> We are not liable for failures or delays caused by events beyond our reasonable control including natural disasters, pandemics, strikes, war, terrorism, or government actions.
              </Text>
              <Text color="gray.700">
                <strong>6.4 Travel Insurance:</strong> We strongly recommend purchasing comprehensive travel insurance covering trip cancellation, medical emergencies, lost luggage, and other unforeseen events. Travel insurance is optional but highly advised.
              </Text>
              <Text color="gray.700">
                <strong>6.5 Personal Belongings:</strong> You are responsible for your personal belongings throughout your trip. Ontour Travels is not liable for lost, stolen, or damaged items.
              </Text>
            </VStack>
          </MotionBox>

          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Heading as="h2" fontSize="2xl" mb={4} color="gray.900">
              7. Customer Responsibilities
            </Heading>
            <VStack gap={3} align="stretch">
              <Text color="gray.700">
                <strong>7.1 Accurate Information:</strong> You must provide accurate, complete, and truthful information when making bookings. Errors in passenger names, dates, or other details may result in additional fees or booking cancellation.
              </Text>
              <Text color="gray.700">
                <strong>7.2 Check-in Requirements:</strong> You must comply with all check-in requirements for flights (typically 3 hours before international flights, 90 minutes for domestic). Late arrival may result in denied boarding with no refund.
              </Text>
              <Text color="gray.700">
                <strong>7.3 Conduct:</strong> You agree to conduct yourself responsibly and respectfully during your travels. Unruly behavior may result in removal from flights, hotels, or tours with no refund.
              </Text>
              <Text color="gray.700">
                <strong>7.4 Shortlet Properties:</strong> For shortlet bookings, you must treat the property with care, follow house rules, and report any damages immediately. You are liable for any damages beyond normal wear and tear.
              </Text>
            </VStack>
          </MotionBox>

          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Heading as="h2" fontSize="2xl" mb={4} color="gray.900">
              8. Intellectual Property
            </Heading>
            <VStack gap={3} align="stretch">
              <Text color="gray.700">
                <strong>8.1 Website Content:</strong> All content on our website (text, images, logos, designs) is the property of Ontour Travels or licensed partners. Unauthorized use, reproduction, or distribution is prohibited.
              </Text>
              <Text color="gray.700">
                <strong>8.2 Trademarks:</strong> "Ontour Travels" and associated logos are trademarks of our company. Use without permission is prohibited.
              </Text>
            </VStack>
          </MotionBox>

          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Heading as="h2" fontSize="2xl" mb={4} color="gray.900">
              9. Privacy & Data Protection
            </Heading>
            <VStack gap={3} align="stretch">
              <Text color="gray.700">
                <strong>9.1 Data Collection:</strong> We collect and process personal information as described in our Privacy Policy. By using our services, you consent to such collection and use.
              </Text>
              <Text color="gray.700">
                <strong>9.2 Third-Party Sharing:</strong> We share necessary information with airlines, hotels, tour operators, and payment processors to fulfill your bookings. We do not sell your personal data.
              </Text>
              <Text color="gray.700">
                <strong>9.3 Communications:</strong> By booking, you consent to receive booking confirmations, updates, and promotional communications via email, SMS, or WhatsApp. You can opt out of promotional messages at any time.
              </Text>
            </VStack>
          </MotionBox>

          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Heading as="h2" fontSize="2xl" mb={4} color="gray.900">
              10. Dispute Resolution
            </Heading>
            <VStack gap={3} align="stretch">
              <Text color="gray.700">
                <strong>10.1 Complaints:</strong> If you have a complaint, contact us immediately via WhatsApp, email, or phone. We will make every effort to resolve issues quickly and fairly.
              </Text>
              <Text color="gray.700">
                <strong>10.2 Governing Law:</strong> These Terms & Conditions are governed by the laws of the Federal Republic of Nigeria. Any disputes will be subject to the exclusive jurisdiction of Nigerian courts.
              </Text>
              <Text color="gray.700">
                <strong>10.3 Mediation:</strong> We encourage resolving disputes through good-faith negotiation or mediation before resorting to formal legal proceedings.
              </Text>
            </VStack>
          </MotionBox>

          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Heading as="h2" fontSize="2xl" mb={4} color="gray.900">
              11. Miscellaneous
            </Heading>
            <VStack gap={3} align="stretch">
              <Text color="gray.700">
                <strong>11.1 Severability:</strong> If any provision of these terms is found to be invalid or unenforceable, the remaining provisions will continue in full force and effect.
              </Text>
              <Text color="gray.700">
                <strong>11.2 Entire Agreement:</strong> These Terms & Conditions, along with our Privacy Policy, constitute the entire agreement between you and Ontour Travels regarding our services.
              </Text>
              <Text color="gray.700">
                <strong>11.3 No Waiver:</strong> Our failure to enforce any provision does not constitute a waiver of that provision or any other provision.
              </Text>
            </VStack>
          </MotionBox>

          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Heading as="h2" fontSize="2xl" mb={4} color="gray.900">
              12. Contact Information
            </Heading>
            <Text color="gray.700" mb={3}>
              For questions about these Terms & Conditions, please contact us:
            </Text>
            <VStack gap={2} align="stretch" color="gray.700">
              <Text><strong>Email:</strong> info@ontourtravels.com.ng</Text>
              <Text><strong>Phone:</strong> +234 812 345 6789</Text>
              <Text><strong>WhatsApp:</strong> +234 812 345 6789</Text>
              <Text><strong>Address:</strong> Lagos, Nigeria</Text>
            </VStack>
          </MotionBox>

          <Box borderTop="1px solid" borderColor="gray.200" pt={8}>
            <Text fontSize="sm" color="gray.600" textAlign="center">
              By proceeding with a booking, you acknowledge that you have read, understood, and agree to these Terms & Conditions.
            </Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
