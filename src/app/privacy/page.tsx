"use client";

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Link,
  Button,
  IconButton,
  Image,
  Drawer,
  Flex,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Shield, MessageCircle, Menu, X, Home } from "lucide-react";
import { useState } from "react";

const MotionBox = motion.create(Box);

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function PrivacyPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Box minH="100vh">
      {/* Navigation Header */}
      <Box position="sticky" top={0} zIndex={50} bg="white" boxShadow="sm">
        <Container maxW="7xl" py={4}>
          <Flex justify="space-between" align="center">
            <HStack gap={2} as="a" href="/">
              <Image 
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/ontour_logo-removebg-preview-1762616230494.png?width=8000&height=8000&resize=contain"
                alt="Ontour Travels Logo"
                h="60px"
                w="auto"
                objectFit="contain"
              />
            </HStack>
            <HStack gap={6} display={{ base: "none", md: "flex" }}>
              <Link href="/" color="#2C2C2C" _hover={{ color: "#152852" }}>Home</Link>
              <Link href="/book" color="#2C2C2C" _hover={{ color: "#152852" }}>Flights & Hotels</Link>
              <Link href="/shortlets" color="#2C2C2C" _hover={{ color: "#152852" }}>Shortlets</Link>
              <Link href="/tours" color="#2C2C2C" _hover={{ color: "#152852" }}>Tours</Link>
              <Link href="/about" color="#2C2C2C" _hover={{ color: "#152852" }}>About</Link>
              <Link href="/contact" color="#2C2C2C" _hover={{ color: "#152852" }}>Contact</Link>
              <Button bg="#152852" color="white" _hover={{ bg: "#0d1a35" }} size="sm" as="a" href="https://wa.me/2348123456789" target="_blank">
                <MessageCircle size={16} style={{ marginRight: '4px' }} />
                WhatsApp
              </Button>
            </HStack>
            <IconButton 
              display={{ base: "flex", md: "none" }} 
              aria-label="Menu"
              onClick={() => setMobileMenuOpen(true)}
              variant="ghost"
            >
              <Menu />
            </IconButton>
          </Flex>
        </Container>
      </Box>

      {/* Mobile Menu Drawer */}
      <Drawer.Root open={mobileMenuOpen} onOpenChange={(details) => setMobileMenuOpen(details.open)} placement="end">
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Menu</Drawer.Title>
              <Drawer.CloseTrigger asChild>
                <IconButton variant="ghost" aria-label="Close">
                  <X />
                </IconButton>
              </Drawer.CloseTrigger>
            </Drawer.Header>
            <Drawer.Body>
              <VStack gap={4} align="stretch">
                <Link href="/" color="#2C2C2C" _hover={{ color: "#152852" }} fontSize="lg" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                <Link href="/book" color="#2C2C2C" _hover={{ color: "#152852" }} fontSize="lg" onClick={() => setMobileMenuOpen(false)}>Flights & Hotels</Link>
                <Link href="/shortlets" color="#2C2C2C" _hover={{ color: "#152852" }} fontSize="lg" onClick={() => setMobileMenuOpen(false)}>Shortlets</Link>
                <Link href="/tours" color="#2C2C2C" _hover={{ color: "#152852" }} fontSize="lg" onClick={() => setMobileMenuOpen(false)}>Tours</Link>
                <Link href="/about" color="#2C2C2C" _hover={{ color: "#152852" }} fontSize="lg" onClick={() => setMobileMenuOpen(false)}>About</Link>
                <Link href="/contact" color="#2C2C2C" _hover={{ color: "#152852" }} fontSize="lg" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
                <Button bg="#152852" color="white" _hover={{ bg: "#0d1a35" }} size="lg" as="a" href="https://wa.me/2348123456789" target="_blank">
                  <MessageCircle size={20} style={{ marginRight: '8px' }} />
                  WhatsApp
                </Button>
              </VStack>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>

      {/* Hero Section */}
      <Box bg="#152852" color="white" py={16}>
        <Container maxW="5xl" textAlign="center">
          <MotionBox variants={fadeInUp} initial="hidden" animate="visible">
            <Shield size={64} color="#C9A449" style={{ margin: '0 auto 16px' }} />
            <Heading as="h1" fontSize={{ base: "4xl", md: "5xl" }} mb={4} fontFamily="'Montserrat', sans-serif">
              Privacy Policy
            </Heading>
            <Text fontSize="lg" color="#FAFAFA" fontFamily="'Poppins', sans-serif">
              Last updated: January 2025
            </Text>
          </MotionBox>
        </Container>
      </Box>

      {/* Content */}
      <Container maxW="4xl" py={16}>
        <VStack gap={8} align="stretch">
          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Box bg="blue.50" p={6} borderRadius="lg" mb={8} borderLeft="4px solid" borderColor="blue.600">
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                At Ontour Travels, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our services or visit our website.
              </Text>
            </Box>
          </MotionBox>

          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Heading as="h2" fontSize="2xl" mb={4} color="#152852" fontFamily="'Montserrat', sans-serif">
              1. Information We Collect
            </Heading>
            <VStack gap={3} align="stretch">
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                <strong>1.1 Personal Information:</strong> When you book a service, we collect: Full name, Email address, Phone number, Date of birth, Passport details (for international travel), Payment information (processed securely through Paystack/Flutterwave).
              </Text>
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                <strong>1.2 Automatically Collected Data:</strong> IP address, Browser type and version, Device information, Pages visited and time spent, Cookies and similar tracking technologies.
              </Text>
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                <strong>1.3 Communication Data:</strong> Messages sent via our contact forms, WhatsApp conversations, Email correspondence.
              </Text>
            </VStack>
          </MotionBox>

          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Heading as="h2" fontSize="2xl" mb={4} color="#152852" fontFamily="'Montserrat', sans-serif">
              2. How We Use Your Information
            </Heading>
            <VStack gap={3} align="stretch">
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                We use your information to: Process bookings and payments, Send booking confirmations and travel documents, Provide customer support, Send service updates and important notifications, Improve our website and services, Comply with legal obligations, Prevent fraud and ensure security, Send promotional offers (with your consent).
              </Text>
            </VStack>
          </MotionBox>

          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Heading as="h2" fontSize="2xl" mb={4} color="#152852" fontFamily="'Montserrat', sans-serif">
              3. Information Sharing & Disclosure
            </Heading>
            <VStack gap={3} align="stretch">
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                <strong>3.1 Service Providers:</strong> We share information with airlines, hotels, tour operators, and other service providers necessary to fulfill your bookings. These parties have their own privacy policies.
              </Text>
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                <strong>3.2 Payment Processors:</strong> Payment data is processed by Paystack and Flutterwave. We never store your full credit card details on our servers.
              </Text>
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                <strong>3.3 Legal Compliance:</strong> We may disclose your information if required by law, court order, or government request, or to protect our rights and safety.
              </Text>
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                <strong>3.4 We DO NOT:</strong> Sell your personal information to third parties, Share your data with advertisers, Use your information for purposes unrelated to travel services without consent.
              </Text>
            </VStack>
          </MotionBox>

          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Heading as="h2" fontSize="2xl" mb={4} color="#152852" fontFamily="'Montserrat', sans-serif">
              4. Data Security
            </Heading>
            <VStack gap={3} align="stretch">
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                We implement industry-standard security measures to protect your data: SSL encryption for all transactions, Secure payment gateways (Paystack/Flutterwave), Regular security audits, Access controls limiting who can view your information, Encrypted data storage.
              </Text>
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                However, no method of transmission over the internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.
              </Text>
            </VStack>
          </MotionBox>

          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Heading as="h2" fontSize="2xl" mb={4} color="#152852" fontFamily="'Montserrat', sans-serif">
              5. Cookies & Tracking Technologies
            </Heading>
            <VStack gap={3} align="stretch">
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                We use cookies to: Remember your preferences, Analyze website traffic, Improve user experience, Enable certain website features.
              </Text>
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                You can disable cookies through your browser settings, but this may affect website functionality.
              </Text>
            </VStack>
          </MotionBox>

          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Heading as="h2" fontSize="2xl" mb={4} color="#152852" fontFamily="'Montserrat', sans-serif">
              6. Your Rights
            </Heading>
            <VStack gap={3} align="stretch">
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                You have the right to: Access your personal data, Request corrections to inaccurate information, Request deletion of your data (subject to legal retention requirements), Opt out of marketing communications, Withdraw consent for data processing, Lodge a complaint with relevant data protection authorities.
              </Text>
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                To exercise these rights, contact us at info@ontourtravels.com.ng or +234 812 345 6789.
              </Text>
            </VStack>
          </MotionBox>

          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Heading as="h2" fontSize="2xl" mb={4} color="#152852" fontFamily="'Montserrat', sans-serif">
              7. Data Retention
            </Heading>
            <VStack gap={3} align="stretch">
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                We retain your personal information for as long as necessary to: Fulfill the purposes outlined in this policy, Comply with legal obligations (e.g., tax records, transaction history), Resolve disputes and enforce our agreements.
              </Text>
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                Booking records are typically retained for 7 years for legal and accounting purposes.
              </Text>
            </VStack>
          </MotionBox>

          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Heading as="h2" fontSize="2xl" mb={4} color="#152852" fontFamily="'Montserrat', sans-serif">
              8. Third-Party Links
            </Heading>
            <VStack gap={3} align="stretch">
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                Our website may contain links to third-party websites (airlines, hotels, payment processors). We are not responsible for their privacy practices. Review their privacy policies before providing any information.
              </Text>
            </VStack>
          </MotionBox>

          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Heading as="h2" fontSize="2xl" mb={4} color="#152852" fontFamily="'Montserrat', sans-serif">
              9. Children's Privacy
            </Heading>
            <VStack gap={3} align="stretch">
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                Our services are not directed at individuals under 18. We do not knowingly collect personal information from minors. If you believe we have inadvertently collected data from a child, contact us immediately.
              </Text>
            </VStack>
          </MotionBox>

          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Heading as="h2" fontSize="2xl" mb={4} color="#152852" fontFamily="'Montserrat', sans-serif">
              10. Changes to This Privacy Policy
            </Heading>
            <VStack gap={3} align="stretch">
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last Updated" date. Continued use of our services after changes indicates acceptance of the updated policy.
              </Text>
            </VStack>
          </MotionBox>

          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Heading as="h2" fontSize="2xl" mb={4} color="#152852" fontFamily="'Montserrat', sans-serif">
              11. Contact Us
            </Heading>
            <VStack gap={3} align="stretch">
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                For questions about this Privacy Policy or to exercise your data rights, contact us:
              </Text>
              <VStack align="start" gap={2} pl={4}>
                <Text color="gray.700" fontFamily="'Open Sans', sans-serif">
                  <strong>Email:</strong> info@ontourtravels.com.ng
                </Text>
                <Text color="gray.700" fontFamily="'Open Sans', sans-serif">
                  <strong>Phone:</strong> +234 812 345 6789
                </Text>
                <Text color="gray.700" fontFamily="'Open Sans', sans-serif">
                  <strong>WhatsApp:</strong> +234 812 345 6789
                </Text>
                <Text color="gray.700" fontFamily="'Open Sans', sans-serif">
                  <strong>Office:</strong> Lagos, Nigeria
                </Text>
              </VStack>
            </VStack>
          </MotionBox>

          <Box bg="green.50" p={6} borderRadius="lg" borderLeft="4px solid" borderColor="green.500">
            <Text color="gray.700" fontWeight="medium" mb={2} fontFamily="'Open Sans', sans-serif">
              Your privacy matters to us.
            </Text>
            <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
              We're committed to transparency and protecting your personal information. If you have concerns or questions about how we handle your data, please don't hesitate to reach out.
            </Text>
          </Box>
        </VStack>
      </Container>

      {/* CTA Section */}
      <Box bg="#f7f4ed" py={12}>
        <Container maxW="4xl" textAlign="center">
          <Heading as="h3" fontSize="3xl" mb={4} color="#2C2C2C" fontFamily="'Montserrat', sans-serif">
            Ready to Book Your Next Trip?
          </Heading>
          <Text fontSize="lg" color="#555555" mb={6} fontFamily="'Poppins', sans-serif">
            Your data is safe with us. Start planning with confidence.
          </Text>
          <HStack gap={4} justify="center" flexWrap="wrap">
            <Button as="a" href="/" bg="#152852" color="white" _hover={{ bg: "#0d1a35" }} size="lg">
              <Home size={20} style={{ marginRight: '8px' }} />
              Back to Home
            </Button>
            <Button as="a" href="https://wa.me/2348123456789" target="_blank" bg="#25D366" color="white" _hover={{ bg: "#1da851" }} size="lg">
              <MessageCircle size={20} style={{ marginRight: '8px' }} />
              Chat on WhatsApp
            </Button>
          </HStack>
        </Container>
      </Box>

      {/* Footer */}
      <Box bg="#2C2C2C" color="white" py={8}>
        <Container maxW="7xl">
          <Flex justify="space-between" align="center" flexWrap="wrap" gap={4}>
            <Text color="#E5E5E5" fontSize="sm" fontFamily="'Open Sans', sans-serif">
              &copy; 2024 Ontour Travels. All rights reserved.
            </Text>
            <HStack gap={6}>
              <Link href="/terms" color="#E5E5E5" _hover={{ color: "white" }} fontSize="sm">Terms & Conditions</Link>
              <Link href="/privacy" color="#E5E5E5" _hover={{ color: "white" }} fontSize="sm">Privacy Policy</Link>
              <Link href="/faq" color="#E5E5E5" _hover={{ color: "white" }} fontSize="sm">FAQ</Link>
              <Link href="/contact" color="#E5E5E5" _hover={{ color: "white" }} fontSize="sm">Contact</Link>
            </HStack>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}