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
  Tabs,
  Checkbox,
  Badge,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { 
  Plane, 
  Hotel,
  Search,
  Filter,
  Star,
  MapPin,
  Clock,
  Users,
  Wifi,
  Coffee,
  Car,
  MessageCircle,
  ArrowRight,
  Menu,
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
      staggerChildren: 0.1
    }
  }
};

export default function BookPage() {
  const [searchType, setSearchType] = useState<"flights" | "hotels">("flights");
  const [tripType, setTripType] = useState<"round-trip" | "one-way">("round-trip");

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
              <Link href="/shortlets" color="gray.700">Shortlets</Link>
              <Link href="/tours" color="gray.700">Tours</Link>
              <Button colorPalette="blue" size="sm" as="a" href="https://wa.me/2348123456789" target="_blank">
                <Icon as={MessageCircle} mr={1} />
                WhatsApp
              </Button>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Search Bar */}
      <Box bg="blue.600" color="white" py={8}>
        <Container maxW="7xl">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Tabs.Root value={searchType} onValueChange={(e) => setSearchType(e.value as any)}>
              <Tabs.List mb={6}>
                <Tabs.Trigger value="flights" color="white" fontWeight="medium">
                  <Icon as={Plane} mr={2} />
                  Flights
                </Tabs.Trigger>
                <Tabs.Trigger value="hotels" color="white" fontWeight="medium">
                  <Icon as={Hotel} mr={2} />
                  Hotels
                </Tabs.Trigger>
              </Tabs.List>

              <Tabs.Content value="flights">
                <VStack gap={4} align="stretch">
                  <HStack gap={2}>
                    <Button
                      size="sm"
                      variant={tripType === "round-trip" ? "solid" : "outline"}
                      bg={tripType === "round-trip" ? "white" : "transparent"}
                      color={tripType === "round-trip" ? "blue.600" : "white"}
                      onClick={() => setTripType("round-trip")}
                    >
                      Round-trip
                    </Button>
                    <Button
                      size="sm"
                      variant={tripType === "one-way" ? "solid" : "outline"}
                      bg={tripType === "one-way" ? "white" : "transparent"}
                      color={tripType === "one-way" ? "blue.600" : "white"}
                      onClick={() => setTripType("one-way")}
                    >
                      One-way
                    </Button>
                  </HStack>
                  
                  <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={4}>
                    <Input placeholder="From (LOS)" bg="white" color="gray.700" />
                    <Input placeholder="To (LHR)" bg="white" color="gray.700" />
                    <Input type="date" bg="white" color="gray.700" />
                    {tripType === "round-trip" && (
                      <Input type="date" bg="white" color="gray.700" />
                    )}
                  </Grid>
                  
                  <Button colorPalette="blue" bg="white" color="blue.600" size="lg" _hover={{ bg: "gray.100" }}>
                    <Icon as={Search} mr={2} />
                    Search Flights
                  </Button>
                </VStack>
              </Tabs.Content>

              <Tabs.Content value="hotels">
                <VStack gap={4} align="stretch">
                  <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
                    <Input placeholder="Destination" bg="white" color="gray.700" />
                    <Input type="date" placeholder="Check-in" bg="white" color="gray.700" />
                    <Input type="date" placeholder="Check-out" bg="white" color="gray.700" />
                  </Grid>
                  
                  <Button colorPalette="blue" bg="white" color="blue.600" size="lg" _hover={{ bg: "gray.100" }}>
                    <Icon as={Search} mr={2} />
                    Search Hotels
                  </Button>
                </VStack>
              </Tabs.Content>
            </Tabs.Root>
          </MotionBox>
        </Container>
      </Box>

      {/* Results Section */}
      <Container maxW="7xl" py={12}>
        <Grid templateColumns={{ base: "1fr", lg: "250px 1fr" }} gap={8}>
          {/* Filters Sidebar */}
          <Box display={{ base: "none", lg: "block" }}>
            <MotionBox
              bg="white"
              borderRadius="lg"
              p={6}
              boxShadow="sm"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
            >
              <Heading as="h3" fontSize="lg" mb={4}>
                <Icon as={Filter} display="inline" mr={2} />
                Filters
              </Heading>

              {searchType === "flights" ? (
                <VStack align="stretch" gap={6}>
                  <Box>
                    <Text fontWeight="bold" mb={3}>Stops</Text>
                    <VStack align="start" gap={2}>
                      <Checkbox>Direct</Checkbox>
                      <Checkbox>1 Stop</Checkbox>
                      <Checkbox>2+ Stops</Checkbox>
                    </VStack>
                  </Box>
                  
                  <Box>
                    <Text fontWeight="bold" mb={3}>Airlines</Text>
                    <VStack align="start" gap={2}>
                      <Checkbox>Emirates</Checkbox>
                      <Checkbox>Qatar Airways</Checkbox>
                      <Checkbox>Turkish Airlines</Checkbox>
                      <Checkbox>British Airways</Checkbox>
                    </VStack>
                  </Box>

                  <Box>
                    <Text fontWeight="bold" mb={3}>Departure Time</Text>
                    <VStack align="start" gap={2}>
                      <Checkbox>Morning (6am - 12pm)</Checkbox>
                      <Checkbox>Afternoon (12pm - 6pm)</Checkbox>
                      <Checkbox>Evening (6pm - 12am)</Checkbox>
                    </VStack>
                  </Box>
                </VStack>
              ) : (
                <VStack align="stretch" gap={6}>
                  <Box>
                    <Text fontWeight="bold" mb={3}>Star Rating</Text>
                    <VStack align="start" gap={2}>
                      <Checkbox>5 Stars</Checkbox>
                      <Checkbox>4 Stars</Checkbox>
                      <Checkbox>3 Stars</Checkbox>
                    </VStack>
                  </Box>
                  
                  <Box>
                    <Text fontWeight="bold" mb={3}>Amenities</Text>
                    <VStack align="start" gap={2}>
                      <Checkbox>Free Wi-Fi</Checkbox>
                      <Checkbox>Pool</Checkbox>
                      <Checkbox>Breakfast</Checkbox>
                      <Checkbox>Parking</Checkbox>
                    </VStack>
                  </Box>

                  <Box>
                    <Text fontWeight="bold" mb={3}>Property Type</Text>
                    <VStack align="start" gap={2}>
                      <Checkbox>Hotel</Checkbox>
                      <Checkbox>Apartment</Checkbox>
                      <Checkbox>Resort</Checkbox>
                    </VStack>
                  </Box>
                </VStack>
              )}
            </MotionBox>
          </Box>

          {/* Results Grid */}
          <Box>
            <Flex justify="space-between" align="center" mb={6}>
              <Text fontSize="lg" fontWeight="medium">
                {searchType === "flights" ? "58 flights found" : "42 hotels found"}
              </Text>
              <Button size="sm" variant="outline" display={{ base: "flex", lg: "none" }}>
                <Icon as={Filter} mr={2} />
                Filters
              </Button>
            </Flex>

            <MotionBox
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <VStack gap={4} align="stretch">
                {searchType === "flights" ? (
                  <>
                    <FlightCard
                      airline="Emirates"
                      logo="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=100&q=80"
                      departure="22:30 LOS"
                      arrival="07:10 LHR"
                      duration="8h 40m"
                      stops="1 stop (Dubai)"
                      price="₦850,000"
                    />
                    <FlightCard
                      airline="Qatar Airways"
                      logo="https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=100&q=80"
                      departure="18:45 LOS"
                      arrival="06:25 LHR"
                      duration="9h 40m"
                      stops="1 stop (Doha)"
                      price="₦780,000"
                    />
                    <FlightCard
                      airline="Turkish Airlines"
                      logo="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=100&q=80"
                      departure="14:20 LOS"
                      arrival="05:45 LHR"
                      duration="11h 25m"
                      stops="1 stop (Istanbul)"
                      price="₦720,000"
                    />
                  </>
                ) : (
                  <>
                    <HotelCard
                      name="Eko Hotels & Suites"
                      image="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80"
                      location="Victoria Island, Lagos"
                      rating={5}
                      reviews={1243}
                      amenities={["Pool", "Wi-Fi", "Breakfast", "Gym"]}
                      price="₦65,000"
                    />
                    <HotelCard
                      name="Radisson Blu Anchorage"
                      image="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80"
                      location="Victoria Island, Lagos"
                      rating={5}
                      reviews={892}
                      amenities={["Pool", "Wi-Fi", "Restaurant", "Spa"]}
                      price="₦58,000"
                    />
                    <HotelCard
                      name="The Wheatbaker"
                      image="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80"
                      location="Ikoyi, Lagos"
                      rating={5}
                      reviews={567}
                      amenities={["Wi-Fi", "Breakfast", "Gym", "Bar"]}
                      price="₦52,000"
                    />
                  </>
                )}
              </VStack>
            </MotionBox>
          </Box>
        </Grid>
      </Container>

      {/* Support CTA */}
      <Box bg="blue.50" py={12}>
        <Container maxW="4xl">
          <Flex direction="column" align="center" textAlign="center">
            <Heading as="h3" fontSize="2xl" mb={4}>
              Need Help Choosing?
            </Heading>
            <Text color="gray.600" mb={6}>
              Our travel experts are available to assist you with your booking
            </Text>
            <Button
              as="a"
              href="https://wa.me/2348123456789"
              target="_blank"
              colorPalette="green"
              size="lg"
            >
              <MessageCircle />
              Chat on WhatsApp
            </Button>
          </Flex>
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
                Your trusted partner for travel bookings.
              </Text>
            </Box>
            <Box>
              <Heading as="h3" fontSize="lg" fontWeight="bold" mb={4}>Quick Links</Heading>
              <VStack align="start" gap={2}>
                <Link href="/" color="gray.400" _hover={{ color: "white" }}>Home</Link>
                <Link href="/shortlets" color="gray.400" _hover={{ color: "white" }}>Shortlets</Link>
                <Link href="/tours" color="gray.400" _hover={{ color: "white" }}>Tours</Link>
                <Link href="/about" color="gray.400" _hover={{ color: "white" }}>About</Link>
              </VStack>
            </Box>
            <Box>
              <Heading as="h3" fontSize="lg" fontWeight="bold" mb={4}>Support</Heading>
              <VStack align="start" gap={2}>
                <Link href="/contact" color="gray.400" _hover={{ color: "white" }}>Contact Us</Link>
                <Link href="/faq" color="gray.400" _hover={{ color: "white" }}>FAQ</Link>
                <Link href="/terms" color="gray.400" _hover={{ color: "white" }}>Terms</Link>
                <Link href="/privacy" color="gray.400" _hover={{ color: "white" }}>Privacy</Link>
              </VStack>
            </Box>
            <Box>
              <Heading as="h3" fontSize="lg" fontWeight="bold" mb={4}>Contact</Heading>
              <VStack align="start" gap={2}>
                <Text color="gray.400" fontSize="sm">+234 812 345 6789</Text>
                <Text color="gray.400" fontSize="sm">info@ontourtravels.com.ng</Text>
              </VStack>
            </Box>
          </Grid>
          <Box borderTop="1px" borderColor="gray.800" pt={8} mt={8} textAlign="center" color="gray.400">
            <Text fontSize="sm">&copy; 2024 Ontour Travels. All rights reserved. Made with <Text as="span" color="red.500">💓</Text> by <Link href="https://github.com/peldevon" target="_blank" rel="noopener noreferrer" _hover={{ color: "blue.400" }}>Peldevon</Link></Text>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

