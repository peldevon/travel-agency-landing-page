"use client";

import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Button,
  Card,
  Grid,
  HStack,
  VStack,
  Icon,
  Link,
  Input,
  Textarea,
  Select,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { 
  Plane, 
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  Facebook,
  Twitter,
  Instagram,
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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

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
              <Link href="/tours" color="gray.700">Tours</Link>
              <Link href="/about" color="gray.700">About</Link>
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
              Get in Touch
            </Heading>
            <Text fontSize="xl" color="blue.100">
              We're here to help with bookings, enquiries, and support.
            </Text>
          </MotionBox>
        </Container>
      </MotionBox>

      {/* Contact Options */}
      <Container maxW="7xl" py={16}>
        <MotionBox
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={6}>
            <ContactOptionCard
              icon={MessageCircle}
              title="WhatsApp"
              description="Chat with us instantly"
              action="Chat Now"
              href="https://wa.me/2348123456789?text=Hi%20Ontour,%20I%20need%20help%20with"
              color="green"
            />
            <ContactOptionCard
              icon={Phone}
              title="Phone"
              description="Call us during business hours"
              action="+234 812 345 6789"
              href="tel:+2348123456789"
              color="blue"
            />
            <ContactOptionCard
              icon={Mail}
              title="Email"
              description="Send us your request"
              action="info@ontourtravels.com.ng"
              href="mailto:info@ontourtravels.com.ng"
              color="purple"
            />
            <ContactOptionCard
              icon={MapPin}
              title="Office"
              description="Visit our Lagos office"
              action="Lekki, Lagos"
              href="#office-location"
              color="orange"
            />
          </Grid>
        </MotionBox>
      </Container>

      {/* Contact Form & Info */}
      <Container maxW="7xl" pb={16}>
        <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={8}>
          {/* Contact Form */}
          <MotionBox
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Card.Root bg="white" p={8} boxShadow="lg">
              <Card.Body>
                <Heading as="h2" fontSize="2xl" mb={6} color="gray.900">
                  Send Us a Message
                </Heading>

                {submitted ? (
                  <MotionBox
                    variants={scaleIn}
                    initial="hidden"
                    animate="visible"
                    textAlign="center"
                    py={12}
                  >
                    <Icon as={CheckCircle} boxSize={16} color="green.500" mb={4} />
                    <Heading as="h3" fontSize="xl" mb={2} color="gray.900">
                      Message Sent!
                    </Heading>
                    <Text color="gray.600" mb={4}>
                      Thanks for reaching out! Our team will get back to you within 24 hours.
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      For urgent requests, please WhatsApp us directly.
                    </Text>
                  </MotionBox>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <VStack gap={4} align="stretch">
                      <Box>
                        <Text fontWeight="medium" mb={2} color="gray.700">Full Name *</Text>
                        <Input
                          placeholder="Enter your full name"
                          size="lg"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </Box>

                      <Box>
                        <Text fontWeight="medium" mb={2} color="gray.700">Email *</Text>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          size="lg"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </Box>

                      <Box>
                        <Text fontWeight="medium" mb={2} color="gray.700">Phone (WhatsApp preferred) *</Text>
                        <Input
                          type="tel"
                          placeholder="+234 XXX XXX XXXX"
                          size="lg"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                        />
                      </Box>

                      <Box>
                        <Text fontWeight="medium" mb={2} color="gray.700">Service Type *</Text>
                        <Select.Root
                          value={[formData.service]}
                          onValueChange={(e) => setFormData({ ...formData, service: e.value[0] })}
                          size="lg"
                        >
                          <Select.Trigger>
                            <Select.ValueText placeholder="Select a service" />
                          </Select.Trigger>
                          <Select.Content>
                            <Select.Item value="flights">Flights</Select.Item>
                            <Select.Item value="hotels">Hotels</Select.Item>
                            <Select.Item value="shortlets">Shortlets</Select.Item>
                            <Select.Item value="tours">Tours</Select.Item>
                            <Select.Item value="visa">Visa Advisory</Select.Item>
                            <Select.Item value="other">Other</Select.Item>
                          </Select.Content>
                        </Select.Root>
                      </Box>

                      <Box>
                        <Text fontWeight="medium" mb={2} color="gray.700">Message *</Text>
                        <Textarea
                          placeholder="Tell us how we can help you..."
                          size="lg"
                          rows={5}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                        />
                      </Box>

                      <Button
                        type="submit"
                        colorPalette="blue"
                        size="lg"
                        w="full"
                        leftIcon={<Send />}
                      >
                        Send Enquiry
                      </Button>

                      <Text fontSize="xs" color="gray.500" textAlign="center">
                        We'll respond within 24 hours. For urgent bookings, please use WhatsApp.
                      </Text>
                    </VStack>
                  </form>
                )}
              </Card.Body>
            </Card.Root>
          </MotionBox>

          {/* Contact Info Sidebar */}
          <MotionBox
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <VStack gap={6} align="stretch">
              {/* Support Hours */}
              <Card.Root bg="white" p={6} boxShadow="md">
                <Card.Body>
                  <HStack gap={3} mb={4}>
                    <Icon as={Clock} boxSize={6} color="blue.600" />
                    <Heading as="h3" fontSize="lg" color="gray.900">Support Hours</Heading>
                  </HStack>
                  <VStack align="start" gap={2}>
                    <Text color="gray.700" fontWeight="medium">Monday – Saturday</Text>
                    <Text color="gray.600">9:00 AM – 6:00 PM WAT</Text>
                    <Box borderTop="1px" borderColor="gray.200" pt={3} w="full">
                      <Text fontSize="sm" color="gray.600">
                        Outside these hours? WhatsApp us and we'll respond as soon as possible.
                      </Text>
                    </Box>
                  </VStack>
                </Card.Body>
              </Card.Root>

              {/* Office Location */}
              <Card.Root bg="white" p={6} boxShadow="md" id="office-location">
                <Card.Body>
                  <HStack gap={3} mb={4}>
                    <Icon as={MapPin} boxSize={6} color="blue.600" />
                    <Heading as="h3" fontSize="lg" color="gray.900">Our Office</Heading>
                  </HStack>
                  <VStack align="start" gap={2}>
                    <Text color="gray.700" fontWeight="medium">Lagos Headquarters</Text>
                    <Text color="gray.600" fontSize="sm">
                      Lekki Phase 1<br />
                      Lagos, Nigeria
                    </Text>
                    <Button
                      as="a"
                      href="https://maps.google.com"
                      target="_blank"
                      variant="outline"
                      colorPalette="blue"
                      size="sm"
                      w="full"
                      mt={2}
                    >
                      Get Directions
                    </Button>
                  </VStack>
                </Card.Body>
              </Card.Root>

              {/* Social Media */}
              <Card.Root bg="white" p={6} boxShadow="md">
                <Card.Body>
                  <Heading as="h3" fontSize="lg" mb={4} color="gray.900">Follow Us</Heading>
                  <VStack align="stretch" gap={3}>
                    <Button
                      as="a"
                      href="#"
                      variant="outline"
                      justifyContent="start"
                      leftIcon={<Facebook />}
                    >
                      Facebook
                    </Button>
                    <Button
                      as="a"
                      href="#"
                      variant="outline"
                      justifyContent="start"
                      leftIcon={<Twitter />}
                    >
                      Twitter
                    </Button>
                    <Button
                      as="a"
                      href="#"
                      variant="outline"
                      justifyContent="start"
                      leftIcon={<Instagram />}
                    >
                      Instagram
                    </Button>
                  </VStack>
                </Card.Body>
              </Card.Root>
            </VStack>
          </MotionBox>
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box bg="blue.600" color="white" py={16}>
        <Container maxW="4xl">
          <MotionBox
            textAlign="center"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Heading as="h2" fontSize="3xl" mb={4}>
              Ready to Book? Let's Make It Seamless.
            </Heading>
            <Text fontSize="lg" color="blue.100" mb={8}>
              Start planning your next adventure with Ontour Travels
            </Text>
            <HStack gap={4} justify="center" flexWrap="wrap">
              <Button as="a" href="/book" colorPalette="blue" bg="white" color="blue.600" size="lg" _hover={{ bg: "gray.100" }}>
                Book Flights & Hotels
              </Button>
              <Button as="a" href="/shortlets" variant="outline" borderColor="white" color="white" size="lg" _hover={{ bg: "whiteAlpha.200" }}>
                Browse Shortlets
              </Button>
            </HStack>
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
                <Link href="/about" color="gray.400" _hover={{ color: "white" }}>About Us</Link>
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

function ContactOptionCard({ icon, title, description, action, href, color }: any) {
  return (
    <MotionCard
      as="a"
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      variants={fadeInUp}
      whileHover={{ y: -10, boxShadow: "xl" }}
      transition={{ duration: 0.3 }}
      bg="white"
      p={6}
      textAlign="center"
      cursor="pointer"
    >
      <Card.Body>
        <Flex direction="column" align="center" gap={3}>
          <Box
            w={16}
            h={16}
            bg={`${color}.100`}
            borderRadius="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={icon} boxSize={8} color={`${color}.600`} />
          </Box>
          <Heading as="h3" fontSize="lg" fontWeight="bold" color="gray.900">
            {title}
          </Heading>
          <Text fontSize="sm" color="gray.600">
            {description}
          </Text>
          <Text fontSize="sm" fontWeight="medium" color={`${color}.600`}>
            {action}
          </Text>
        </Flex>
      </Card.Body>
    </MotionCard>
  );
}
