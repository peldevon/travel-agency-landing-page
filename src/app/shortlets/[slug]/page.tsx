"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Grid,
  HStack,
  VStack,
  Icon,
  Flex,
  Card,
  Image,
  Link,
  IconButton,
  Drawer,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  MapPin,
  Wifi,
  Wind,
  Tv,
  Coffee,
  Car,
  Shield,
  Users,
  CheckCircle,
  MessageCircle,
  ArrowLeft,
  Star,
  Home,
  Calendar,
  Clock,
  AlertCircle,
  XCircle,
  Menu,
  X,
} from "lucide-react";

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card.Root);

interface Shortlet {
  id: string;
  slug: string;
  title: string;
  location: string;
  location_details: {
    area: string;
    city: string;
    state: string;
    nearby: string;
  };
  property_type: string;
  price_per_night_ngn: number;
  price_per_night_usd: number;
  bedrooms: number;
  bathrooms: number;
  max_guests: number;
  description: string;
  amenities: string[];
  features: string[];
  policies: {
    check_in: string;
    check_out: string;
    minimum_stay: string;
    cancellation: string;
    deposit: string;
    house_rules: string[];
  };
  gallery: string[];
  rating: number;
  reviews_count: number;
  host_name: string;
  host_response_time: string;
  whatsapp_prefill: string;
  status: string;
  featured: boolean;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const amenityIcons: { [key: string]: any } = {
  "Wi-Fi": Wifi,
  "High-Speed Wi-Fi": Wifi,
  "Air Conditioning": Wind,
  "Air Conditioning (All Rooms)": Wind,
  "Smart TV": Tv,
  "Smart TV (43\")": Tv,
  "55\" Smart TV": Tv,
  "Coffee Maker": Coffee,
  "Free Parking": Car,
  "Free Parking (2 Spaces)": Car,
  "24/7 Security": Shield,
  "24/7 Concierge": Shield,
};

export default function ShortletDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [shortlet, setShortlet] = useState<Shortlet | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchShortlet = async () => {
      try {
        const response = await fetch(`/api/shortlets/${params.slug}`);
        if (!response.ok) {
          throw new Error("Shortlet not found");
        }
        const data = await response.json();
        setShortlet(data);
      } catch (error) {
        console.error("Error fetching shortlet:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShortlet();
  }, [params.slug]);

  if (loading) {
    return (
      <Box minH="100vh" py={20}>
        <Container maxW="7xl">
          <Text textAlign="center" fontSize="xl" color="gray.600">
            Loading property details...
          </Text>
        </Container>
      </Box>
    );
  }

  if (!shortlet) {
    return (
      <Box minH="100vh" py={20}>
        <Container maxW="7xl" textAlign="center">
          <Heading mb={4}>Property Not Found</Heading>
          <Text color="gray.600" mb={6}>
            Sorry, we couldn't find the property you're looking for.
          </Text>
          <Button onClick={() => router.push("/shortlets")} colorPalette="blue">
            <Icon as={ArrowLeft} mr={2} />
            Back to Shortlets
          </Button>
        </Container>
      </Box>
    );
  }

  const whatsappLink = `https://wa.me/2348123456789?text=${encodeURIComponent(shortlet.whatsapp_prefill)}`;

  return (
    <Box minH="100vh">
      {/* Navigation Header - Now visible on mobile */}
      <Box
        position="sticky"
        top={0}
        zIndex={50}
        bg="white"
        boxShadow="sm"
      >
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
              <Link href="/tours" color="#2C2C2C" _hover={{ color: "#152852" }}>Tours</Link>
              <Link href="/about" color="#2C2C2C" _hover={{ color: "#152852" }}>About</Link>
              <Link href="/contact" color="#2C2C2C" _hover={{ color: "#152852" }}>Contact</Link>
              <Button bg="#152852" color="white" _hover={{ bg: "#0d1a35" }} size="sm" as="a" href="https://wa.me/2348123456789" target="_blank">
                <Icon as={MessageCircle} mr={1} />
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
                <Link href="/" color="#2C2C2C" _hover={{ color: "#152852" }} fontSize="lg" onClick={() => setMobileMenuOpen(false)}>
                  Home
                </Link>
                <Link href="/book" color="#2C2C2C" _hover={{ color: "#152852" }} fontSize="lg" onClick={() => setMobileMenuOpen(false)}>
                  Flights & Hotels
                </Link>
                <Link href="/shortlets" color="#2C2C2C" _hover={{ color: "#152852" }} fontSize="lg" onClick={() => setMobileMenuOpen(false)}>
                  Shortlets
                </Link>
                <Link href="/tours" color="#2C2C2C" _hover={{ color: "#152852" }} fontSize="lg" onClick={() => setMobileMenuOpen(false)}>
                  Tours
                </Link>
                <Link href="/about" color="#2C2C2C" _hover={{ color: "#152852" }} fontSize="lg" onClick={() => setMobileMenuOpen(false)}>
                  About
                </Link>
                <Link href="/contact" color="#2C2C2C" _hover={{ color: "#152852" }} fontSize="lg" onClick={() => setMobileMenuOpen(false)}>
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

      {/* Back Button */}
      <Container maxW="7xl" py={4}>
        <Button
          variant="ghost"
          onClick={() => router.push("/shortlets")}
          leftIcon={<ArrowLeft />}
        >
          Back to Shortlets
        </Button>
      </Container>

      {/* Image Gallery */}
      <Container maxW="7xl" mb={8}>
        <Grid templateColumns={{ base: "1fr", md: "2fr 1fr" }} gap={4} h={{ base: "auto", md: "500px" }}>
          <Box position="relative" overflow="hidden" borderRadius="xl">
            <Image
              src={shortlet.gallery[selectedImage]}
              alt={shortlet.title}
              w="full"
              h="full"
              objectFit="cover"
            />
          </Box>
          <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "1fr" }} gap={4}>
            {shortlet.gallery.slice(0, 4).map((img, idx) => (
              <Box
                key={idx}
                position="relative"
                overflow="hidden"
                borderRadius="lg"
                cursor="pointer"
                border={selectedImage === idx ? "3px solid" : "none"}
                borderColor="blue.500"
                onClick={() => setSelectedImage(idx)}
                _hover={{ opacity: 0.8 }}
              >
                <Image
                  src={img}
                  alt={`${shortlet.title} ${idx + 1}`}
                  w="full"
                  h="full"
                  objectFit="cover"
                />
              </Box>
            ))}
          </Grid>
        </Grid>
      </Container>

