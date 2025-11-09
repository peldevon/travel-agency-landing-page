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
  Drawer,
} from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/navigation";
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
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

// Create motion components using standard pattern
const MotionBox = motion(Box);
const MotionCard = motion(Card.Root);
const MotionFlex = motion(Flex);

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  // Shortlets carousel
  const [shortletsEmblaRef, shortletsEmblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      align: "start",
      slidesToScroll: 1,
      containScroll: "trimSnaps"
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  // Tours carousel
  const [toursEmblaRef, toursEmblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      align: "start",
      slidesToScroll: 1,
      containScroll: "trimSnaps"
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  const scrollPrevShortlets = useCallback(() => {
    if (shortletsEmblaApi) shortletsEmblaApi.scrollPrev();
  }, [shortletsEmblaApi]);

  const scrollNextShortlets = useCallback(() => {
    if (shortletsEmblaApi) shortletsEmblaApi.scrollNext();
  }, [shortletsEmblaApi]);

  const scrollPrevTours = useCallback(() => {
    if (toursEmblaApi) toursEmblaApi.scrollPrev();
  }, [toursEmblaApi]);

  const scrollNextTours = useCallback(() => {
    if (toursEmblaApi) toursEmblaApi.scrollNext();
  }, [toursEmblaApi]);

  // Sample shortlets data
  const shortlets = [
    {
      slug: "1br-apartment-lekki-phase-1",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80",
      title: "1BR Apartment – Lekki Phase 1",
      location: "Lekki, Lagos",
      price: "₦45,000",
      amenities: ["Wi-Fi", "AC", "Pool", "Parking"]
    },
    {
      slug: "luxury-2br-victoria-island",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
      title: "Luxury 2BR – Victoria Island",
      location: "Victoria Island, Lagos",
      price: "₦75,000",
      amenities: ["Wi-Fi", "AC", "Gym", "Security"]
    },
    {
      slug: "cozy-studio-ikeja-gra",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
      title: "Cozy Studio – Ikeja GRA",
      location: "Ikeja, Lagos",
      price: "₦35,000",
      amenities: ["Wi-Fi", "AC", "Kitchen", "TV"]
    },
    {
      slug: "3br-penthouse-ikoyi",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
      title: "3BR Penthouse – Ikoyi",
      location: "Ikoyi, Lagos",
      price: "₦120,000",
      amenities: ["Wi-Fi", "AC", "Pool", "Gym"]
    },
    {
      slug: "modern-2br-ajah",
      image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&q=80",
      title: "Modern 2BR – Ajah",
      location: "Ajah, Lagos",
      price: "₦55,000",
      amenities: ["Wi-Fi", "AC", "Parking", "Generator"]
    }
  ];

  // Sample tours data
  const tours = [
    {
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
      title: "Dubai",
      location: "Dubai, UAE",
      duration: "4D/3N",
      priceFrom: "299",
      tag: "International"
    },
    {
      image: "https://images.unsplash.com/photo-1565552645632-d725f8bfc19d?w=600&q=80",
      title: "Zanzibar",
      location: "Zanzibar, Tanzania",
      duration: "5D/4N",
      priceFrom: "239",
      tag: "Regional"
    },
    {
      image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=600&q=80",
      title: "Obudu",
      location: "Cross River, Nigeria",
      duration: "3D/2N",
      priceFrom: "319",
      tag: "Local"
    },
    {
      image: "https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?w=600&q=80",
      title: "Maldives",
      location: "Maldives",
      duration: "7D/6N",
      priceFrom: "479",
      tag: "International"
    }
  ];

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
        <Container maxW="7xl" py={3}>
          <Flex justify="space-between" align="center">
            <HStack gap={2}>
              <Image 
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/ontour_logo-removebg-preview-1762616230494.png?width=8000&height=8000&resize=contain"
                alt="Ontour Travels Logo"
                h="50px"
                w="auto"
                objectFit="contain"
              />
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
              <Button bg="#152852" color="white" _hover={{ bg: "#0d1a35" }} size="sm" as="a" href="https://wa.me/2348123456789" target="_blank">
                <Icon as={MessageCircle} mr={2} />
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
      </MotionBox>

      {/* Mobile Menu Drawer */}
      <Drawer.Root open={mobileMenuOpen} onOpenChange={(e) => setMobileMenuOpen(e.open)} placement="end">
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
                <Link href="/book" color="#2C2C2C" _hover={{ color: "#152852" }} fontFamily="'Poppins', sans-serif" fontSize="lg" onClick={() => setMobileMenuOpen(false)}>
                  Flights & Hotels
                </Link>
                <Link href="/shortlets" color="#2C2C2C" _hover={{ color: "#152852" }} fontFamily="'Poppins', sans-serif" fontSize="lg" onClick={() => setMobileMenuOpen(false)}>
                  Shortlets
                </Link>
                <Link href="/tours" color="#2C2C2C" _hover={{ color: "#152852" }} fontFamily="'Poppins', sans-serif" fontSize="lg" onClick={() => setMobileMenuOpen(false)}>
                  Tours
                </Link>
                <Link href="/about" color="#2C2C2C" _hover={{ color: "#152852" }} fontFamily="'Poppins', sans-serif" fontSize="lg" onClick={() => setMobileMenuOpen(false)}>
                  About
                </Link>
                <Link href="/contact" color="#2C2C2C" _hover={{ color: "#152852" }} fontFamily="'Poppins', sans-serif" fontSize="lg" onClick={() => setMobileMenuOpen(false)}>
                  Contact
                </Link>
                <Button bg="#152852" color="white" _hover={{ bg: "#0d1a35" }} size="lg" as="a" href="https://wa.me/2348123456789" target="_blank">
                  <Icon as={MessageCircle} mr={2} />
                  WhatsApp
                </Button>
              </VStack>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>

      {/* Hero Section with Search */}
      <MotionBox
        position="relative"
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="white"
        pt={{ base: "80px", md: "100px" }}
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
            <Heading 
              as="h1" 
              fontSize={{ base: "4xl", md: "6xl" }} 
              fontWeight="bold" 
              mb={6}
              lineHeight={{ base: "1.2", md: "1.3" }}
              fontFamily="'Montserrat', sans-serif"
            >
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

      {/* Featured Shortlets - CAROUSEL */}
      <AnimatedSection bg="#FAFAFA">
        <Container maxW="7xl" py={20}>
          <Flex justify="space-between" align="center" mb={8}>
            <Box>
              <Heading as="h2" fontSize="4xl" fontWeight="bold" mb={2} color="#2C2C2C" fontFamily="'Montserrat', sans-serif">
                Featured Apartments
              </Heading>
              <Text fontSize="lg" color="#555555" fontFamily="'Poppins', sans-serif">
                Hand-picked selection of quality apartments
              </Text>
            </Box>
            
            {/* Navigation Buttons - Top Right */}
            <HStack gap={2} display={{ base: "none", md: "flex" }}>
              <Button
                onClick={scrollPrevShortlets}
                variant="outline"
                borderColor="#152852"
                color="#152852"
                _hover={{ bg: "#152852", color: "white" }}
                size="sm"
                px={6}
              >
                Prev
              </Button>
              <Button
                onClick={scrollNextShortlets}
                variant="outline"
                borderColor="#152852"
                color="#152852"
                _hover={{ bg: "#152852", color: "white" }}
                size="sm"
                px={6}
              >
                Next
              </Button>
            </HStack>
          </Flex>

          {/* Carousel Container */}
          <Box position="relative">
            <Box overflow="hidden" ref={shortletsEmblaRef}>
              <Flex gap={6}>
                {shortlets.map((shortlet, index) => (
                  <Box
                    key={index}
                    flex="0 0 100%"
                    minW={0}
                    css={{
                      '@media (min-width: 480px)': {
                        flex: '0 0 50%'
                      },
                      '@media (min-width: 768px)': {
                        flex: '0 0 33.333%'
                      },
                      '@media (min-width: 1024px)': {
                        flex: '0 0 33.333%'
                      }
                    }}
                  >
                    <ShortletCard {...shortlet} />
                  </Box>
                ))}
              </Flex>
            </Box>

            {/* Mobile Navigation Buttons */}
            <IconButton
              position="absolute"
              left={-4}
              top="50%"
              transform="translateY(-50%)"
              onClick={scrollPrevShortlets}
              bg="white"
              color="#152852"
              _hover={{ bg: "#152852", color: "white" }}
              boxShadow="lg"
              borderRadius="full"
              zIndex={10}
              aria-label="Previous"
              display={{ base: "flex", md: "none" }}
            >
              <ChevronLeft />
            </IconButton>
            <IconButton
              position="absolute"
              right={-4}
              top="50%"
              transform="translateY(-50%)"
              onClick={scrollNextShortlets}
              bg="white"
              color="#152852"
              _hover={{ bg: "#152852", color: "white" }}
              boxShadow="lg"
              borderRadius="full"
              zIndex={10}
              aria-label="Next"
              display={{ base: "flex", md: "none" }}
            >
              <ChevronRight />
            </IconButton>
          </Box>

          <Flex justify="center" mt={10}>
            <Button as="a" href="/shortlets" bg="#152852" color="white" _hover={{ bg: "#0d1a35" }} size="lg">
              View All Shortlets
            </Button>
          </Flex>
        </Container>
      </AnimatedSection>

      {/* Featured Tours - CAROUSEL */}
      <AnimatedSection bg="white">
        <Container maxW="7xl" py={20}>
          {/* Section Header with "Destinations" label on left */}
          <Flex justify="space-between" align="flex-start" mb={8}>
            <Box>
              <Text 
                fontSize="sm" 
                fontWeight="bold" 
                color="#C9A449" 
                textTransform="uppercase" 
                letterSpacing="wider"
                mb={3}
                fontFamily="'Poppins', sans-serif"
              >
                Destinations
              </Text>
              <Heading as="h2" fontSize="3xl" fontWeight="bold" color="#2C2C2C" fontFamily="'Montserrat', sans-serif">
                Curated Tours & Experiences
              </Heading>
            </Box>
          </Flex>

          {/* Carousel Container */}
          <Box position="relative" mb={10}>
            <Box overflow="hidden" ref={toursEmblaRef}>
              <Flex gap={6}>
                {tours.map((tour, index) => (
                  <Box
                    key={index}
                    flex="0 0 100%"
                    minW={0}
                    css={{
                      '@media (min-width: 480px)': {
                        flex: '0 0 50%'
                      },
                      '@media (min-width: 768px)': {
                        flex: '0 0 33.333%'
                      },
                      '@media (min-width: 1024px)': {
                        flex: '0 0 25%'
                      }
                    }}
                  >
                    <TourDestinationCard {...tour} />
                  </Box>
                ))}
              </Flex>
            </Box>

            {/* Navigation Buttons */}
            <IconButton
              position="absolute"
              left={-4}
              top="50%"
              transform="translateY(-50%)"
              onClick={scrollPrevTours}
              bg="gray.200"
              color="gray.700"
              _hover={{ bg: "gray.300" }}
              boxShadow="lg"
              borderRadius="full"
              zIndex={10}
              aria-label="Previous"
            >
              <ChevronLeft />
            </IconButton>
            <IconButton
              position="absolute"
              right={-4}
              top="50%"
              transform="translateY(-50%)"
              onClick={scrollNextTours}
              bg="gray.200"
              color="gray.700"
              _hover={{ bg: "gray.300" }}
              boxShadow="lg"
              borderRadius="full"
              zIndex={10}
              aria-label="Next"
            >
              <ChevronRight />
            </IconButton>
          </Box>

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
                <Image 
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/ontour_logo-removebg-preview-1762616230494.png?width=8000&height=8000&resize=contain"
                  alt="Ontour Travels Logo"
                  h="40px"
                  w="auto"
                  objectFit="contain"
                />
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

function ShortletCard({ slug, image, title, location, price, amenities }: any) {
  const router = useRouter();
  
  return (
    <MotionCard
      overflow="hidden"
      cursor="pointer"
      variants={fadeInUp}
      whileHover={{ y: -10, boxShadow: "xl" }}
      transition={{ duration: 0.3 }}
      bg="white"
      borderRadius="lg"
    >
      <Box position="relative" h="64" overflow="hidden">
        <Image 
          src={image}
          alt={title}
          w="full"
          h="full"
          objectFit="cover"
        />
        
        {/* FEATURED Badge - Top Left */}
        <Box
          position="absolute"
          top={4}
          left={4}
          bg="#22C55E"
          color="white"
          px={3}
          py={1}
          fontSize="xs"
          fontWeight="bold"
          textTransform="uppercase"
          letterSpacing="wide"
        >
          FEATURED
        </Box>
        
        {/* Price Badge - Bottom Left */}
        <Box
          position="absolute"
          bottom={4}
          left={4}
          bg="white"
          px={4}
          py={2}
          borderRadius="md"
          boxShadow="md"
        >
          <Text fontSize="2xl" fontWeight="bold" color="#152852" fontFamily="'Montserrat', sans-serif" lineHeight="1.2">
            {price}<Text as="span" fontSize="sm" fontWeight="normal">/day</Text>
          </Text>
        </Box>
      </Box>
      <Card.Body p={5}>
        <Heading as="h3" fontSize="lg" fontWeight="bold" mb={2} color="#2C2C2C" fontFamily="'Montserrat', sans-serif" noOfLines={1}>
          {title}
        </Heading>
        <HStack gap={2} mb={3}>
          <Icon as={MapPin} boxSize={4} color="#555555" />
          <Text fontSize="sm" color="#555555" fontFamily="'Open Sans', sans-serif" noOfLines={1}>{location}</Text>
        </HStack>
        
        {/* Property Details Icons */}
        <HStack gap={4} mb={3} color="#555555" fontSize="sm">
          <HStack gap={1}>
            <Icon as={Hotel} boxSize={4} />
            <Text>2 Bedrooms</Text>
          </HStack>
          <HStack gap={1}>
            <Icon as={Wind} boxSize={4} />
            <Text>2 Baths</Text>
          </HStack>
          <HStack gap={1}>
            <Icon as={Users} boxSize={4} />
            <Text>4 Guests</Text>
          </HStack>
        </HStack>
        
        <Text fontSize="sm" color="#555555" mb={3} fontFamily="'Open Sans', sans-serif">
          Apartment
        </Text>
        
        {/* Rating */}
        <HStack gap={1} mb={4}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Icon key={i} as={Star} boxSize={4} fill="#C9A449" color="#C9A449" />
          ))}
          <Text fontSize="sm" fontWeight="medium" color="#555555" ml={2}>
            Excellent
          </Text>
        </HStack>
        
        <Button 
          bg="#152852" 
          color="white" 
          _hover={{ bg: "#0d1a35" }} 
          w="full"
          onClick={() => router.push(`/shortlets/${slug}`)}
        >
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

function TourDestinationCard({ image, title, location, priceFrom, tag }: any) {
  return (
    <MotionCard
      overflow="hidden"
      cursor="pointer"
      variants={fadeInUp}
      whileHover={{ y: -10, boxShadow: "xl" }}
      transition={{ duration: 0.3 }}
      bg="white"
      borderRadius="lg"
    >
      <Box position="relative" h="48" overflow="hidden">
        <Image 
          src={image}
          alt={title}
          w="full"
          h="full"
          objectFit="cover"
        />
        {/* Price badge - positioned like reference image */}
        <Box 
          position="absolute" 
          bottom={3} 
          left={3}
          bg="white" 
          px={3} 
          py={2} 
          borderRadius="md"
          boxShadow="md"
        >
          <Text fontSize="xs" color="#555555" fontFamily="'Open Sans', sans-serif" lineHeight="1">
            From
          </Text>
          <Text fontSize="2xl" fontWeight="bold" color="#C9A449" fontFamily="'Montserrat', sans-serif" lineHeight="1.2">
            {priceFrom}<Text as="span" fontSize="lg">$</Text>
          </Text>
        </Box>
      </Box>
      <Card.Body p={4}>
        <Heading 
          as="h3" 
          fontSize="lg" 
          fontWeight="bold" 
          mb={1} 
          color="#2C2C2C" 
          fontFamily="'Montserrat', sans-serif"
          noOfLines={1}
        >
          {title}
        </Heading>
        <HStack gap={1} color="#555555" fontSize="sm">
          <Icon as={MapPin} boxSize={4} />
          <Text fontFamily="'Open Sans', sans-serif" noOfLines={1}>{location}</Text>
        </HStack>
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