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
  Badge,
  Grid,
  Textarea,
  Select,
} from "@chakra-ui/react";
import { Plus, Edit, Trash, Eye, EyeOff, FileText } from "lucide-react";
import CMSLayout from "@/components/cms/CMSLayout";
import RichTextEditor from "@/components/cms/RichTextEditor";
import { toast, Toaster } from "sonner";

interface Page {
  id: number;
  slug: string;
  title: string;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function CMSPages() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    content: "",
    metaTitle: "",
    metaDescription: "",
    status: "draft",
  });

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await fetch("/api/cms/pages");
      const data = await response.json();
      setPages(data);
    } catch (error) {
      toast.error("Failed to load pages");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditMode(true);
    setSelectedPage(null);
    setFormData({
      slug: "",
      title: "",
      content: "",
      metaTitle: "",
      metaDescription: "",
      status: "draft",
    });
  };

  const handleEdit = (page: Page) => {
    setEditMode(true);
    setSelectedPage(page);
    setFormData({
      slug: page.slug,
      title: page.title,
      content: page.content,
      metaTitle: page.metaTitle || "",
      metaDescription: page.metaDescription || "",
      status: page.status,
    });
  };

  const handleSave = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("cms_user") || "{}");
      
      if (selectedPage) {
        // Update existing page
        const response = await fetch(`/api/cms/pages/${selectedPage.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            updatedBy: user.id,
          }),
        });

        if (!response.ok) throw new Error("Failed to update page");
        toast.success("Page updated successfully");
      } else {
        // Create new page
        const response = await fetch("/api/cms/pages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            createdBy: user.id,
          }),
        });

        if (!response.ok) throw new Error("Failed to create page");
        toast.success("Page created successfully");
      }

      setEditMode(false);
      fetchPages();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Operation failed");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this page?")) return;

    try {
      const response = await fetch(`/api/cms/pages/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete page");
      toast.success("Page deleted successfully");
      fetchPages();
    } catch (error) {
      toast.error("Failed to delete page");
    }
  };

  if (editMode) {
    return (
      <CMSLayout>
        <Toaster position="top-right" />
        <VStack align="stretch" gap={6}>
          <Flex justify="space-between" align="center">
            <Heading fontSize="xl">
              {selectedPage ? "Edit Page" : "Create New Page"}
            </Heading>
            <HStack gap={2}>
              <Button
                variant="outline"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </Button>
              <Button colorPalette="blue" onClick={handleSave}>
                Save Page
              </Button>
            </HStack>
          </Flex>

          <Card.Root>
            <Card.Body p={6}>
              <VStack align="stretch" gap={4}>
                <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                  <Box>
                    <Text fontSize="sm" fontWeight="medium" mb={2}>
                      Page Title *
                    </Text>
                    <Input
                      placeholder="Enter page title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                    />
                  </Box>

                  <Box>
                    <Text fontSize="sm" fontWeight="medium" mb={2}>
                      Slug *
                    </Text>
                    <Input
                      placeholder="page-slug"
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData({ ...formData, slug: e.target.value })
                      }
                    />
                  </Box>
                </Grid>

                <Box>
                  <Text fontSize="sm" fontWeight="medium" mb={2}>
                    Content *
                  </Text>
                  <RichTextEditor
                    value={formData.content}
                    onChange={(value) =>
                      setFormData({ ...formData, content: value })
                    }
                  />
                </Box>

                <Box>
                  <Text fontSize="sm" fontWeight="medium" mb={2}>
                    Meta Title
                  </Text>
                  <Input
                    placeholder="SEO meta title"
                    value={formData.metaTitle}
                    onChange={(e) =>
                      setFormData({ ...formData, metaTitle: e.target.value })
                    }
                  />
                </Box>

                <Box>
                  <Text fontSize="sm" fontWeight="medium" mb={2}>
                    Meta Description
                  </Text>
                  <Textarea
                    placeholder="SEO meta description"
                    value={formData.metaDescription}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        metaDescription: e.target.value,
                      })
                    }
                    rows={3}
                  />
                </Box>

                <Box>
                  <Text fontSize="sm" fontWeight="medium" mb={2}>
                    Status *
                  </Text>
                  <Select.Root
                    value={[formData.status]}
                    onValueChange={(e) =>
                      setFormData({ ...formData, status: e.value[0] })
                    }
                  >
                    <Select.Trigger>
                      <Select.ValueText placeholder="Select status" />
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Item item="draft" value="draft">Draft</Select.Item>
                      <Select.Item item="published" value="published">Published</Select.Item>
                      <Select.Item item="archived" value="archived">Archived</Select.Item>
                    </Select.Content>
                  </Select.Root>
                </Box>
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
              Pages
            </Heading>
            <Text color="gray.600">
              Manage your website pages and content
            </Text>
          </Box>
          <Button
            colorPalette="blue"
            onClick={handleCreate}
          >
            <Plus size={20} style={{ marginRight: '8px' }} />
            Create Page
          </Button>
        </Flex>

        {loading ? (
          <Card.Root>
            <Card.Body p={8}>
              <Text textAlign="center" color="gray.500">
                Loading pages...
              </Text>
            </Card.Body>
          </Card.Root>
        ) : pages.length === 0 ? (
          <Card.Root>
            <Card.Body p={8}>
              <Flex direction="column" align="center" gap={4}>
                <FileText size={48} color="gray" />
                <Text textAlign="center" color="gray.500">
                  No pages found. Create your first page to get started.
                </Text>
              </Flex>
            </Card.Body>
          </Card.Root>
        ) : (
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={4}>
            {pages.map((page) => (
              <Card.Root key={page.id}>
                <Card.Body p={5}>
                  <VStack align="stretch" gap={3}>
                    <Flex justify="space-between" align="start">
                      <Box flex={1}>
                        <Heading fontSize="md" mb={1}>
                          {page.title}
                        </Heading>
                        <Text fontSize="sm" color="gray.600">
                          /{page.slug}
                        </Text>
                      </Box>
                      <Badge
                        colorPalette={
                          page.status === "published"
                            ? "green"
                            : page.status === "draft"
                            ? "yellow"
                            : "gray"
                        }
                      >
                        {page.status}
                      </Badge>
                    </Flex>

                    <Text fontSize="sm" color="gray.600" noOfLines={2}>
                      {page.metaDescription || "No description"}
                    </Text>

                    <Flex gap={2}>
                      <Button
                        size="sm"
                        variant="outline"
                        flex={1}
                        onClick={() => handleEdit(page)}
                      >
                        <Edit size={16} style={{ marginRight: '4px' }} />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        colorScheme="red"
                        onClick={() => handleDelete(page.id)}
                      >
                        <Trash size={16} />
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