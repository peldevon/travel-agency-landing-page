"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Button,
  HStack,
  VStack,
  Icon,
  Link,
} from "@chakra-ui/react";
import {
  Plane,
  FileText,
  Home,
  Building,
  Map,
  LogOut,
  Menu,
  X,
} from "lucide-react";

interface CMSLayoutProps {
  children: React.ReactNode;
}

export default function CMSLayout({ children }: CMSLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const cmsUser = localStorage.getItem("cms_user");
    const cmsToken = localStorage.getItem("cms_token");

    if (!cmsUser || !cmsToken) {
      router.push("/cms/login");
      return;
    }

    setUser(JSON.parse(cmsUser));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("cms_user");
    localStorage.removeItem("cms_token");
    router.push("/cms/login");
  };

  const menuItems = [
    { label: "Dashboard", icon: Home, href: "/cms/dashboard" },
    { label: "Pages", icon: FileText, href: "/cms/pages" },
    { label: "Shortlets", icon: Building, href: "/cms/shortlets" },
    { label: "Tours", icon: Map, href: "/cms/tours" },
  ];

  if (!user) {
    return null;
  }

  return (
    <Box minH="100vh" bg="gray.50">
      {/* Sidebar */}
      <Box
        position="fixed"
        left={0}
        top={0}
        bottom={0}
        w={sidebarOpen ? "260px" : "80px"}
        bg="gray.900"
        color="white"
        transition="width 0.3s"
        zIndex={40}
        overflowY="auto"
      >
        <Box p={4}>
          <Flex justify="space-between" align="center" mb={8}>
            {sidebarOpen ? (
              <HStack gap={2}>
                <Icon as={Plane} boxSize={6} color="blue.400" />
                <Text fontSize="lg" fontWeight="bold">
                  OnTour CMS
                </Text>
              </HStack>
            ) : (
              <Icon as={Plane} boxSize={6} color="blue.400" mx="auto" />
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              display={{ base: "none", md: "flex" }}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </Flex>

          <VStack align="stretch" gap={2}>
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  _hover={{ textDecoration: "none" }}
                >
                  <Flex
                    align="center"
                    gap={3}
                    px={4}
                    py={3}
                    borderRadius="md"
                    bg={isActive ? "blue.600" : "transparent"}
                    _hover={{ bg: isActive ? "blue.700" : "gray.800" }}
                    cursor="pointer"
                    transition="all 0.2s"
                  >
                    <Icon as={item.icon} boxSize={5} />
                    {sidebarOpen && (
                      <Text fontSize="sm" fontWeight="medium">
                        {item.label}
                      </Text>
                    )}
                  </Flex>
                </Link>
              );
            })}
          </VStack>
        </Box>

        {/* User info at bottom */}
        <Box position="absolute" bottom={0} left={0} right={0} p={4} borderTop="1px" borderColor="gray.800">
          {sidebarOpen ? (
            <VStack align="stretch" gap={2}>
              <Text fontSize="sm" fontWeight="medium">
                {user.fullName}
              </Text>
              <Text fontSize="xs" color="gray.400">
                {user.email}
              </Text>
              <Button
                size="sm"
                variant="ghost"
                colorScheme="red"
                onClick={handleLogout}
                justifyContent="flex-start"
              >
                <Icon as={LogOut} boxSize={4} mr={2} />
                Logout
              </Button>
            </VStack>
          ) : (
            <Button
              size="sm"
              variant="ghost"
              colorScheme="red"
              onClick={handleLogout}
              w="full"
            >
              <Icon as={LogOut} boxSize={5} />
            </Button>
          )}
        </Box>
      </Box>

      {/* Main Content */}
      <Box ml={sidebarOpen ? "260px" : "80px"} transition="margin 0.3s">
        <Box bg="white" borderBottom="1px" borderColor="gray.200" px={6} py={4}>
          <Flex justify="space-between" align="center">
            <Heading fontSize="xl" fontWeight="bold" color="gray.900">
              {menuItems.find((item) => item.href === pathname)?.label || "Dashboard"}
            </Heading>
            <Link href="/" target="_blank">
              <Button size="sm" variant="outline">
                View Website
              </Button>
            </Link>
          </Flex>
        </Box>

        <Box p={6}>{children}</Box>
      </Box>
    </Box>
  );
}
