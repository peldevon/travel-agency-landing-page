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
  Grid,
  HStack,
  VStack,
  Icon,
  Link,
} from "@chakra-ui/react";
import {
  Package,
  Home,
  Image as ImageIcon,
  LogOut,
  Plus,
  Edit,
  Plane,
} from "lucide-react";
import Cookies from "js-cookie";

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("admin_token");
    if (!token) {
      router.push("/admin");
    } else {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    Cookies.remove("admin_token");
    router.push("/admin");
  };

  if (loading) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <Text>Loading...</Text>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg="gray.50">
      {/* Header */}
      <Box bg="white" boxShadow="sm" borderBottom="1px" borderColor="gray.200">
        <Container maxW="7xl" py={4}>
          <Flex justify="space-between" align="center">
            <HStack gap={2}>
              <Icon as={Plane} boxSize={8} color="blue.600" />
              <Box>
                <Heading as="h1" fontSize="2xl">
                  Ontour CMS
                </Heading>
                <Text fontSize="sm" color="gray.600">
                  Content Management System
                </Text>
              </Box>
            </HStack>
            <HStack gap={4}>
              <Button
                as="a"
                href="/"
                target="_blank"
                variant="outline"
                colorPalette="gray"
              >
                View Site
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                colorPalette="red"
                leftIcon={<LogOut />}
              >
                Logout
              </Button>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="7xl" py={12}>
        <VStack gap={8} align="stretch">
          {/* Quick Stats */}
          <Box>
            <Heading as="h2" fontSize="2xl" mb={6}>
              Dashboard Overview
            </Heading>
            <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
              <StatCard title="Tours" count="9" icon={Package} color="blue" />
              <StatCard title="Shortlets" count="6" icon={Home} color="green" />
              <StatCard title="Media" count="45" icon={ImageIcon} color="purple" />
            </Grid>
          </Box>

          {/* Quick Actions */}
          <Box>
            <Heading as="h2" fontSize="2xl" mb={6}>
              Manage Content
            </Heading>
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
              <ActionCard
                title="Tours"
                description="Manage tour packages, itineraries, and pricing"
                icon={Package}
                color="blue"
                actions={[
                  { label: "View All Tours", href: "/admin/tours" },
                  { label: "Add New Tour", href: "/admin/tours/new" },
                ]}
              />
              <ActionCard
                title="Shortlets"
                description="Manage properties, amenities, and availability"
                icon={Home}
                color="green"
                actions={[
                  { label: "View All Shortlets", href: "/admin/shortlets" },
                  { label: "Add New Shortlet", href: "/admin/shortlets/new" },
                ]}
              />
              <ActionCard
                title="Media Library"
                description="Upload and manage images and videos"
                icon={ImageIcon}
                color="purple"
                actions={[
                  { label: "Browse Media", href: "/admin/media" },
                  { label: "Upload New", href: "/admin/media/upload" },
                ]}
              />
              <ActionCard
                title="Settings"
                description="Configure CMS settings and preferences"
                icon={Edit}
                color="orange"
                actions={[
                  { label: "General Settings", href: "/admin/settings" },
                  { label: "Change Password", href: "/admin/settings/password" },
                ]}
              />
            </Grid>
          </Box>

          {/* Documentation */}
          <Box>
            <Card.Root bg="blue.50" borderLeft="4px" borderColor="blue.500">
              <Card.Body p={6}>
                <Heading as="h3" fontSize="lg" mb={2} color="blue.900">
                  📚 Documentation
                </Heading>
                <Text color="blue.800" mb={4}>
                  Learn how to manage your content effectively with our comprehensive guides.
                </Text>
                <HStack gap={3}>
                  <Button
                    as={Link}
                    href="/CMS_MANAGEMENT_GUIDE.md"
                    target="_blank"
                    colorPalette="blue"
                    size="sm"
                  >
                    CMS Guide
                  </Button>
                  <Button
                    as={Link}
                    href="/VISUAL_CMS_GUIDE.md"
                    target="_blank"
                    variant="outline"
                    colorPalette="blue"
                    size="sm"
                  >
                    Visual Editor Guide
                  </Button>
                </HStack>
              </Card.Body>
            </Card.Root>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}

function StatCard({ title, count, icon, color }: any) {
  return (
    <Card.Root>
      <Card.Body p={6}>
        <Flex justify="space-between" align="start">
          <Box>
            <Text fontSize="sm" color="gray.600" mb={1}>
              {title}
            </Text>
            <Heading as="h3" fontSize="3xl">
              {count}
            </Heading>
          </Box>
          <Box
            w={12}
            h={12}
            bg={`${color}.100`}
            borderRadius="lg"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={icon} boxSize={6} color={`${color}.600`} />
          </Box>
        </Flex>
      </Card.Body>
    </Card.Root>
  );
}

function ActionCard({ title, description, icon, color, actions }: any) {
  return (
    <Card.Root>
      <Card.Body p={6}>
        <Flex gap={4} mb={4}>
          <Box
            w={12}
            h={12}
            bg={`${color}.100`}
            borderRadius="lg"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexShrink={0}
          >
            <Icon as={icon} boxSize={6} color={`${color}.600`} />
          </Box>
          <Box>
            <Heading as="h3" fontSize="lg" mb={1}>
              {title}
            </Heading>
            <Text fontSize="sm" color="gray.600">
              {description}
            </Text>
          </Box>
        </Flex>
        <VStack gap={2} align="stretch">
          {actions.map((action: any, index: number) => (
            <Button
              key={index}
              as="a"
              href={action.href}
              variant={index === 0 ? "solid" : "outline"}
              colorPalette={color}
              w="full"
            >
              {action.label}
            </Button>
          ))}
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}
