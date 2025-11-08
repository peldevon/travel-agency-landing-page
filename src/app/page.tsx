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
import { useInView } from "react-intersection-observer";
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
  Users,
  Wifi,
  Wind,
  Car,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";

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
              <Icon as={Plane} boxSize={8} color="#152852" />
              <Text fontSize="2xl" fontWeight="bold" color="#2C2C2C" fontFamily="'Montserrat', sans-serif">
                Ontour Travels
              </Text>
            </HStack>
            <HStack gap={8} display={{ base: "none", md: "flex" }}>
              <Link href="/book" color="#2C2C2C" _hover={{ color: "#152852" }} fontFamily="'Poppins', sans-serif">
                Flights & Hotels
              </Link>
              <Link href="/shortlets" color="#2C2C2C" _hover={{ color: "#152852" }} fontFamily="'Poppins', sans-serif">
                Shortlets
              </Link>
              <Link href="/tours" color="#2C2C2C" _hover={{ color: "#152852" }} fontFamily="'Poppins', sans-serif">
                Tours
              </Link>
              <Link href="/about" color="#2C2C2C" _hover={{ color: "#152852" }} fontFamily="'Poppins', sans-serif">
                About
              </Link>
              <Link href="/contact" color="#2C2C2C" _hover={{ color: "#152852" }} fontFamily="'Poppins', sans-serif">
                Contact
              </Link>
              <Button bg="#152852" color="white" _hover={{ bg: "#0d1a35" }} as="a" href="https://wa.me/2348123456789" target="_blank">
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
            <Heading as="h1" fontSize={{ base: "4xl", md: "6xl" }} fontWeight="bold" mb={4} fontFamily="'Montserrat', sans-serif">
              Book Flights, Hotels & Shortlet Stays — Fast
            </Heading>
            <Text fontSize={{ base: "lg", md: "xl" }} color="#FAFAFA" mb={2} fontFamily="'Poppins', sans-serif">
              Trusted Lagos travel concierge. Seamless bookings, real support.
            </Text>
            <Text fontSize="sm" color="#C9A449">
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
                <Tabs.Trigger value="flights" color="#2C2C2C" fontWeight="medium">
                  <Icon as={Plane} mr={2} />
                  Flights
                </Tabs.Trigger>
                <Tabs.Trigger value="hotels" color="#2C2C2C" fontWeight="medium">
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
                      bg={tripType === "round-trip" ? "#152852" : "transparent"}
                      color={tripType === "round-trip" ? "white" : "#152852"}
                      borderColor="#152852"
                      _hover={{ bg: tripType === "round-trip" ? "#0d1a35" : "#f0f0f0" }}
                      onClick={() => setTripType("round-trip")}
                    >
                      Round-trip
                    </Button>
                    <Button
                      size="sm"
                      variant={tripType === "one-way" ? "solid" : "outline"}
                      bg={tripType === "one-way" ? "#152852" : "transparent"}
                      color={tripType === "one-way" ? "white" : "#152852"}
                      borderColor="#152852"
                      _hover={{ bg: tripType === "one-way" ? "#0d1a35" : "#f0f0f0" }}
                      onClick={() => setTripType("one-way")}
                    >
                      One-way
                    </Button>
                  </HStack>
                  
                  <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                    <Input placeholder="From (e.g., LOS - Lagos)" size="lg" color="#2C2C2C" />
                    <Input placeholder="To (e.g., LHR - London)" size="lg" color="#2C2C2C" />
                    <Input type="date" placeholder="Depart date" size="lg" color="#2C2C2C" />
                    {tripType === "round-trip" && (
                      <Input type="date" placeholder="Return date" size="lg" color="#2C2C2C" />
                    )}
                  </Grid>
                  
                  <HStack gap={4}>
                    <Input placeholder="Passengers (1 Adult)" size="lg" color="#2C2C2C" />
                    <Input placeholder="Economy" size="lg" color="#2C2C2C" />
                  </HStack>
                  
                  <Button bg="#152852" color="white" _hover={{ bg: "#0d1a35" }} size="lg" w="full" as="a" href="/book">
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
                    <Input placeholder="Destination (e.g., Lagos, Nigeria)" size="lg" color="#2C2C2C" />
                    <Input type="date" placeholder="Check-in" size="lg" color="#2C2C2C" />
                    <Input type="date" placeholder="Check-out" size="lg" color="#2C2C2C" />
                    <Input placeholder="Guests & Rooms (2 guests, 1 room)" size="lg" color="#2C2C2C" />
                  </Grid>
                  
                  <Button bg="#152852" color="white" _hover={{ bg: "#0d1a35" }} size="lg" w="full" as="a" href="/book">
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
      <AnimatedSection bg="#FAFAFA">
        <Container maxW="7xl" py={20}>
          <MotionBox
            textAlign="center"
            mb={12}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Heading as="h2" fontSize="4xl" fontWeight="bold" mb={4} color="#2C2C2C" fontFamily="'Montserrat', sans-serif">
              Lagos Shortlet Stays You'll Love
            </Heading>
            <Text fontSize="xl" color="#555555" fontFamily="'Poppins', sans-serif">
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
            <Button as="a" href="/shortlets" bg="#152852" color="white" _hover={{ bg: "#0d1a35" }} size="lg">
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
            <Heading as="h2" fontSize="4xl" fontWeight="bold" mb={4} color="#2C2C2C" fontFamily="'Montserrat', sans-serif">
              Curated Tours & Experiences
            </Heading>
            <Text fontSize="xl" color="#555555" fontFamily="'Poppins', sans-serif">
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
            <Button as="a" href="/tours" bg="#152852" color="white" _hover={{ bg: "#0d1a35" }} size="lg">
              Explore All Tours
            </Button>
          </Flex>
        </Container>
      </AnimatedSection>

      {/* How It Works */}
      <AnimatedSection bg="#152852" color="white">
        <Container maxW="7xl" py={20}>
          <MotionBox
            textAlign="center"
            mb={12}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Heading as="h2" fontSize="4xl" fontWeight="bold" mb={4} fontFamily="'Montserrat', sans-serif">
              How It Works
            </Heading>
            <Text fontSize="xl" color="#FAFAFA" fontFamily="'Poppins', sans-serif">
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
      <AnimatedSection bg="#FAFAFA">
        <Container maxW="7xl" py={20}>
          <MotionBox
            textAlign="center"
            mb={12}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Heading as="h2" fontSize="4xl" fontWeight="bold" mb={4} color="#2C2C2C" fontFamily="'Montserrat', sans-serif">
              What Our Travelers Say
            </Heading>
            <Text fontSize="xl" color="#555555" fontFamily="'Poppins', sans-serif">
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
      <AnimatedSection bg="#f7f4ed">
        <Container maxW="4xl" py={16}>
          <MotionBox
            textAlign="center"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Heading as="h3" fontSize="3xl" fontWeight="bold" mb={4} color="#2C2C2C" fontFamily="'Montserrat', sans-serif">
              Need help finding the right option?
            </Heading>
            <Text fontSize="lg" color="#555555" mb={6} fontFamily="'Poppins', sans-serif">
              Chat with us on WhatsApp for personalized assistance
            </Text>
            <Button
              as="a"
              href="https://wa.me/2348123456789"
              target="_blank"
              bg="#25D366"
              color="white"
              _hover={{ bg: "#1da851" }}
              size="lg"
              leftIcon={<MessageCircle />}
            >
              Chat on WhatsApp
            </Button>
          </MotionBox>
        </Container>
      </AnimatedSection>

      {/* Footer */}
      <Box bg="#2C2C2C" color="white" py={12}>
        <Container maxW="7xl">
          <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={8} mb={8}>
            <Box>
              <HStack gap={2} mb={4}>
                <Icon as={Plane} boxSize={8} color="#C9A449" />
                <Text fontSize="2xl" fontWeight="bold" fontFamily="'Montserrat', sans-serif">Ontour Travels</Text>
              </HStack>
              <Text color="#E5E5E5" mb={4} fontFamily="'Open Sans', sans-serif">
                Your trusted partner in creating unforgettable travel experiences around the world.
              </Text>
              <HStack gap={4}>
                <Link href="#" _hover={{ color: "#C9A449" }}>
                  <Icon as={Facebook} boxSize={5} />
                </Link>
                <Link href="#" _hover={{ color: "#C9A449" }}>
                  <Icon as={Twitter} boxSize={5} />
                </Link>
                <Link href="#" _hover={{ color: "#C9A449" }}>
                  <Icon as={Instagram} boxSize={5} />
                </Link>
              </HStack>
            </Box>

            <Box>
              <Heading as="h3" fontSize="lg" fontWeight="bold" mb={4} fontFamily="'Montserrat', sans-serif">Quick Links</Heading>
              <VStack align="start" gap={2}>
                <Link href="/about" color="#E5E5E5" _hover={{ color: "white" }} fontFamily="'Open Sans', sans-serif">About Us</Link>
                <Link href="/book" color="#E5E5E5" _hover={{ color: "white" }} fontFamily="'Open Sans', sans-serif">Flights & Hotels</Link>
                <Link href="/shortlets" color="#E5E5E5" _hover={{ color: "white" }} fontFamily="'Open Sans', sans-serif">Shortlets</Link>
                <Link href="/tours" color="#E5E5E5" _hover={{ color: "white" }} fontFamily="'Open Sans', sans-serif">Tours</Link>
              </VStack>
            </Box>

            <Box>
              <Heading as="h3" fontSize="lg" fontWeight="bold" mb={4} fontFamily="'Montserrat', sans-serif">Support</Heading>
              <VStack align="start" gap={2}>
                <Link href="/contact" color="#E5E5E5" _hover={{ color: "white" }} fontFamily="'Open Sans', sans-serif">Contact Us</Link>
                <Link href="#" color="#E5E5E5" _hover={{ color: "white" }} fontFamily="'Open Sans', sans-serif">FAQ</Link>
                <Link href="#" color="#E5E5E5" _hover={{ color: "white" }} fontFamily="'Open Sans', sans-serif">Terms & Conditions</Link>
                <Link href="#" color="#E5E5E5" _hover={{ color: "white" }} fontFamily="'Open Sans', sans-serif">Privacy Policy</Link>
              </VStack>
            </Box>

            <Box>
              <Heading as="h3" fontSize="lg" fontWeight="bold" mb={4} fontFamily="'Montserrat', sans-serif">Contact Us</Heading>
              <VStack align="start" gap={3}>
                <HStack gap={2}>
                  <Icon as={Phone} boxSize={4} color="#C9A449" />
                  <Text color="#E5E5E5" fontFamily="'Open Sans', sans-serif">+234 812 345 6789</Text>
                </HStack>
                <HStack gap={2}>
                  <Icon as={Mail} boxSize={4} color="#C9A449" />
                  <Text color="#E5E5E5" fontFamily="'Open Sans', sans-serif">info@ontourtravels.com.ng</Text>
                </HStack>
                <HStack gap={2}>
                  <Icon as={Clock} boxSize={4} color="#C9A449" />
                  <Text color="#E5E5E5" fontFamily="'Open Sans', sans-serif">Mon–Sat, 9 AM – 6 PM WAT</Text>
                </HStack>
              </VStack>
            </Box>
          </Grid>

          <Box borderTop="1px" borderColor="gray.800" pt={8} textAlign="center" color="#E5E5E5">
            <Text fontFamily="'Open Sans', sans-serif">&copy; 2024 Ontour Travels. All rights reserved. Made with <Text as="span" color="red.500">💓</Text> by <Link href="https://github.com/peldevon" target="_blank" rel="noopener noreferrer" _hover={{ color: "#C9A449" }}>Peldevon</Link></Text>
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
        <Icon as={icon} boxSize={10} color="#152852" />
        <Text fontSize="sm" fontWeight="medium" color="#2C2C2C" maxW="150px" fontFamily="'Poppins', sans-serif">
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
          <Icon as={MapPin} boxSize={4} color="#152852" />
          <Text fontSize="sm" color="#555555" fontFamily="'Open Sans', sans-serif">{location}</Text>
        </HStack>
        <Heading as="h3" fontSize="xl" fontWeight="bold" mb={3} color="#2C2C2C" fontFamily="'Montserrat', sans-serif">
          {title}
        </Heading>
        <HStack gap={2} mb={4} flexWrap="wrap">
          {amenities.map((amenity: string) => (
            <Box key={amenity} px={2} py={1} bg="#f7f4ed" borderRadius="md" fontSize="xs" color="#152852">
              {amenity}
            </Box>
          ))}
        </HStack>
        <Flex justify="space-between" align="center">
          <Text fontSize="2xl" fontWeight="bold" color="#152852" fontFamily="'Montserrat', sans-serif">{price}</Text>
          <Text fontSize="sm" color="#555555" fontFamily="'Open Sans', sans-serif">per night</Text>
        </Flex>
        <Button bg="#152852" color="white" _hover={{ bg: "#0d1a35" }} w="full" mt={4} as="a" href="/shortlets">
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
        <Box position="absolute" top={4} right={4} px={3} py={1} bg="#152852" color="white" borderRadius="md" fontSize="sm">
          {tag}
        </Box>
      </Box>
      <Card.Body p={6}>
        <Heading as="h3" fontSize="xl" fontWeight="bold" mb={2} color="#2C2C2C" fontFamily="'Montserrat', sans-serif">
          {title}
        </Heading>
        <Text fontSize="sm" color="#555555" mb={4} fontFamily="'Open Sans', sans-serif">{duration}</Text>
        <Flex justify="space-between" align="center" mb={4}>
          <Box>
            <Text fontSize="xs" color="#555555" fontFamily="'Open Sans', sans-serif">From</Text>
            <Text fontSize="2xl" fontWeight="bold" color="#152852" fontFamily="'Montserrat', sans-serif">{priceFrom}</Text>
          </Box>
        </Flex>
        <Button bg="#152852" color="white" _hover={{ bg: "#0d1a35" }} w="full" as="a" href="/tours">
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
            color="#152852"
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
            bg="#C9A449"
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
      <Heading as="h3" fontSize="xl" fontWeight="bold" mb={2} fontFamily="'Montserrat', sans-serif">
        {title}
      </Heading>
      <Text color="#FAFAFA" fontFamily="'Open Sans', sans-serif">
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
            <Icon key={i} as={Star} boxSize={5} fill="#C9A449" color="#C9A449" />
          ))}
        </HStack>
        <Text color="#2C2C2C" mb={6} fontStyle="italic" fontFamily="'Open Sans', sans-serif">
          "{text}"
        </Text>
        <HStack gap={4}>
          <Avatar name={name} src={avatar} />
          <Box>
            <Text fontWeight="bold" color="#2C2C2C" fontFamily="'Poppins', sans-serif">{name}</Text>
            <Text fontSize="sm" color="#555555" fontFamily="'Open Sans', sans-serif">{location}</Text>
          </Box>
        </HStack>
      </Card.Body>
    </MotionCard>
  );
}