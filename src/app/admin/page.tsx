"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Button,
  Card,
  Input,
  VStack,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { Lock, User } from "lucide-react";
import Cookies from "js-cookie";

export default function AdminLoginPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if already logged in
    const token = Cookies.get("admin_token");
    if (token) {
      router.push("/admin/dashboard");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        Cookies.set("admin_token", data.token, { expires: 7 }); // 7 days
        router.push("/admin/dashboard");
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box minH="100vh" bg="gray.50" display="flex" alignItems="center" justifyContent="center">
      <Container maxW="md">
        <Card.Root bg="white" p={8} boxShadow="xl">
          <Card.Body>
            <VStack gap={6} align="stretch">
              <Box textAlign="center">
                <Heading as="h1" fontSize="3xl" mb={2}>
                  Ontour CMS
                </Heading>
                <Text color="gray.600">Admin Login</Text>
              </Box>

              {error && (
                <Box bg="red.50" border="1px" borderColor="red.200" borderRadius="md" p={3}>
                  <Text color="red.700" fontSize="sm">
                    {error}
                  </Text>
                </Box>
              )}

              <form onSubmit={handleLogin}>
                <VStack gap={4} align="stretch">
                  <Box>
                    <Text fontWeight="medium" mb={2}>
                      Username
                    </Text>
                    <Input
                      placeholder="Enter username"
                      size="lg"
                      value={credentials.username}
                      onChange={(e) =>
                        setCredentials({ ...credentials, username: e.target.value })
                      }
                      required
                    />
                  </Box>

                  <Box>
                    <Text fontWeight="medium" mb={2}>
                      Password
                    </Text>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      size="lg"
                      value={credentials.password}
                      onChange={(e) =>
                        setCredentials({ ...credentials, password: e.target.value })
                      }
                      required
                    />
                  </Box>

                  <Button
                    type="submit"
                    colorPalette="blue"
                    size="lg"
                    w="full"
                    loading={loading}
                  >
                    Login
                  </Button>
                </VStack>
              </form>

              <Box borderTop="1px" borderColor="gray.200" pt={4}>
                <Text fontSize="xs" color="gray.500" textAlign="center">
                  Default credentials: admin / admin123
                  <br />
                  (Change these in production!)
                </Text>
              </Box>
            </VStack>
          </Card.Body>
        </Card.Root>
      </Container>
    </Box>
  );
}
