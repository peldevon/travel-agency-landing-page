import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core';

// CMS Pages table
export const cmsPages = sqliteTable('cms_pages', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  metaDescription: text('meta_description'),
  metaKeywords: text('meta_keywords'),
  status: text('status').notNull().default('draft'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
  createdBy: integer('created_by').notNull(),
  updatedBy: integer('updated_by'),
});

// CMS Media table
export const cmsMedia = sqliteTable('cms_media', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  filename: text('filename').notNull(),
  storagePath: text('storage_path').notNull(),
  fileType: text('file_type').notNull(),
  mimeType: text('mime_type').notNull(),
  fileSize: integer('file_size').notNull(),
  altText: text('alt_text'),
  caption: text('caption'),
  uploadedBy: integer('uploaded_by').notNull(),
  createdAt: text('created_at').notNull(),
});

// CMS Tours table
export const cmsTours = sqliteTable('cms_tours', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  category: text('category').notNull(),
  tags: text('tags', { mode: 'json' }),
  durationDays: integer('duration_days').notNull(),
  durationNights: integer('duration_nights').notNull(),
  priceFromNgn: integer('price_from_ngn').notNull(),
  priceFromUsd: integer('price_from_usd').notNull(),
  shortDescription: text('short_description').notNull(),
  fullDescription: text('full_description').notNull(),
  highlights: text('highlights', { mode: 'json' }),
  inclusions: text('inclusions', { mode: 'json' }),
  exclusions: text('exclusions', { mode: 'json' }),
  itinerary: text('itinerary', { mode: 'json' }),
  accommodationExamples: text('accommodation_examples', { mode: 'json' }),
  seasonality: text('seasonality'),
  visaNotes: text('visa_notes'),
  addOns: text('add_ons', { mode: 'json' }),
  cancellationTerms: text('cancellation_terms').notNull(),
  gallery: text('gallery', { mode: 'json' }),
  whatsappPrefill: text('whatsapp_prefill').notNull(),
  status: text('status').notNull().default('draft'),
  featured: integer('featured', { mode: 'boolean' }).default(false),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
  createdBy: integer('created_by').notNull(),
});

// CMS Shortlets table
export const cmsShortlets = sqliteTable('cms_shortlets', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  location: text('location').notNull(),
  locationArea: text('location_area').notNull(),
  locationCity: text('location_city').notNull(),
  locationNearby: text('location_nearby'),
  propertyType: text('property_type').notNull(),
  pricePerNightNgn: integer('price_per_night_ngn').notNull(),
  pricePerNightUsd: integer('price_per_night_usd').notNull(),
  bedrooms: integer('bedrooms').notNull(),
  bathrooms: integer('bathrooms').notNull(),
  maxGuests: integer('max_guests').notNull(),
  description: text('description').notNull(),
  amenities: text('amenities', { mode: 'json' }),
  features: text('features', { mode: 'json' }),
  checkInTime: text('check_in_time').notNull(),
  checkOutTime: text('check_out_time').notNull(),
  minimumStay: text('minimum_stay').notNull(),
  cancellationPolicy: text('cancellation_policy').notNull(),
  securityDeposit: text('security_deposit').notNull(),
  houseRules: text('house_rules', { mode: 'json' }),
  gallery: text('gallery', { mode: 'json' }),
  rating: real('rating').default(0),
  reviewsCount: integer('reviews_count').default(0),
  hostName: text('host_name').notNull(),
  hostResponseTime: text('host_response_time').notNull(),
  whatsappPrefill: text('whatsapp_prefill').notNull(),
  status: text('status').notNull().default('available'),
  featured: integer('featured', { mode: 'boolean' }).default(false),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
  createdBy: integer('created_by').notNull(),
});

// CMS Users table
export const cmsUsers = sqliteTable('cms_users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  name: text('name').notNull(),
  role: text('role').notNull().default('viewer'),
  avatarUrl: text('avatar_url'),
  lastLogin: text('last_login'),
  active: integer('active', { mode: 'boolean' }).default(true),
  createdAt: text('created_at').notNull(),
});

// Visual CMS Users table
export const visualCmsUsers = sqliteTable('visual_cms_users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  fullName: text('full_name').notNull(),
  role: text('role').notNull().default('viewer'), // admin, editor, viewer
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// Visual CMS Pages table
export const visualCmsPages = sqliteTable('visual_cms_pages', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  metaTitle: text('meta_title'),
  metaDescription: text('meta_description'),
  status: text('status').notNull().default('draft'), // draft, published, archived
  createdBy: integer('created_by').notNull().references(() => visualCmsUsers.id),
  updatedBy: integer('updated_by').references(() => visualCmsUsers.id),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
  publishedAt: text('published_at'),
});

// Visual CMS Media table
export const visualCmsMedia = sqliteTable('visual_cms_media', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  filename: text('filename').notNull(),
  originalName: text('original_name').notNull(),
  mimeType: text('mime_type').notNull(),
  size: integer('size').notNull(),
  url: text('url').notNull(),
  altText: text('alt_text'),
  uploadedBy: integer('uploaded_by').notNull().references(() => visualCmsUsers.id),
  createdAt: text('created_at').notNull(),
});

// Visual CMS Shortlets table
export const visualCmsShortlets = sqliteTable('visual_cms_shortlets', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  location: text('location').notNull(),
  pricePerNight: integer('price_per_night').notNull(),
  bedrooms: integer('bedrooms').notNull(),
  amenities: text('amenities', { mode: 'json' }),
  images: text('images', { mode: 'json' }),
  rating: real('rating').default(0),
  reviewsCount: integer('reviews_count').default(0),
  status: text('status').notNull().default('active'), // active, inactive
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// Visual CMS Tours table
export const visualCmsTours = sqliteTable('visual_cms_tours', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  duration: text('duration').notNull(),
  priceFrom: integer('price_from').notNull(),
  tag: text('tag').notNull(),
  images: text('images', { mode: 'json' }),
  itinerary: text('itinerary', { mode: 'json' }),
  inclusions: text('inclusions', { mode: 'json' }),
  exclusions: text('exclusions', { mode: 'json' }),
  status: text('status').notNull().default('active'), // active, inactive
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});