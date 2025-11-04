"use client";

import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Button,
  Card,
  Image,
  Grid,
  HStack,
  VStack,
  Icon,
  Link,
  IconButton,
  Input,
  Tabs,
} from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Avatar } from "@/components/ui/avatar";
import { 
  MapPin, 
  Plane, 
  Calendar, 
  Shield, 
  Star, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram, 
  Menu,
  Clock,
  Headphones,
  CheckCircle,
  CreditCard,
  Hotel,
  Search,
  MessageCircle,
  Heart,
} from "lucide-react";
import { useState } from "react";
import NextImage from "next/image";

const MotionBox = motion.create(Box);
const MotionFlex = motion.create(Flex);
const MotionCard = motion.create(Card.Root);

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

export default function Home() {
  const [searchType, setSearchType] = useState<"flights" | "hotels">("flights");
  const [tripType, setTripType] = useState<"round-trip" | "one-way">("round-trip");
  
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  return (
    <Box minH="100vh">
      {/* Navigation Header */}
      <MotionBox
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={50}
        bg="white"
        backdropFilter="blur(8px)"
        boxShadow="sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Container maxW="7xl" py={4}>
          <Flex justify="space-between" align="center">
            <HStack gap={2}>
              <Box position="relative" w={10} h={10}>
                <NextImage
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/ontour_logo-removebg-preview-1762251116073.png?width=8000&height=8000&resize=contain"
                  alt="Ontour Travels Logo"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </Box>
              <Text fontSize="2xl" fontFamily="var(--font-montserrat)" fontWeight="bold" color="gray.900">
                Ontour Travels
              </Text>
            </HStack>
            <HStack gap={8} display={{ base: "none", md: "flex" }}>
              <Link href="/book" color="gray.700" _hover={{ color: "blue.600" }}>
                Flights & Hotels
              </Link>
              <Link href="/shortlets" color="gray.700" _hover={{ color: "blue.600" }}>
                Shortlets
              </Link>
              <Link href="/tours" color="gray.700" _hover={{ color: "blue.600" }}>
                Tours
              </Link>
              <Link href="/about" color="gray.700" _hover={{ color: "blue.600" }}>
                About
              </Link>
              <Link href="/contact" color="gray.700" _hover={{ color: "blue.600" }}>
                Contact
              </Link>
              <Button colorPalette="blue" as="a" href="https://wa.me/2348123456789" target="_blank">
                <Icon as={MessageCircle} mr={2} />
                WhatsApp
              </Button>
            </HStack>
            <IconButton display={{ base: "flex", md: "none" }} aria-label="Menu">
              <Menu />
            </IconButton>
          </Flex>
        </Container>
      </MotionBox>

      {/* Hero Section with Search */}
      <MotionBox
        position="relative"
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="white"
        pt={16}
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <Box
          position="absolute"
          inset={0}
          bgImage="url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80')"
          bgSize="cover"
          bgPosition="center"
          bgRepeat="no-repeat"
        >
          <Box position="absolute" inset={0} bg="blackAlpha.700" />
        </Box>
        
        <Container maxW="5xl" position="relative" zIndex={10}>
          <MotionBox
            textAlign="center"
            mb={8}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Heading as="h1" fontSize={{ base: "4xl", md: "6xl" }} fontWeight="bold" mb={4}>
              Book Flights, Hotels & Shortlet Stays — Fast
            </Heading>
            <Text fontSize={{ base: "lg", md: "xl" }} color="gray.100" mb={2}>
              Trusted Lagos travel concierge. Seamless bookings, real support.
            </Text>
            <Text fontSize="sm" color="blue.300">
              Powered by Amadeus
            </Text>
          </MotionBox>

          {/* Booking Widget */}
          <MotionBox
            bg="white"
            borderRadius="xl"
            p={6}
            boxShadow="2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Tabs.Root value={searchType} onValueChange={(e) => setSearchType(e.value as any)}>
              <Tabs.List mb={6}>
                <Tabs.Trigger value="flights" color="gray.700" fontWeight="medium">
                  <Icon as={Plane} mr={2} />
                  Flights
                </Tabs.Trigger>
                <Tabs.Trigger value="hotels" color="gray.700" fontWeight="medium">
                  <Icon as={Hotel} mr={2} />
                  Hotels
                </Tabs.Trigger>
              </Tabs.List>

              <Tabs.Content value="flights">
                <VStack gap={4} align="stretch">
                  <HStack gap={2} flexWrap="wrap">
                    <Button
                      size="sm"
                      variant={tripType === "round-trip" ? "solid" : "outline"}
                      colorPalette="blue"
                      onClick={() => setTripType("round-trip")}
                    >
                      Round-trip
                    </Button>
                    <Button
                      size="sm"
                      variant={tripType === "one-way" ? "solid" : "outline"}
                      colorPalette="blue"
                      onClick={() => setTripType("one-way")}
                    >
                      One-way
                    </Button>
                  </HStack>
                  
                  <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                    <Input placeholder="From (e.g., LOS - Lagos)" size="lg" color="gray.700" />
                    <Input placeholder="To (e.g., LHR - London)" size="lg" color="gray.700" />
                    <Input type="date" placeholder="Depart date" size="lg" color="gray.700" />
                    {tripType === "round-trip" && (
                      <Input type="date" placeholder="Return date" size="lg" color="gray.700" />
                    )}
                  </Grid>
                  
                  <HStack gap={4}>
                    <Input placeholder="Passengers (1 Adult)" size="lg" color="gray.700" />
                    <Input placeholder="Economy" size="lg" color="gray.700" />
                  </HStack>
                  
                  <Button colorPalette="blue" size="lg" w="full" as="a" href="/book">
                    <Icon as={Search} mr={2} />
                    Search Flights
                  </Button>
                  <Text fontSize="xs" color="gray.500" textAlign="center">
                    Safe payments via Paystack/Flutterwave
                  </Text>
                </VStack>
              </Tabs.Content>

              <Tabs.Content value="hotels">
                <VStack gap={4} align="stretch">
                  <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                    <Input placeholder="Destination (e.g., Lagos, Nigeria)" size="lg" color="gray.700" />
                    <Input type="date" placeholder="Check-in" size="lg" color="gray.700" />
                    <Input type="date" placeholder="Check-out" size="lg" color="gray.700" />
                    <Input placeholder="Guests & Rooms (2 guests, 1 room)" size="lg" color="gray.700" />
                  </Grid>
                  
                  <Button colorPalette="blue" size="lg" w="full" as="a" href="/book">
                    <Icon as={Search} mr={2} />
                    Search Hotels
                  </Button>
                  <Text fontSize="xs" color="gray.500" textAlign="center">
                    Safe payments via Paystack/Flutterwave
                  </Text>
                </VStack>
              </Tabs.Content>
            </Tabs.Root>
          </MotionBox>
        </Container>
      </MotionBox>

      {/* Trust & USPs */}
      <AnimatedSection>
        <Container maxW="7xl" py={12}>
          <MotionFlex
            justify="space-around"
            align="center"
            gap={8}
            flexWrap="wrap"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <TrustBadge icon={CheckCircle} text="IATA-grade inventory (via Amadeus)" />
            <TrustBadge icon={Shield} text="Secure payments (Paystack/Flutterwave)" />
            <TrustBadge icon={Clock} text="Local support (Mon–Sat, 9–6 WAT)" />
            <TrustBadge icon={MessageCircle} text="WhatsApp confirmations" />
          </MotionFlex>
        </Container>
      </AnimatedSection>

      {/* Featured Shortlets */}
      <AnimatedSection bg="gray.50">
        <Container maxW="7xl" py={20}>
          <MotionBox
            textAlign="center"
            mb={12}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Heading as="h2" fontSize="4xl" fontWeight="bold" mb={4} color="gray.900">
              Lagos Shortlet Stays You'll Love
            </Heading>
            <Text fontSize="xl" color="gray.600">
              Flexible check-in, verified homes, responsive hosts.
            </Text>
          </MotionBox>

          <MotionBox
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8}>
              <ShortletCard
                image="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80"
                title="1BR Apartment – Lekki Phase 1"
                location="Lekki, Lagos"
                price="₦45,000"
                amenities={["Wi-Fi", "AC", "Pool", "Parking"]}
              />
              <ShortletCard
                image="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80"
                title="Luxury 2BR – Victoria Island"
                location="Victoria Island, Lagos"
                price="₦75,000"
                amenities={["Wi-Fi", "AC", "Gym", "Security"]}
              />
              <ShortletCard
                image="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80"
                title="Cozy Studio – Ikeja GRA"
                location="Ikeja, Lagos"
                price="₦35,000"
                amenities={["Wi-Fi", "AC", "Kitchen", "TV"]}
              />
            </Grid>
          </MotionBox>

          <Flex justify="center" mt={10}>
            <Button as="a" href="/shortlets" colorPalette="blue" size="lg">
              View All Shortlets
            </Button>
          </Flex>
        </Container>
      </AnimatedSection>

      {/* Featured Tours */}
      <AnimatedSection bg="white">
        <Container maxW="7xl" py={20}>
          <MotionBox
            textAlign="center"
            mb={12}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Heading as="h2" fontSize="4xl" fontWeight="bold" mb={4} color="gray.900">
              Curated Tours & Experiences
            </Heading>
            <Text fontSize="xl" color="gray.600">
              Handpicked trips with transparent pricing.
            </Text>
          </MotionBox>

          <MotionBox
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8}>
              <TourCard
                image="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80"
                title="Weekend in Dubai"
                duration="4D/3N"
                priceFrom="₦850,000"
                tag="International"
              />
              <TourCard
                image="https://images.unsplash.com/photo-1565552645632-d725f8bfc19d?w=600&q=80"
                title="Zanzibar Escape"
                duration="5D/4N"
                priceFrom="₦650,000"
                tag="Regional"
              />
              <TourCard
                image="https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=600&q=80"
                title="Obudu Cattle Ranch"
                duration="3D/2N"
                priceFrom="₦180,000"
                tag="Local"
              />
            </Grid>
          </MotionBox>

          <Flex justify="center" mt={10}>
            <Button as="a" href="/tours" colorPalette="blue" size="lg">
              Explore All Tours
            </Button>
          </Flex>
        </Container>
      </AnimatedSection>

      {/* How It Works */}
      <AnimatedSection bg="blue.600" color="white">
        <Container maxW="7xl" py={20}>
          <MotionBox
            textAlign="center"
            mb={12}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Heading as="h2" fontSize="4xl" fontWeight="bold" mb={4}>
              How It Works
            </Heading>
            <Text fontSize="xl" color="blue.100">
              Simple, secure, and seamless travel booking in 3 easy steps
            </Text>
          </MotionBox>

          <MotionBox
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={12}>
              <ProcessStep
                number="1"
                icon={Search}
                title="Search & Select"
                description="Compare real-time flight & hotel options"
              />
              <ProcessStep
                number="2"
                icon={CreditCard}
                title="Book Securely"
                description="Pay in NGN or USD; instant confirmations"
              />
              <ProcessStep
                number="3"
                icon={Headphones}
                title="Travel Confidently"
                description="Our team supports you end-to-end"
              />
            </Grid>
          </MotionBox>
        </Container>
      </AnimatedSection>

      {/* Testimonials */}
      <AnimatedSection bg="gray.50">
        <Container maxW="7xl" py={20}>
          <MotionBox
            textAlign="center"
            mb={12}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Heading as="h2" fontSize="4xl" fontWeight="bold" mb={4} color="gray.900">
              What Our Travelers Say
            </Heading>
            <Text fontSize="xl" color="gray.600">
              Real experiences from real travelers who trusted us
            </Text>
          </MotionBox>

          <MotionBox
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8}>
              <TestimonialCard
                name="Chidinma Okafor"
                location="Lagos"
                avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
                rating={5}
                text="Smooth booking and quick support on WhatsApp. Got a great deal to London!"
              />
              <TestimonialCard
                name="Tunde Bakare"
                location="Abuja"
                avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"
                rating={5}
                text="The shortlet in Lekki was perfect for my business trip. Clean, safe, and exactly as described."
              />
              <TestimonialCard
                name="Amina Yusuf"
                location="Port Harcourt"
                avatar="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80"
                rating={5}
                text="Best travel agency in Nigeria! They handled my Dubai visa and everything went smoothly."
              />
            </Grid>
          </MotionBox>
        </Container>
      </AnimatedSection>

      {/* WhatsApp CTA */}
      <AnimatedSection bg="blue.50">
        <Container maxW="4xl" py={16}>
          <MotionBox
            textAlign="center"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Heading as="h3" fontSize="3xl" fontWeight="bold" mb={4} color="gray.900">
              Need help finding the right option?
            </Heading>
            <Text fontSize="lg" color="gray.600" mb={6}>
              Chat with us on WhatsApp for personalized assistance
            </Text>
            <Button
              as="a"
              href="https://wa.me/2348123456789"
              target="_blank"
              colorPalette="green"
              size="lg"
            >
              <Icon as={MessageCircle} mr={2} />
              Chat on WhatsApp
            </Button>
          </MotionBox>
        </Container>
      </AnimatedSection>

      {/* Footer */}
      <Box bg="gray.900" color="white" py={12}>
        <Container maxW="7xl">
          <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={8} mb={8}>
            <Box>
              <HStack gap={2} mb={4}>
                <Box position="relative" w={8} h={8}>
                  <NextImage
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/ontour_logo-removebg-preview-1762251116073.png?width=8000&height=8000&resize=contain"
                    alt="Ontour Travels Logo"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </Box>
                <Text fontSize="2xl" fontFamily="var(--font-montserrat)" fontWeight="bold">Ontour Travels</Text>
              </HStack>
              <Text color="gray.400" mb={4}>
                Your trusted partner in creating unforgettable travel experiences around the world.
              </Text>
              <HStack gap={4}>
                <Link href="#" _hover={{ color: "blue.400" }}>
                  <Icon as={Facebook} boxSize={5} />
                </Link>
                <Link href="#" _hover={{ color: "blue.400" }}>
                  <Icon as={Twitter} boxSize={5} />
                </Link>
                <Link href="#" _hover={{ color: "blue.400" }}>
                  <Icon as={Instagram} boxSize={5} />
                </Link>
              </HStack>
            </Box>

            <Box>
              <Heading as="h3" fontSize="lg" fontWeight="bold" mb={4}>Quick Links</Heading>
              <VStack align="start" gap={2}>
                <Link href="/about" color="gray.400" _hover={{ color: "white" }}>About Us</Link>
                <Link href="/book" color="gray.400" _hover={{ color: "white" }}>Flights & Hotels</Link>
                <Link href="/shortlets" color="gray.400" _hover={{ color: "white" }}>Shortlets</Link>
                <Link href="/tours" color="gray.400" _hover={{ color: "white" }}>Tours</Link>
              </VStack>
            </Box>

            <Box>
              <Heading as="h3" fontSize="lg" fontWeight="bold" mb={4}>Support</Heading>
              <VStack align="start" gap={2}>
                <Link href="/contact" color="gray.400" _hover={{ color: "white" }}>Contact Us</Link>
                <Link href="/faq" color="gray.400" _hover={{ color: "white" }}>FAQ</Link>
                <Link href="/terms" color="gray.400" _hover={{ color: "white" }}>Terms & Conditions</Link>
                <Link href="/privacy" color="gray.400" _hover={{ color: "white" }}>Privacy Policy</Link>
              </VStack>
            </Box>

            <Box>
              <Heading as="h3" fontSize="lg" fontWeight="bold" mb={4}>Contact Us</Heading>
              <VStack align="start" gap={3}>
                <HStack gap={2}>
                  <Icon as={Phone} boxSize={4} color="blue.400" />
                  <Text color="gray.400">+234 812 345 6789</Text>
                </HStack>
                <HStack gap={2}>
                  <Icon as={Mail} boxSize={4} color="blue.400" />
                  <Text color="gray.400">info@ontourtravels.com.ng</Text>
                </HStack>
                <HStack gap={2}>
                  <Icon as={Clock} boxSize={4} color="blue.400" />
                  <Text color="gray.400">Mon–Sat, 9 AM – 6 PM WAT</Text>
                </HStack>
              </VStack>
            </Box>
          </Grid>

          <Box borderTop="1px" borderColor="gray.800" pt={8} textAlign="center" color="gray.400">
            <Text>
              &copy; 2024 Ontour Travels. All rights reserved. | Made with{" "}
              <Icon as={Heart} display="inline" color="red.500" fill="red.500" boxSize={4} /> by{" "}
              <Link 
                href="https://github.com/peldevon" 
                target="_blank" 
                color="blue.400" 
                _hover={{ textDecoration: "underline" }}
              >
                Peldevon
              </Link>
            </Text>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