function FlightCard({ airline, logo, departure, arrival, duration, stops, price }: any) {
  return (
    <MotionCard
      variants={fadeInUp}
      whileHover={{ boxShadow: "lg" }}
      bg="white"
      p={6}
    >
      <Card.Body>
        <Flex direction={{ base: "column", md: "row" }} justify="space-between" gap={6}>
          <Flex flex={1} direction="column" gap={4}>
            <HStack gap={4}>
              <Box w={12} h={12} bg="gray.100" borderRadius="md" />
              <Text fontWeight="bold" fontSize="lg">{airline}</Text>
            </HStack>

            <Grid templateColumns="repeat(3, 1fr)" gap={4} alignItems="center">
              <Box>
                <Text fontSize="2xl" fontWeight="bold">{departure.split(" ")[0]}</Text>
                <Text fontSize="sm" color="gray.600">{departure.split(" ")[1]}</Text>
              </Box>
              
              <VStack gap={1}>
                <Text fontSize="sm" color="gray.600">{duration}</Text>
                <Box h="2px" w="full" bg="gray.300" position="relative">
                  <Icon as={Plane} position="absolute" top="-10px" left="50%" transform="translateX(-50%)" color="gray.600" />
                </Box>
                <Text fontSize="xs" color="gray.500">{stops}</Text>
              </VStack>

              <Box textAlign="right">
                <Text fontSize="2xl" fontWeight="bold">{arrival.split(" ")[0]}</Text>
                <Text fontSize="sm" color="gray.600">{arrival.split(" ")[1]}</Text>
              </Box>
            </Grid>
          </Flex>

          <Flex direction="column" justify="space-between" align="flex-end" minW="200px">
            <Box textAlign="right">
              <Text fontSize="2xl" fontWeight="bold" color="blue.600">{price}</Text>
              <Text fontSize="sm" color="gray.600">per person</Text>
            </Box>
            <Button colorPalette="blue" w="full">
              Select Flight
              <Icon as={ArrowRight} ml={2} />
            </Button>
          </Flex>
        </Flex>
      </Card.Body>
    </MotionCard>
  );
}

