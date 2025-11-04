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
  Textarea,
  Select,
  VStack,
  HStack,
  Grid,
  Icon,
} from "@chakra-ui/react";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function NewTourPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "local",
    tags: [] as string[],
    duration_days: 3,
    duration_nights: 2,
    price_from_ngn: 0,
    price_from_usd: 0,
    short_description: "",
    description: "",
    highlights: [""] as string[],
    inclusions: [""] as string[],
    exclusions: [""] as string[],
    itinerary: [{ day: 1, title: "", description: "" }] as any[],
    accommodation_examples: [""] as string[],
    seasonality: "",
    visa_notes: "",
    add_ons: [""] as string[],
    cancellation_terms: "",
    gallery: [""] as string[],
    whatsapp_prefill: "",
    status: "draft",
  });

  useEffect(() => {
    const token = Cookies.get("admin_token");
    if (!token) {
      router.push("/admin");
    }
  }, [router]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
  };

  const handleArrayFieldChange = (
    field: string,
    index: number,
    value: string
  ) => {
    const array = [...(formData as any)[field]];
    array[index] = value;
    setFormData({ ...formData, [field]: array });
  };

  const addArrayField = (field: string) => {
    const array = [...(formData as any)[field], ""];
    setFormData({ ...formData, [field]: array });
  };

  const removeArrayField = (field: string, index: number) => {
    const array = (formData as any)[field].filter(
      (_: any, i: number) => i !== index
    );
    setFormData({ ...formData, [field]: array });
  };

  const addItineraryDay = () => {
    const newDay = {
      day: formData.itinerary.length + 1,
      title: "",
      description: "",
    };
    setFormData({
      ...formData,
      itinerary: [...formData.itinerary, newDay],
    });
  };

  const handleItineraryChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const itinerary = [...formData.itinerary];
    itinerary[index] = { ...itinerary[index], [field]: value };
    setFormData({ ...formData, itinerary });
  };

  const removeItineraryDay = (index: number) => {
    const itinerary = formData.itinerary.filter((_, i) => i !== index);
    // Reorder day numbers
    const reordered = itinerary.map((item, i) => ({ ...item, day: i + 1 }));
    setFormData({ ...formData, itinerary: reordered });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch("/api/admin/tours", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("admin_token")}`,
        },
        body: JSON.stringify({
          ...formData,
          // Filter out empty strings from arrays
          highlights: formData.highlights.filter((h) => h.trim()),
          inclusions: formData.inclusions.filter((i) => i.trim()),
          exclusions: formData.exclusions.filter((e) => e.trim()),
          accommodation_examples: formData.accommodation_examples.filter((a) =>
            a.trim()
          ),
          add_ons: formData.add_ons.filter((a) => a.trim()),
          gallery: formData.gallery.filter((g) => g.trim()),
        }),
      });

      if (response.ok) {
        router.push("/admin/tours");
      } else {
        const data = await response.json();
        alert(data.error || "Failed to create tour");
      }
    } catch (error) {
      console.error("Error creating tour:", error);
      alert("An error occurred");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box minH="100vh" bg="gray.50" pb={20}>
      <Container maxW="5xl" py={8}>
        {/* Header */}
        <Flex justify="space-between" align="center" mb={8}>
          <HStack gap={4}>
            <Button
              as="a"
              href="/admin/tours"
              variant="outline"
              leftIcon={<ArrowLeft />}
            >
              Back
            </Button>
            <Heading as="h1" fontSize="3xl">
              Create New Tour
            </Heading>
          </HStack>
          <HStack gap={3}>
            <Button
              onClick={handleSubmit}
              colorPalette="blue"
              leftIcon={<Save />}
              loading={saving}
            >
              Save Tour
            </Button>
          </HStack>
        </Flex>

        <form onSubmit={handleSubmit}>
          <VStack gap={6} align="stretch">
            {/* Basic Information */}
            <Card.Root>
              <Card.Body p={6}>
                <Heading as="h2" fontSize="xl" mb={6}>
                  Basic Information
                </Heading>
                <VStack gap={4} align="stretch">
                  <Box>
                    <Text fontWeight="medium" mb={2}>
                      Tour Title *
                    </Text>
                    <Input
                      placeholder="e.g., Weekend in Dubai"
                      size="lg"
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      required
                    />
                  </Box>

                  <Box>
                    <Text fontWeight="medium" mb={2}>
                      URL Slug *
                    </Text>
                    <Input
                      placeholder="weekend-in-dubai"
                      size="lg"
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData({ ...formData, slug: e.target.value })
                      }
                      required
                    />
                    <Text fontSize="xs" color="gray.500" mt={1}>
                      Auto-generated from title, can be customized
                    </Text>
                  </Box>

                  <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <Box>
                      <Text fontWeight="medium" mb={2}>
                        Category *
                      </Text>
                      <Select.Root
                        value={[formData.category]}
                        onValueChange={(e) =>
                          setFormData({ ...formData, category: e.value[0] })
                        }
                        size="lg"
                      >
                        <Select.Trigger>
                          <Select.ValueText />
                        </Select.Trigger>
                        <Select.Content>
                          <Select.Item value="local">Local (Nigeria)</Select.Item>
                          <Select.Item value="regional">Regional (Africa)</Select.Item>
                          <Select.Item value="international">
                            International
                          </Select.Item>
                        </Select.Content>
                      </Select.Root>
                    </Box>

                    <Box>
                      <Text fontWeight="medium" mb={2}>
                        Status
                      </Text>
                      <Select.Root
                        value={[formData.status]}
                        onValueChange={(e) =>
                          setFormData({ ...formData, status: e.value[0] })
                        }
                        size="lg"
                      >
                        <Select.Trigger>
                          <Select.ValueText />
                        </Select.Trigger>
                        <Select.Content>
                          <Select.Item value="draft">Draft</Select.Item>
                          <Select.Item value="published">Published</Select.Item>
                        </Select.Content>
                      </Select.Root>
                    </Box>
                  </Grid>

                  <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <Box>
                      <Text fontWeight="medium" mb={2}>
                        Duration (Days) *
                      </Text>
                      <Input
                        type="number"
                        min="1"
                        size="lg"
                        value={formData.duration_days}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            duration_days: parseInt(e.target.value),
                          })
                        }
                        required
                      />
                    </Box>

                    <Box>
                      <Text fontWeight="medium" mb={2}>
                        Duration (Nights) *
                      </Text>
                      <Input
                        type="number"
                        min="0"
                        size="lg"
                        value={formData.duration_nights}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            duration_nights: parseInt(e.target.value),
                          })
                        }
                        required
                      />
                    </Box>
                  </Grid>

                  <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <Box>
                      <Text fontWeight="medium" mb={2}>
                        Price From (NGN) *
                      </Text>
                      <Input
                        type="number"
                        min="0"
                        size="lg"
                        placeholder="850000"
                        value={formData.price_from_ngn || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            price_from_ngn: parseInt(e.target.value),
                          })
                        }
                        required
                      />
                    </Box>

                    <Box>
                      <Text fontWeight="medium" mb={2}>
                        Price From (USD)
                      </Text>
                      <Input
                        type="number"
                        min="0"
                        size="lg"
                        placeholder="950"
                        value={formData.price_from_usd || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            price_from_usd: parseInt(e.target.value),
                          })
                        }
                      />
                    </Box>
                  </Grid>

                  <Box>
                    <Text fontWeight="medium" mb={2}>
                      Short Description *
                    </Text>
                    <Textarea
                      placeholder="Brief description for card preview (1-2 sentences)"
                      rows={2}
                      value={formData.short_description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          short_description: e.target.value,
                        })
                      }
                      required
                    />
                  </Box>

                  <Box>
                    <Text fontWeight="medium" mb={2}>
                      Full Description
                    </Text>
                    <Box border="1px" borderColor="gray.200" borderRadius="md">
                      <ReactQuill
                        theme="snow"
                        value={formData.description}
                        onChange={(value) =>
                          setFormData({ ...formData, description: value })
                        }
                        style={{ minHeight: "200px" }}
                      />
                    </Box>
                  </Box>

                  <Box>
                    <Text fontWeight="medium" mb={2}>
                      Seasonality
                    </Text>
                    <Input
                      placeholder="e.g., Best: Oct–Mar"
                      size="lg"
                      value={formData.seasonality}
                      onChange={(e) =>
                        setFormData({ ...formData, seasonality: e.target.value })
                      }
                    />
                  </Box>
                </VStack>
              </Card.Body>
            </Card.Root>

            {/* Highlights */}
            <Card.Root>
              <Card.Body p={6}>
                <Flex justify="space-between" align="center" mb={4}>
                  <Heading as="h2" fontSize="xl">
                    Highlights
                  </Heading>
                  <Button
                    size="sm"
                    onClick={() => addArrayField("highlights")}
                    leftIcon={<Plus />}
                  >
                    Add Highlight
                  </Button>
                </Flex>
                <VStack gap={3} align="stretch">
                  {formData.highlights.map((highlight, index) => (
                    <Flex key={index} gap={2}>
                      <Input
                        placeholder="e.g., Burj Khalifa tour"
                        value={highlight}
                        onChange={(e) =>
                          handleArrayFieldChange("highlights", index, e.target.value)
                        }
                      />
                      {formData.highlights.length > 1 && (
                        <Button
                          onClick={() => removeArrayField("highlights", index)}
                          colorPalette="red"
                          variant="outline"
                        >
                          <Icon as={Trash2} />
                        </Button>
                      )}
                    </Flex>
                  ))}
                </VStack>
              </Card.Body>
            </Card.Root>

            {/* Itinerary */}
            <Card.Root>
              <Card.Body p={6}>
                <Flex justify="space-between" align="center" mb={4}>
                  <Heading as="h2" fontSize="xl">
                    Itinerary
                  </Heading>
                  <Button
                    size="sm"
                    onClick={addItineraryDay}
                    leftIcon={<Plus />}
                  >
                    Add Day
                  </Button>
                </Flex>
                <VStack gap={4} align="stretch">
                  {formData.itinerary.map((day, index) => (
                    <Card.Root key={index} variant="outline">
                      <Card.Body p={4}>
                        <Flex justify="space-between" align="center" mb={3}>
                          <Text fontWeight="bold">Day {day.day}</Text>
                          {formData.itinerary.length > 1 && (
                            <Button
                              size="sm"
                              onClick={() => removeItineraryDay(index)}
                              colorPalette="red"
                              variant="ghost"
                            >
                              <Icon as={Trash2} />
                            </Button>
                          )}
                        </Flex>
                        <VStack gap={3} align="stretch">
                          <Input
                            placeholder="Day title"
                            value={day.title}
                            onChange={(e) =>
                              handleItineraryChange(index, "title", e.target.value)
                            }
                          />
                          <Textarea
                            placeholder="Day description"
                            rows={3}
                            value={day.description}
                            onChange={(e) =>
                              handleItineraryChange(
                                index,
                                "description",
                                e.target.value
                              )
                            }
                          />
                        </VStack>
                      </Card.Body>
                    </Card.Root>
                  ))}
                </VStack>
              </Card.Body>
            </Card.Root>

            {/* Inclusions & Exclusions */}
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <Card.Root>
                <Card.Body p={6}>
                  <Flex justify="space-between" align="center" mb={4}>
                    <Heading as="h3" fontSize="lg">
                      Inclusions
                    </Heading>
                    <Button
                      size="sm"
                      onClick={() => addArrayField("inclusions")}
                      leftIcon={<Plus />}
                    >
                      Add
                    </Button>
                  </Flex>
                  <VStack gap={2} align="stretch">
                    {formData.inclusions.map((item, index) => (
                      <Flex key={index} gap={2}>
                        <Input
                          placeholder="Included item"
                          size="sm"
                          value={item}
                          onChange={(e) =>
                            handleArrayFieldChange(
                              "inclusions",
                              index,
                              e.target.value
                            )
                          }
                        />
                        {formData.inclusions.length > 1 && (
                          <Button
                            size="sm"
                            onClick={() => removeArrayField("inclusions", index)}
                            colorPalette="red"
                            variant="ghost"
                          >
                            <Icon as={Trash2} boxSize={4} />
                          </Button>
                        )}
                      </Flex>
                    ))}
                  </VStack>
                </Card.Body>
              </Card.Root>

              <Card.Root>
                <Card.Body p={6}>
                  <Flex justify="space-between" align="center" mb={4}>
                    <Heading as="h3" fontSize="lg">
                      Exclusions
                    </Heading>
                    <Button
                      size="sm"
                      onClick={() => addArrayField("exclusions")}
                      leftIcon={<Plus />}
                    >
                      Add
                    </Button>
                  </Flex>
                  <VStack gap={2} align="stretch">
                    {formData.exclusions.map((item, index) => (
                      <Flex key={index} gap={2}>
                        <Input
                          placeholder="Excluded item"
                          size="sm"
                          value={item}
                          onChange={(e) =>
                            handleArrayFieldChange(
                              "exclusions",
                              index,
                              e.target.value
                            )
                          }
                        />
                        {formData.exclusions.length > 1 && (
                          <Button
                            size="sm"
                            onClick={() => removeArrayField("exclusions", index)}
                            colorPalette="red"
                            variant="ghost"
                          >
                            <Icon as={Trash2} boxSize={4} />
                          </Button>
                        )}
                      </Flex>
                    ))}
                  </VStack>
                </Card.Body>
              </Card.Root>
            </Grid>

            {/* Gallery URLs */}
            <Card.Root>
              <Card.Body p={6}>
                <Flex justify="space-between" align="center" mb={4}>
                  <Heading as="h2" fontSize="xl">
                    Gallery Images
                  </Heading>
                  <Button
                    size="sm"
                    onClick={() => addArrayField("gallery")}
                    leftIcon={<Plus />}
                  >
                    Add Image
                  </Button>
                </Flex>
                <VStack gap={3} align="stretch">
                  {formData.gallery.map((url, index) => (
                    <Flex key={index} gap={2}>
                      <Input
                        placeholder="Image URL"
                        value={url}
                        onChange={(e) =>
                          handleArrayFieldChange("gallery", index, e.target.value)
                        }
                      />
                      {formData.gallery.length > 1 && (
                        <Button
                          onClick={() => removeArrayField("gallery", index)}
                          colorPalette="red"
                          variant="outline"
                        >
                          <Icon as={Trash2} />
                        </Button>
                      )}
                    </Flex>
                  ))}
                </VStack>
              </Card.Body>
            </Card.Root>

            {/* Additional Info */}
            <Card.Root>
              <Card.Body p={6}>
                <Heading as="h2" fontSize="xl" mb={6}>
                  Additional Information
                </Heading>
                <VStack gap={4} align="stretch">
                  <Box>
                    <Text fontWeight="medium" mb={2}>
                      Visa Notes
                    </Text>
                    <Textarea
                      placeholder="Visa requirements and support details"
                      rows={3}
                      value={formData.visa_notes}
                      onChange={(e) =>
                        setFormData({ ...formData, visa_notes: e.target.value })
                      }
                    />
                  </Box>

                  <Box>
                    <Text fontWeight="medium" mb={2}>
                      Cancellation Terms
                    </Text>
                    <Textarea
                      placeholder="Cancellation policy and refund terms"
                      rows={3}
                      value={formData.cancellation_terms}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          cancellation_terms: e.target.value,
                        })
                      }
                    />
                  </Box>

                  <Box>
                    <Text fontWeight="medium" mb={2}>
                      WhatsApp Prefill Message
                    </Text>
                    <Textarea
                      placeholder="Message template for WhatsApp enquiries"
                      rows={2}
                      value={formData.whatsapp_prefill}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          whatsapp_prefill: e.target.value,
                        })
                      }
                    />
                  </Box>
                </VStack>
              </Card.Body>
            </Card.Root>

            {/* Submit */}
            <Flex justify="end" gap={3}>
              <Button as="a" href="/admin/tours" variant="outline">
                Cancel
              </Button>
              <Button
                type="submit"
                colorPalette="blue"
                leftIcon={<Save />}
                loading={saving}
              >
                Create Tour
              </Button>
            </Flex>
          </VStack>
        </form>
      </Container>
    </Box>
  );
}