// Helper Components
function AnimatedSection({ children, bg }: { children: React.ReactNode; bg?: string }) {
  return (
    <Box bg={bg}>
      {children}
    </Box>
  );
}

function TrustBadge({ icon, text }: { icon: any; text: string }) {
  return (
    <MotionBox
      variants={fadeInUp}
      whileHover={{ scale: 1.05 }}
      textAlign="center"
    >
      <Flex direction="column" align="center" gap={2}>
        <Icon as={icon} boxSize={10} color="blue.600" />
        <Text fontSize="sm" fontWeight="medium" color="gray.700" maxW="150px">
          {text}
        </Text>
      </Flex>
    </MotionBox>
  );
}

function ShortletCard({ image, title, location, price, amenities }: any) {
  return (
    <MotionCard
      overflow="hidden"
      cursor="pointer"
      variants={fadeInUp}
      whileHover={{ y: -10, boxShadow: "xl" }}
      transition={{ duration: 0.3 }}
    >
      <Box position="relative" h="64" overflow="hidden">
        <Image 
          src={image}
          alt={title}
          w="full"
          h="full"
          objectFit="cover"
        />
      </Box>
      <Card.Body p={6}>
        <HStack gap={2} mb={2}>
          <Icon as={MapPin} boxSize={4} color="blue.600" />
          <Text fontSize="sm" color="gray.600">{location}</Text>
        </HStack>
        <Heading as="h3" fontSize="xl" fontWeight="bold" mb={3} color="gray.900">
          {title}
        </Heading>
        <HStack gap={2} mb={4} flexWrap="wrap">
          {amenities.map((amenity: string) => (
            <Box key={amenity} px={2} py={1} bg="blue.50" borderRadius="md" fontSize="xs" color="blue.700">
              {amenity}
            </Box>
          ))}
        </HStack>
        <Flex justify="space-between" align="center">
          <Text fontSize="2xl" fontWeight="bold" color="blue.600">{price}</Text>
          <Text fontSize="sm" color="gray.500">per night</Text>
        </Flex>
        <Button colorPalette="blue" w="full" mt={4} as="a" href="/shortlets">
          View Details
        </Button>
      </Card.Body>
    </MotionCard>
  );
}

