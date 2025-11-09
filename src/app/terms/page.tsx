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
import { FileText, MessageCircle, Menu, X, Home } from "lucide-react";
import { useState } from "react";

const MotionBox = motion.create(Box);

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function TermsPage() {
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
            <FileText size={64} color="#C9A449" style={{ margin: '0 auto 16px' }} />
            <Heading as="h1" fontSize={{ base: "4xl", md: "5xl" }} mb={4} fontFamily="'Montserrat', sans-serif">
              Terms & Conditions
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
                By accessing and using the Ontour Travels website (ontourtravels.com.ng) and our services, you accept and agree to be bound by these Terms and Conditions. Please read them carefully before making any booking.
              </Text>
            </Box>
          </MotionBox>

          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Heading as="h2" fontSize="2xl" mb={4} color="#152852" fontFamily="'Montserrat', sans-serif">
              1. General Terms
            </Heading>
            <VStack gap={3} align="stretch">
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                <strong>1.1</strong> Ontour Travels ("we", "us", "our") is a registered travel agency operating in Nigeria, providing flight ticketing, hotel bookings, shortlet accommodations, and tour package services.
              </Text>
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                <strong>1.2</strong> These terms apply to all bookings made through our website, WhatsApp, phone, or email.
              </Text>
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                <strong>1.3</strong> By making a booking, you confirm that you are at least 18 years old and have the legal capacity to enter into a binding contract.
              </Text>
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                <strong>1.4</strong> We reserve the right to amend these terms at any time. The version in effect at the time of your booking will apply to your transaction.
              </Text>
            </VStack>
          </MotionBox>

          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Heading as="h2" fontSize="2xl" mb={4} color="#152852" fontFamily="'Montserrat', sans-serif">
              2. Bookings & Payments
            </Heading>
            <VStack gap={3} align="stretch">
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                <strong>2.1 Booking Confirmation:</strong> A booking is only confirmed once full payment (or deposit, where applicable) is received and you receive a booking confirmation via email or WhatsApp.
              </Text>
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                <strong>2.2 Payment Methods:</strong> We accept payments via Paystack and Flutterwave (bank cards, bank transfers, USSD). All transactions are processed in Nigerian Naira (NGN) or US Dollars (USD).
              </Text>
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                <strong>2.3 Payment Schedule:</strong> For flights and hotels: Full payment required at booking. For tour packages: 50% deposit to secure booking; balance due 14-30 days before departure (as specified in your booking confirmation).
              </Text>
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                <strong>2.4 Pricing:</strong> All prices displayed on our website are indicative and subject to availability at the time of booking. Flight and hotel prices fluctuate in real-time and may change between search and purchase.
              </Text>
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                <strong>2.5 Price Guarantee:</strong> Once you receive a booking confirmation and make full payment, the price is locked in and will not change (except in cases of government-imposed taxes or airline fuel surcharges beyond our control).
              </Text>
            </VStack>
          </MotionBox>

          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Heading as="h2" fontSize="2xl" mb={4} color="#152852" fontFamily="'Montserrat', sans-serif">
              3. Flights & Airlines
            </Heading>
            <VStack gap={3} align="stretch">
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                <strong>3.1 Third-Party Services:</strong> We act as an agent for airlines. Flight bookings are subject to the terms and conditions of the respective airline, including baggage policies, check-in requirements, and cancellation policies.
              </Text>
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                <strong>3.2 Flight Changes:</strong> Changes to flight dates, routes, or passenger names are subject to the airline's change policies and fees. We will assist with change requests but cannot guarantee acceptance.
              </Text>
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                <strong>3.3 Cancellations:</strong> Flight cancellations are governed by the airline's fare rules. Non-refundable tickets cannot be refunded; partially refundable tickets may incur penalties. We will process eligible refunds minus our service fee (₦5,000-10,000).
              </Text>
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                <strong>3.4 Delays & Disruptions:</strong> We are not liable for airline delays, cancellations, or schedule changes. Contact the airline directly for rebooking or compensation. We will assist where possible.
              </Text>
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                <strong>3.5 Travel Documents:</strong> You are responsible for ensuring you have valid passports, visas, and all required travel documents. We provide visa support but do not guarantee visa approval.
              </Text>
            </VStack>
          </MotionBox>

          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Heading as="h2" fontSize="2xl" mb={4} color="#152852" fontFamily="'Montserrat', sans-serif">
              4. Hotels & Accommodation
            </Heading>
            <VStack gap={3} align="stretch">
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                <strong>4.1 Hotel Bookings:</strong> Hotel reservations are subject to the hotel's terms and conditions, including check-in/check-out times, cancellation policies, and additional fees (e.g., resort fees, city taxes).
              </Text>
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                <strong>4.2 Cancellations:</strong> Cancellation policies vary by hotel and rate type. Non-refundable rates cannot be cancelled. Refundable rates typically allow free cancellation 24-48 hours before check-in. Late cancellations or no-shows may incur penalties.
              </Text>
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                <strong>4.3 Special Requests:</strong> Requests for specific rooms, beds, floors, or amenities are noted but not guaranteed. Hotels will accommodate when possible.
              </Text>
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                <strong>4.4 Disputes:</strong> For issues during your stay (cleanliness, service, etc.), contact the hotel directly first. If unresolved, contact us immediately and we'll assist.
              </Text>
            </VStack>
          </MotionBox>

          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Heading as="h2" fontSize="2xl" mb={4} color="#152852" fontFamily="'Montserrat', sans-serif">
              5. Shortlets
            </Heading>
            <VStack gap={3} align="stretch">
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                <strong>5.1 Booking & Payment:</strong> Shortlet bookings require full payment or a 50% deposit (remainder due before check-in). A refundable security deposit is typically required (₦30,000-100,000 depending on property).
              </Text>
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                <strong>5.2 Cancellation Policy:</strong> Cancellations 7+ days before check-in receive a full refund minus a 10% admin fee. Cancellations 3-7 days before check-in receive a 50% refund. Cancellations less than 3 days before check-in are non-refundable.
              </Text>
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                <strong>5.3 Property Use:</strong> Properties must be used for accommodation only. No parties, events, or commercial activities without prior written permission. Maximum occupancy limits must be respected.
              </Text>
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                <strong>5.4 Damages:</strong> Guests are responsible for any damage beyond normal wear and tear. Repair costs will be deducted from the security deposit. Damages exceeding the deposit must be paid before check-out.
              </Text>
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                <strong>5.5 House Rules:</strong> Guests must comply with property-specific house rules (provided at booking). Violations may result in immediate eviction without refund.
              </Text>
            </VStack>
          </MotionBox>

          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Heading as="h2" fontSize="2xl" mb={4} color="#152852" fontFamily="'Montserrat', sans-serif">
              6. Tours & Packages
            </Heading>
            <VStack gap={3} align="stretch">
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                <strong>6.1 Tour Inclusions:</strong> Each tour listing clearly states what is included (flights, accommodation, meals, activities, etc.) and excluded. Read carefully before booking.
              </Text>
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                <strong>6.2 Payment Schedule:</strong> 50% deposit due at booking to secure your spot. Balance due 14-30 days before departure. Late payment may result in booking cancellation without refund.
              </Text>
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                <strong>6.3 Cancellation by Customer:</strong> Cancellations 30+ days before departure forfeit the deposit only. Cancellations 14-30 days before departure forfeit 50% of total cost. Cancellations less than 14 days before departure are non-refundable.
              </Text>
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                <strong>6.4 Cancellation by Us:</strong> We reserve the right to cancel a tour due to insufficient bookings, safety concerns, or unforeseen circumstances. In such cases, you receive a full refund or the option to rebook a different tour.
              </Text>
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                <strong>6.5 Itinerary Changes:</strong> We reserve the right to make minor changes to tour itineraries for operational or safety reasons. Significant changes will be communicated in advance.
              </Text>
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                <strong>6.6 Travel Insurance:</strong> We strongly recommend purchasing travel insurance to cover trip cancellations, medical emergencies, lost luggage, and travel disruptions.
              </Text>
            </VStack>
          </MotionBox>

          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Heading as="h2" fontSize="2xl" mb={4} color="#152852" fontFamily="'Montserrat', sans-serif">
              7. Liability & Responsibilities
            </Heading>
            <VStack gap={3} align="stretch">
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                <strong>7.1 Our Role:</strong> We act as an intermediary between you and travel service providers (airlines, hotels, tour operators). We are not liable for their actions, omissions, or failures to deliver services.
              </Text>
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                <strong>7.2 Accuracy of Information:</strong> We strive to provide accurate information on our website, but details (prices, availability, descriptions) are provided by third parties and may change without notice.
              </Text>
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                <strong>7.3 Personal Responsibility:</strong> You are responsible for your personal safety, health, and belongings during travel. We are not liable for injury, illness, loss, or damage incurred during your trip.
              </Text>
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                <strong>7.4 Force Majeure:</strong> We are not liable for failure to fulfill our obligations due to circumstances beyond our control (natural disasters, pandemics, wars, strikes, government actions, etc.).
              </Text>
            </VStack>
          </MotionBox>

          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Heading as="h2" fontSize="2xl" mb={4} color="#152852" fontFamily="'Montserrat', sans-serif">
              8. Intellectual Property
            </Heading>
            <VStack gap={3} align="stretch">
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                <strong>8.1</strong> All content on our website (text, images, logos, design) is our property or licensed to us. You may not copy, reproduce, or distribute our content without written permission.
              </Text>
            </VStack>
          </MotionBox>

          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Heading as="h2" fontSize="2xl" mb={4} color="#152852" fontFamily="'Montserrat', sans-serif">
              9. Data Protection & Privacy
            </Heading>
            <VStack gap={3} align="stretch">
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                <strong>9.1</strong> Your personal information is handled according to our Privacy Policy. By using our services, you consent to the collection and use of your information as described in the Privacy Policy.
              </Text>
            </VStack>
          </MotionBox>

          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Heading as="h2" fontSize="2xl" mb={4} color="#152852" fontFamily="'Montserrat', sans-serif">
              10. Complaints & Disputes
            </Heading>
            <VStack gap={3} align="stretch">
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                <strong>10.1</strong> If you have a complaint, contact us within 7 days of the issue occurring. We'll work to resolve it promptly and fairly.
              </Text>
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                <strong>10.2</strong> If a dispute cannot be resolved amicably, it will be governed by the laws of Nigeria and subject to the jurisdiction of Nigerian courts.
              </Text>
            </VStack>
          </MotionBox>

          <MotionBox variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Heading as="h2" fontSize="2xl" mb={4} color="#152852" fontFamily="'Montserrat', sans-serif">
              11. Contact Information
            </Heading>
            <VStack gap={3} align="stretch">
              <Text color="gray.700" lineHeight="tall" fontFamily="'Open Sans', sans-serif">
                For questions about these Terms & Conditions, contact us:
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

          <Box bg="yellow.50" p={6} borderRadius="lg" borderLeft="4px solid" borderColor="yellow.500">
            <Text color="gray.700" fontStyle="italic" fontFamily="'Open Sans', sans-serif">
              <strong>Important Notice:</strong> By proceeding with a booking, you acknowledge that you have read, understood, and agree to these Terms & Conditions in their entirety.
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
            Start planning your adventure with confidence.
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