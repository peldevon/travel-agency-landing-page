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
  Input,
  Checkbox,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
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
} from "lucide-react";
import { useState } from "react";

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

export default function ShortletsPage() {
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
              <Link href="/tours" color="gray.700">Tours</Link>
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
        bg="blue.600"
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
            <Text fontSize="xl" color="blue.100" mb={8}>
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
              <Input placeholder="Location (e.g., Lekki)" size="lg" bg="gray.50" color="gray.700" />
              <Input type="date" placeholder="Check-in" size="lg" bg="gray.50" color="gray.700" />
              <Input type="date" placeholder="Check-out" size="lg" bg="gray.50" color="gray.700" />
              <Input placeholder="Guests" size="lg" bg="gray.50" color="gray.700" />
            </Grid>
            <Button colorPalette="blue" size="lg" w="full" mt={4}>
              <Icon as={Search} mr={2} />
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
                <Icon as={Filter} display="inline" mr={2} />
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
                24 properties available
              </Text>
              <Button size="sm" variant="outline" display={{ base: "flex", lg: "none" }}>
                <Icon as={Filter} mr={2} />
                Filters
              </Button>
            </Flex>

            <MotionBox
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
                <PropertyCard
                  image="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80"
                  title="1BR Apartment – Lekki Phase 1"
                  location="Lekki, Lagos"
                  price="₦45,000"
                  rating={4.8}
                  reviews={32}
                  amenities={["Wi-Fi", "AC", "Pool", "Parking"]}
                />
                <PropertyCard
                  image="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80"
                  title="Luxury 2BR – Victoria Island"
                  location="Victoria Island, Lagos"
                  price="₦75,000"
                  rating={4.9}
                  reviews={45}
                  amenities={["Wi-Fi", "AC", "Gym", "Security"]}
                />
                <PropertyCard
                  image="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80"
                  title="Cozy Studio – Ikeja GRA"
                  location="Ikeja, Lagos"
                  price="₦35,000"
                  rating={4.7}
                  reviews={28}
                  amenities={["Wi-Fi", "AC", "Kitchen", "TV"]}
                />
                <PropertyCard
                  image="https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80"
                  title="Modern 2BR – Ikoyi"
                  location="Ikoyi, Lagos"
                  price="₦68,000"
                  rating={4.9}
                  reviews={51}
                  amenities={["Wi-Fi", "AC", "Pool", "Gym"]}
                />
                <PropertyCard
                  image="https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80"
                  title="Spacious 3BR – Lekki Phase 2"
                  location="Lekki, Lagos"
                  price="₦95,000"
                  rating={4.8}
                  reviews={37}
                  amenities={["Wi-Fi", "AC", "Pool", "Parking", "Security"]}
                />
                <PropertyCard
                  image="https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=600&q=80"
                  title="Penthouse Suite – VI"
                  location="Victoria Island, Lagos"
                  price="₦120,000"
                  rating={5.0}
                  reviews={62}
                  amenities={["Wi-Fi", "AC", "Pool", "Gym", "Bar"]}
                />
              </Grid>
            </MotionBox>
          </Box>
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box bg="blue.50" py={16}>
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
              colorPalette="green"
              size="lg"
            >
              <Icon as={MessageCircle} mr={2} />
              Chat on WhatsApp
            </Button>
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
                Your trusted partner for travel and accommodation in Lagos.
              </Text>
            </Box>
            <Box>
              <Heading as="h3" fontSize="lg" fontWeight="bold" mb={4}>Quick Links</Heading>
              <VStack align="start" gap={2}>
                <Link href="/" color="gray.400" _hover={{ color: "white" }}>Home</Link>
                <Link href="/book" color="gray.400" _hover={{ color: "white" }}>Flights & Hotels</Link>
                <Link href="/tours" color="gray.400" _hover={{ color: "white" }}>Tours</Link>
                <Link href="/about" color="gray.400" _hover={{ color: "white" }}>About</Link>
              </VStack>
            </Box>
            <Box>
              <Heading as="h3" fontSize="lg" fontWeight="bold" mb={4}>Support</Heading>
              <VStack align="start" gap={2}>
                <Link href="/contact" color="gray.400" _hover={{ color: "white" }}>Contact Us</Link>
                <Link href="#" color="gray.400" _hover={{ color: "white" }}>FAQ</Link>
                <Link href="#" color="gray.400" _hover={{ color: "white" }}>Privacy Policy</Link>
              </VStack>
            </Box>
            <Box>
              <Heading as="h3" fontSize="lg" fontWeight="bold" mb={4}>Contact</Heading>
              <VStack align="start" gap={2}>
                <Text color="gray.400" fontSize="sm">+234 812 345 6789</Text>
                <Text color="gray.400" fontSize="sm">info@ontourtravels.com.ng</Text>
                <Text color="gray.400" fontSize="sm">Mon–Sat, 9 AM – 6 PM</Text>
              </VStack>
            </Box>
          </Grid>
          <Box borderTop="1px" borderColor="gray.800" pt={8} mt={8} textAlign="center" color="gray.400">
            <Text fontSize="sm">&copy; 2024 Ontour Travels. All rights reserved.</Text>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

function TrustCard({ icon, title, description }: any) {
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

function PropertyCard({ image, title, location, price, rating, reviews, amenities }: any) {
  return (
    <MotionCard
      overflow="hidden"
      cursor="pointer"
      variants={fadeInUp}
      whileHover={{ y: -10, boxShadow: "xl" }}
      transition={{ duration: 0.3 }}
      bg="white"
    >
      <Box position="relative" h="56" overflow="hidden">
        <Image 
          src={image}
          alt={title}
          w="full"
          h="full"
          objectFit="cover"
        />
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
            <Icon as={Star} boxSize={4} fill="yellow.400" color="yellow.400" />
            <Text fontWeight="bold" fontSize="sm">{rating}</Text>
            <Text fontSize="xs" color="gray.600">({reviews})</Text>
          </HStack>
        </Box>
      </Box>
      <Card.Body p={5}>
        <HStack gap={2} mb={2}>
          <Icon as={MapPin} boxSize={4} color="blue.600" />
          <Text fontSize="sm" color="gray.600">{location}</Text>
        </HStack>
        <Heading as="h3" fontSize="lg" fontWeight="bold" mb={3} color="gray.900">
          {title}
        </Heading>
        <HStack gap={2} mb={4} flexWrap="wrap">
          {amenities.map((amenity: string) => (
            <Box
              key={amenity}
              px={2}
              py={1}
              bg="blue.50"
              color="blue.700"
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
            <Text fontSize="2xl" fontWeight="bold" color="blue.600">{price}</Text>
            <Text fontSize="xs" color="gray.500">per night</Text>
          </Box>
        </Flex>
        <Flex gap={2}>
          <Button colorPalette="blue" flex={1}>
            View Details
          </Button>
          <Button
            as="a"
            href={`https://wa.me/2348123456789?text=Hi%20Ontour,%20I'm%20interested%20in%20${encodeURIComponent(title)}`}
            target="_blank"
            variant="outline"
            colorPalette="green"
          >
            <Icon as={MessageCircle} />
          </Button>
        </Flex>
      </Card.Body>
    </MotionCard>
  );
}