"use client";

import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Icon,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { MessageCircle, HelpCircle } from "lucide-react";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";

const MotionBox = motion.create(Box);

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const faqCategories = [
  {
    category: "Booking & Payments",
    questions: [
      {
        q: "How do I book a flight or hotel?",
        a: "Simply use our search widget on the homepage to enter your travel details. You'll see real-time options from our Amadeus-powered system. Select your preferred option and proceed to checkout. We accept payments via Paystack and Flutterwave in NGN or USD."
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept all major debit and credit cards (Visa, Mastercard, Verve) through our secure payment partners Paystack and Flutterwave. You can pay in Nigerian Naira (NGN) or US Dollars (USD)."
      },
      {
        q: "Is my payment information secure?",
        a: "Absolutely! All payments are processed through PCI-DSS compliant payment gateways (Paystack/Flutterwave). We never store your card details on our servers. Your transactions are encrypted and fully secure."
      },
      {
        q: "Can I pay in installments?",
        a: "For tour packages, we typically require a 50% deposit to secure your booking, with the balance due 14-30 days before departure (depending on the package). Contact us on WhatsApp to discuss flexible payment arrangements."
      },
      {
        q: "Do you offer payment plans for expensive trips?",
        a: "Yes! For bookings above ₦500,000, we can arrange customized payment plans. WhatsApp us with your travel details and we'll work out a schedule that suits you."
      }
    ]
  },
  {
    category: "Flights & Hotels",
    questions: [
      {
        q: "Can I change my flight dates after booking?",
        a: "Flight change policies vary by airline and ticket type. Most economy tickets allow changes with a fee (usually $100-300 USD plus fare difference). Contact us immediately if you need to make changes, and we'll check the airline's policy and assist you."
      },
      {
        q: "What if I need to cancel my flight?",
        a: "Cancellation policies depend on the airline and ticket type. Some tickets are non-refundable but may allow changes. Premium/flexible tickets usually allow cancellations with penalties. We'll help you understand your options and process any eligible refunds."
      },
      {
        q: "Do hotel bookings include breakfast?",
        a: "This varies by hotel. Each hotel listing clearly shows what's included. Look for 'Breakfast Included' in the amenities section. Most hotels we work with offer at least breakfast, but luxury properties may include half-board or full-board options."
      },
      {
        q: "Can I request special meals on flights?",
        a: "Yes! Most airlines offer special meals (vegetarian, halal, kosher, gluten-free, etc.). Let us know at the time of booking, and we'll add your meal preference to your reservation."
      },
      {
        q: "How early should I arrive at the airport?",
        a: "For domestic flights: 90 minutes before departure. For international flights: 3 hours before departure. This allows time for check-in, security screening, and any unexpected delays."
      }
    ]
  },
  {
    category: "Shortlets",
    questions: [
      {
        q: "What is a shortlet?",
        a: "A shortlet is a fully furnished apartment available for short-term rental (usually 1 night to several months). It's ideal for business travelers, tourists, or anyone needing temporary accommodation. Our shortlets include Wi-Fi, kitchen, TV, and all essential amenities."
      },
      {
        q: "How do I book a shortlet?",
        a: "Browse our shortlets page, select a property that fits your needs, and click 'Enquire on WhatsApp' or 'Book Now'. We'll confirm availability, send payment details, and arrange check-in once payment is received."
      },
      {
        q: "What's the minimum stay for shortlets?",
        a: "Minimum stays vary by property (typically 1-3 nights). Each listing shows the minimum stay requirement. For longer stays (1+ months), we offer discounted rates—contact us for a quote."
      },
      {
        q: "Are utilities included in the shortlet price?",
        a: "Yes! The nightly rate includes electricity (fair usage), water, Wi-Fi, and security. Some properties may have additional charges for excessive electricity use—this will be clearly stated in the listing."
      },
      {
        q: "Can I check in late at night?",
        a: "Yes, we offer flexible check-in times, including late-night arrivals. Just inform us of your expected arrival time when booking, and we'll arrange to have someone available to assist you."
      },
      {
        q: "Is there a security deposit?",
        a: "Yes, most shortlets require a refundable security deposit (typically ₦30,000 - ₦100,000 depending on the property). This is refunded within 7 days after checkout, subject to property inspection."
      }
    ]
  },
  {
    category: "Tours & Packages",
    questions: [
      {
        q: "Do tour prices include flights?",
        a: "This varies by package. International and regional tours usually include round-trip flights. Local Nigerian tours typically don't include flights (you arrange your own transport to the starting point). Each tour listing clearly states what's included and excluded."
      },
      {
        q: "Can I customize a tour package?",
        a: "Absolutely! We offer custom trip planning. Use the 'Request Custom Tour' form on the Tours page or WhatsApp us with your preferences (destination, dates, budget, interests), and we'll create a personalized itinerary just for you."
      },
      {
        q: "Are tours suitable for solo travelers?",
        a: "Yes! Many of our tours welcome solo travelers. Solo travelers typically pay a single supplement (additional cost for having a room to yourself). Group tours are great for meeting other travelers, while private tours offer maximum flexibility."
      },
      {
        q: "What if I have dietary restrictions?",
        a: "We accommodate all dietary needs (vegetarian, vegan, halal, allergies, etc.). Just inform us at the time of booking, and we'll ensure your meals meet your requirements throughout the tour."
      },
      {
        q: "Is travel insurance included?",
        a: "Travel insurance is not automatically included but is highly recommended. We can add comprehensive travel insurance to your package (typically ₦15,000-30,000 depending on destination and duration). It covers trip cancellation, medical emergencies, lost luggage, and more."
      }
    ]
  },
  {
    category: "Visas & Documentation",
    questions: [
      {
        q: "Do you help with visa applications?",
        a: "Yes! We provide full visa support for most destinations. This includes document checklists, application form guidance, appointment booking, and document review. Visa processing fees are separate and vary by country."
      },
      {
        q: "How long does visa processing take?",
        a: "Processing times vary by country: Dubai (3-5 days), UK (2-3 weeks), USA (2-8 weeks), Schengen (2-4 weeks). Apply early—we recommend at least 6-8 weeks before your travel date for most international visas."
      },
      {
        q: "What documents do I need for a visa?",
        a: "Basic requirements usually include: Valid passport (6+ months validity), passport photos, bank statements (3-6 months), employment letter, hotel reservations, and flight bookings. Requirements vary by country—we provide a detailed checklist for your specific destination."
      },
      {
        q: "Can you guarantee my visa will be approved?",
        a: "Visa approval is at the discretion of the embassy/consulate. However, we maximize your chances by ensuring all documents are complete, accurate, and meet the requirements. Our success rate is very high due to our experience and attention to detail."
      }
    ]
  },
  {
    category: "General Questions",
    questions: [
      {
        q: "How can I contact customer support?",
        a: "We offer multiple contact options: WhatsApp (fastest response, usually within 1 hour), Phone (+234 812 345 6789, Mon-Sat 9AM-6PM WAT), Email (info@ontourtravels.com.ng), or use our Contact Form. For urgent issues during travel, WhatsApp is best."
      },
      {
        q: "Do you have a physical office?",
        a: "Yes, our head office is located in Lagos. Visit our Contact page for the full address. Walk-in consultations are available Mon-Sat, 9AM-6PM WAT. We recommend booking an appointment via WhatsApp for faster service."
      },
      {
        q: "What makes Ontour Travels different?",
        a: "We combine technology (Amadeus booking system) with personalized service. You get real-time pricing, a curated selection of quality options, and human support when you need it. Plus, we're Lagos-based, understand Nigerian travelers' needs, and offer local payment options."
      },
      {
        q: "Do you offer group discounts?",
        a: "Yes! For groups of 10+ travelers, we offer attractive discounts on flights, hotels, and tours. WhatsApp us with your group details (number of travelers, destination, dates) for a customized quote."
      },
      {
        q: "Can I book on behalf of someone else?",
        a: "Absolutely! Just provide us with the traveler's full details (as on their passport) when booking. Ensure you have their correct information to avoid issues at check-in or boarding."
      },
      {
        q: "What currencies do you accept?",
        a: "We primarily accept Nigerian Naira (NGN) and US Dollars (USD). Payments are processed via Paystack/Flutterwave, which also accept cards in other currencies (automatically converted)."
      }
    ]
  }
];

