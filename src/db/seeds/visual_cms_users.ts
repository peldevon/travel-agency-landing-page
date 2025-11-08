import { db } from '@/db';
import { visualCmsUsers } from '@/db/schema';
import * as bcrypt from 'bcrypt';

async function main() {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const adminUser = {
        email: 'admin@ontourtravels.com.ng',
        passwordHash: hashedPassword,
        fullName: 'System Administrator',
        role: 'admin',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    await db.insert(visualCmsUsers).values(adminUser);
    
    console.log('✅ Visual CMS admin user seeder completed successfully');
}

main().catch((error) => {
    console.error('❌ Seeder failed:', error);
});