function HotelCard({ name, image, location, rating, reviews, amenities, price }: any) {
  return (
    <MotionCard
      variants={fadeInUp}
      whileHover={{ boxShadow: "lg" }}
      bg="white"
      overflow="hidden"
    >
      <Card.Body p={0}>
        <Grid templateColumns={{ base: "1fr", md: "250px 1fr" }} gap={0}>
          <Box h={{ base: "200px", md: "full" }} overflow="hidden">
            <Image 
              src={image}
              alt={name}
              w="full"
              h="full"
              objectFit="cover"
            />
          </Box>

          <Flex direction="column" p={6} justify="space-between">
            <Box>
              <Flex justify="space-between" align="start" mb={2}>
                <Box>
                  <Heading as="h3" fontSize="xl" fontWeight="bold" mb={1}>
                    {name}
                  </Heading>
                  <HStack gap={1} mb={2}>
                    <Icon as={MapPin} boxSize={4} color="gray.500" />
                    <Text fontSize="sm" color="gray.600">{location}</Text>
                  </HStack>
                </Box>
                <Box textAlign="right">
                  <HStack gap={1}>
                    {Array.from({ length: rating }).map((_, i) => (
                      <Icon key={i} as={Star} boxSize={4} fill="yellow.400" color="yellow.400" />
                    ))}
                  </HStack>
                  <Text fontSize="xs" color="gray.600">{reviews} reviews</Text>
                </Box>
              </Flex>

              <HStack gap={2} mb={4} flexWrap="wrap">
                {amenities.map((amenity: string) => (
                  <Badge key={amenity} colorPalette="blue" variant="subtle">
                    {amenity}
                  </Badge>
                ))}
              </HStack>
            </Box>

            <Flex justify="space-between" align="center">
              <Box>
                <Text fontSize="2xl" fontWeight="bold" color="blue.600">{price}</Text>
                <Text fontSize="xs" color="gray.600">per night</Text>
              </Box>
              <Button colorPalette="blue">
                View Details
                <Icon as={ArrowRight} ml={2} />
              </Button>
            </Flex>
          </Flex>
        </Grid>
      </Card.Body>
    </MotionCard>
  );
}