export default function FAQPage() {
  return (
    <Box minH="100vh" pt={20}>
      {/* Hero Section */}
      <Box bg="blue.600" color="white" py={16}>
        <Container maxW="7xl" textAlign="center">
          <MotionBox variants={fadeInUp} initial="hidden" animate="visible">
            <Icon as={HelpCircle} boxSize={16} mx="auto" mb={4} />
            <Heading as="h1" fontSize={{ base: "4xl", md: "5xl" }} mb={4}>
              Frequently Asked Questions
            </Heading>
            <Text fontSize={{ base: "lg", md: "xl" }} maxW="3xl" mx="auto">
              Find quick answers to common questions about booking flights, hotels, shortlets, and tours with Ontour Travels.
            </Text>
          </MotionBox>
        </Container>
      </Box>

      {/* FAQ Accordion */}
      <Container maxW="5xl" py={16}>
        <VStack gap={12} align="stretch">
          {faqCategories.map((category, idx) => (
            <MotionBox
              key={idx}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Heading as="h2" fontSize="2xl" mb={6} color="gray.900">
                {category.category}
              </Heading>
              
              <AccordionRoot collapsible>
                {category.questions.map((faq, qIdx) => (
                  <AccordionItem key={qIdx} value={`${idx}-${qIdx}`}>
                    <AccordionItemTrigger>
                      <Text fontWeight="medium" color="gray.900" textAlign="left">
                        {faq.q}
                      </Text>
                    </AccordionItemTrigger>
                    <AccordionItemContent>
                      <Text color="gray.700" lineHeight="tall">
                        {faq.a}
                      </Text>
                    </AccordionItemContent>
                  </AccordionItem>
                ))}
              </AccordionRoot>
            </MotionBox>
          ))}
        </VStack>
      </Container>

      {/* CTA Section */}
      <Box bg="blue.50" py={12}>
        <Container maxW="4xl" textAlign="center">
          <Heading as="h2" fontSize="3xl" mb={4} color="gray.900">
            Still have questions?
          </Heading>
          <Text fontSize="lg" color="gray.600" mb={6}>
            Our team is here to help! Chat with us on WhatsApp for instant answers.
          </Text>
          <Button
            as="a"
            href="https://wa.me/2348123456789?text=Hi%20Ontour%2C%20I%20have%20a%20question%20about..."
            target="_blank"
            colorPalette="green"
            size="lg"
          >
            <Icon as={MessageCircle} mr={2} />
            Chat on WhatsApp
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
