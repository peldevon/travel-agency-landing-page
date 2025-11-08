import { db } from '@/db';
import { visualCmsShortlets } from '@/db/schema';

async function main() {
    const sampleShortlets = [
        {
            title: 'Luxury 3BR Penthouse - Victoria Island',
            slug: 'luxury-3br-penthouse-vi',
            description: 'Stunning penthouse apartment with panoramic views of Lagos Marina. Features modern furnishings, fully equipped kitchen, and access to gym and pool.',
            location: 'Victoria Island, Lagos',
            pricePerNight: 85000,
            bedrooms: 3,
            amenities: JSON.stringify(['WiFi', 'Air Conditioning', 'Kitchen', 'Gym', 'Swimming Pool', '24/7 Security', 'Parking', 'Smart TV']),
            images: JSON.stringify(['/images/shortlets/vi-penthouse-1.jpg', '/images/shortlets/vi-penthouse-2.jpg']),
            rating: 4.8,
            reviewsCount: 24,
            status: 'active',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            title: 'Cozy 2BR Apartment - Lekki Phase 1',
            slug: 'cozy-2br-lekki-phase-1',
            description: 'Modern 2-bedroom apartment in the heart of Lekki. Perfect for business travelers and small families. Walking distance to restaurants and shopping centers.',
            location: 'Lekki Phase 1, Lagos',
            pricePerNight: 55000,
            bedrooms: 2,
            amenities: JSON.stringify(['WiFi', 'Air Conditioning', 'Kitchen', 'Netflix', 'Backup Generator', 'Parking']),
            images: JSON.stringify(['/images/shortlets/lekki-apt-1.jpg', '/images/shortlets/lekki-apt-2.jpg']),
            rating: 4.5,
            reviewsCount: 18,
            status: 'active',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            title: 'Spacious 4BR Duplex - Ikoyi',
            slug: 'spacious-4br-duplex-ikoyi',
            description: 'Luxurious 4-bedroom duplex in premium Ikoyi neighborhood. Ideal for large families or groups. Features include home theater, private garden, and dedicated workspace.',
            location: 'Ikoyi, Lagos',
            pricePerNight: 120000,
            bedrooms: 4,
            amenities: JSON.stringify(['WiFi', 'Air Conditioning', 'Kitchen', 'Home Theater', 'Garden', 'Office Space', 'Parking', '24/7 Security']),
            images: JSON.stringify(['/images/shortlets/ikoyi-duplex-1.jpg', '/images/shortlets/ikoyi-duplex-2.jpg']),
            rating: 5.0,
            reviewsCount: 32,
            status: 'active',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            title: 'Modern Studio - Ikeja GRA',
            slug: 'modern-studio-ikeja-gra',
            description: 'Compact and stylish studio apartment perfect for solo travelers. Located near Murtala Muhammed Airport. Ideal for short business trips.',
            location: 'Ikeja GRA, Lagos',
            pricePerNight: 35000,
            bedrooms: 1,
            amenities: JSON.stringify(['WiFi', 'Air Conditioning', 'Kitchenette', 'Workspace', 'Smart TV', 'Parking']),
            images: JSON.stringify(['/images/shortlets/ikeja-studio-1.jpg', '/images/shortlets/ikeja-studio-2.jpg']),
            rating: 4.3,
            reviewsCount: 15,
            status: 'active',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            title: 'Beachfront 3BR Villa - Lekki',
            slug: 'beachfront-3br-villa-lekki',
            description: 'Exclusive beachfront villa with private beach access. Features infinity pool, BBQ area, and breathtaking ocean views. Perfect for weekend getaways.',
            location: 'Lekki Peninsula, Lagos',
            pricePerNight: 150000,
            bedrooms: 3,
            amenities: JSON.stringify(['WiFi', 'Air Conditioning', 'Kitchen', 'Private Beach', 'Infinity Pool', 'BBQ Area', 'Security', 'Parking']),
            images: JSON.stringify(['/images/shortlets/lekki-villa-1.jpg', '/images/shortlets/lekki-villa-2.jpg']),
            rating: 4.9,
            reviewsCount: 41,
            status: 'active',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            title: 'Budget 2BR Flat - Surulere',
            slug: 'budget-2br-flat-surulere',
            description: 'Affordable 2-bedroom apartment in vibrant Surulere. Great value for money. Close to National Stadium and local markets.',
            location: 'Surulere, Lagos',
            pricePerNight: 28000,
            bedrooms: 2,
            amenities: JSON.stringify(['WiFi', 'Air Conditioning', 'Kitchen', 'TV', 'Security', 'Parking']),
            images: JSON.stringify(['/images/shortlets/surulere-flat-1.jpg', '/images/shortlets/surulere-flat-2.jpg']),
            rating: 4.0,
            reviewsCount: 9,
            status: 'active',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
    ];

    await db.insert(visualCmsShortlets).values(sampleShortlets);
    
    console.log('✅ Visual CMS Shortlets seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});