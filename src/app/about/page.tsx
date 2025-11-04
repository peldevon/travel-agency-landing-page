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
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { 
  Plane, 
  Target,
  Eye,
  Heart,
  Shield,
  Users,
  Award,
  MessageCircle,
  CheckCircle,
  Star,
  Globe,
  Headphones,
  TrendingUp,
} from "lucide-react";

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card.Root);

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
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
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

export default function AboutPage() {
  return (
    <Box minH="100vh" bg="white">
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
              <Link href="/tours" color="gray.700">Tours</Link>
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
        position="relative"
        h="60vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Box
          position="absolute"
          inset={0}
          bgImage="url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80')"
          bgSize="cover"
          bgPosition="center"
        >
          <Box position="absolute" inset={0} bg="blackAlpha.600" />
        </Box>
        
        <Container maxW="7xl" position="relative" zIndex={10} textAlign="center" color="white">
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Heading as="h1" fontSize={{ base: "4xl", md: "6xl" }} fontWeight="bold" mb={4}>
              About Ontour Travels
            </Heading>
            <Text fontSize={{ base: "lg", md: "xl" }} color="gray.100" maxW="3xl" mx="auto">
              Passionate about making every journey simple, seamless, and memorable.
            </Text>
          </MotionBox>
        </Container>
      </MotionBox>

      {/* Brand Story */}
      <Container maxW="7xl" py={20}>
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={12} alignItems="center">
          <MotionBox
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Image
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80"
              alt="Ontour Travels Story"
              borderRadius="xl"
              boxShadow="2xl"
            />
          </MotionBox>

          <MotionBox
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Heading as="h2" fontSize="3xl" fontWeight="bold" mb={4} color="gray.900">
              Our Story
            </Heading>
            <VStack align="start" gap={4}>
              <Text color="gray.700" lineHeight="tall">
                Ontour Travels was founded to redefine how Nigerians experience travel. From ticketing and hotel bookings to shortlet apartments and curated tours, we handle the details so you can focus on the experience.
              </Text>
              <Text color="gray.700" lineHeight="tall">
                With years of proven service, Ontour combines cutting-edge technology, warm hospitality, and personal care to give you seamless journeys. Whether you're planning a business trip to Abuja, a weekend escape to Dubai, or a family vacation to Zanzibar, we're here to make it happen.
              </Text>
              <Text color="gray.700" lineHeight="tall">
                Built on trust, expertise, and attention to detail, Ontour has grown from a small ticketing brand into a full travel and lifestyle service company, serving travelers across Nigeria and beyond.
              </Text>
            </VStack>
          </MotionBox>
        </Grid>
      </Container>

      {/* Mission, Vision & Values */}
      <Box bg="gray.50" py={20}>
        <Container maxW="7xl">
          <MotionBox
            textAlign="center"
            mb={16}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Heading as="h2" fontSize="4xl" fontWeight="bold" mb={4} color="gray.900">
              Mission, Vision & Values
            </Heading>
            <Text fontSize="lg" color="gray.600" maxW="2xl" mx="auto">
              Guiding principles that drive everything we do
            </Text>
          </MotionBox>

          <MotionBox
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8}>
              <MVVCard
                icon={Target}
                title="Our Mission"
                description="To deliver reliable travel and lifestyle solutions that bring comfort and convenience to our clients at affordable prices."
                color="blue"
              />
              <MVVCard
                icon={Eye}
                title="Our Vision"
                description="To be the go-to African travel lifestyle brand recognized for trust, innovation, and excellence in service delivery."
                color="purple"
              />
              <MVVCard
                icon={Heart}
                title="Our Values"
                description="Trust • Service • Excellence • Innovation • Customer Focus • Integrity"
                color="green"
              />
            </Grid>
          </MotionBox>
        </Container>
      </Box>

      {/* Why Choose Us */}
      <Container maxW="7xl" py={20}>
        <MotionBox
          textAlign="center"
          mb={16}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Heading as="h2" fontSize="4xl" fontWeight="bold" mb={4} color="gray.900">
            Why Choose Ontour Travels
          </Heading>
          <Text fontSize="lg" color="gray.600" maxW="2xl" mx="auto">
            Experience the difference of working with travel experts who care
          </Text>
        </MotionBox>

        <MotionBox
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={8}>
            <USPCard
              icon={Users}
              title="Trusted by Hundreds"
              description="Years of experience serving Nigerian travelers"
            />
            <USPCard
              icon={Shield}
              title="Secure & Transparent"
              description="Powered by Amadeus with safe payment options"
            />
            <USPCard
              icon={Headphones}
              title="Personalized Support"
              description="WhatsApp and phone support from real people"
            />
            <USPCard
              icon={Award}
              title="Full Travel Lifestyle"
              description="From flights to shortlets, visas to curated tours"
            />
          </Grid>
        </MotionBox>
      </Container>

      {/* Stats Section */}
      <Box bg="blue.600" color="white" py={20}>
        <Container maxW="7xl">
          <MotionBox
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={8} textAlign="center">
              <StatCard number="5+" label="Years Experience" />
              <StatCard number="2,500+" label="Happy Travelers" />
              <StatCard number="50+" label="Destinations" />
              <StatCard number="24/7" label="Support Available" />
            </Grid>
          </MotionBox>
        </Container>
      </Box>

      {/* Founder's Note */}
      <Container maxW="5xl" py={20}>
        <MotionBox
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Card.Root bg="blue.50" borderRadius="2xl" p={8} boxShadow="lg">
            <Card.Body>
              <Flex direction={{ base: "column", md: "row" }} gap={8} align="center">
                <Box
                  w={{ base: "32", md: "40" }}
                  h={{ base: "32", md: "40" }}
                  flexShrink={0}
                  borderRadius="full"
                  overflow="hidden"
                  boxShadow="xl"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80"
                    alt="Founder"
                    w="full"
                    h="full"
                    objectFit="cover"
                  />
                </Box>
                
                <Box flex={1}>
                  <Heading as="h3" fontSize="2xl" mb={2} color="gray.900">
                    A Note from Our Founder
                  </Heading>
                  <Text color="gray.700" lineHeight="tall" mb={4} fontStyle="italic">
                    "As the driving force behind Ontour, I've always believed travel should be more than just moving from one place to another—it should be an experience. Having managed Ontour since its inception, I'm proud to continue offering reliable, innovative, and customer-focused solutions that make journeys simpler and more enjoyable."
                  </Text>
                  <Text color="gray.700" lineHeight="tall" mb={4}>
                    "Ontour is more than a business—it's my passion to help people explore the world with ease and peace of mind. Every booking, every trip, every smile from a satisfied traveler reminds me why we do what we do."
                  </Text>
                  <Box>
                    <Text fontWeight="bold" color="gray.900">— Founder, Ontour Travels</Text>
                    <Text fontSize="sm" color="gray.600">CEO & Travel Enthusiast</Text>
                  </Box>
                </Box>
              </Flex>
            </Card.Body>
          </Card.Root>
        </MotionBox>
      </Container>

      {/* Partners */}
      <Box bg="gray.50" py={16}>
        <Container maxW="7xl">
          <MotionBox
            textAlign="center"
            mb={12}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Heading as="h2" fontSize="3xl" fontWeight="bold" mb={4} color="gray.900">
              Our Partners
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Trusted technology and service providers
            </Text>
          </MotionBox>

          <MotionBox
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Flex justify="center" align="center" gap={12} flexWrap="wrap">
              <PartnerBadge text="Amadeus" />
              <PartnerBadge text="Paystack" />
              <PartnerBadge text="Flutterwave" />
              <PartnerBadge text="IATA" />
            </Flex>
          </MotionBox>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxW="7xl" py={20}>
        <MotionBox
          textAlign="center"
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Heading as="h2" fontSize="4xl" fontWeight="bold" mb={4} color="gray.900">
            Ready to Book Your Next Trip?
          </Heading>
          <Text fontSize="lg" color="gray.600" mb={8}>
            Let's make your travel dreams a reality
          </Text>
          <HStack gap={4} justify="center" flexWrap="wrap">
            <Button as="a" href="/book" colorPalette="blue" size="lg">
              Book Flights & Hotels
            </Button>
            <Button as="a" href="/shortlets" variant="outline" colorPalette="blue" size="lg">
              Browse Shortlets
            </Button>
            <Button
              as="a"
              href="https://wa.me/2348123456789"
              target="_blank"
              colorPalette="green"
              size="lg"
              leftIcon={<MessageCircle />}
            >
              Chat on WhatsApp
            </Button>
          </HStack>
        </MotionBox>
      </Container>

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
                Your trusted partner for travel and experiences.
              </Text>
            </Box>
            <Box>
              <Heading as="h3" fontSize="lg" fontWeight="bold" mb={4}>Quick Links</Heading>
              <VStack align="start" gap={2}>
                <Link href="/" color="gray.400" _hover={{ color: "white" }}>Home</Link>
                <Link href="/book" color="gray.400" _hover={{ color: "white" }}>Flights & Hotels</Link>
                <Link href="/shortlets" color="gray.400" _hover={{ color: "white" }}>Shortlets</Link>
                <Link href="/tours" color="gray.400" _hover={{ color: "white" }}>Tours</Link>
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
            <Text fontSize="sm">&copy; 2024 Ontour Travels. All rights reserved. Powered by Amadeus</Text>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

function MVVCard({ icon, title, description, color }: any) {
  return (
    <MotionCard
      variants={fadeInUp}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      bg="white"
      p={8}
      textAlign="center"
      boxShadow="lg"
    >
      <Card.Body>
        <Flex justify="center" mb={6}>
          <Box
            w={20}
            h={20}
            bg={`${color}.100`}
            borderRadius="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={icon} boxSize={10} color={`${color}.600`} />
          </Box>
        </Flex>
        <Heading as="h3" fontSize="xl" fontWeight="bold" mb={4} color="gray.900">
          {title}
        </Heading>
        <Text color="gray.600" lineHeight="tall">
          {description}
        </Text>
      </Card.Body>
    </MotionCard>
  );
}

function USPCard({ icon, title, description }: any) {
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
        <Heading as="h3" fontSize="lg" fontWeight="bold" color="gray.900">
          {title}
        </Heading>
        <Text fontSize="sm" color="gray.600">
          {description}
        </Text>
      </Flex>
    </MotionBox>
  );
}

function StatCard({ number, label }: any) {
  return (
    <MotionBox
      variants={fadeInUp}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <Heading as="h3" fontSize="5xl" fontWeight="bold" mb={2}>
        {number}
      </Heading>
      <Text fontSize="lg" color="blue.100">
        {label}
      </Text>
    </MotionBox>
  );
}

function PartnerBadge({ text }: any) {
  return (
    <MotionBox
      variants={fadeInUp}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        px={8}
        py={4}
        bg="white"
        borderRadius="lg"
        boxShadow="md"
      >
        <Text fontSize="xl" fontWeight="bold" color="gray.700">
          {text}
        </Text>
      </Box>
    </MotionBox>
  );
}
