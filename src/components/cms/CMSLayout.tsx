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
  Image,
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
    { label: "Shortlets", icon: Building, href: "/cms/shortlets" },
    { label: "Tours", icon: Map, href: "/cms/tours" },
  ];

  if (!user) {
    return null;
  }

  return (
    <Box minH="100vh" bg="#FAFAFA">
      {/* Sidebar */}
      <Box
        position="fixed"
        left={0}
        top={0}
        bottom={0}
        w={sidebarOpen ? "260px" : "80px"}
        bg="#152852"
        color="white"
        transition="width 0.3s"
        zIndex={40}
        overflowY="auto"
      >
        <Box p={4}>
          <Flex justify="space-between" align="center" mb={8}>
            {sidebarOpen ? (
              <HStack gap={2}>
                <Image 
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/ontour_logo-removebg-preview-1762616230494.png?width=8000&height=8000&resize=contain"
                  alt="Ontour Travels Logo"
                  h="40px"
                  w="auto"
                  objectFit="contain"
                />
              </HStack>
            ) : (
              <Image 
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/ontour_logo-removebg-preview-1762616230494.png?width=8000&height=8000&resize=contain"
                alt="Ontour Travels Logo"
                h="30px"
                w="auto"
                objectFit="contain"
                mx="auto"
              />
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              display={{ base: "none", md: "flex" }}
              color="white"
              _hover={{ bg: "#0d1a35" }}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </Flex>

          <VStack align="stretch" gap={2}>
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              const IconComponent = item.icon;
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
                    bg={isActive ? "#C9A449" : "transparent"}
                    color={isActive ? "#2C2C2C" : "white"}
                    _hover={{ bg: isActive ? "#C9A449" : "#0d1a35" }}
                    cursor="pointer"
                    transition="all 0.2s"
                  >
                    <IconComponent size={20} />
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
        <Box position="absolute" bottom={0} left={0} right={0} p={4} borderTop="1px" borderColor="rgba(255,255,255,0.1)">
          {sidebarOpen ? (
            <VStack align="stretch" gap={2}>
              <Text fontSize="sm" fontWeight="medium" color="white">
                {user.fullName}
              </Text>
              <Text fontSize="xs" color="#E5E5E5">
                {user.email}
              </Text>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleLogout}
                justifyContent="flex-start"
                color="white"
                _hover={{ bg: "#0d1a35", color: "#C9A449" }}
              >
                <LogOut size={16} style={{ marginRight: '8px' }} />
                Logout
              </Button>
            </VStack>
          ) : (
            <Button
              size="sm"
              variant="ghost"
              onClick={handleLogout}
              w="full"
              color="white"
              _hover={{ bg: "#0d1a35", color: "#C9A449" }}
            >
              <LogOut size={20} />
            </Button>
          )}
        </Box>
      </Box>

      {/* Main Content */}
      <Box ml={sidebarOpen ? "260px" : "80px"} transition="margin 0.3s">
        <Box bg="white" borderBottom="1px" borderColor="#E5E5E5" px={6} py={4}>
          <Flex justify="space-between" align="center">
            <Heading fontSize="xl" fontWeight="bold" color="#2C2C2C">
              {menuItems.find((item) => item.href === pathname)?.label || "Dashboard"}
            </Heading>
            <Link href="/" target="_blank">
              <Button size="sm" variant="outline" borderColor="#152852" color="#152852" _hover={{ bg: "#152852", color: "white" }}>
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