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
    <Box minH="100vh" pt={{ base: "70px", md: "80px" }} overflowX="hidden">
      {/* Fixed Navbar for Mobile & Desktop */}
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={50}
        bg="white"
        boxShadow="sm"
      >
        <Container maxW="7xl" py={3}>
          <Flex justify="space-between" align="center">
            <HStack gap={2} as="a" href="/">
              <Image 
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/ontour_logo-removebg-preview-1762616230494.png?width=8000&height=8000&resize=contain"
                alt="Ontour Travels Logo"
                h={{ base: "40px", md: "50px" }}
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
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              bg="transparent"
              _hover={{ bg: "gray.100" }}
            >
              <Menu />
            </IconButton>
          </Flex>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <VStack 
              display={{ base: "flex", md: "none" }} 
              align="stretch" 
              gap={3} 
              mt={4} 
              pb={4}
              borderTop="1px"
              borderColor="gray.200"
              pt={4}
            >
              <Link href="/" color="#2C2C2C" _hover={{ color: "#152852" }}>Home</Link>
              <Link href="/book" color="#2C2C2C" _hover={{ color: "#152852" }}>Flights & Hotels</Link>
              <Link href="/shortlets" color="#2C2C2C" _hover={{ color: "#152852" }}>Shortlets</Link>
              <Link href="/tours" color="#2C2C2C" _hover={{ color: "#152852" }}>Tours</Link>
              <Link href="/about" color="#2C2C2C" _hover={{ color: "#152852" }}>About</Link>
              <Link href="/contact" color="#2C2C2C" _hover={{ color: "#152852" }}>Contact</Link>
              <Button bg="#152852" color="white" _hover={{ bg: "#0d1a35" }} size="sm" as="a" href="https://wa.me/2348123456789" target="_blank">
                <Icon as={MessageCircle} mr={1} />
                WhatsApp
              </Button>
            </VStack>
          )}
        </Container>
      </Box>

      {/* Back Button */}
      <Container maxW="7xl" py={4}>
        <Button
          variant="ghost"
          onClick={() => router.push("/shortlets")}
          leftIcon={<ArrowLeft />}
          size={{ base: "sm", md: "md" }}
        >
          Back to Shortlets
        </Button>
      </Container>

      {/* Image Gallery */}
      <Container maxW="7xl" mb={8} px={{ base: 4, md: 6 }}>
        <Grid templateColumns={{ base: "1fr", md: "2fr 1fr" }} gap={4} h={{ base: "auto", md: "500px" }}>
          <Box position="relative" overflow="hidden" borderRadius="xl" h={{ base: "300px", md: "full" }}>
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
                borderColor="#152852"
                onClick={() => setSelectedImage(idx)}
                _hover={{ opacity: 0.8 }}
                h={{ base: "100px", md: "auto" }}
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

      <Container maxW="7xl" pb={12} px={{ base: 4, md: 6 }}>
        <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={8}>
          {/* Main Content */}
          <Box>
            {/* Header */}
            <MotionBox variants={fadeInUp} initial="hidden" animate="visible" mb={8}>
              <HStack gap={2} mb={3} flexWrap="wrap">
                <Box px={3} py={1} bg="#e6f0ff" color="#152852" borderRadius="md" fontSize="sm" fontWeight="medium">
                  {shortlet.property_type}
                </Box>
                {shortlet.featured && (
                  <Box px={3} py={1} bg="#fff4e6" color="#C9A449" borderRadius="md" fontSize="sm" fontWeight="medium">
                    Featured
                  </Box>
                )}
              </HStack>

              <Heading as="h1" fontSize={{ base: "2xl", md: "4xl" }} mb={4} color="#2C2C2C">
                {shortlet.title}
              </Heading>

              <HStack gap={4} mb={4} flexWrap="wrap">
                <HStack gap={2}>
                  <Icon as={MapPin} color="#152852" boxSize={5} />
                  <Text color="#555555" fontWeight="medium" fontSize={{ base: "sm", md: "md" }}>{shortlet.location}</Text>
                </HStack>
                <HStack gap={1}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon
                      key={i}
                      as={Star}
                      boxSize={4}
                      fill={i < Math.floor(shortlet.rating) ? "#C9A449" : "none"}
                      color={i < Math.floor(shortlet.rating) ? "#C9A449" : "gray.300"}
                    />
                  ))}
                  <Text fontSize="sm" color="#555555" ml={2}>
                    {shortlet.rating} ({shortlet.reviews_count} reviews)
                  </Text>
                </HStack>
              </HStack>

              {/* Property Info with Check-in/Check-out inline */}
              <Flex 
                gap={4} 
                flexWrap="wrap" 
                color="#2C2C2C" 
                align="center"
                p={4}
                bg="#f7f4ed"
                borderRadius="lg"
                mb={4}
              >
                <HStack gap={2}>
                  <Icon as={Home} color="#152852" />
                  <Text fontSize={{ base: "sm", md: "md" }}>{shortlet.bedrooms} Bedroom{shortlet.bedrooms > 1 ? 's' : ''}</Text>
                </HStack>
                <Text color="#E5E5E5">|</Text>
                <HStack gap={2}>
                  <Icon as={Users} color="#152852" />
                  <Text fontSize={{ base: "sm", md: "md" }}>Up to {shortlet.max_guests} guests</Text>
                </HStack>
                <Text color="#E5E5E5">|</Text>
                <HStack gap={2}>
                  <Icon as={Clock} color="#152852" />
                  <Text fontSize={{ base: "sm", md: "md" }}>Check-in: {shortlet.policies.check_in}</Text>
                </HStack>
                <Text color="#E5E5E5">|</Text>
                <HStack gap={2}>
                  <Icon as={Clock} color="#C9A449" />
                  <Text fontSize={{ base: "sm", md: "md" }}>Check-out: {shortlet.policies.check_out}</Text>
                </HStack>
              </Flex>
            </MotionBox>

            {/* Description */}
            <MotionBox variants={fadeInUp} initial="hidden" animate="visible" mb={8}>
              <Heading as="h2" fontSize={{ base: "xl", md: "2xl" }} mb={4} color="#2C2C2C">
                About this property
              </Heading>
              <Text color="#555555" lineHeight="tall" fontSize={{ base: "sm", md: "md" }}>
                {shortlet.description}
              </Text>
            </MotionBox>

            {/* Location Details */}
            <MotionBox variants={fadeInUp} initial="hidden" animate="visible" mb={8}>
              <Heading as="h2" fontSize={{ base: "xl", md: "2xl" }} mb={4} color="#2C2C2C">
                <Icon as={MapPin} color="#152852" mr={2} />
                Location & Nearby
              </Heading>
              <Card.Root bg="#e6f0ff" borderColor="#152852">
                <Card.Body p={{ base: 4, md: 5 }}>
                  <VStack gap={3} align="stretch">
                    <HStack gap={3} flexWrap="wrap">
                      <Text fontWeight="medium" color="#2C2C2C" minW={{ base: "60px", md: "80px" }} fontSize={{ base: "sm", md: "md" }}>Area:</Text>
                      <Text color="#555555" fontSize={{ base: "sm", md: "md" }}>{shortlet.location_details.area}</Text>
                    </HStack>
                    <HStack gap={3} flexWrap="wrap">
                      <Text fontWeight="medium" color="#2C2C2C" minW={{ base: "60px", md: "80px" }} fontSize={{ base: "sm", md: "md" }}>City:</Text>
                      <Text color="#555555" fontSize={{ base: "sm", md: "md" }}>{shortlet.location_details.city}, {shortlet.location_details.state}</Text>
                    </HStack>
                    <HStack gap={3} align="start" flexWrap="wrap">
                      <Text fontWeight="medium" color="#2C2C2C" minW={{ base: "60px", md: "80px" }} fontSize={{ base: "sm", md: "md" }}>Nearby:</Text>
                      <Text color="#555555" fontSize={{ base: "sm", md: "md" }}>{shortlet.location_details.nearby}</Text>
                    </HStack>
                  </VStack>
                </Card.Body>
              </Card.Root>
            </MotionBox>

            {/* Amenities */}
            <MotionBox variants={fadeInUp} initial="hidden" animate="visible" mb={8}>
              <Heading as="h2" fontSize={{ base: "xl", md: "2xl" }} mb={4} color="#2C2C2C">
                Amenities
              </Heading>
              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                {shortlet.amenities.map((amenity, idx) => {
                  const IconComponent = amenityIcons[amenity] || CheckCircle;
                  return (
                    <HStack key={idx} gap={3} p={3} bg="#FAFAFA" borderRadius="md">
                      <Icon as={IconComponent} color="#152852" boxSize={5} flexShrink={0} />
                      <Text color="#2C2C2C" fontSize={{ base: "sm", md: "md" }}>{amenity}</Text>
                    </HStack>
                  );
                })}
              </Grid>
            </MotionBox>

            {/* Features */}
            <MotionBox variants={fadeInUp} initial="hidden" animate="visible" mb={8}>
              <Heading as="h2" fontSize={{ base: "xl", md: "2xl" }} mb={4} color="#2C2C2C">
                Property Features
              </Heading>
              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={3}>
                {shortlet.features.map((feature, idx) => (
                  <HStack key={idx} gap={2}>
                    <Icon as={CheckCircle} color="#25D366" boxSize={4} />
                    <Text fontSize="sm" color="#555555">{feature}</Text>
                  </HStack>
                ))}
              </Grid>
            </MotionBox>

            {/* House Rules */}
            <MotionBox variants={fadeInUp} initial="hidden" animate="visible" mb={8}>
              <Heading as="h2" fontSize={{ base: "xl", md: "2xl" }} mb={4} color="#2C2C2C">
                <Icon as={AlertCircle} color="#ff9800" mr={2} />
                House Rules
              </Heading>
              <VStack gap={2} align="stretch">
                {shortlet.policies.house_rules.map((rule, idx) => (
                  <HStack key={idx} gap={3} p={3} bg="#fff4e6" borderRadius="md" flexWrap="wrap">
                    <Icon as={rule.includes("No") || rule.includes("not allowed") ? XCircle : CheckCircle} color={rule.includes("No") || rule.includes("not allowed") ? "#f44336" : "#152852"} boxSize={5} flexShrink={0} />
                    <Text color="#2C2C2C" fontSize={{ base: "sm", md: "md" }}>{rule}</Text>
                  </HStack>
                ))}
              </VStack>
            </MotionBox>

            {/* Cancellation Policy */}
            <MotionBox variants={fadeInUp} initial="hidden" animate="visible" mb={8}>
              <Heading as="h2" fontSize={{ base: "xl", md: "2xl" }} mb={4} color="#2C2C2C">
                Cancellation Policy
              </Heading>
              <Card.Root bg="#fff4e6" borderColor="#C9A449">
                <Card.Body p={{ base: 4, md: 5 }}>
                  <Text color="#555555" fontSize={{ base: "sm", md: "md" }}>{shortlet.policies.cancellation}</Text>
                </Card.Body>
              </Card.Root>
            </MotionBox>

            {/* Security Deposit */}
            <MotionBox variants={fadeInUp} initial="hidden" animate="visible">
              <Heading as="h2" fontSize={{ base: "xl", md: "2xl" }} mb={4} color="#2C2C2C">
                <Icon as={Shield} color="#25D366" mr={2} />
                Security Deposit
              </Heading>
              <Card.Root bg="#e8f5e9" borderColor="#25D366">
                <Card.Body p={{ base: 4, md: 5 }}>
                  <Text color="#2C2C2C" fontWeight="medium" fontSize={{ base: "sm", md: "md" }}>{shortlet.policies.deposit}</Text>
                  <Text fontSize="sm" color="#555555" mt={2}>
                    The deposit will be refunded within 7 days after checkout, subject to property inspection.
                  </Text>
                </Card.Body>
              </Card.Root>
            </MotionBox>
          </Box>

          {/* Sidebar */}
          <Box>
            <MotionCard
              position={{ base: "relative", lg: "sticky" }}
              top={{ base: "auto", lg: 24 }}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
            >
              <Card.Body p={{ base: 4, md: 6 }}>
                <VStack gap={4} align="stretch">
                  <Box>
                    <Text fontSize="sm" color="#555555" mb={1}>
                      Price per night
                    </Text>
                    <Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }} color="#152852">
                      ₦{shortlet.price_per_night_ngn.toLocaleString()}
                    </Heading>
                    <Text fontSize="sm" color="#888888">
                      ${shortlet.price_per_night_usd} USD
                    </Text>
                  </Box>

                  <Box borderTop="1px solid" borderColor="#E5E5E5" pt={4}>
                    <VStack gap={3} align="stretch">
                      <HStack gap={2}>
                        <Icon as={Home} color="#555555" />
                        <Text fontSize="sm" color="#2C2C2C">
                          {shortlet.bedrooms} Bedroom, {shortlet.bathrooms} Bathroom
                        </Text>
                      </HStack>
                      <HStack gap={2}>
                        <Icon as={Users} color="#555555" />
                        <Text fontSize="sm" color="#2C2C2C">
                          Up to {shortlet.max_guests} guests
                        </Text>
                      </HStack>
                      <HStack gap={2}>
                        <Icon as={Calendar} color="#555555" />
                        <Text fontSize="sm" color="#2C2C2C">
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
                    bg="#25D366"
                    _hover={{ bg: "#1da851" }}
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
                    borderColor="#152852"
                    color="#152852"
                    _hover={{ bg: "#e6f0ff" }}
                  >
                    Book Now
                  </Button>

                  <Box borderTop="1px solid" borderColor="#E5E5E5" pt={4}>
                    <Text fontSize="sm" fontWeight="medium" color="#2C2C2C" mb={2}>
                      Hosted by {shortlet.host_name}
                    </Text>
                    <Text fontSize="xs" color="#555555">
                      Response time: {shortlet.host_response_time}
                    </Text>
                  </Box>

                  <Box borderTop="1px solid" borderColor="#E5E5E5" pt={4}>
                    <VStack gap={2} align="stretch">
                      <HStack gap={2}>
                        <Icon as={CheckCircle} color="#25D366" boxSize={4} />
                        <Text fontSize="xs" color="#555555">
                          Verified property
                        </Text>
                      </HStack>
                      <HStack gap={2}>
                        <Icon as={CheckCircle} color="#25D366" boxSize={4} />
                        <Text fontSize="xs" color="#555555">
                          Secure payment via Paystack
                        </Text>
                      </HStack>
                      <HStack gap={2}>
                        <Icon as={CheckCircle} color="#25D366" boxSize={4} />
                        <Text fontSize="xs" color="#555555">
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
      <Box bg="#FAFAFA" py={12}>
        <Container maxW="7xl" px={{ base: 4, md: 6 }}>
          <Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }} textAlign="center" mb={8} color="#2C2C2C">
            Why Book With Ontour Travels?
          </Heading>
          <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} gap={6}>
            <Card.Root textAlign="center">
              <Card.Body p={{ base: 4, md: 6 }}>
                <Icon as={Shield} boxSize={{ base: 10, md: 12 }} color="#152852" mx="auto" mb={3} />
                <Heading as="h3" fontSize={{ base: "md", md: "lg" }} mb={2}>
                  Verified Properties
                </Heading>
                <Text fontSize="sm" color="#555555">
                  All listings are personally inspected and verified
                </Text>
              </Card.Body>
            </Card.Root>

            <Card.Root textAlign="center">
              <Card.Body p={{ base: 4, md: 6 }}>
                <Icon as={MessageCircle} boxSize={{ base: 10, md: 12 }} color="#25D366" mx="auto" mb={3} />
                <Heading as="h3" fontSize={{ base: "md", md: "lg" }} mb={2}>
                  Instant Support
                </Heading>
                <Text fontSize="sm" color="#555555">
                  WhatsApp assistance available 24/7
                </Text>
              </Card.Body>
            </Card.Root>

            <Card.Root textAlign="center">
              <Card.Body p={{ base: 4, md: 6 }}>
                <Icon as={CheckCircle} boxSize={{ base: 10, md: 12 }} color="#9c27b0" mx="auto" mb={3} />
                <Heading as="h3" fontSize={{ base: "md", md: "lg" }} mb={2}>
                  Flexible Booking
                </Heading>
                <Text fontSize="sm" color="#555555">
                  Easy check-in and fair cancellation policies
                </Text>
              </Card.Body>
            </Card.Root>

            <Card.Root textAlign="center">
              <Card.Body p={{ base: 4, md: 6 }}>
                <Icon as={Star} boxSize={{ base: 10, md: 12 }} color="#C9A449" mx="auto" mb={3} />
                <Heading as="h3" fontSize={{ base: "md", md: "lg" }} mb={2}>
                  Best Locations
                </Heading>
                <Text fontSize="sm" color="#555555">
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