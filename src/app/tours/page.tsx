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
  Badge,
  Tabs,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { 
  Plane, 
  MapPin,
  Calendar,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Shield,
  MessageCircle,
  Star,
  Globe,
  Home,
  Map,
} from "lucide-react";

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
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const scaleIn = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

export default function ToursPage() {
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
              <Icon as={Plane} boxSize={8} color="blue.600" />
              <Text fontSize="2xl" fontWeight="bold" color="gray.900">
                Ontour Travels
              </Text>
            </HStack>
            <HStack gap={6} display={{ base: "none", md: "flex" }}>
              <Link href="/" color="gray.700">Home</Link>
              <Link href="/book" color="gray.700">Flights & Hotels</Link>
              <Link href="/shortlets" color="gray.700">Shortlets</Link>
              <Link href="/about" color="gray.700">About</Link>
              <Link href="/contact" color="gray.700">Contact</Link>
              <Button colorPalette="blue" size="sm" as="a" href="https://wa.me/2348123456789" target="_blank">
                <Icon as={MessageCircle} mr={1} />
                WhatsApp
              </Button>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Hero Section */}
      <MotionBox
        bg="gradient-to-r"
        bgGradient="to-r"
        gradientFrom="blue.600"
        gradientTo="blue.800"
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
              Curated Tours & Experiences
            </Heading>
            <Text fontSize="xl" color="blue.100" mb={8}>
              From weekend escapes to international adventures—tailored for you
            </Text>
            <HStack gap={4} justify="center">
              <Button colorPalette="blue" bg="white" color="blue.600" size="lg" _hover={{ bg: "gray.100" }}>
                View Packages
              </Button>
              <Button variant="outline" borderColor="white" color="white" size="lg" _hover={{ bg: "whiteAlpha.200" }}>
                Plan Custom Trip
              </Button>
            </HStack>
          </MotionBox>
        </Container>
      </MotionBox>

      {/* Category Tabs */}
      <Box bg="white" borderBottom="1px" borderColor="gray.200">
        <Container maxW="7xl" py={6}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Tabs.Root defaultValue="all">
              <Tabs.List>
                <Tabs.Trigger value="all" fontWeight="medium">
                  All Tours
                </Tabs.Trigger>
                <Tabs.Trigger value="local" fontWeight="medium">
                  <Icon as={Home} mr={2} />
                  Local (Nigeria)
                </Tabs.Trigger>
                <Tabs.Trigger value="regional" fontWeight="medium">
                  <Icon as={Map} mr={2} />
                  Regional (Africa)
                </Tabs.Trigger>
                <Tabs.Trigger value="international" fontWeight="medium">
                  <Icon as={Globe} mr={2} />
                  International
                </Tabs.Trigger>
              </Tabs.List>
            </Tabs.Root>
          </MotionBox>
        </Container>
      </Box>

      {/* Tours Grid */}
      <Container maxW="7xl" py={16}>
        <MotionBox
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={8}>
            {/* International Tours */}
            <TourCard
              image="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80"
              title="Weekend in Dubai"
              duration="4D/3N"
              category="International"
              priceFrom="₦850,000"
              highlights={["Burj Khalifa tour", "Desert safari", "Dhow cruise"]}
              seasonality="Best: Oct–Mar"
            />
            <TourCard
              image="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80"
              title="London City Sampler"
              duration="6D/5N"
              category="International"
              priceFrom="₦1,200,000"
              highlights={["Palace tour", "Thames cruise", "Shopping at Harrods"]}
              seasonality="Best: May–Sep"
            />
            <TourCard
              image="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80"
              title="Bali Relax"
              duration="7D/6N"
              category="International"
              priceFrom="₦980,000"
              highlights={["Temple visits", "Beach relaxation", "Balinese spa"]}
              seasonality="Best: Apr–Oct"
            />

            {/* Regional Tours */}
            <TourCard
              image="https://images.unsplash.com/photo-1565552645632-d725f8bfc19d?w=600&q=80"
              title="Zanzibar Escape"
              duration="5D/4N"
              category="Regional"
              priceFrom="₦650,000"
              highlights={["Stone Town tour", "Spice farm", "Beach resort stay"]}
              seasonality="Best: Jun–Oct"
            />
            <TourCard
              image="https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?w=600&q=80"
              title="Cape Town Experience"
              duration="5D/4N"
              category="Regional"
              priceFrom="₦720,000"
              highlights={["Table Mountain", "Wine tasting", "Robben Island"]}
              seasonality="Best: Nov–Mar"
            />
            <TourCard
              image="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=80"
              title="Kenya Safari"
              duration="6D/5N"
              category="Regional"
              priceFrom="₦890,000"
              highlights={["Maasai Mara", "Big Five safari", "Cultural village"]}
              seasonality="Best: Jul–Oct"
            />

            {/* Local Tours */}
            <TourCard
              image="https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=600&q=80"
              title="Obudu Cattle Ranch"
              duration="3D/2N"
              category="Local"
              priceFrom="₦180,000"
              highlights={["Cable car ride", "Hiking trails", "Mountain resort"]}
              seasonality="Best: Nov–Feb"
            />
            <TourCard
              image="https://images.unsplash.com/photo-1611424274340-f10cd3f6e18e?w=600&q=80"
              title="Abuja City Break"
              duration="3D/2N"
              category="Local"
              priceFrom="₦150,000"
              highlights={["Aso Rock", "Millennium Park", "Arts & Crafts village"]}
              seasonality="Year-round"
            />
            <TourCard
              image="https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=600&q=80"
              title="Calabar Carnival"
              duration="4D/3N"
              category="Local"
              priceFrom="₦220,000"
              highlights={["Carnival parade", "Cultural shows", "Beach resort"]}
              seasonality="Best: Dec"
            />
          </Grid>
        </MotionBox>
      </Container>

      {/* Custom Trip Planner */}
      <Box bg="blue.600" color="white" py={20}>
        <Container maxW="4xl">
          <MotionBox
            textAlign="center"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Heading as="h2" fontSize="3xl" mb={4}>
              Don't See What You're Looking For?
            </Heading>
            <Text fontSize="lg" color="blue.100" mb={8}>
              Tell us your dream destination and we'll create a custom itinerary just for you
            </Text>
            <HStack gap={4} justify="center" flexWrap="wrap">
              <Button
                as="a"
                href="https://wa.me/2348123456789?text=Hi%20Ontour,%20I'd%20like%20to%20plan%20a%20custom%20trip"
                target="_blank"
                colorPalette="green"
                size="lg"
                leftIcon={<MessageCircle />}
              >
                Plan My Custom Trip
              </Button>
              <Button
                as="a"
                href="/contact"
                variant="outline"
                borderColor="white"
                color="white"
                size="lg"
                _hover={{ bg: "whiteAlpha.200" }}
              >
                Contact Us
              </Button>
            </HStack>
          </MotionBox>
        </Container>
      </Box>

      {/* Why Book With Us */}
      <Container maxW="7xl" py={20}>
        <MotionBox
          textAlign="center"
          mb={12}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Heading as="h2" fontSize="3xl" mb={4}>
            Why Travel with Ontour
          </Heading>
          <Text fontSize="lg" color="gray.600">
            We take care of every detail so you can focus on the experience
          </Text>
        </MotionBox>

        <MotionBox
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={8}>
            <FeatureCard
              icon={Shield}
              title="IATA Certified"
              description="Powered by Amadeus for reliable bookings"
            />
            <FeatureCard
              icon={Users}
              title="Expert Guides"
              description="Knowledgeable local guides on every tour"
            />
            <FeatureCard
              icon={CheckCircle}
              title="All-Inclusive"
              description="Accommodation, meals, and activities included"
            />
            <FeatureCard
              icon={MessageCircle}
              title="24/7 Support"
              description="WhatsApp support throughout your journey"
            />
          </Grid>
        </MotionBox>
      </Container>

      {/* FAQ Section */}
      <Box bg="white" py={16}>
        <Container maxW="4xl">
          <MotionBox
            textAlign="center"
            mb={12}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Heading as="h2" fontSize="3xl" mb={4}>
              Frequently Asked Questions
            </Heading>
          </MotionBox>

          <MotionBox
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <VStack gap={4} align="stretch">
              <FAQItem
                question="Do package prices include flights?"
                answer="Some packages include flights, while others are land-only. We always clearly state what's included in each package description."
              />
              <FAQItem
                question="Can dates be changed after booking?"
                answer="Yes, dates can be modified subject to availability and change fees. Contact us as soon as possible if you need to make changes."
              />
              <FAQItem
                question="What is your payment schedule?"
                answer="Typically, we require 50% deposit to secure your booking, with the balance due 14 days before departure."
              />
              <FAQItem
                question="Do you assist with visas?"
                answer="Yes! We provide visa support for all our international packages, including document lists and application assistance."
              />
              <FAQItem
                question="Can I customize the itinerary?"
                answer="Absolutely! We can customize any package to match your preferences. Just let us know what you'd like to add or remove."
              />
            </VStack>
          </MotionBox>
        </Container>
      </Box>

      {/* Footer */}
      <Box bg="gray.900" color="white" py={12}>
        <Container maxW="7xl">
          <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={8}>
            <Box>
              <HStack gap={2} mb={4}>
                <Icon as={Plane} boxSize={8} color="blue.400" />
                <Text fontSize="2xl" fontWeight="bold">Ontour Travels</Text>
              </HStack>
              <Text color="gray.400" fontSize="sm">
                Creating unforgettable travel experiences for Nigerian travelers.
              </Text>
            </Box>
            <Box>
              <Heading as="h3" fontSize="lg" fontWeight="bold" mb={4}>Quick Links</Heading>
              <VStack align="start" gap={2}>
                <Link href="/" color="gray.400" _hover={{ color: "white" }}>Home</Link>
                <Link href="/book" color="gray.400" _hover={{ color: "white" }}>Flights & Hotels</Link>
                <Link href="/shortlets" color="gray.400" _hover={{ color: "white" }}>Shortlets</Link>
                <Link href="/about" color="gray.400" _hover={{ color: "white" }}>About</Link>
              </VStack>
            </Box>
            <Box>
              <Heading as="h3" fontSize="lg" fontWeight="bold" mb={4}>Support</Heading>
              <VStack align="start" gap={2}>
                <Link href="/contact" color="gray.400" _hover={{ color: "white" }}>Contact Us</Link>
                <Link href="#" color="gray.400" _hover={{ color: "white" }}>FAQ</Link>
                <Link href="#" color="gray.400" _hover={{ color: "white" }}>Terms & Conditions</Link>
                <Link href="#" color="gray.400" _hover={{ color: "white" }}>Privacy Policy</Link>
              </VStack>
            </Box>
            <Box>
              <Heading as="h3" fontSize="lg" fontWeight="bold" mb={4}>Contact</Heading>
              <VStack align="start" gap={2}>
                <Text color="gray.400" fontSize="sm">+234 812 345 6789</Text>
                <Text color="gray.400" fontSize="sm">info@ontourtravels.com.ng</Text>
                <Text color="gray.400" fontSize="sm">Mon–Sat, 9 AM – 6 PM WAT</Text>
              </VStack>
            </Box>
          </Grid>
          <Box borderTop="1px" borderColor="gray.800" pt={8} mt={8} textAlign="center" color="gray.400">
            <Text fontSize="sm">
              &copy; 2024 Ontour Travels. All rights reserved. Made with Love{" "}
              <Text as="span" color="red.500" fontSize="md">❤️</Text>{" "}
              by{" "}
              <Link 
                href="https://github.com/peldevon" 
                target="_blank" 
                rel="noopener noreferrer"
                color="blue.400"
                _hover={{ color: "blue.300", textDecoration: "underline" }}
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

