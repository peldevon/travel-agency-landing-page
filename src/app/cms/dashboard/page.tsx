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
import {  FileText, Building, Map, Users } from "lucide-react";
import CMSLayout from "@/components/cms/CMSLayout";

export default function CMSDashboard() {
  const [stats, setStats] = useState({
    pages: 0,
    shortlets: 0,
    tours: 0,
    users: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [pagesRes, shortletsRes, toursRes, usersRes] = await Promise.all([
          fetch("/api/cms/pages"),
          fetch("/api/cms/shortlets"),
          fetch("/api/cms/tours"),
          fetch("/api/cms/users"),
        ]);

        const pages = await pagesRes.json();
        const shortlets = await shortletsRes.json();
        const tours = await toursRes.json();
        const users = await usersRes.json();

        setStats({
          pages: Array.isArray(pages) ? pages.length : 0,
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
      label: "Pages",
      value: stats.pages,
      icon: FileText,
      color: "blue",
      bg: "blue.50",
    },
    {
      label: "Shortlets",
      value: stats.shortlets,
      icon: Building,
      color: "green",
      bg: "green.50",
    },
    {
      label: "Tours",
      value: stats.tours,
      icon: Map,
      color: "purple",
      bg: "purple.50",
    },
    {
      label: "Users",
      value: stats.users,
      icon: Users,
      color: "orange",
      bg: "orange.50",
    },
  ];

  return (
    <CMSLayout>
      <VStack align="stretch" gap={6}>
        <Box>
          <Heading fontSize="2xl" fontWeight="bold" mb={2}>
            Welcome to Ontour Travels CMS
          </Heading>
          <Text color="gray.600">
            Manage your website content, shortlets, and tour packages from this dashboard.
          </Text>
        </Box>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={6}>
          {statCards.map((stat) => (
            <Card.Root key={stat.label} bg={stat.bg} borderRadius="lg" p={6}>
              <Card.Body>
                <Flex justify="space-between" align="start">
                  <VStack align="start" gap={2}>
                    <Text fontSize="sm" color="gray.700" fontWeight="medium">
                      {stat.label}
                    </Text>
                    <Heading fontSize="3xl" fontWeight="bold" color={`${stat.color}.700`}>
                      {loading ? "..." : stat.value}
                    </Heading>
                  </VStack>
                  <Box
                    bg={`${stat.color}.100`}
                    p={3}
                    borderRadius="lg"
                  >
                    <Icon as={stat.icon} boxSize={6} color={`${stat.color}.600`} />
                  </Box>
                </Flex>
              </Card.Body>
            </Card.Root>
          ))}
        </Grid>

        <Card.Root>
          <Card.Body p={6}>
            <Heading fontSize="lg" mb={4}>
              Quick Links
            </Heading>
            <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
              <Box
                as="a"
                href="/cms/pages"
                p={4}
                borderRadius="md"
                border="1px"
                borderColor="gray.200"
                _hover={{ borderColor: "blue.500", bg: "blue.50" }}
                transition="all 0.2s"
              >
                <Icon as={FileText} boxSize={6} color="blue.600" mb={2} />
                <Text fontWeight="medium">Manage Pages</Text>
                <Text fontSize="sm" color="gray.600">
                  Edit website content
                </Text>
              </Box>

              <Box
                as="a"
                href="/cms/shortlets"
                p={4}
                borderRadius="md"
                border="1px"
                borderColor="gray.200"
                _hover={{ borderColor: "green.500", bg: "green.50" }}
                transition="all 0.2s"
              >
                <Icon as={Building} boxSize={6} color="green.600" mb={2} />
                <Text fontWeight="medium">Manage Shortlets</Text>
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
                borderColor="gray.200"
                _hover={{ borderColor: "purple.500", bg: "purple.50" }}
                transition="all 0.2s"
              >
                <Icon as={Map} boxSize={6} color="purple.600" mb={2} />
                <Text fontWeight="medium">Manage Tours</Text>
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