function TourCard({ image, title, duration, priceFrom, tag }: any) {
  return (
    <MotionCard
      overflow="hidden"
      cursor="pointer"
      variants={fadeInUp}
      whileHover={{ y: -10, boxShadow: "xl" }}
      transition={{ duration: 0.3 }}
    >
      <Box position="relative" h="64" overflow="hidden">
        <Image 
          src={image}
          alt={title}
          w="full"
          h="full"
          objectFit="cover"
        />
        <Box position="absolute" top={4} right={4} px={3} py={1} bg="blue.600" color="white" borderRadius="md" fontSize="sm">
          {tag}
        </Box>
      </Box>
      <Card.Body p={6}>
        <Heading as="h3" fontSize="xl" fontWeight="bold" mb={2} color="gray.900">
          {title}
        </Heading>
        <Text fontSize="sm" color="gray.600" mb={4}>{duration}</Text>
        <Flex justify="space-between" align="center" mb={4}>
          <Box>
            <Text fontSize="xs" color="gray.500">From</Text>
            <Text fontSize="2xl" fontWeight="bold" color="blue.600">{priceFrom}</Text>
          </Box>
        </Flex>
        <Button colorPalette="blue" w="full" as="a" href="/tours">
          View Tour
        </Button>
      </Card.Body>
    </MotionCard>
  );
}

