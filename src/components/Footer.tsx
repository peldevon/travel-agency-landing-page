import {
  Box,
  Container,
  Grid,
  HStack,
  VStack,
  Icon,
  Link,
  Text,
  Heading,
} from "@chakra-ui/react";
import { Plane, Phone, Mail, Clock, Facebook, Twitter, Instagram, Heart } from "lucide-react";
import NextImage from "next/image";

export function Footer() {
  return (
    <Box bg="gray.900" color="white" py={12}>
      <Container maxW="7xl">
        <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={8} mb={8}>
          <Box>
            <HStack gap={2} mb={4}>
              <Box position="relative" w={8} h={8}>
                <NextImage
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/ontour_logo-removebg-preview-1762251116073.png?width=8000&height=8000&resize=contain"
                  alt="Ontour Travels Logo"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </Box>
              <Text fontSize="2xl" fontFamily="var(--font-montserrat)" fontWeight="bold">
                Ontour Travels
              </Text>
            </HStack>
            <Text color="gray.400" mb={4}>
              Your trusted partner in creating unforgettable travel experiences around the world.
            </Text>
            <HStack gap={4}>
              <Link href="#" _hover={{ color: "blue.400" }}>
                <Icon as={Facebook} boxSize={5} />
              </Link>
              <Link href="#" _hover={{ color: "blue.400" }}>
                <Icon as={Twitter} boxSize={5} />
              </Link>
              <Link href="#" _hover={{ color: "blue.400" }}>
                <Icon as={Instagram} boxSize={5} />
              </Link>
            </HStack>
          </Box>

          <Box>
            <Heading as="h3" fontSize="lg" fontWeight="bold" mb={4}>
              Quick Links
            </Heading>
            <VStack align="start" gap={2}>
              <Link href="/about" color="gray.400" _hover={{ color: "white" }}>
                About Us
              </Link>
              <Link href="/book" color="gray.400" _hover={{ color: "white" }}>
                Flights & Hotels
              </Link>
              <Link href="/shortlets" color="gray.400" _hover={{ color: "white" }}>
                Shortlets
              </Link>
              <Link href="/tours" color="gray.400" _hover={{ color: "white" }}>
                Tours
              </Link>
            </VStack>
          </Box>

          <Box>
            <Heading as="h3" fontSize="lg" fontWeight="bold" mb={4}>
              Support
            </Heading>
            <VStack align="start" gap={2}>
              <Link href="/contact" color="gray.400" _hover={{ color: "white" }}>
                Contact Us
              </Link>
              <Link href="/faq" color="gray.400" _hover={{ color: "white" }}>
                FAQ
              </Link>
              <Link href="/terms" color="gray.400" _hover={{ color: "white" }}>
                Terms & Conditions
              </Link>
              <Link href="/privacy" color="gray.400" _hover={{ color: "white" }}>
                Privacy Policy
              </Link>
            </VStack>
          </Box>

          <Box>
            <Heading as="h3" fontSize="lg" fontWeight="bold" mb={4}>
              Contact Us
            </Heading>
            <VStack align="start" gap={3}>
              <HStack gap={2}>
                <Icon as={Phone} boxSize={4} color="blue.400" />
                <Text color="gray.400">+234 812 345 6789</Text>
              </HStack>
              <HStack gap={2}>
                <Icon as={Mail} boxSize={4} color="blue.400" />
                <Text color="gray.400">info@ontourtravels.com.ng</Text>
              </HStack>
              <HStack gap={2}>
                <Icon as={Clock} boxSize={4} color="blue.400" />
                <Text color="gray.400">Mon–Sat, 9 AM – 6 PM WAT</Text>
              </HStack>
            </VStack>
          </Box>
        </Grid>

        <Box borderTop="1px" borderColor="gray.800" pt={8} textAlign="center" color="gray.400">
          <Text>
            &copy; 2024 Ontour Travels. All rights reserved. | Made with{" "}
            <Icon as={Heart} display="inline" color="red.500" fill="red.500" boxSize={4} /> by{" "}
            <Link
              href="https://github.com/peldevon"
              target="_blank"
              color="blue.400"
              _hover={{ textDecoration: "underline" }}
            >
              Peldevon
            </Link>
          </Text>
        </Box>
      </Container>
    </Box>
  );
}