      <Container maxW="7xl" pb={12}>
        <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={8}>
          {/* Main Content */}
          <Box>
            {/* Header */}
            <MotionBox variants={fadeInUp} initial="hidden" animate="visible" mb={8}>
              <HStack gap={2} mb={3}>
                <Box px={3} py={1} bg="blue.100" color="blue.700" borderRadius="md" fontSize="sm" fontWeight="medium">
                  {shortlet.property_type}
                </Box>
                {shortlet.featured && (
                  <Box px={3} py={1} bg="yellow.100" color="yellow.700" borderRadius="md" fontSize="sm" fontWeight="medium">
                    Featured
                  </Box>
                )}
              </HStack>

              <Heading as="h1" fontSize={{ base: "3xl", md: "4xl" }} mb={4} color="gray.900">
                {shortlet.title}
              </Heading>

              <HStack gap={4} mb={4} flexWrap="wrap">
                <HStack gap={2}>
                  <Icon as={MapPin} color="blue.600" boxSize={5} />
                  <Text color="gray.700" fontWeight="medium">{shortlet.location}</Text>
                </HStack>
                <HStack gap={1}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon
                      key={i}
                      as={Star}
                      boxSize={4}
                      fill={i < Math.floor(shortlet.rating) ? "yellow.400" : "none"}
                      color={i < Math.floor(shortlet.rating) ? "yellow.400" : "gray.300"}
                    />
                  ))}
                  <Text fontSize="sm" color="gray.600" ml={2}>
                    {shortlet.rating} ({shortlet.reviews_count} reviews)
                  </Text>
                </HStack>
              </HStack>

              {/* Combined Property Details with Check-in/Check-out */}
              <Flex gap={6} flexWrap="wrap" color="gray.700" align="center">
                <HStack gap={2}>
                  <Icon as={Home} color="blue.600" />
                  <Text>{shortlet.bedrooms} Bedroom{shortlet.bedrooms > 1 ? 's' : ''}</Text>
                </HStack>
                <HStack gap={2}>
                  <Icon as={Users} color="blue.600" />
                  <Text>Up to {shortlet.max_guests} guests</Text>
                </HStack>
                <HStack gap={2}>
                  <Icon as={Clock} color="blue.600" />
                  <Text>Check-in: {shortlet.policies.check_in}</Text>
                </HStack>
                <HStack gap={2}>
                  <Icon as={Clock} color="orange.600" />
                  <Text>Check-out: {shortlet.policies.check_out}</Text>
                </HStack>
              </Flex>
            </MotionBox>

            {/* Description */}
            <MotionBox variants={fadeInUp} initial="hidden" animate="visible" mb={8}>
              <Heading as="h2" fontSize="2xl" mb={4} color="gray.900">
                About this property
              </Heading>
              <Text color="gray.700" lineHeight="tall">
                {shortlet.description}
              </Text>
            </MotionBox>

            {/* Location Details */}
            <MotionBox variants={fadeInUp} initial="hidden" animate="visible" mb={8}>
              <Heading as="h2" fontSize="2xl" mb={4} color="gray.900">
                <Icon as={MapPin} color="blue.600" mr={2} />
                Location & Nearby
              </Heading>
              <Card.Root bg="blue.50" borderColor="blue.200">
                <Card.Body p={5}>
                  <VStack gap={3} align="stretch">
                    <HStack gap={3}>
                      <Text fontWeight="medium" color="gray.700" minW="80px">Area:</Text>
                      <Text color="gray.700">{shortlet.location_details.area}</Text>
                    </HStack>
                    <HStack gap={3}>
                      <Text fontWeight="medium" color="gray.700" minW="80px">City:</Text>
                      <Text color="gray.700">{shortlet.location_details.city}, {shortlet.location_details.state}</Text>
                    </HStack>
                    <HStack gap={3} align="start">
                      <Text fontWeight="medium" color="gray.700" minW="80px">Nearby:</Text>
                      <Text color="gray.700">{shortlet.location_details.nearby}</Text>
                    </HStack>
                  </VStack>
                </Card.Body>
              </Card.Root>
            </MotionBox>

            {/* Amenities */}
            <MotionBox variants={fadeInUp} initial="hidden" animate="visible" mb={8}>
              <Heading as="h2" fontSize="2xl" mb={4} color="gray.900">
                Amenities
              </Heading>
              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                {shortlet.amenities.map((amenity, idx) => {
                  const IconComponent = amenityIcons[amenity] || CheckCircle;
                  return (
                    <HStack key={idx} gap={3} p={3} bg="gray.50" borderRadius="md">
                      <Icon as={IconComponent} color="blue.600" boxSize={5} flexShrink={0} />
                      <Text color="gray.700">{amenity}</Text>
                    </HStack>
                  );
                })}
              </Grid>
            </MotionBox>

            {/* Features */}
            <MotionBox variants={fadeInUp} initial="hidden" animate="visible" mb={8}>
              <Heading as="h2" fontSize="2xl" mb={4} color="gray.900">
                Property Features
              </Heading>
              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={3}>
                {shortlet.features.map((feature, idx) => (
                  <HStack key={idx} gap={2}>
                    <Icon as={CheckCircle} color="green.500" boxSize={4} />
                    <Text fontSize="sm" color="gray.700">{feature}</Text>
                  </HStack>
                ))}
              </Grid>
            </MotionBox>

            {/* Check-in/out */}
            <MotionBox variants={fadeInUp} initial="hidden" animate="visible" mb={8}>
              <Heading as="h2" fontSize="2xl" mb={4} color="gray.900">
                <Icon as={Calendar} color="blue.600" mr={2} />
                Check-in & Check-out
              </Heading>
              <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
                <Card.Root>
                  <Card.Body p={5} textAlign="center">
                    <Icon as={Clock} color="blue.600" boxSize={8} mx="auto" mb={2} />
                    <Text fontWeight="medium" color="gray.900" mb={1}>Check-in</Text>
                    <Text color="gray.700">{shortlet.policies.check_in}</Text>
                  </Card.Body>
                </Card.Root>

                <Card.Root>
                  <Card.Body p={5} textAlign="center">
                    <Icon as={Clock} color="orange.600" boxSize={8} mx="auto" mb={2} />
                    <Text fontWeight="medium" color="gray.900" mb={1}>Check-out</Text>
                    <Text color="gray.700">{shortlet.policies.check_out}</Text>
                  </Card.Body>
                </Card.Root>

                <Card.Root>
                  <Card.Body p={5} textAlign="center">
                    <Icon as={Calendar} color="purple.600" boxSize={8} mx="auto" mb={2} />
                    <Text fontWeight="medium" color="gray.900" mb={1}>Minimum Stay</Text>
                    <Text color="gray.700">{shortlet.policies.minimum_stay}</Text>
                  </Card.Body>
                </Card.Root>
              </Grid>
            </MotionBox>

            {/* House Rules */}
            <MotionBox variants={fadeInUp} initial="hidden" animate="visible" mb={8}>
              <Heading as="h2" fontSize="2xl" mb={4} color="gray.900">
                <Icon as={AlertCircle} color="orange.600" mr={2} />
                House Rules
              </Heading>
              <VStack gap={2} align="stretch">
                {shortlet.policies.house_rules.map((rule, idx) => (
                  <HStack key={idx} gap={3} p={3} bg="orange.50" borderRadius="md">
                    <Icon as={rule.includes("No") || rule.includes("not allowed") ? XCircle : CheckCircle} color={rule.includes("No") || rule.includes("not allowed") ? "red.500" : "blue.600"} boxSize={5} flexShrink={0} />
                    <Text color="gray.700">{rule}</Text>
                  </HStack>
                ))}
              </VStack>
            </MotionBox>

            {/* Cancellation Policy */}
            <MotionBox variants={fadeInUp} initial="hidden" animate="visible" mb={8}>
              <Heading as="h2" fontSize="2xl" mb={4} color="gray.900">
                Cancellation Policy
              </Heading>
              <Card.Root bg="yellow.50" borderColor="yellow.200">
                <Card.Body p={5}>
                  <Text color="gray.700">{shortlet.policies.cancellation}</Text>
                </Card.Body>
              </Card.Root>
            </MotionBox>

            {/* Security Deposit */}
            <MotionBox variants={fadeInUp} initial="hidden" animate="visible">
              <Heading as="h2" fontSize="2xl" mb={4} color="gray.900">
                <Icon as={Shield} color="green.600" mr={2} />
                Security Deposit
              </Heading>
              <Card.Root bg="green.50" borderColor="green.200">
                <Card.Body p={5}>
                  <Text color="gray.700" fontWeight="medium">{shortlet.policies.deposit}</Text>
                  <Text fontSize="sm" color="gray.600" mt={2}>
                    The deposit will be refunded within 7 days after checkout, subject to property inspection.
                  </Text>
                </Card.Body>
              </Card.Root>
            </MotionBox>
          </Box>

          {/* Sidebar */}
          <Box>
            <MotionCard
              position="sticky"
              top={24}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
            >
              <Card.Body p={6}>
                <VStack gap={4} align="stretch">
                  <Box>
                    <Text fontSize="sm" color="gray.600" mb={1}>
                      Price per night
                    </Text>
                    <Heading as="h2" fontSize="3xl" color="blue.600">
                      ₦{shortlet.price_per_night_ngn.toLocaleString()}
                    </Heading>
                    <Text fontSize="sm" color="gray.500">
                      ${shortlet.price_per_night_usd} USD
                    </Text>
                  </Box>

                  <Box borderTop="1px solid" borderColor="gray.200" pt={4}>
                    <VStack gap={3} align="stretch">
                      <HStack gap={2}>
                        <Icon as={Home} color="gray.600" />
                        <Text fontSize="sm" color="gray.700">
                          {shortlet.bedrooms} Bedroom, {shortlet.bathrooms} Bathroom
                        </Text>
                      </HStack>
                      <HStack gap={2}>
                        <Icon as={Users} color="gray.600" />
                        <Text fontSize="sm" color="gray.700">
                          Up to {shortlet.max_guests} guests
                        </Text>
                      </HStack>
                      <HStack gap={2}>
                        <Icon as={Calendar} color="gray.600" />
                        <Text fontSize="sm" color="gray.700">
                          Min. stay: {shortlet.policies.minimum_stay}
                        </Text>
                      </HStack>
                    </VStack>
                  </Box>

                  <Button
                    colorPalette="green"
                    size="lg"
                    w="full"
                    as="a"
                    href={whatsappLink}
                    target="_blank"
                  >
                    <Icon as={MessageCircle} mr={2} />
                    Enquire on WhatsApp
                  </Button>

                  <Button
                    colorPalette="blue"
                    variant="outline"
                    size="lg"
                    w="full"
                    as="a"
                    href={whatsappLink}
                    target="_blank"
                  >
                    Book Now
                  </Button>

                  <Box borderTop="1px solid" borderColor="gray.200" pt={4}>
                    <Text fontSize="sm" fontWeight="medium" color="gray.900" mb={2}>
                      Hosted by {shortlet.host_name}
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      Response time: {shortlet.host_response_time}
                    </Text>
                  </Box>

                  <Box borderTop="1px solid" borderColor="gray.200" pt={4}>
                    <VStack gap={2} align="stretch">
                      <HStack gap={2}>
                        <Icon as={CheckCircle} color="green.500" boxSize={4} />
                        <Text fontSize="xs" color="gray.600">
                          Verified property
                        </Text>
                      </HStack>
                      <HStack gap={2}>
                        <Icon as={CheckCircle} color="green.500" boxSize={4} />
                        <Text fontSize="xs" color="gray.600">
                          Secure payment via Paystack
                        </Text>
                      </HStack>
                      <HStack gap={2}>
                        <Icon as={CheckCircle} color="green.500" boxSize={4} />
                        <Text fontSize="xs" color="gray.600">
                          24/7 support available
                        </Text>
                      </HStack>
                    </VStack>
                  </Box>
                </VStack>
              </Card.Body>
            </MotionCard>
          </Box>
        </Grid>
      </Container>

      {/* Why Book With Us */}
      <Box bg="gray.50" py={12}>
        <Container maxW="7xl">
          <Heading as="h2" fontSize="3xl" textAlign="center" mb={8} color="gray.900">
            Why Book With Ontour Travels?
          </Heading>
          <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={6}>
            <Card.Root textAlign="center">
              <Card.Body p={6}>
                <Icon as={Shield} boxSize={12} color="blue.600" mx="auto" mb={3} />
                <Heading as="h3" fontSize="lg" mb={2}>
                  Verified Properties
                </Heading>
                <Text fontSize="sm" color="gray.600">
                  All listings are personally inspected and verified
                </Text>
              </Card.Body>
            </Card.Root>

            <Card.Root textAlign="center">
              <Card.Body p={6}>
                <Icon as={MessageCircle} boxSize={12} color="green.600" mx="auto" mb={3} />
                <Heading as="h3" fontSize="lg" mb={2}>
                  Instant Support
                </Heading>
                <Text fontSize="sm" color="gray.600">
                  WhatsApp assistance available 24/7
                </Text>
              </Card.Body>
            </Card.Root>

            <Card.Root textAlign="center">
              <Card.Body p={6}>
                <Icon as={CheckCircle} boxSize={12} color="purple.600" mx="auto" mb={3} />
                <Heading as="h3" fontSize="lg" mb={2}>
                  Flexible Booking
                </Heading>
                <Text fontSize="sm" color="gray.600">
                  Easy check-in and fair cancellation policies
                </Text>
              </Card.Body>
            </Card.Root>

            <Card.Root textAlign="center">
              <Card.Body p={6}>
                <Icon as={Star} boxSize={12} color="yellow.600" mx="auto" mb={3} />
                <Heading as="h3" fontSize="lg" mb={2}>
                  Best Locations
                </Heading>
                <Text fontSize="sm" color="gray.600">
                  Prime areas across Lagos with great access
                </Text>
              </Card.Body>
            </Card.Root>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}