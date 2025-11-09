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
  Input,
  Textarea,
  IconButton,
  Drawer,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  MapPin,
  Calendar,
  Users,
  CheckCircle,
  XCircle,
  MessageCircle,
  ArrowLeft,
  Clock,
  Plane,
  DollarSign,
  FileText,
  Shield,
  Star,
  Info,
  Menu,
  X,
} from "lucide-react";
import { Field } from "@/components/ui/field";
import { toaster } from "@/components/ui/toaster";

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card.Root);

interface Tour {
  id: string;
  slug: string;
  title: string;
  category: string;
  tags: string[];
  duration_days: number;
  duration_nights: number;
  price_from_ngn: number;
  price_from_usd: number;
  short_description: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: Array<{
    day: number;
    title: string;
    description: string;
  }>;
  accommodation_examples: string[];
  seasonality: string;
  visa_notes: string;
  add_ons: string[];
  cancellation_terms: string;
  gallery: string[];
  whatsapp_prefill: string;
  status: string;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function TourDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dates: "",
    adults: "",
    children: "",
    budget: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const response = await fetch(`/api/tours/${params.slug}`);
        if (!response.ok) {
          throw new Error("Tour not found");
        }
        const data = await response.json();
        setTour(data);
      } catch (error) {
        console.error("Error fetching tour:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [params.slug]);

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          serviceType: `Tour Enquiry: ${tour?.title}`,
        }),
      });

      if (response.ok) {
        toaster.create({
          title: "Enquiry Sent!",
          description: "We'll get back to you within 24 hours. Check WhatsApp for faster response!",
          type: "success",
          duration: 5000,
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          dates: "",
          adults: "",
          children: "",
          budget: "",
          message: ""
        });
        setShowEnquiryForm(false);
      } else {
        throw new Error("Failed to send enquiry");
      }
    } catch (error) {
      toaster.create({
        title: "Error",
        description: "Failed to send enquiry. Please try WhatsApp instead.",
        type: "error",
        duration: 5000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box minH="100vh" py={20}>
        <Container maxW="7xl">
          <Text textAlign="center" fontSize="xl" color="gray.600">
            Loading tour details...
          </Text>
        </Container>
      </Box>
    );
  }

  if (!tour) {
    return (
      <Box minH="100vh" py={20}>
        <Container maxW="7xl" textAlign="center">
          <Heading mb={4}>Tour Not Found</Heading>
          <Text color="gray.600" mb={6}>
            Sorry, we couldn't find the tour you're looking for.
          </Text>
          <Button onClick={() => router.push("/tours")} colorPalette="blue">
            <Icon as={ArrowLeft} mr={2} />
            Back to Tours
          </Button>
        </Container>
      </Box>
    );
  }

  const whatsappLink = `https://wa.me/2348123456789?text=${encodeURIComponent(tour.whatsapp_prefill)}`;

  return (
    <Box minH="100vh">
      {/* Navigation Header */}
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
              <Link href="/shortlets" color="#2C2C2C" _hover={{ color: "#152852" }}>Shortlets</Link>
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
          onClick={() => router.push("/tours")}
          leftIcon={<ArrowLeft />}
        >
          Back to Tours
        </Button>
      </Container>

      {/* Image Gallery */}
      <Container maxW="7xl" mb={8}>
        <Grid templateColumns={{ base: "1fr", md: "2fr 1fr" }} gap={4} h={{ base: "auto", md: "500px" }}>
          <Box position="relative" overflow="hidden" borderRadius="xl">
            <Image
              src={tour.gallery[selectedImage]}
              alt={tour.title}
              w="full"
              h="full"
              objectFit="cover"
            />
          </Box>
          <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "1fr" }} gap={4}>
            {tour.gallery.slice(0, 4).map((img, idx) => (
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
                  alt={`${tour.title} ${idx + 1}`}
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
              <HStack gap={2} mb={3} flexWrap="wrap">
                <Box px={3} py={1} bg="blue.100" color="blue.700" borderRadius="md" fontSize="sm" fontWeight="medium">
                  {tour.category.toUpperCase()}
                </Box>
                {tour.tags.slice(0, 3).map((tag) => (
                  <Box key={tag} px={3} py={1} bg="gray.100" color="gray.700" borderRadius="md" fontSize="sm">
                    {tag}
                  </Box>
                ))}
              </HStack>

              <Heading as="h1" fontSize={{ base: "3xl", md: "4xl" }} mb={4} color="gray.900">
                {tour.title}
              </Heading>

              <Text fontSize="lg" color="gray.600" mb={4}>
                {tour.short_description}
              </Text>

              <HStack gap={6} flexWrap="wrap" color="gray.700">
                <HStack gap={2}>
                  <Icon as={Clock} color="blue.600" />
                  <Text>{tour.duration_days}D/{tour.duration_nights}N</Text>
                </HStack>
                <HStack gap={2}>
                  <Icon as={Calendar} color="blue.600" />
                  <Text>{tour.seasonality.split(":")[1]?.trim() || tour.seasonality}</Text>
                </HStack>
              </HStack>
            </MotionBox>

            {/* Highlights */}
            <MotionBox variants={fadeInUp} initial="hidden" animate="visible" mb={8}>
              <Heading as="h2" fontSize="2xl" mb={4} color="gray.900">
                Tour Highlights
              </Heading>
              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={3}>
                {tour.highlights.map((highlight, idx) => (
                  <HStack key={idx} gap={3} align="start">
                    <Icon as={CheckCircle} color="green.500" boxSize={5} mt={0.5} flexShrink={0} />
                    <Text color="gray.700">{highlight}</Text>
                  </HStack>
                ))}
              </Grid>
            </MotionBox>

            {/* Itinerary */}
            <MotionBox variants={fadeInUp} initial="hidden" animate="visible" mb={8}>
              <Heading as="h2" fontSize="2xl" mb={4} color="gray.900">
                Day-by-Day Itinerary
              </Heading>
              <VStack gap={4} align="stretch">
                {tour.itinerary.map((day) => (
                  <Card.Root key={day.day} p={6} borderLeft="4px solid" borderColor="blue.500">
                    <Card.Body>
                      <HStack gap={3} mb={3}>
                        <Box
                          bg="blue.600"
                          color="white"
                          w={10}
                          h={10}
                          borderRadius="full"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          fontWeight="bold"
                        >
                          {day.day}
                        </Box>
                        <Heading as="h3" fontSize="lg" color="gray.900">
                          {day.title}
                        </Heading>
                      </HStack>
                      <Text color="gray.700" pl={13}>
                        {day.description}
                      </Text>
                    </Card.Body>
                  </Card.Root>
                ))}
              </VStack>
            </MotionBox>

            {/* Inclusions & Exclusions */}
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6} mb={8}>
              <Box>
                <Heading as="h3" fontSize="xl" mb={4} color="gray.900">
                  <Icon as={CheckCircle} color="green.500" mr={2} />
                  What's Included
                </Heading>
                <VStack gap={2} align="stretch">
                  {tour.inclusions.map((item, idx) => (
                    <HStack key={idx} gap={2} align="start">
                      <Icon as={CheckCircle} color="green.500" boxSize={4} mt={1} flexShrink={0} />
                      <Text fontSize="sm" color="gray.700">{item}</Text>
                    </HStack>
                  ))}
                </VStack>
              </Box>

              <Box>
                <Heading as="h3" fontSize="xl" mb={4} color="gray.900">
                  <Icon as={XCircle} color="red.500" mr={2} />
                  What's Not Included
                </Heading>
                <VStack gap={2} align="stretch">
                  {tour.exclusions.map((item, idx) => (
                    <HStack key={idx} gap={2} align="start">
                      <Icon as={XCircle} color="red.500" boxSize={4} mt={1} flexShrink={0} />
                      <Text fontSize="sm" color="gray.700">{item}</Text>
                    </HStack>
                  ))}
                </VStack>
              </Box>
            </Grid>

            {/* Accommodation */}
            <MotionBox variants={fadeInUp} initial="hidden" animate="visible" mb={8}>
              <Heading as="h3" fontSize="xl" mb={4} color="gray.900">
                Accommodation
              </Heading>
              <VStack gap={2} align="stretch">
                {tour.accommodation_examples.map((hotel, idx) => (
                  <HStack key={idx} gap={2}>
                    <Icon as={Star} color="yellow.500" boxSize={4} />
                    <Text color="gray.700">{hotel}</Text>
                  </HStack>
                ))}
              </VStack>
              <Text fontSize="sm" color="gray.500" mt={2}>
                *Accommodation may vary based on availability
              </Text>
            </MotionBox>

            {/* Visa & Documents */}
            <MotionBox variants={fadeInUp} initial="hidden" animate="visible" mb={8}>
              <Heading as="h3" fontSize="xl" mb={4} color="gray.900">
                <Icon as={FileText} color="blue.600" mr={2} />
                Visa & Documentation
              </Heading>
              <Card.Root bg="blue.50" borderColor="blue.200">
                <Card.Body p={5}>
                  <Text color="gray.700">{tour.visa_notes}</Text>
                </Card.Body>
              </Card.Root>
            </MotionBox>

            {/* Add-ons */}
            {tour.add_ons.length > 0 && (
              <MotionBox variants={fadeInUp} initial="hidden" animate="visible" mb={8}>
                <Heading as="h3" fontSize="xl" mb={4} color="gray.900">
                  Optional Add-ons
                </Heading>
                <VStack gap={2} align="stretch">
                  {tour.add_ons.map((addon, idx) => (
                    <Box key={idx} p={3} bg="gray.50" borderRadius="md">
                      <Text color="gray.700">{addon}</Text>
                    </Box>
                  ))}
                </VStack>
              </MotionBox>
            )}

            {/* Cancellation Policy */}
            <MotionBox variants={fadeInUp} initial="hidden" animate="visible">
              <Heading as="h3" fontSize="xl" mb={4} color="gray.900">
                <Icon as={Info} color="orange.500" mr={2} />
                Cancellation Policy
              </Heading>
              <Card.Root bg="orange.50" borderColor="orange.200">
                <Card.Body p={5}>
                  <Text color="gray.700">{tour.cancellation_terms}</Text>
                </Card.Body>
              </Card.Root>
            </MotionBox>

            {/* Enquiry Form Section */}
            {showEnquiryForm && (
              <MotionBox 
                variants={fadeInUp} 
                initial="hidden" 
                animate="visible"
                mt={8}
                p={6}
                bg="blue.50"
                borderRadius="lg"
              >
                <Heading as="h3" fontSize="2xl" mb={6} color="gray.900">
                  <Icon as={MessageCircle} color="blue.600" mr={2} />
                  Request a Quote
                </Heading>
                <form onSubmit={handleEnquirySubmit}>
                  <VStack gap={4} align="stretch">
                    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                      <Field label="Full Name" required>
                        <Input
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Doe"
                          required
                        />
                      </Field>
                      <Field label="Email" required>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@example.com"
                          required
                        />
                      </Field>
                    </Grid>

                    <Field label="WhatsApp Phone Number" required>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+234 812 345 6789"
                        required
                      />
                    </Field>

                    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                      <Field label="Preferred Travel Dates">
                        <Input
                          value={formData.dates}
                          onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
                          placeholder="e.g., Dec 2025"
                        />
                      </Field>
                      <Field label="Budget Range">
                        <Input
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          placeholder="e.g., ₦500k - ₦1M"
                        />
                      </Field>
                    </Grid>

                    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                      <Field label="Number of Adults">
                        <Input
                          type="number"
                          min="1"
                          value={formData.adults}
                          onChange={(e) => setFormData({ ...formData, adults: e.target.value })}
                          placeholder="2"
                        />
                      </Field>
                      <Field label="Number of Children">
                        <Input
                          type="number"
                          min="0"
                          value={formData.children}
                          onChange={(e) => setFormData({ ...formData, children: e.target.value })}
                          placeholder="0"
                        />
                      </Field>
                    </Grid>

                    <Field label="Additional Information">
                      <Textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Any special requests or questions?"
                        rows={4}
                      />
                    </Field>

                    <HStack gap={3}>
                      <Button
                        type="submit"
                        colorPalette="blue"
                        loading={submitting}
                        flex={1}
                      >
                        Send Enquiry
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowEnquiryForm(false)}
                      >
                        Cancel
                      </Button>
                    </HStack>
                  </VStack>
                </form>
              </MotionBox>
            )}
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
                      Price from
                    </Text>
                    <Heading as="h2" fontSize="3xl" color="blue.600">
                      ₦{tour.price_from_ngn.toLocaleString()}
                    </Heading>
                    <Text fontSize="sm" color="gray.500">
                      ${tour.price_from_usd} USD
                    </Text>
                    <Text fontSize="xs" color="gray.500" mt={1}>
                      Per person (twin sharing)
                    </Text>
                  </Box>

                  <Box borderTop="1px solid" borderColor="gray.200" pt={4}>
                    <VStack gap={3} align="stretch">
                      <HStack gap={2}>
                        <Icon as={Clock} color="gray.600" />
                        <Text fontSize="sm" color="gray.700">
                          {tour.duration_days} Days / {tour.duration_nights} Nights
                        </Text>
                      </HStack>
                      <HStack gap={2}>
                        <Icon as={Users} color="gray.600" />
                        <Text fontSize="sm" color="gray.700">
                          Suitable for all travelers
                        </Text>
                      </HStack>
                      <HStack gap={2}>
                        <Icon as={Shield} color="gray.600" />
                        <Text fontSize="sm" color="gray.700">
                          Secure booking
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
                    onClick={() => setShowEnquiryForm(!showEnquiryForm)}
                  >
                    Request Quote
                  </Button>

                  <Box borderTop="1px solid" borderColor="gray.200" pt={4}>
                    <VStack gap={2} align="stretch">
                      <HStack gap={2}>
                        <Icon as={CheckCircle} color="green.500" boxSize={4} />
                        <Text fontSize="xs" color="gray.600">
                          Best price guarantee
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
                          24/7 customer support
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

      {/* Trust Section */}
      <Box bg="gray.50" py={12}>
        <Container maxW="7xl">
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
            <Card.Root textAlign="center">
              <Card.Body p={6}>
                <Icon as={Shield} boxSize={12} color="blue.600" mx="auto" mb={3} />
                <Heading as="h3" fontSize="lg" mb={2}>
                  Secure Booking
                </Heading>
                <Text fontSize="sm" color="gray.600">
                  Safe payments via Paystack/Flutterwave
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
                  WhatsApp assistance throughout your trip
                </Text>
              </Card.Body>
            </Card.Root>

            <Card.Root textAlign="center">
              <Card.Body p={6}>
                <Icon as={FileText} boxSize={12} color="purple.600" mx="auto" mb={3} />
                <Heading as="h3" fontSize="lg" mb={2}>
                  Visa Support
                </Heading>
                <Text fontSize="sm" color="gray.600">
                  Full documentation assistance included
                </Text>
              </Card.Body>
            </Card.Root>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}