function TourCard({ image, title, duration, category, priceFrom, highlights, seasonality }: any) {
  const categoryColors: any = {
    "International": "purple",
    "Regional": "green",
    "Local": "blue"
  };

  return (
    <MotionCard
      overflow="hidden"
      cursor="pointer"
      variants={fadeInUp}
      whileHover={{ y: -10, boxShadow: "2xl" }}
      transition={{ duration: 0.3 }}
      bg="white"
    >
      <Box position="relative" h="64" overflow="hidden">
        <Image 
          src={image}
          alt={title}
          w="full"
          h="full"
          objectFit="cover"
        />
        <Box position="absolute" top={4} right={4} px={3} py={1} bg={`${categoryColors[category]}.600`} color="white" borderRadius="md" fontSize="sm" fontWeight="medium">
          {category}
        </Box>
      </Box>
      <Card.Body p={6}>
        <Heading as="h3" fontSize="xl" fontWeight="bold" mb={2} color="gray.900">
          {title}
        </Heading>
        <HStack gap={4} mb={4}>
          <HStack gap={1}>
            <Icon as={Clock} boxSize={4} color="gray.500" />
            <Text fontSize="sm" color="gray.600">{duration}</Text>
          </HStack>
          <HStack gap={1}>
            <Icon as={Calendar} boxSize={4} color="gray.500" />
            <Text fontSize="sm" color="gray.600">{seasonality}</Text>
          </HStack>
        </HStack>
        <VStack align="start" gap={2} mb={4}>
          {highlights.map((highlight: string) => (
            <HStack key={highlight} gap={2}>
              <Icon as={CheckCircle} boxSize={4} color="green.500" />
              <Text fontSize="sm" color="gray.700">{highlight}</Text>
            </HStack>
          ))}
        </VStack>
        <Box borderTop="1px" borderColor="gray.200" pt={4} mt={4}>
          <Flex justify="space-between" align="center" mb={4}>
            <Box>
              <Text fontSize="xs" color="gray.500">From</Text>
              <Text fontSize="2xl" fontWeight="bold" color="blue.600">{priceFrom}</Text>
            </Box>
          </Flex>
          <Flex gap={2}>
            <Button colorPalette="blue" flex={1}>
              View Details
            </Button>
            <Button
              as="a"
              href={`https://wa.me/2348123456789?text=Hi%20Ontour,%20I'm%20interested%20in%20the%20${encodeURIComponent(title)}%20tour`}
              target="_blank"
              variant="outline"
              colorPalette="green"
            >
              <Icon as={MessageCircle} />
            </Button>
          </Flex>
        </Box>
      </Card.Body>
    </MotionCard>
  );
}

function FeatureCard({ icon, title, description }: any) {
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
          bg="blue.100"
          borderRadius="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={icon} boxSize={8} color="blue.600" />
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

function FAQItem({ question, answer }: any) {
  return (
    <MotionCard
      variants={fadeInUp}
      bg="white"
      p={6}
      borderRadius="lg"
    >
      <Card.Body>
        <Heading as="h4" fontSize="md" fontWeight="bold" mb={2} color="gray.900">
          {question}
        </Heading>
        <Text color="gray.600" fontSize="sm">
          {answer}
        </Text>
      </Card.Body>
    </MotionCard>
  );
}