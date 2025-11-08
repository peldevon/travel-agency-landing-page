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
import { Plus, Edit, Trash, Building } from "lucide-react";
import CMSLayout from "@/components/cms/CMSLayout";
import { toast, Toaster } from "sonner";

interface Shortlet {
  id: number;
  title: string;
  slug: string;
  description: string;
  location: string;
  pricePerNight: number;
  bedrooms: number;
  amenities: string[];
  images: string[];
  rating: number;
  reviewsCount: number;
  status: string;
}

export default function CMSShortlets() {
  const [shortlets, setShortlets] = useState<Shortlet[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [selectedShortlet, setSelectedShortlet] = useState<Shortlet | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    location: "",
    price_per_night: "",
    bedrooms: "",
    amenities: "",
    images: "",
    rating: "",
    reviews_count: "",
    status: "active",
  });

  useEffect(() => {
    fetchShortlets();
  }, []);

  const fetchShortlets = async () => {
    try {
      const response = await fetch("/api/cms/shortlets");
      const data = await response.json();
      setShortlets(data);
    } catch (error) {
      toast.error("Failed to load shortlets");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditMode(true);
    setSelectedShortlet(null);
    setFormData({
      title: "",
      slug: "",
      description: "",
      location: "",
      price_per_night: "",
      bedrooms: "",
      amenities: "",
      images: "",
      rating: "",
      reviews_count: "",
      status: "active",
    });
  };

  const handleEdit = (shortlet: Shortlet) => {
    setEditMode(true);
    setSelectedShortlet(shortlet);
    setFormData({
      title: shortlet.title,
      slug: shortlet.slug,
      description: shortlet.description,
      location: shortlet.location,
      price_per_night: shortlet.pricePerNight.toString(),
      bedrooms: shortlet.bedrooms.toString(),
      amenities: Array.isArray(shortlet.amenities) ? shortlet.amenities.join(", ") : "",
      images: Array.isArray(shortlet.images) ? shortlet.images.join(", ") : "",
      rating: shortlet.rating?.toString() || "0",
      reviews_count: shortlet.reviewsCount?.toString() || "0",
      status: shortlet.status,
    });
  };

  const handleSave = async () => {
    try {
      const payload = {
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        location: formData.location,
        price_per_night: parseInt(formData.price_per_night),
        bedrooms: parseInt(formData.bedrooms),
        amenities: formData.amenities.split(",").map(a => a.trim()).filter(Boolean),
        images: formData.images.split(",").map(i => i.trim()).filter(Boolean),
        rating: parseFloat(formData.rating) || 0,
        reviews_count: parseInt(formData.reviews_count) || 0,
        status: formData.status,
      };

      if (selectedShortlet) {
        const response = await fetch(`/api/cms/shortlets/${selectedShortlet.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error("Failed to update shortlet");
        toast.success("Shortlet updated successfully");
      } else {
        const response = await fetch("/api/cms/shortlets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error("Failed to create shortlet");
        toast.success("Shortlet created successfully");
      }

      setEditMode(false);
      fetchShortlets();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Operation failed");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this shortlet?")) return;

    try {
      const response = await fetch(`/api/cms/shortlets/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete shortlet");
      toast.success("Shortlet deleted successfully");
      fetchShortlets();
    } catch (error) {
      toast.error("Failed to delete shortlet");
    }
  };

  if (editMode) {
    return (
      <CMSLayout>
        <Toaster position="top-right" />
        <VStack align="stretch" gap={6}>
          <Flex justify="space-between" align="center">
            <Heading fontSize="xl">
              {selectedShortlet ? "Edit Shortlet" : "Create New Shortlet"}
            </Heading>
            <HStack gap={2}>
              <Button variant="outline" onClick={() => setEditMode(false)}>
                Cancel
              </Button>
              <Button colorPalette="blue" onClick={handleSave}>
                Save Shortlet
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
                      placeholder="Enter title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </Box>

                  <Box>
                    <Text fontSize="sm" fontWeight="medium" mb={2}>
                      Slug *
                    </Text>
                    <Input
                      placeholder="shortlet-slug"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    />
                  </Box>

                  <Box>
                    <Text fontSize="sm" fontWeight="medium" mb={2}>
                      Location *
                    </Text>
                    <Input
                      placeholder="e.g., Lekki, Lagos"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </Box>

                  <Box>
                    <Text fontSize="sm" fontWeight="medium" mb={2}>
                      Price Per Night (₦) *
                    </Text>
                    <Input
                      type="number"
                      placeholder="45000"
                      value={formData.price_per_night}
                      onChange={(e) => setFormData({ ...formData, price_per_night: e.target.value })}
                    />
                  </Box>

                  <Box>
                    <Text fontSize="sm" fontWeight="medium" mb={2}>
                      Bedrooms *
                    </Text>
                    <Input
                      type="number"
                      placeholder="2"
                      value={formData.bedrooms}
                      onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
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

                <Box>
                  <Text fontSize="sm" fontWeight="medium" mb={2}>
                    Description *
                  </Text>
                  <Textarea
                    placeholder="Enter description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                  />
                </Box>

                <Box>
                  <Text fontSize="sm" fontWeight="medium" mb={2}>
                    Amenities (comma-separated)
                  </Text>
                  <Input
                    placeholder="WiFi, AC, Pool, Parking"
                    value={formData.amenities}
                    onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
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

                <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
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
              Shortlets
            </Heading>
            <Text color="gray.600">
              Manage your shortlet properties
            </Text>
          </Box>
          <Button
            colorPalette="blue"
            leftIcon={<Plus size={20} />}
            onClick={handleCreate}
          >
            Add Shortlet
          </Button>
        </Flex>

        {loading ? (
          <Card.Root>
            <Card.Body p={8}>
              <Text textAlign="center" color="gray.500">
                Loading shortlets...
              </Text>
            </Card.Body>
          </Card.Root>
        ) : shortlets.length === 0 ? (
          <Card.Root>
            <Card.Body p={8}>
              <Flex direction="column" align="center" gap={4}>
                <Icon as={Building} boxSize={12} color="gray.400" />
                <Text textAlign="center" color="gray.500">
                  No shortlets found. Add your first property to get started.
                </Text>
              </Flex>
            </Card.Body>
          </Card.Root>
        ) : (
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={4}>
            {shortlets.map((shortlet) => (
              <Card.Root key={shortlet.id}>
                <Card.Body p={5}>
                  <VStack align="stretch" gap={3}>
                    <Flex justify="space-between" align="start">
                      <Box flex={1}>
                        <Heading fontSize="md" mb={1}>
                          {shortlet.title}
                        </Heading>
                        <Text fontSize="sm" color="gray.600">
                          {shortlet.location}
                        </Text>
                      </Box>
                      <Badge
                        colorPalette={
                          shortlet.status === "active" ? "green" : "gray"
                        }
                      >
                        {shortlet.status}
                      </Badge>
                    </Flex>

                    <Text fontSize="lg" fontWeight="bold" color="blue.600">
                      ₦{shortlet.pricePerNight.toLocaleString()}/night
                    </Text>

                    <Text fontSize="sm" color="gray.600">
                      {shortlet.bedrooms} Bedroom{shortlet.bedrooms > 1 ? "s" : ""}
                    </Text>

                    <Flex gap={2}>
                      <Button
                        size="sm"
                        variant="outline"
                        flex={1}
                        onClick={() => handleEdit(shortlet)}
                      >
                        <Icon as={Edit} boxSize={4} mr={1} />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        colorScheme="red"
                        onClick={() => handleDelete(shortlet.id)}
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
