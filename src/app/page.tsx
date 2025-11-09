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
  ChevronLeft,
  ChevronRight,
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
  
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  // Shortlets carousel with more items
  const [shortletsEmblaRef, shortletsEmblaApi] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1 },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  // Tours carousel with more items
  const [toursEmblaRef, toursEmblaApi] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1 },
    [Autoplay({ delay: 3500, stopOnInteraction: false })]
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

  // Expanded shortlets data - 8 listings
  const shortlets = [
    {
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80",
      title: "1BR Apartment – Lekki Phase 1",
      location: "Lekki, Lagos",
      price: "₦45,000",
      amenities: ["Wi-Fi", "AC", "Pool", "Parking"]
    },
    {
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
      title: "Luxury 2BR – Victoria Island",
      location: "Victoria Island, Lagos",
      price: "₦75,000",
      amenities: ["Wi-Fi", "AC", "Gym", "Security"]
    },
    {
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
      title: "Cozy Studio – Ikeja GRA",
      location: "Ikeja, Lagos",
      price: "₦35,000",
      amenities: ["Wi-Fi", "AC", "Kitchen", "TV"]
    },
    {
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
      title: "3BR Penthouse – Ikoyi",
      location: "Ikoyi, Lagos",
      price: "₦120,000",
      amenities: ["Wi-Fi", "AC", "Pool", "Gym"]
    },
    {
      image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&q=80",
      title: "Modern 2BR – Ajah",
      location: "Ajah, Lagos",
      price: "₦55,000",
      amenities: ["Wi-Fi", "AC", "Parking", "Generator"]
    },
    {
      image: "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=600&q=80",
      title: "Spacious 3BR – Banana Island",
      location: "Banana Island, Lagos",
      price: "₦200,000",
      amenities: ["Wi-Fi", "AC", "Pool", "Beach Access"]
    },
    {
      image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80",
      title: "Modern Loft – Yaba",
      location: "Yaba, Lagos",
      price: "₦40,000",
      amenities: ["Wi-Fi", "AC", "Co-working", "Kitchen"]
    },
    {
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80",
      title: "Deluxe 2BR – Lekki Phase 2",
      location: "Lekki, Lagos",
      price: "₦65,000",
      amenities: ["Wi-Fi", "AC", "Gym", "24/7 Power"]
    }
  ];

  // Expanded tours data - 8 destinations
  const tours = [
    {
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
      title: "Cancun",
      location: "Mexico",
      priceFrom: "1,400",
      description: "Beautiful beaches and vibrant nightlife await you"
    },
    {
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
      title: "Dubai",
      location: "UAE",
      priceFrom: "2,100",
      description: "Experience luxury and adventure in the desert city"
    },
    {
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
      title: "Bali",
      location: "Indonesia",
      priceFrom: "1,800",
      description: "Tropical paradise with stunning temples and beaches"
    },
    {
      image: "https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?w=600&q=80",
      title: "Maldives",
      location: "Indian Ocean",
      priceFrom: "3,200",
      description: "Pristine waters and overwater bungalows"
    },
    {
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80",
      title: "Paris",
      location: "France",
      priceFrom: "1,900",
      description: "The city of love, art, and exquisite cuisine"
    },
    {
      image: "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?w=600&q=80",
      title: "Santorini",
      location: "Greece",
      priceFrom: "2,300",
      description: "Iconic white buildings and stunning sunsets"
    },
    {
      image: "https://images.unsplash.com/photo-1580837119756-563d608dd119?w=600&q=80",
      title: "Tokyo",
      location: "Japan",
      priceFrom: "2,500",
      description: "Ancient traditions meet futuristic technology"
    },
    {
      image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&q=80",
      title: "Cape Town",
      location: "South Africa",
      priceFrom: "1,600",
      description: "Stunning landscapes and diverse wildlife"
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

      {/* Featured Shortlets - ENHANCED CAROUSEL */}
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

          {/* Carousel Container */}
          <Box position="relative" mb={10} px={{ base: 0, md: 8 }}>
            <Box overflow="hidden" ref={shortletsEmblaRef}>
              <Flex gap={{ base: 4, md: 6 }}>
                {shortlets.map((shortlet, index) => (
                  <Box
                    key={index}
                    flex={{ base: "0 0 90%", sm: "0 0 45%", md: "0 0 45%", lg: "0 0 30%" }}
                    minW={0}
                  >
                    <ShortletCard {...shortlet} />
                  </Box>
                ))}
              </Flex>
            </Box>

            {/* Navigation Buttons */}
            <IconButton
              position="absolute"
              left={{ base: 0, md: -2 }}
              top="50%"
              transform="translateY(-50%)"
              onClick={scrollPrevShortlets}
              bg="white"
              _hover={{ bg: "gray.200" }}
              boxShadow="lg"
              borderRadius="full"
              zIndex={10}
              aria-label="Previous"
              display={{ base: "flex", md: "flex" }}
              color="#555555"
            >
              <ChevronLeft color="#555555" />
            </IconButton>
            <IconButton
              position="absolute"
              right={{ base: 0, md: -2 }}
              top="50%"
              transform="translateY(-50%)"
              onClick={scrollNextShortlets}
              bg="white"
              _hover={{ bg: "gray.200" }}
              boxShadow="lg"
              borderRadius="full"
              zIndex={10}
              aria-label="Next"
              display={{ base: "flex", md: "flex" }}
              color="#555555"
            >
              <ChevronRight color="#555555" />
            </IconButton>
          </Box>

          <Flex justify="center" mt={10}>
            <Button as="a" href="/shortlets" bg="#152852" color="white" _hover={{ bg: "#0d1a35" }} size="lg">
              View All Shortlets
            </Button>
          </Flex>
        </Container>
      </AnimatedSection>

      {/* Travel Destinations Showcase - ENHANCED CAROUSEL WITHIN GRID */}
      <AnimatedSection bg="white">
        <Container maxW="7xl" py={20}>
          {/* Main CSS Grid Wrapper */}
          <Box
            display="grid"
            gridTemplateColumns={{ base: "30px 1fr", md: "50px 1fr" }}
            gap={0}
            borderLeft="5px solid #FFAA00"
            borderTop="1px solid #FFAA00"
            borderBottom="1px solid #FFAA00"
            className="destination-section"
          >
            {/* Column 1: Vertical Title */}
            <Flex
              alignItems="center"
              justifyContent="center"
              py={8}
              css={{
                writingMode: "vertical-rl",
                textOrientation: "mixed"
              }}
            >
              <Text
                fontSize={{ base: "lg", md: "2xl" }}
                fontWeight="bold"
                color="#FFAA00"
                fontFamily="'Montserrat', sans-serif"
                letterSpacing="wider"
              >
                DESTINATIONS
              </Text>
            </Flex>

            {/* Column 2: Content Area with Carousel */}
            <Box p={{ base: 4, md: 8 }}>
              {/* Carousel for Tour Cards */}
              <Box position="relative">
                <Box overflow="hidden" ref={toursEmblaRef}>
                  <Flex>
                    {tours.map((destination, index) => (
                      <Box
                        key={index}
                        flex="0 0 100%"
                        minW={0}
                        px={2}
                        css={{
                          '@media (min-width: 640px)': {
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
                        <DestinationCard {...destination} />
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
                  bg="white"
                  _hover={{ bg: "gray.100" }}
                  boxShadow="lg"
                  borderRadius="full"
                  zIndex={10}
                  aria-label="Previous"
                  display={{ base: "none", md: "flex" }}
                >
                  <ChevronLeft />
                </IconButton>
                <IconButton
                  position="absolute"
                  right={-4}
                  top="50%"
                  transform="translateY(-50%)"
                  onClick={scrollNextTours}
                  bg="white"
                  _hover={{ bg: "gray.100" }}
                  boxShadow="lg"
                  borderRadius="full"
                  zIndex={10}
                  aria-label="Next"
                  display={{ base: "none", md: "flex" }}
                >
                  <ChevronRight />
                </IconButton>
              </Box>

              {/* See More Button */}
              <Flex justify="center" mt={8}>
                <Button
                  as="a"
                  href="/tours"
                  bg="#FFAA00"
                  color="white"
                  _hover={{ bg: "#e69900" }}
                  size="lg"
                  px={8}
                >
                  See more
                </Button>
              </Flex>
            </Box>
          </Box>
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

function DestinationCard({ image, title, location, priceFrom, description }: any) {
  return (
    <Box
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      boxShadow="md"
      cursor="pointer"
      transition="all 0.3s"
      _hover={{ boxShadow: "xl", transform: "translateY(-5px)" }}
      h="full"
      display="flex"
      flexDirection="column"
      className="destination-card"
    >
      {/* Image Container - 60-65% height */}
      <Box position="relative" h="320px" overflow="hidden">
        <Image
          src={image}
          alt={title}
          w="full"
          h="full"
          objectFit="cover"
        />
        {/* Overlay Bar with Destination Name */}
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          bg="rgba(0, 0, 0, 0.7)"
          py={3}
          px={4}
        >
          <Text
            color="white"
            fontSize="xl"
            fontWeight="bold"
            fontFamily="'Montserrat', sans-serif"
          >
            {title}
          </Text>
        </Box>
      </Box>

      {/* Content Area */}
      <VStack align="stretch" p={4} gap={3} flex="1">
        {/* Price Block */}
        <Box textAlign="center">
          <Text fontSize="sm" color="#555555" fontFamily="'Open Sans', sans-serif">
            From
          </Text>
          <Text fontSize="3xl" fontWeight="bold" color="#2C2C2C" fontFamily="'Montserrat', sans-serif">
            <Text as="span" color="#FFAA00" fontSize="2xl">$</Text>
            {priceFrom}
          </Text>
        </Box>

        {/* Description */}
        <Text
          fontSize="sm"
          color="#555555"
          textAlign="center"
          fontFamily="'Open Sans', sans-serif"
          noOfLines={2}
          lineHeight="1.5"
        >
          {description}
        </Text>

        {/* CTA Button */}
        <Button
          bg="#FFAA00"
          color="white"
          _hover={{ bg: "#e69900" }}
          size="md"
          w="full"
          mt="auto"
          as="a"
          href="/tours"
        >
          See more
        </Button>
      </VStack>
    </Box>
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