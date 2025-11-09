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
  Link,
  Input,
  IconButton,
  Drawer,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Plane, 
  MapPin,
  Users,
  Wifi,
  Wind,
  Car,
  Tv,
  Shield,
  MessageCircle,
  Calendar,
  Search,
  Filter,
  Star,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Hotel,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card.Root);

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

interface Shortlet {
  id: string;
  slug: string;
  title: string;
  location: string;
  property_type: string;
  price_per_night_ngn: number;
  price_per_night_usd: number;
  bedrooms: number;
  bathrooms: number;
  max_guests: number;
  description: string;
  amenities: string[];
  gallery: string[];
  rating: number;
  reviews_count: number;
  status: string;
}

export default function ShortletsPage() {
  const router = useRouter();
  const [shortlets, setShortlets] = useState<Shortlet[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchShortlets = async () => {
      try {
        const response = await fetch("/api/shortlets");
        if (response.ok) {
          const data = await response.json();
          setShortlets(data.shortlets || []);
        }
      } catch (error) {
        console.error("Error fetching shortlets:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchShortlets();
  }, []);

  return (
    <Box minH="100vh" bg="gray.50">
      {/* Header */}
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
                <Link href="/" color="#2C2C2C" _hover={{ color: "#152852" }} fontSize="lg" onClick={() => setMobileMenuOpen(false)}>
                  Home
                </Link>
                <Link href="/book" color="#2C2C2C" _hover={{ color: "#152852" }} fontSize="lg" onClick={() => setMobileMenuOpen(false)}>
                  Flights & Hotels
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
                  <MessageCircle size={20} style={{ marginRight: '8px' }} />
                  WhatsApp
                </Button>
              </VStack>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>

      {/* Hero Section */}
      <MotionBox
        bg="#152852"
        color="white"
        py={20}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Container maxW="7xl" textAlign="center">
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Heading as="h1" fontSize={{ base: "4xl", md: "5xl" }} fontWeight="bold" mb={4}>
              Book Shortlet Apartments in Lagos
            </Heading>
            <Text fontSize="xl" color="#FAFAFA" mb={8}>
              Verified homes, flexible check-in, secure payments.
            </Text>
          </MotionBox>

          {/* Search Bar */}
          <MotionBox
            bg="white"
            borderRadius="xl"
            p={6}
            boxShadow="xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={4}>
              <Input placeholder="Location (e.g., Lekki)" size="lg" bg="gray.50" color="#2C2C2C" />
              <Input type="date" placeholder="Check-in" size="lg" bg="gray.50" color="#2C2C2C" />
              <Input type="date" placeholder="Check-out" size="lg" bg="gray.50" color="#2C2C2C" />
              <Input placeholder="Guests" size="lg" bg="gray.50" color="#2C2C2C" />
            </Grid>
            <Button bg="#152852" color="white" _hover={{ bg: "#0d1a35" }} size="lg" w="full" mt={4}>
              <Search size={20} style={{ marginRight: '8px' }} />
              Search Shortlets
            </Button>
          </MotionBox>
        </Container>
      </MotionBox>

      {/* Why Book with Us */}
      <Container maxW="7xl" py={16}>
        <MotionBox
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={8}>
            <TrustCard
              icon={Shield}
              title="Verified Apartments"
              description="All properties thoroughly vetted"
            />
            <TrustCard
              icon={Calendar}
              title="Flexible Check-in"
              description="Book for days, weeks, or months"
            />
            <TrustCard
              icon={CheckCircle}
              title="Secure Payments"
              description="Pay safely with Paystack"
            />
            <TrustCard
              icon={MessageCircle}
              title="24/7 Support"
              description="WhatsApp & phone support"
            />
          </Grid>
        </MotionBox>
      </Container>

      {/* Listings */}
      <Container maxW="7xl" py={12}>
        <Grid templateColumns={{ base: "1fr", lg: "250px 1fr" }} gap={8}>
          {/* Filters */}
          <Box display={{ base: "none", lg: "block" }}>
            <MotionBox
              bg="white"
              borderRadius="lg"
              p={6}
              boxShadow="sm"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Heading as="h3" fontSize="lg" mb={4}>
                <Filter size={20} style={{ display: 'inline', marginRight: '8px' }} />
                Filters
              </Heading>

              <VStack align="stretch" gap={6}>
                <Box>
                  <Text fontWeight="bold" mb={3}>Location</Text>
                  <VStack align="start" gap={2}>
                    <Checkbox>Lekki</Checkbox>
                    <Checkbox>Victoria Island</Checkbox>
                    <Checkbox>Ikoyi</Checkbox>
                    <Checkbox>Ikeja</Checkbox>
                  </VStack>
                </Box>

                <Box>
                  <Text fontWeight="bold" mb={3}>Property Type</Text>
                  <VStack align="start" gap={2}>
                    <Checkbox>1 Bedroom</Checkbox>
                    <Checkbox>2 Bedrooms</Checkbox>
                    <Checkbox>3 Bedrooms</Checkbox>
                    <Checkbox>Studio</Checkbox>
                  </VStack>
                </Box>

                <Box>
                  <Text fontWeight="bold" mb={3}>Amenities</Text>
                  <VStack align="start" gap={2}>
                    <Checkbox>Wi-Fi</Checkbox>
                    <Checkbox>Air Conditioning</Checkbox>
                    <Checkbox>Pool</Checkbox>
                    <Checkbox>Parking</Checkbox>
                    <Checkbox>Gym</Checkbox>
                    <Checkbox>Security</Checkbox>
                  </VStack>
                </Box>

                <Box>
                  <Text fontWeight="bold" mb={3}>Price Range</Text>
                  <Text fontSize="sm" color="gray.600">₦20,000 - ₦100,000 per night</Text>
                </Box>
              </VStack>
            </MotionBox>
          </Box>

          {/* Property Grid */}
          <Box>
            <Flex justify="space-between" align="center" mb={6}>
              <Text fontSize="lg" fontWeight="medium">
                {shortlets.length} properties available
              </Text>
              <Button size="sm" variant="outline" display={{ base: "flex", lg: "none" }}>
                <Filter size={16} style={{ marginRight: '8px' }} />
                Filters
              </Button>
            </Flex>

            {loading ? (
              <Text textAlign="center" fontSize="xl" color="gray.600">
                Loading shortlets...
              </Text>
            ) : shortlets.length === 0 ? (
              <Text textAlign="center" fontSize="xl" color="gray.600">
                No shortlets available at the moment.
              </Text>
            ) : (
              <MotionBox
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
                  {shortlets.map((shortlet) => (
                    <PropertyCard key={shortlet.id} property={shortlet} router={router} />
                  ))}
                </Grid>
              </MotionBox>
            )}
          </Box>
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box bg="#f0f0f0" py={16}>
        <Container maxW="4xl">
          <MotionBox
            textAlign="center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Heading as="h3" fontSize="3xl" mb={4}>
              Need help finding the right shortlet?
            </Heading>
            <Text fontSize="lg" color="gray.600" mb={6}>
              Chat with us on WhatsApp for personalized recommendations
            </Text>
            <Button
              as="a"
              href="https://wa.me/2348123456789?text=Hi%20Ontour,%20I'm%20looking%20for%20a%20shortlet%20in%20Lagos"
              target="_blank"
              bg="#25D366"
              color="white"
              _hover={{ bg: "#1da851" }}
              size="lg"
            >
              <MessageCircle size={20} style={{ marginRight: '8px' }} />
              Chat on WhatsApp
            </Button>
          </MotionBox>
        </Container>
      </Box>

      {/* Footer */}
      <Box bg="#2C2C2C" color="white" py={12}>
        <Container maxW="7xl">
          <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={8}>
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
              <Text color="#E5E5E5" fontSize="sm">
                Your trusted partner for travel and accommodation in Lagos.
              </Text>
            </Box>
            <Box>
              <Heading as="h3" fontSize="lg" fontWeight="bold" mb={4}>Quick Links</Heading>
              <VStack align="start" gap={2}>
                <Link href="/" color="#E5E5E5" _hover={{ color: "white" }}>Home</Link>
                <Link href="/book" color="#E5E5E5" _hover={{ color: "white" }}>Flights & Hotels</Link>
                <Link href="/tours" color="#E5E5E5" _hover={{ color: "white" }}>Tours</Link>
                <Link href="/about" color="#E5E5E5" _hover={{ color: "white" }}>About</Link>
              </VStack>
            </Box>
            <Box>
              <Heading as="h3" fontSize="lg" fontWeight="bold" mb={4}>Support</Heading>
              <VStack align="start" gap={2}>
                <Link href="/contact" color="#E5E5E5" _hover={{ color: "white" }}>Contact Us</Link>
                <Link href="/faq" color="#E5E5E5" _hover={{ color: "white" }}>FAQ</Link>
                <Link href="/privacy" color="#E5E5E5" _hover={{ color: "white" }}>Privacy Policy</Link>
              </VStack>
            </Box>
            <Box>
              <Heading as="h3" fontSize="lg" fontWeight="bold" mb={4}>Contact</Heading>
              <VStack align="start" gap={2}>
                <Text color="#E5E5E5" fontSize="sm">+234 812 345 6789</Text>
                <Text color="#E5E5E5" fontSize="sm">info@ontourtravels.com.ng</Text>
                <Text color="#E5E5E5" fontSize="sm">Mon–Sat, 9 AM – 6 PM</Text>
              </VStack>
            </Box>
          </Grid>
          <Box borderTop="1px" borderColor="gray.800" pt={8} mt={8} textAlign="center" color="#E5E5E5">
            <Text fontSize="sm">&copy; 2024 Ontour Travels. All rights reserved. Made with <Text as="span" color="red.500">💓</Text> by <Link href="https://github.com/peldevon" target="_blank" rel="noopener noreferrer" _hover={{ color: "#C9A449" }}>Peldevon</Link></Text>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

function TrustCard({ icon: IconComponent, title, description }: any) {
  return (
    <MotionBox
      variants={fadeInUp}
      textAlign="center"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Flex direction="column" align="center" gap={3}>
        <Box
          w={16}
          h={16}
          bg="#f0f0f0"
          borderRadius="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <IconComponent size={32} color="#152852" />
        </Box>
        <Heading as="h3" fontSize="lg" fontWeight="bold">
          {title}
        </Heading>
        <Text fontSize="sm" color="gray.600">
          {description}
        </Text>
      </Flex>
    </MotionBox>
  );
}

function PropertyCard({ property, router }: { property: Shortlet; router: any }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === property.gallery.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.gallery.length - 1 : prev - 1
    );
  };

  const handleViewDetails = () => {
    router.push(`/shortlets/${property.slug}`);
  };

  return (
    <MotionCard
      overflow="hidden"
      cursor="pointer"
      variants={fadeInUp}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      bg="white"
      boxShadow="md"
      _hover={{ boxShadow: "xl" }}
    >
      <Box position="relative" h="56" overflow="hidden" onMouseLeave={() => setCurrentImageIndex(0)}>
        <Image 
          src={property.gallery[currentImageIndex]}
          alt={property.title}
          w="full"
          h="full"
          objectFit="cover"
        />
        
        {/* Image Navigation Buttons */}
        {property.gallery.length > 1 && (
          <>
            <IconButton
              position="absolute"
              left={2}
              top="50%"
              transform="translateY(-50%)"
              onClick={prevImage}
              bg="gray.200"
              color="gray.700"
              _hover={{ bg: "gray.300" }}
              size="sm"
              borderRadius="full"
              aria-label="Previous image"
            >
              <ChevronLeft />
            </IconButton>
            <IconButton
              position="absolute"
              right={2}
              top="50%"
              transform="translateY(-50%)"
              onClick={nextImage}
              bg="gray.200"
              color="gray.700"
              _hover={{ bg: "gray.300" }}
              size="sm"
              borderRadius="full"
              aria-label="Next image"
            >
              <ChevronRight />
            </IconButton>
            
            {/* Image Indicators */}
            <HStack
              position="absolute"
              bottom={2}
              left="50%"
              transform="translateX(-50%)"
              gap={1}
            >
              {property.gallery.map((_, idx) => (
                <Box
                  key={idx}
                  w={2}
                  h={2}
                  borderRadius="full"
                  bg={idx === currentImageIndex ? "white" : "whiteAlpha.600"}
                  cursor="pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(idx);
                  }}
                />
              ))}
            </HStack>
          </>
        )}
        
        <Box
          position="absolute"
          top={4}
          right={4}
          bg="white"
          borderRadius="md"
          px={3}
          py={1}
          boxShadow="md"
        >
          <HStack gap={1}>
            <Star size={16} fill="#C9A449" color="#C9A449" />
            <Text fontWeight="bold" fontSize="sm">{property.rating}</Text>
            <Text fontSize="xs" color="gray.600">({property.reviews_count})</Text>
          </HStack>
        </Box>
      </Box>
      <Card.Body p={5}>
        <HStack gap={2} mb={2}>
          <MapPin size={16} color="#152852" />
          <Text fontSize="sm" color="gray.600">{property.location}</Text>
        </HStack>
        <Heading as="h3" fontSize="lg" fontWeight="bold" mb={3} color="#2C2C2C">
          {property.title}
        </Heading>
        <HStack gap={2} mb={4} flexWrap="wrap">
          {property.amenities.slice(0, 4).map((amenity: string) => (
            <Box
              key={amenity}
              px={2}
              py={1}
              bg="#f0f0f0"
              color="#152852"
              borderRadius="md"
              fontSize="xs"
              fontWeight="medium"
            >
              {amenity}
            </Box>
          ))}
        </HStack>
        <Flex justify="space-between" align="center" mb={4}>
          <Box>
            <Text fontSize="2xl" fontWeight="bold" color="#152852">₦{property.price_per_night_ngn.toLocaleString()}</Text>
            <Text fontSize="xs" color="gray.500">per night</Text>
          </Box>
        </Flex>
        <Flex gap={2}>
          <Button bg="#152852" color="white" _hover={{ bg: "#0d1a35" }} flex={1} onClick={handleViewDetails}>
            View Details
          </Button>
          <Button
            as="a"
            href={`https://wa.me/2348123456789?text=Hi%20Ontour,%20I'm%20interested%20in%20${encodeURIComponent(property.title)}`}
            target="_blank"
            variant="outline"
            colorPalette="green"
          >
            <MessageCircle size={20} />
          </Button>
        </Flex>
      </Card.Body>
    </MotionCard>
  );
}