function ProcessStep({ number, icon, title, description }: any) {
  return (
    <MotionBox
      textAlign="center"
      variants={fadeInUp}
    >
      <Flex justify="center" mb={6}>
        <Box position="relative">
          <Box
            w={20}
            h={20}
            bg="white"
            color="blue.600"
            borderRadius="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={icon} boxSize={10} />
          </Box>
          <Box
            position="absolute"
            top={-2}
            right={-2}
            w={8}
            h={8}
            bg="blue.400"
            color="white"
            borderRadius="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontWeight="bold"
          >
            {number}
          </Box>
        </Box>
      </Flex>
      <Heading as="h3" fontSize="xl" fontWeight="bold" mb={2}>
        {title}
      </Heading>
      <Text color="blue.100">
        {description}
      </Text>
    </MotionBox>
  );
}

function TestimonialCard({ name, location, avatar, rating, text }: any) {
  return (
    <MotionCard
      p={8}
      variants={fadeInUp}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card.Body>
        <HStack gap={1} mb={4}>
          {Array.from({ length: rating }).map((_, i) => (
            <Icon key={i} as={Star} boxSize={5} fill="yellow.400" color="yellow.400" />
          ))}
        </HStack>
        <Text color="gray.700" mb={6} fontStyle="italic">
          "{text}"
        </Text>
        <HStack gap={4}>
          <Avatar name={name} src={avatar} />
          <Box>
            <Text fontWeight="bold" color="gray.900">{name}</Text>
            <Text fontSize="sm" color="gray.600">{location}</Text>
          </Box>
        </HStack>
      </Card.Body>
    </MotionCard>
  );
}