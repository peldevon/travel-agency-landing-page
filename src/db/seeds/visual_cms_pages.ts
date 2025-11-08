import { db } from '@/db';
import { visualCmsPages } from '@/db/schema';

async function main() {
    const currentTimestamp = new Date().toISOString();
    
    const samplePages = [
        {
            slug: 'home',
            title: 'Welcome to OnTour Travels',
            content: '<h1>Discover Your Next Adventure</h1><p>OnTour Travels offers premium tour packages and luxury shortlet accommodations across Nigeria and international destinations. Whether you\'re looking for a weekend getaway or an exotic international tour, we\'ve got you covered.</p>',
            metaTitle: 'OnTour Travels - Premium Tours & Shortlets',
            metaDescription: 'Explore the world with OnTour Travels. Premium tour packages and luxury shortlets.',
            status: 'published',
            createdBy: 1,
            updatedBy: 1,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
            publishedAt: currentTimestamp,
        },
        {
            slug: 'about',
            title: 'About OnTour Travels',
            content: '<h1>About Us</h1><p>OnTour Travels is Nigeria\'s leading travel and accommodation provider. With over 10 years of experience, we specialize in creating unforgettable travel experiences.</p><h2>Our Mission</h2><p>To make world-class travel accessible to everyone.</p>',
            metaTitle: 'About OnTour Travels',
            metaDescription: 'Learn more about OnTour Travels and our mission.',
            status: 'published',
            createdBy: 1,
            updatedBy: 1,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
            publishedAt: currentTimestamp,
        },
        {
            slug: 'contact',
            title: 'Contact Us',
            content: '<h1>Get In Touch</h1><p>Have questions? We\'re here to help!</p><p>Email: info@ontourtravels.com.ng</p><p>Phone: +234 123 456 7890</p>',
            metaTitle: 'Contact OnTour Travels',
            metaDescription: 'Contact OnTour Travels for inquiries and bookings.',
            status: 'published',
            createdBy: 1,
            updatedBy: 1,
            createdAt: currentTimestamp,
            updatedAt: currentTimestamp,
            publishedAt: currentTimestamp,
        },
    ];

    await db.insert(visualCmsPages).values(samplePages);
    
    console.log('✅ Visual CMS Pages seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});