"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Heading,
  Text,
  Card,
  Icon,
  Flex,
  VStack,
} from "@chakra-ui/react";
import { Building, Map, Users } from "lucide-react";
import CMSLayout from "@/components/cms/CMSLayout";

export default function CMSDashboard() {
  const [stats, setStats] = useState({
    shortlets: 0,
    tours: 0,
    users: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [shortletsRes, toursRes, usersRes] = await Promise.all([
          fetch("/api/cms/shortlets"),
          fetch("/api/cms/tours"),
          fetch("/api/cms/users"),
        ]);

        const shortlets = await shortletsRes.json();
        const tours = await toursRes.json();
        const users = await usersRes.json();

        setStats({
          shortlets: Array.isArray(shortlets) ? shortlets.length : 0,
          tours: Array.isArray(tours) ? tours.length : 0,
          users: Array.isArray(users) ? users.length : 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      label: "Shortlets",
      value: stats.shortlets,
      icon: Building,
      color: "#C9A449",
      bg: "#f0f0f0",
    },
    {
      label: "Tours",
      value: stats.tours,
      icon: Map,
      color: "#152852",
      bg: "#f0f0f0",
    },
    {
      label: "Users",
      value: stats.users,
      icon: Users,
      color: "#C9A449",
      bg: "#f0f0f0",
    },
  ];

  return (
    <CMSLayout>
      <VStack align="stretch" gap={6}>
        <Box>
          <Heading fontSize="2xl" fontWeight="bold" mb={2} color="#2C2C2C">
            Welcome to Ontour Travels CMS
          </Heading>
          <Text color="gray.600">
            Manage your shortlets and tour packages from this dashboard.
          </Text>
        </Box>

        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
          {statCards.map((stat) => (
            <Card.Root key={stat.label} bg={stat.bg} borderRadius="lg" p={6}>
              <Card.Body>
                <Flex justify="space-between" align="start">
                  <VStack align="start" gap={2}>
                    <Text fontSize="sm" color="#2C2C2C" fontWeight="medium">
                      {stat.label}
                    </Text>
                    <Heading fontSize="3xl" fontWeight="bold" color={stat.color}>
                      {loading ? "..." : stat.value}
                    </Heading>
                  </VStack>
                  <Box
                    bg="white"
                    p={3}
                    borderRadius="lg"
                  >
                    <Icon as={stat.icon} boxSize={6} color={stat.color} />
                  </Box>
                </Flex>
              </Card.Body>
            </Card.Root>
          ))}
        </Grid>

        <Card.Root>
          <Card.Body p={6}>
            <Heading fontSize="lg" mb={4} color="#2C2C2C">
              Quick Links
            </Heading>
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
              <Box
                as="a"
                href="/cms/shortlets"
                p={4}
                borderRadius="md"
                border="1px"
                borderColor="#E5E5E5"
                _hover={{ borderColor: "#C9A449", bg: "#f0f0f0" }}
                transition="all 0.2s"
              >
                <Icon as={Building} boxSize={6} color="#C9A449" mb={2} />
                <Text fontWeight="medium" color="#2C2C2C">Manage Shortlets</Text>
                <Text fontSize="sm" color="gray.600">
                  Add or edit properties
                </Text>
              </Box>

              <Box
                as="a"
                href="/cms/tours"
                p={4}
                borderRadius="md"
                border="1px"
                borderColor="#E5E5E5"
                _hover={{ borderColor: "#152852", bg: "#f0f0f0" }}
                transition="all 0.2s"
              >
                <Icon as={Map} boxSize={6} color="#152852" mb={2} />
                <Text fontWeight="medium" color="#2C2C2C">Manage Tours</Text>
                <Text fontSize="sm" color="gray.600">
                  Update tour packages
                </Text>
              </Box>
            </Grid>
          </Card.Body>
        </Card.Root>
      </VStack>
    </CMSLayout>
  );
}