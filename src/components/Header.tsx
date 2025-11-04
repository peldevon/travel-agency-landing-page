import {
  Box,
  Container,
  Flex,
  HStack,
  Icon,
  Link,
  Text,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { Plane, MessageCircle, Menu } from "lucide-react";
import NextImage from "next/image";

export function Header() {
  return (
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
            <Box position="relative" w={10} h={10}>
              <NextImage
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/ontour_logo-removebg-preview-1762251116073.png?width=8000&height=8000&resize=contain"
                alt="Ontour Travels Logo"
                fill
                style={{ objectFit: "contain" }}
              />
            </Box>
            <Text fontSize="2xl" fontFamily="var(--font-montserrat)" fontWeight="bold" color="gray.900">
              Ontour Travels
            </Text>
          </HStack>
          <HStack gap={6} display={{ base: "none", md: "flex" }}>
            <Link href="/" color="gray.700" _hover={{ color: "blue.600" }}>
              Home
            </Link>
            <Link href="/book" color="gray.700" _hover={{ color: "blue.600" }}>
              Flights & Hotels
            </Link>
            <Link href="/shortlets" color="gray.700" _hover={{ color: "blue.600" }}>
              Shortlets
            </Link>
            <Link href="/tours" color="gray.700" _hover={{ color: "blue.600" }}>
              Tours
            </Link>
            <Link href="/about" color="gray.700" _hover={{ color: "blue.600" }}>
              About
            </Link>
            <Link href="/contact" color="gray.700" _hover={{ color: "blue.600" }}>
              Contact
            </Link>
            <Button colorPalette="blue" size="sm" as="a" href="https://wa.me/2348123456789" target="_blank">
              <Icon as={MessageCircle} mr={1} />
              WhatsApp
            </Button>
          </HStack>
          <IconButton display={{ base: "flex", md: "none" }} aria-label="Menu">
            <Menu />
          </IconButton>
        </Flex>
      </Container>
    </Box>
  );
}
