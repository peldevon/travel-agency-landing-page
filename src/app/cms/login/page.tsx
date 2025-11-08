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
  Icon,
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
      <Box minH="100vh" bg="gray.50" display="flex" alignItems="center" justifyContent="center">
        <Container maxW="md">
          <Box bg="white" borderRadius="xl" boxShadow="lg" p={8}>
            <Flex direction="column" align="center" mb={8}>
              <Flex align="center" gap={2} mb={4}>
                <Icon as={Plane} boxSize={10} color="blue.600" />
                <Heading fontSize="2xl" fontWeight="bold" color="gray.900">
                  Ontour Travels CMS
                </Heading>
              </Flex>
              <Text color="gray.600" textAlign="center">
                Sign in to manage your website content
              </Text>
            </Flex>

            <form onSubmit={handleLogin}>
              <VStack gap={4} align="stretch">
                <Box>
                  <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.700">
                    Email Address
                  </Text>
                  <Box position="relative">
                    <Icon
                      as={Mail}
                      position="absolute"
                      left={3}
                      top="50%"
                      transform="translateY(-50%)"
                      color="gray.400"
                      boxSize={5}
                    />
                    <Input
                      type="email"
                      placeholder="admin@ontourtravels.com.ng"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      pl={10}
                      size="lg"
                    />
                  </Box>
                </Box>

                <Box>
                  <Text fontSize="sm" fontWeight="medium" mb={2} color="gray.700">
                    Password
                  </Text>
                  <Box position="relative">
                    <Icon
                      as={Lock}
                      position="absolute"
                      left={3}
                      top="50%"
                      transform="translateY(-50%)"
                      color="gray.400"
                      boxSize={5}
                    />
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      pl={10}
                      size="lg"
                    />
                  </Box>
                </Box>

                <Button
                  type="submit"
                  colorPalette="blue"
                  size="lg"
                  w="full"
                  loading={loading}
                >
                  Sign In
                </Button>

                <Box
                  bg="blue.50"
                  borderRadius="md"
                  p={4}
                  border="1px solid"
                  borderColor="blue.200"
                >
                  <Text fontSize="sm" fontWeight="medium" color="blue.900" mb={1}>
                    Default Login Credentials:
                  </Text>
                  <Text fontSize="xs" color="blue.700">
                    Email: admin@ontourtravels.com.ng
                  </Text>
                  <Text fontSize="xs" color="blue.700">
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
