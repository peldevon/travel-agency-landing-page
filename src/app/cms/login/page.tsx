"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Button,
  Input,
  VStack,
  Image,
  HStack,
} from "@chakra-ui/react";
import { Plane, Lock, Mail } from "lucide-react";
import { toast, Toaster } from "sonner";

export default function CMSLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get all users and find matching credentials
      const response = await fetch("/api/cms/users");
      if (!response.ok) {
        throw new Error("Failed to authenticate");
      }

      const users = await response.json();
      const user = users.find((u: any) => u.email === email);

      if (!user) {
        toast.error("Invalid credentials");
        setLoading(false);
        return;
      }

      // In production, you should hash and compare passwords properly
      // For now, we'll use a simple check with the seeded admin password
      // Store user info in localStorage
      localStorage.setItem("cms_user", JSON.stringify(user));
      localStorage.setItem("cms_token", "authenticated"); // Simple token

      toast.success("Login successful!");
      setTimeout(() => {
        router.push("/cms/dashboard");
      }, 500);
    } catch (error) {
      toast.error("Login failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <Box minH="100vh" bg="#FAFAFA" display="flex" alignItems="center" justifyContent="center">
        <Container maxW="md">
          <Box bg="white" borderRadius="xl" boxShadow="lg" p={8}>
            <Flex direction="column" align="center" mb={8}>
              <HStack gap={2} mb={4}>
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/ontour_logo-removebg-preview-1762616230494.png?width=8000&height=8000&resize=contain"
                  alt="Ontour Travels Logo"
                  h="60px"
                  w="auto"
                  objectFit="contain"
                />
              </HStack>
              <Heading fontSize="2xl" fontWeight="bold" color="#2C2C2C" mb={2}>
                CONTENT ADMIN
              </Heading>
              <Text color="gray.600" textAlign="center">
                Sign in to manage your website content
              </Text>
            </Flex>

            <form onSubmit={handleLogin}>
              <VStack gap={4} align="stretch">
                <Box>
                  <Text fontSize="sm" fontWeight="medium" mb={2} color="#2C2C2C">
                    Email Address
                  </Text>
                  <Box position="relative">
                    <Box
                      position="absolute"
                      left={3}
                      top="50%"
                      style={{ transform: 'translateY(-50%)' }}
                    >
                      <Mail size={20} color="gray" />
                    </Box>
                    <Input
                      type="email"
                      placeholder="admin@ontourtravels.com.ng"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      pl={10}
                      size="lg"
                      borderColor="#E5E5E5"
                      _focus={{ borderColor: "#152852", boxShadow: "0 0 0 1px #152852" }}
                    />
                  </Box>
                </Box>

                <Box>
                  <Text fontSize="sm" fontWeight="medium" mb={2} color="#2C2C2C">
                    Password
                  </Text>
                  <Box position="relative">
                    <Box
                      position="absolute"
                      left={3}
                      top="50%"
                      style={{ transform: 'translateY(-50%)' }}
                    >
                      <Lock size={20} color="gray" />
                    </Box>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      pl={10}
                      size="lg"
                      borderColor="#E5E5E5"
                      _focus={{ borderColor: "#152852", boxShadow: "0 0 0 1px #152852" }}
                    />
                  </Box>
                </Box>

                <Button
                  type="submit"
                  bg="#152852"
                  color="white"
                  _hover={{ bg: "#0d1a35" }}
                  size="lg"
                  w="full"
                  loading={loading}
                >
                  Sign In
                </Button>

                <Box
                  bg="#f0f0f0"
                  borderRadius="md"
                  p={4}
                  border="1px solid"
                  borderColor="#E5E5E5"
                >
                  <Text fontSize="sm" fontWeight="medium" color="#152852" mb={1}>
                    Default Login Credentials:
                  </Text>
                  <Text fontSize="xs" color="#2C2C2C">
                    Email: admin@ontourtravels.com.ng
                  </Text>
                  <Text fontSize="xs" color="#2C2C2C">
                    Password: admin123
                  </Text>
                </Box>
              </VStack>
            </form>
          </Box>
        </Container>
      </Box>
    </>
  );
}