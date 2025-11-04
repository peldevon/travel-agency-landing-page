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
  Icon,
  Badge,
  Input,
} from "@chakra-ui/react";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  ArrowLeft,
  Globe,
  Map,
  Home,
} from "lucide-react";
import Cookies from "js-cookie";

export default function ToursManagementPage() {
  const router = useRouter();
  const [tours, setTours] = useState<any[]>([]);
  const [filteredTours, setFilteredTours] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("admin_token");
    if (!token) {
      router.push("/admin");
      return;
    }
    fetchTours();
  }, [router]);

  const fetchTours = async () => {
    try {
      const response = await fetch("/api/tours");
      const data = await response.json();
      setTours(data.tours || []);
      setFilteredTours(data.tours || []);
    } catch (error) {
      console.error("Error fetching tours:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredTours(tours);
    } else {
      const filtered = tours.filter(
        (tour) =>
          tour.title.toLowerCase().includes(query.toLowerCase()) ||
          tour.category.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredTours(filtered);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this tour?")) return;

    try {
      const response = await fetch(`/api/admin/tours/${slug}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${Cookies.get("admin_token")}`,
        },
      });

      if (response.ok) {
        fetchTours();
      } else {
        alert("Failed to delete tour");
      }
    } catch (error) {
      console.error("Error deleting tour:", error);
      alert("An error occurred");
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "local":
        return Home;
      case "regional":
        return Map;
      case "international":
        return Globe;
      default:
        return Globe;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "local":
        return "blue";
      case "regional":
        return "green";
      case "international":
        return "purple";
      default:
        return "gray";
    }
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
      <Container maxW="7xl" py={8}>
        {/* Header */}
        <Flex justify="space-between" align="center" mb={8}>
          <HStack gap={4}>
            <Button
              as="a"
              href="/admin/dashboard"
              variant="outline"
              leftIcon={<ArrowLeft />}
            >
              Back
            </Button>
            <Box>
              <Heading as="h1" fontSize="3xl">
                Manage Tours
              </Heading>
              <Text color="gray.600">{tours.length} total tours</Text>
            </Box>
          </HStack>
          <Button
            as="a"
            href="/admin/tours/new"
            colorPalette="blue"
            leftIcon={<Plus />}
          >
            Add New Tour
          </Button>
        </Flex>

        {/* Search */}
        <Box mb={6}>
          <Input
            placeholder="Search tours by name or category..."
            size="lg"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </Box>

        {/* Tours Grid */}
        {filteredTours.length === 0 ? (
          <Card.Root>
            <Card.Body p={12} textAlign="center">
              <Text color="gray.600" mb={4}>
                {searchQuery ? "No tours found matching your search" : "No tours yet"}
              </Text>
              <Button as="a" href="/admin/tours/new" colorPalette="blue">
                Create Your First Tour
              </Button>
            </Card.Body>
          </Card.Root>
        ) : (
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
            {filteredTours.map((tour) => (
              <Card.Root key={tour.slug} overflow="hidden">
                <Box
                  h="48"
                  bg="gray.200"
                  bgImage={tour.gallery?.[0] ? `url(${tour.gallery[0]})` : undefined}
                  bgSize="cover"
                  bgPosition="center"
                />
                <Card.Body p={6}>
                  <Flex justify="space-between" align="start" mb={3}>
                    <Badge
                      colorPalette={getCategoryColor(tour.category)}
                      display="flex"
                      alignItems="center"
                      gap={1}
                    >
                      <Icon as={getCategoryIcon(tour.category)} boxSize={3} />
                      {tour.category}
                    </Badge>
                    <Badge colorPalette={tour.status === "published" ? "green" : "gray"}>
                      {tour.status}
                    </Badge>
                  </Flex>
                  <Heading as="h3" fontSize="lg" mb={2} noOfLines={2}>
                    {tour.title}
                  </Heading>
                  <Text fontSize="sm" color="gray.600" mb={1}>
                    {tour.duration_days}D/{tour.duration_nights}N
                  </Text>
                  <Text fontSize="lg" fontWeight="bold" color="blue.600" mb={4}>
                    From ₦{tour.price_from_ngn?.toLocaleString()}
                  </Text>
                  <Flex gap={2}>
                    <Button
                      as="a"
                      href={`/admin/tours/edit/${tour.slug}`}
                      flex={1}
                      colorPalette="blue"
                      leftIcon={<Edit />}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(tour.slug)}
                      colorPalette="red"
                      variant="outline"
                    >
                      <Icon as={Trash2} />
                    </Button>
                  </Flex>
                </Card.Body>
              </Card.Root>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
