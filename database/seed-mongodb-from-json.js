const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// MongoDB connection URI
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce_db';

// Define schemas
const CategorySchema = new mongoose.Schema({
  name: String,
  slug: String,
  image: String,
}, { timestamps: true });

const ProductSchema = new mongoose.Schema({
  slug: String,
  name: String,
  price: Number,
  originalPrice: Number,
  rating: Number,
  reviewCount: Number,
  mainImage: String,
  gallery: [String],
  description: String,
  category: String,
  brand: String,
  badge: String,
  specs: Map,
  variants: [{
    name: String,
    priceAdjustment: Number,
  }],
  highlightFeatures: [String],
}, { timestamps: true });

const NewsSchema = new mongoose.Schema({
  slug: String,
  title: String,
  excerpt: String,
  content: String,
  image: String,
  author: String,
  publishedAt: Date,
}, { timestamps: true });

const PromotionSchema = new mongoose.Schema({
  slug: String,
  title: String,
  description: String,
  image: String,
  discountPercent: Number,
  discountText: String,
  startDate: Date,
  endDate: Date,
  featured: Boolean,
  terms: [String],
}, { timestamps: true });

// Create models
const Category = mongoose.model('Category', CategorySchema);
const Product = mongoose.model('Product', ProductSchema);
const News = mongoose.model('News', NewsSchema);
const Promotion = mongoose.model('Promotion', PromotionSchema);

async function seedDatabase() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Read data from JSON file
    const dataPath = path.join(__dirname, 'mongodb-seed-data.json');
    console.log(`📖 Reading data from ${dataPath}...`);
    
    if (!fs.existsSync(dataPath)) {
      throw new Error(`File not found: ${dataPath}\nPlease run: node database/export-mongodb-data.js first`);
    }

    const rawData = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(rawData);

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Category.deleteMany({});
    await Product.deleteMany({});
    await News.deleteMany({});
    await Promotion.deleteMany({});
    console.log('✅ Cleared existing data');

    // Insert categories
    if (data.categories && data.categories.length > 0) {
      console.log('📦 Inserting categories...');
      const categories = data.categories.map(cat => ({
        name: cat.name,
        slug: cat.slug,
        image: cat.image,
      }));
      await Category.insertMany(categories);
      console.log(`✅ Inserted ${categories.length} categories`);
    }

    // Insert products
    if (data.products && data.products.length > 0) {
      console.log('📦 Inserting products...');
      const products = data.products.map(prod => ({
        slug: prod.slug,
        name: prod.name,
        price: prod.price,
        originalPrice: prod.originalPrice,
        rating: prod.rating,
        reviewCount: prod.reviewCount,
        mainImage: prod.mainImage,
        gallery: prod.gallery || [],
        description: prod.description,
        category: prod.category,
        brand: prod.brand,
        badge: prod.badge,
        specs: prod.specs ? new Map(Object.entries(prod.specs)) : new Map(),
        variants: prod.variants || [],
        highlightFeatures: prod.highlightFeatures || [],
      }));
      await Product.insertMany(products);
      console.log(`✅ Inserted ${products.length} products`);
    }

    // Insert news
    if (data.news && data.news.length > 0) {
      console.log('📦 Inserting news...');
      const news = data.news.map(article => ({
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        image: article.image,
        author: article.author,
        publishedAt: article.publishedAt ? new Date(article.publishedAt) : new Date(),
      }));
      await News.insertMany(news);
      console.log(`✅ Inserted ${news.length} news articles`);
    }

    // Insert promotions
    if (data.promotions && data.promotions.length > 0) {
      console.log('📦 Inserting promotions...');
      const promotions = data.promotions.map(promo => ({
        slug: promo.slug,
        title: promo.title,
        description: promo.description,
        image: promo.image,
        discountPercent: promo.discountPercent,
        discountText: promo.discountText,
        startDate: promo.startDate ? new Date(promo.startDate) : null,
        endDate: promo.endDate ? new Date(promo.endDate) : null,
        featured: promo.featured || false,
        terms: promo.terms || [],
      }));
      await Promotion.insertMany(promotions);
      console.log(`✅ Inserted ${promotions.length} promotions`);
    }

    console.log('\n🎉 Database seeded successfully!');
    console.log(`\n📊 Summary:`);
    console.log(`   Categories: ${data.categories?.length || 0}`);
    console.log(`   Products: ${data.products?.length || 0}`);
    console.log(`   News: ${data.news?.length || 0}`);
    console.log(`   Promotions: ${data.promotions?.length || 0}`);
    
    // Close connection
    await mongoose.connection.close();
    console.log('\n👋 Connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
