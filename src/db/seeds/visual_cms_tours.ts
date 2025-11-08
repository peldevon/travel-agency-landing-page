import { db } from '@/db';
import { visualCmsTours } from '@/db/schema';

async function main() {
    const sampleTours = [
        {
            title: 'Dubai Luxury Experience - 5D/4N',
            slug: 'dubai-luxury-experience-5d4n',
            description: 'Experience the glamour of Dubai with this 5-day luxury tour package. Visit iconic landmarks including Burj Khalifa, Palm Jumeirah, and Dubai Mall. Includes desert safari and dhow cruise.',
            duration: '5D/4N',
            priceFrom: 850000,
            tag: 'International',
            images: ['/images/tours/dubai-1.jpg', '/images/tours/dubai-2.jpg', '/images/tours/dubai-3.jpg'],
            itinerary: [
                { day: 1, title: 'Arrival & City Tour', description: 'Airport pickup, hotel check-in, evening Dubai Marina walk' },
                { day: 2, title: 'Modern Dubai', description: 'Burj Khalifa visit, Dubai Mall, Dubai Fountain show' },
                { day: 3, title: 'Desert Safari', description: 'Morning at leisure, evening desert safari with BBQ dinner' },
                { day: 4, title: 'Palm & Beach', description: 'Palm Jumeirah tour, Atlantis visit, beach time' },
                { day: 5, title: 'Departure', description: 'Last-minute shopping, airport transfer' }
            ],
            inclusions: [
                'Round-trip flights',
                '4-star hotel accommodation',
                'Daily breakfast',
                'Airport transfers',
                'Desert safari',
                'Dubai city tour',
                'Burj Khalifa tickets',
                'Travel insurance'
            ],
            exclusions: [
                'Visa fees',
                'Lunch and dinner (except desert safari)',
                'Personal expenses',
                'Optional activities'
            ],
            status: 'active',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            title: 'Zanzibar Beach Paradise - 4D/3N',
            slug: 'zanzibar-beach-paradise-4d3n',
            description: 'Discover the pristine beaches and rich culture of Zanzibar. This package includes Stone Town exploration, spice tour, and relaxation on world-famous white sand beaches.',
            duration: '4D/3N',
            priceFrom: 420000,
            tag: 'Regional',
            images: ['/images/tours/zanzibar-1.jpg', '/images/tours/zanzibar-2.jpg', '/images/tours/zanzibar-3.jpg'],
            itinerary: [
                { day: 1, title: 'Arrival & Stone Town', description: 'Airport pickup, hotel check-in, Stone Town walking tour' },
                { day: 2, title: 'Spice Tour & Beach', description: 'Morning spice plantation tour, afternoon beach relaxation' },
                { day: 3, title: 'Island Hopping', description: 'Prison Island visit, snorkeling, beach BBQ' },
                { day: 4, title: 'Departure', description: 'Beach time, souvenir shopping, airport transfer' }
            ],
            inclusions: [
                'Round-trip flights from Lagos',
                '3-star beachfront hotel',
                'Daily breakfast',
                'Airport transfers',
                'Stone Town tour',
                'Spice tour',
                'Island hopping trip',
                'Travel insurance'
            ],
            exclusions: [
                'Visa fees',
                'Lunch and dinner',
                'Water sports activities',
                'Personal expenses'
            ],
            status: 'active',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            title: 'Obudu Mountain Resort Escape - 3D/2N',
            slug: 'obudu-mountain-resort-escape-3d2n',
            description: 'Escape to the mountains with this relaxing Obudu Mountain Resort package. Enjoy cable car rides, nature walks, and stunning mountain views. Perfect for weekend getaways.',
            duration: '3D/2N',
            priceFrom: 95000,
            tag: 'Local',
            images: ['/images/tours/obudu-1.jpg', '/images/tours/obudu-2.jpg', '/images/tours/obudu-3.jpg'],
            itinerary: [
                { day: 1, title: 'Journey to Obudu', description: 'Departure from Lagos/Abuja, scenic drive, resort check-in, cable car experience' },
                { day: 2, title: 'Mountain Exploration', description: 'Nature walk, bird watching, canopy walkway, mountain views' },
                { day: 3, title: 'Return Journey', description: 'Breakfast, leisure time, return trip to Lagos/Abuja' }
            ],
            inclusions: [
                'Round-trip bus transport',
                '2 nights resort accommodation',
                'Daily breakfast and dinner',
                'Cable car rides',
                'Nature guide',
                'Resort access'
            ],
            exclusions: [
                'Lunch',
                'Personal expenses',
                'Horse riding',
                'Photography fees'
            ],
            status: 'active',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
    ];

    await db.insert(visualCmsTours).values(sampleTours);
    
    console.log('✅ Tours seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});