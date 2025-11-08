"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Text,
  Input,
  VStack,
  HStack,
  Icon,
  Badge,
  Grid,
  Textarea,
  Select,
} from "@chakra-ui/react";
import { Plus, Edit, Trash, MapPin } from "lucide-react";
import CMSLayout from "@/components/cms/CMSLayout";
import { toast, Toaster } from "sonner";

interface Tour {
  id: number;
  title: string;
  slug: string;
  description: string;
  destination: string;
  duration: string;
  priceFrom: number;
  category: string;
  images: string[];
  highlights: string[];
  included: string[];
  excluded: string[];
  rating: number;
  reviewsCount: number;
  status: string;
}

export default function CMSTours() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    destination: "",
    duration: "",
    price_from: "",
    category: "international",
    images: "",
    highlights: "",
    included: "",
    excluded: "",
    rating: "",
    reviews_count: "",
    status: "active",
  });

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const response = await fetch("/api/cms/tours");
      const data = await response.json();
      setTours(data);
    } catch (error) {
      toast.error("Failed to load tours");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditMode(true);
    setSelectedTour(null);
    setFormData({
      title: "",
      slug: "",
      description: "",
      destination: "",
      duration: "",
      price_from: "",
      category: "international",
      images: "",
      highlights: "",
      included: "",
      excluded: "",
      rating: "",
      reviews_count: "",
      status: "active",
    });
  };

  const handleEdit = (tour: Tour) => {
    setEditMode(true);
    setSelectedTour(tour);
    setFormData({
      title: tour.title,
      slug: tour.slug,
      description: tour.description,
      destination: tour.destination,
      duration: tour.duration,
      price_from: tour.priceFrom.toString(),
      category: tour.category,
      images: Array.isArray(tour.images) ? tour.images.join(", ") : "",
      highlights: Array.isArray(tour.highlights) ? tour.highlights.join(", ") : "",
      included: Array.isArray(tour.included) ? tour.included.join(", ") : "",
      excluded: Array.isArray(tour.excluded) ? tour.excluded.join(", ") : "",
      rating: tour.rating?.toString() || "0",
      reviews_count: tour.reviewsCount?.toString() || "0",
      status: tour.status,
    });
  };

  const handleSave = async () => {
    try {
      const payload = {
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        destination: formData.destination,
        duration: formData.duration,
        price_from: parseInt(formData.price_from),
        category: formData.category,
        images: formData.images.split(",").map(i => i.trim()).filter(Boolean),
        highlights: formData.highlights.split(",").map(h => h.trim()).filter(Boolean),
        included: formData.included.split(",").map(i => i.trim()).filter(Boolean),
        excluded: formData.excluded.split(",").map(e => e.trim()).filter(Boolean),
        rating: parseFloat(formData.rating) || 0,
        reviews_count: parseInt(formData.reviews_count) || 0,
        status: formData.status,
      };

      if (selectedTour) {
        const response = await fetch(`/api/cms/tours/${selectedTour.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error("Failed to update tour");
        toast.success("Tour updated successfully");
      } else {
        const response = await fetch("/api/cms/tours", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error("Failed to create tour");
        toast.success("Tour created successfully");
      }

      setEditMode(false);
      fetchTours();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Operation failed");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this tour?")) return;

    try {
      const response = await fetch(`/api/cms/tours/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete tour");
      toast.success("Tour deleted successfully");
      fetchTours();
    } catch (error) {
      toast.error("Failed to delete tour");
    }
  };

  if (editMode) {
    return (
      <CMSLayout>
        <Toaster position="top-right" />
        <VStack align="stretch" gap={6}>
          <Flex justify="space-between" align="center">
            <Heading fontSize="xl">
              {selectedTour ? "Edit Tour" : "Create New Tour"}
            </Heading>
            <HStack gap={2}>
              <Button variant="outline" onClick={() => setEditMode(false)}>
                Cancel
              </Button>
              <Button colorPalette="blue" onClick={handleSave}>
                Save Tour
              </Button>
            </HStack>
          </Flex>

          <Card.Root>
            <Card.Body p={6}>
              <VStack align="stretch" gap={4}>
                <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                  <Box>
                    <Text fontSize="sm" fontWeight="medium" mb={2}>
                      Title *
                    </Text>
                    <Input
                      placeholder="Enter tour title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </Box>

                  <Box>
                    <Text fontSize="sm" fontWeight="medium" mb={2}>
                      Slug *
                    </Text>
                    <Input
                      placeholder="tour-slug"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    />
                  </Box>

                  <Box>
                    <Text fontSize="sm" fontWeight="medium" mb={2}>
                      Destination *
                    </Text>
                    <Input
                      placeholder="e.g., Dubai, UAE"
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    />
                  </Box>

                  <Box>
                    <Text fontSize="sm" fontWeight="medium" mb={2}>
                      Duration *
                    </Text>
                    <Input
                      placeholder="e.g., 4D/3N"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    />
                  </Box>

                  <Box>
                    <Text fontSize="sm" fontWeight="medium" mb={2}>
                      Price From (₦) *
                    </Text>
                    <Input
                      type="number"
                      placeholder="850000"
                      value={formData.price_from}
                      onChange={(e) => setFormData({ ...formData, price_from: e.target.value })}
                    />
                  </Box>

                  <Box>
                    <Text fontSize="sm" fontWeight="medium" mb={2}>
                      Category *
                    </Text>
                    <Select.Root
                      value={[formData.category]}
                      onValueChange={(e) => setFormData({ ...formData, category: e.value[0] })}
                    >
                      <Select.Trigger>
                        <Select.ValueText placeholder="Select category" />
                      </Select.Trigger>
                      <Select.Content>
                        <Select.Item value="international">International</Select.Item>
                        <Select.Item value="regional">Regional</Select.Item>
                        <Select.Item value="local">Local</Select.Item>
                      </Select.Content>
                    </Select.Root>
                  </Box>
                </Grid>

                <Box>
                  <Text fontSize="sm" fontWeight="medium" mb={2}>
                    Description *
                  </Text>
                  <Textarea
                    placeholder="Enter tour description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                  />
                </Box>

                <Box>
                  <Text fontSize="sm" fontWeight="medium" mb={2}>
                    Highlights (comma-separated)
                  </Text>
                  <Textarea
                    placeholder="City tour, Desert safari, Burj Khalifa visit"
                    value={formData.highlights}
                    onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                    rows={3}
                  />
                </Box>

                <Box>
                  <Text fontSize="sm" fontWeight="medium" mb={2}>
                    What's Included (comma-separated)
                  </Text>
                  <Textarea
                    placeholder="Hotel accommodation, Airport transfers, Breakfast"
                    value={formData.included}
                    onChange={(e) => setFormData({ ...formData, included: e.target.value })}
                    rows={3}
                  />
                </Box>

                <Box>
                  <Text fontSize="sm" fontWeight="medium" mb={2}>
                    What's Excluded (comma-separated)
                  </Text>
                  <Textarea
                    placeholder="Flight tickets, Travel insurance, Personal expenses"
                    value={formData.excluded}
                    onChange={(e) => setFormData({ ...formData, excluded: e.target.value })}
                    rows={3}
                  />
                </Box>

                <Box>
                  <Text fontSize="sm" fontWeight="medium" mb={2}>
                    Image URLs (comma-separated)
                  </Text>
                  <Textarea
                    placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                    value={formData.images}
                    onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                    rows={3}
                  />
                </Box>

                <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
                  <Box>
                    <Text fontSize="sm" fontWeight="medium" mb={2}>
                      Rating (0-5)
                    </Text>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="4.5"
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                    />
                  </Box>

                  <Box>
                    <Text fontSize="sm" fontWeight="medium" mb={2}>
                      Reviews Count
                    </Text>
                    <Input
                      type="number"
                      placeholder="24"
                      value={formData.reviews_count}
                      onChange={(e) => setFormData({ ...formData, reviews_count: e.target.value })}
                    />
                  </Box>

                  <Box>
                    <Text fontSize="sm" fontWeight="medium" mb={2}>
                      Status *
                    </Text>
                    <Select.Root
                      value={[formData.status]}
                      onValueChange={(e) => setFormData({ ...formData, status: e.value[0] })}
                    >
                      <Select.Trigger>
                        <Select.ValueText placeholder="Select status" />
                      </Select.Trigger>
                      <Select.Content>
                        <Select.Item value="active">Active</Select.Item>
                        <Select.Item value="inactive">Inactive</Select.Item>
                      </Select.Content>
                    </Select.Root>
                  </Box>
                </Grid>
              </VStack>
            </Card.Body>
          </Card.Root>
        </VStack>
      </CMSLayout>
    );
  }

  return (
    <CMSLayout>
      <Toaster position="top-right" />
      <VStack align="stretch" gap={6}>
        <Flex justify="space-between" align="center">
          <Box>
            <Heading fontSize="2xl" mb={2}>
              Tours & Packages
            </Heading>
            <Text color="gray.600">
              Manage your tour packages and experiences
            </Text>
          </Box>
          <Button
            colorPalette="blue"
            leftIcon={<Plus size={20} />}
            onClick={handleCreate}
          >
            Add Tour
          </Button>
        </Flex>

        {loading ? (
          <Card.Root>
            <Card.Body p={8}>
              <Text textAlign="center" color="gray.500">
                Loading tours...
              </Text>
            </Card.Body>
          </Card.Root>
        ) : tours.length === 0 ? (
          <Card.Root>
            <Card.Body p={8}>
              <Flex direction="column" align="center" gap={4}>
                <Icon as={MapPin} boxSize={12} color="gray.400" />
                <Text textAlign="center" color="gray.500">
                  No tours found. Add your first tour package to get started.
                </Text>
              </Flex>
            </Card.Body>
          </Card.Root>
        ) : (
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={4}>
            {tours.map((tour) => (
              <Card.Root key={tour.id}>
                <Card.Body p={5}>
                  <VStack align="stretch" gap={3}>
                    <Flex justify="space-between" align="start">
                      <Box flex={1}>
                        <Heading fontSize="md" mb={1}>
                          {tour.title}
                        </Heading>
                        <Text fontSize="sm" color="gray.600">
                          {tour.destination}
                        </Text>
                      </Box>
                      <Badge
                        colorPalette={
                          tour.status === "active" ? "green" : "gray"
                        }
                      >
                        {tour.status}
                      </Badge>
                    </Flex>

                    <HStack gap={2}>
                      <Badge colorPalette="blue" variant="subtle">
                        {tour.category}
                      </Badge>
                      <Text fontSize="sm" color="gray.600">
                        {tour.duration}
                      </Text>
                    </HStack>

                    <Text fontSize="lg" fontWeight="bold" color="blue.600">
                      From ₦{tour.priceFrom.toLocaleString()}
                    </Text>

                    <Flex gap={2}>
                      <Button
                        size="sm"
                        variant="outline"
                        flex={1}
                        onClick={() => handleEdit(tour)}
                      >
                        <Icon as={Edit} boxSize={4} mr={1} />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        colorScheme="red"
                        onClick={() => handleDelete(tour.id)}
                      >
                        <Icon as={Trash} boxSize={4} />
                      </Button>
                    </Flex>
                  </VStack>
                </Card.Body>
              </Card.Root>
            ))}
          </Grid>
        )}
      </VStack>
    </CMSLayout>
  );
}
