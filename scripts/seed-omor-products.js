const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Read .env.local file to get MONGODB_URI
const envPath = path.join(__dirname, '../.env.local');
let mongodbUri = '';

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const match = envContent.match(/^MONGODB_URI=(.*)$/m);
  if (match && match[1]) {
    mongodbUri = match[1].trim().replace(/['"]/g, '');
  }
}

if (!mongodbUri) {
  mongodbUri = 'mongodb+srv://Omor Auto Corner:xI2QuBaFZsYQ5vRD@cluster0.e5n1hnl.mongodb.net/Omor Auto Corner';
}

console.log('Connecting to MongoDB...');

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
});
const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  salePrice: { type: Number },
  purchasePrice: { type: Number },
  discountRate: { type: Number },
  sku: { type: String, required: true, unique: true },
  stock: { type: Number, required: true, default: 0 },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  tags: [{ type: String }],
  images: [{ type: String }],
  attributes: [
    {
      key: { type: String },
      value: { type: String },
    },
  ],
  isFeatured: { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: false },
  isFlashSale: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: true },
  ratings: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  totalSales: { type: Number, default: 0 },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const baseProducts = [
  // ==================== ENGINE OIL & LUBRICANTS ====================
  {
    name: 'Motul 7100 10W40 Fully Synthetic Engine Oil',
    slug: 'motul-7100-10w40',
    description: '100% Synthetic 4-Stroke motorcycle racing engine oil based on Ester technology. Provides outstanding engine protection, smooth gear shifting, and high RPM performance.',
    price: 1450,
    salePrice: 1300,
    discountRate: Math.round(((1450 - 1300) / 1450) * 100),
    purchasePrice: 1100,
    stock: 50,
    sku: 'ENG-MOT-7100',
    categorySlug: 'engine-oil',
    images: ['/assets/images/products/motul-7100.webp'],
    isFlashSale: true,
    isNewArrival: true,
    isFeatured: false,
    attributes: [{ key: 'Brand', value: 'Motul' }, { key: 'Type', value: 'Fully Synthetic' }, { key: 'Volume', value: '1L' }]
  },
  {
    name: 'Shell Advance AX7 10W40 Semi Synthetic',
    slug: 'shell-advance-ax7',
    description: 'Shell Advance AX7 is an ideal oil for high-performance motorbikes. Demanding engines deliver high power and torque and require reliable performance under these stressful conditions.',
    price: 650,
    purchasePrice: 500,
    stock: 45,
    sku: 'ENG-SHL-AX7',
    categorySlug: 'engine-oil',
    images: ['/assets/images/products/shell-advance-ax7.webp'],
    isFlashSale: false,
    isNewArrival: false,
    isFeatured: true,
    attributes: [{ key: 'Brand', value: 'Shell' }, { key: 'Type', value: 'Semi Synthetic' }, { key: 'Volume', value: '1L' }]
  },
  {
    name: 'Yamalube 4T 10W40 Mineral',
    slug: 'yamalube-4t-mineral',
    description: 'Yamalube 4-stroke motor oil provides excellent engine performance and engine endurance. Formulated specifically for Yamaha motorcycles.',
    price: 550,
    salePrice: 500,
    discountRate: Math.round(((550 - 500) / 550) * 100),
    purchasePrice: 400,
    stock: 80,
    sku: 'ENG-YAM-4T',
    categorySlug: 'engine-oil',
    images: ['/assets/images/products/yamalube-4t.webp'],
    isFlashSale: true,
    isNewArrival: false,
    isFeatured: false,
    attributes: [{ key: 'Brand', value: 'Yamalube' }, { key: 'Type', value: 'Mineral' }, { key: 'Volume', value: '1L' }]
  },
  {
    name: 'Liqui Moly Chain Lube',
    slug: 'liqui-moly-chain-lube',
    description: 'Fully synthetic chain lube for all motorcycle chains. Extremely adherent and water resistant. Reduces chain elongation and extends service life.',
    price: 850,
    purchasePrice: 650,
    stock: 30,
    sku: 'LUB-LM-CHAIN',
    categorySlug: 'engine-oil',
    images: ['/assets/images/products/liqui-moly-chain-lube.webp'],
    isFlashSale: false,
    isNewArrival: true,
    isFeatured: false,
    attributes: [{ key: 'Brand', value: 'Liqui Moly' }, { key: 'Volume', value: '400ml' }]
  },
  {
    name: 'Motul Engine Flush',
    slug: 'motul-engine-flush',
    description: 'Engine cleaner to be used prior to oil change. Designed to clean the engine internals, removing sludge, dirt and varnish.',
    price: 450,
    purchasePrice: 300,
    stock: 25,
    sku: 'LUB-MOT-FLUSH',
    categorySlug: 'engine-oil',
    images: ['/assets/images/products/motul-engine-flush.webp'],
    isFlashSale: false,
    isNewArrival: false,
    isFeatured: true,
    attributes: [{ key: 'Brand', value: 'Motul' }, { key: 'Volume', value: '300ml' }]
  },

  // ==================== HELMETS & SAFETY GEAR ====================
  {
    name: 'MT Thunder 3 Pro Helmet',
    slug: 'mt-thunder-3-pro',
    description: 'Aerodynamic full face helmet from MT. Features a drop down sun visor, pinlock ready clear visor, and high impact absorption inner shell.',
    price: 5500,
    salePrice: 4800,
    discountRate: Math.round(((5500 - 4800) / 5500) * 100),
    purchasePrice: 4000,
    stock: 15,
    sku: 'HLM-MT-TH3',
    categorySlug: 'helmets-gear',
    images: ['/assets/images/products/mt-thunder-3-pro.webp'],
    isFlashSale: true,
    isNewArrival: false,
    isFeatured: true,
    attributes: [{ key: 'Brand', value: 'MT Helmets' }, { key: 'Certification', value: 'DOT, ECE' }]
  },
  {
    name: 'Axor Apex Venomous Helmet',
    slug: 'axor-apex-venomous',
    description: 'Aggressive styling with dual visor setup. The Axor Apex is designed for the sport rider with superior ventilation and an ultra-wide vision field.',
    price: 4800,
    purchasePrice: 3800,
    stock: 20,
    sku: 'HLM-AXR-APX',
    categorySlug: 'helmets-gear',
    images: ['/assets/images/products/axor-apex-venomous.webp'],
    isFlashSale: false,
    isNewArrival: true,
    isFeatured: true,
    attributes: [{ key: 'Brand', value: 'Axor' }, { key: 'Design', value: 'Venomous' }]
  },
  {
    name: 'Pro-Biker Leather Riding Gloves',
    slug: 'pro-biker-leather-gloves',
    description: 'Premium motorcycle racing gloves with carbon fiber knuckle protection and reinforced palm sliders for ultimate safety.',
    price: 1200,
    salePrice: 950,
    discountRate: Math.round(((1200 - 950) / 1200) * 100),
    purchasePrice: 600,
    stock: 40,
    sku: 'GR-PB-GLV',
    categorySlug: 'helmets-gear',
    images: ['/assets/images/products/pro-biker-gloves.webp'],
    isFlashSale: true,
    isNewArrival: false,
    isFeatured: false,
    attributes: [{ key: 'Material', value: 'Leather/Carbon Fiber' }]
  },
  {
    name: 'Scoyco Motorcycle Riding Jacket',
    slug: 'scoyco-riding-jacket',
    description: 'All-season mesh riding jacket with CE certified armors on shoulders, elbows, and back. Highly breathable and comfortable.',
    price: 6500,
    purchasePrice: 5000,
    stock: 12,
    sku: 'GR-SC-JKT',
    categorySlug: 'helmets-gear',
    images: ['/assets/images/products/scoyco-riding-jacket.webp'],
    isFlashSale: false,
    isNewArrival: true,
    isFeatured: false,
    attributes: [{ key: 'Brand', value: 'Scoyco' }, { key: 'Protection', value: 'CE Level 1' }]
  },
  {
    name: 'LS2 FF352 Full Face Helmet',
    slug: 'ls2-ff352',
    description: 'Lightweight full face helmet perfect for city commuting. Features a scratch resistant visor and washable inner lining.',
    price: 4200,
    purchasePrice: 3200,
    stock: 25,
    sku: 'HLM-LS2-352',
    categorySlug: 'helmets-gear',
    images: ['/assets/images/products/ls2-ff352.webp'],
    isFlashSale: false,
    isNewArrival: false,
    isFeatured: true,
    attributes: [{ key: 'Brand', value: 'LS2' }, { key: 'Type', value: 'Full Face' }]
  },

  // ==================== TYRES & TUBES ====================
  {
    name: 'MRF Zapper C 100/90-17 Rear Tyre',
    slug: 'mrf-zapper-c',
    description: 'A popular choice for daily commuting. Offers excellent grip on wet and dry roads with a long-lasting tread life.',
    price: 3200,
    salePrice: 2900,
    discountRate: Math.round(((3200 - 2900) / 3200) * 100),
    purchasePrice: 2400,
    stock: 30,
    sku: 'TYR-MRF-ZPC',
    categorySlug: 'tyres-tubes',
    images: ['/assets/images/products/mrf-zapper-c.webp'],
    isFlashSale: true,
    isNewArrival: true,
    isFeatured: false,
    attributes: [{ key: 'Brand', value: 'MRF' }, { key: 'Size', value: '100/90-17' }]
  },
  {
    name: 'Michelin City Pro 90/90-17 Front Tyre',
    slug: 'michelin-city-pro',
    description: 'Designed for urban use, the Michelin City Pro provides exceptional puncture resistance and longevity.',
    price: 3800,
    purchasePrice: 3000,
    stock: 22,
    sku: 'TYR-MCH-CTP',
    categorySlug: 'tyres-tubes',
    images: ['/assets/images/products/michelin-city-pro.webp'],
    isFlashSale: false,
    isNewArrival: false,
    isFeatured: true,
    attributes: [{ key: 'Brand', value: 'Michelin' }, { key: 'Size', value: '90/90-17' }]
  },
  {
    name: 'Timsun TS-659 Dual Sport Tyre',
    slug: 'timsun-ts-659',
    description: 'A heavy-duty dual sport tyre perfect for both on-road and light off-road conditions. Superior grip and durability.',
    price: 4500,
    salePrice: 4000,
    discountRate: Math.round(((4500 - 4000) / 4500) * 100),
    purchasePrice: 3300,
    stock: 18,
    sku: 'TYR-TMS-659',
    categorySlug: 'tyres-tubes',
    images: ['/assets/images/products/timsun-ts-659.webp'],
    isFlashSale: true,
    isNewArrival: false,
    isFeatured: false,
    attributes: [{ key: 'Brand', value: 'Timsun' }, { key: 'Type', value: 'Dual Sport' }]
  },
  {
    name: 'Ceat Zoom XL Tubeless Tyre',
    slug: 'ceat-zoom-xl',
    description: 'High-performance tubeless tyre providing excellent cornering grip and straight-line stability at high speeds.',
    price: 3500,
    purchasePrice: 2600,
    stock: 25,
    sku: 'TYR-CET-ZXL',
    categorySlug: 'tyres-tubes',
    images: ['/assets/images/products/ceat-zoom-xl.webp'],
    isFlashSale: false,
    isNewArrival: true,
    isFeatured: true,
    attributes: [{ key: 'Brand', value: 'Ceat' }, { key: 'Type', value: 'Tubeless' }]
  },
  {
    name: 'Pirelli Diablo Rosso Sport Tyre',
    slug: 'pirelli-diablo-rosso',
    description: 'The ultimate sports tyre for small and mid displacement motorcycles. Racing derived profile for quick handling.',
    price: 7500,
    purchasePrice: 5800,
    stock: 10,
    sku: 'TYR-PIR-DRS',
    categorySlug: 'tyres-tubes',
    images: ['/assets/images/products/pirelli-diablo-rosso.webp'],
    isFlashSale: false,
    isNewArrival: false,
    isFeatured: true,
    attributes: [{ key: 'Brand', value: 'Pirelli' }, { key: 'Compound', value: 'Sport' }]
  },

  // ==================== MODIFICATION & ACCESSORIES ====================
  {
    name: 'HJG Mini Drive LED Fog Light',
    slug: 'hjg-mini-drive',
    description: 'Extremely bright HJG Mini Drive LED fog lights. Dual color (white and yellow) for better visibility in fog and rain.',
    price: 1800,
    salePrice: 1450,
    discountRate: Math.round(((1800 - 1450) / 1800) * 100),
    purchasePrice: 1000,
    stock: 45,
    sku: 'MOD-HJG-MINI',
    categorySlug: 'modification-accessories',
    images: ['/assets/images/products/hjg-mini-drive.webp'],
    isFlashSale: true,
    isNewArrival: true,
    isFeatured: false,
    attributes: [{ key: 'Color', value: 'White & Yellow' }, { key: 'Power', value: '20W' }]
  },
  {
    name: 'Akrapovic Slip-on Exhaust (Custom)',
    slug: 'akrapovic-exhaust',
    description: 'Custom carbon fiber finish slip-on exhaust muffler. Provides a deep, bassy exhaust note and aggressive look.',
    price: 3500,
    purchasePrice: 2200,
    stock: 12,
    sku: 'MOD-AKR-EXH',
    categorySlug: 'modification-accessories',
    images: ['/assets/images/products/akrapovic-exhaust.webp'],
    isFlashSale: false,
    isNewArrival: false,
    isFeatured: true,
    attributes: [{ key: 'Material', value: 'Carbon Fiber Finish' }]
  },
  {
    name: 'Carbon Fiber Frame Sliders',
    slug: 'carbon-frame-sliders',
    description: 'Heavy duty motorcycle frame sliders designed to protect the engine and fairings in the event of a drop.',
    price: 1500,
    salePrice: 1200,
    discountRate: Math.round(((1500 - 1200) / 1500) * 100),
    purchasePrice: 800,
    stock: 35,
    sku: 'MOD-FS-CRB',
    categorySlug: 'modification-accessories',
    images: ['/assets/images/products/frame-sliders.webp'],
    isFlashSale: true,
    isNewArrival: false,
    isFeatured: false,
    attributes: [{ key: 'Material', value: 'Delrin / Aluminum' }]
  },
  {
    name: 'KTM Style LED Indicators',
    slug: 'ktm-style-led-indicators',
    description: 'Set of 4 arrow-shaped flexible LED indicators. Bright amber light for maximum visibility and safety.',
    price: 650,
    purchasePrice: 400,
    stock: 60,
    sku: 'MOD-KTM-IND',
    categorySlug: 'modification-accessories',
    images: ['/assets/images/products/led-indicators.webp'],
    isFlashSale: false,
    isNewArrival: true,
    isFeatured: false,
    attributes: [{ key: 'Light Color', value: 'Amber' }, { key: 'Type', value: 'LED' }]
  },
  {
    name: 'CNC Aluminum Adjustable Brake Levers',
    slug: 'cnc-brake-levers',
    description: 'Premium CNC machined aluminum adjustable brake and clutch levers. Enhances aesthetics and riding comfort.',
    price: 1800,
    salePrice: 1500,
    discountRate: Math.round(((1800 - 1500) / 1800) * 100),
    purchasePrice: 1000,
    stock: 20,
    sku: 'MOD-CNC-LVR',
    categorySlug: 'modification-accessories',
    images: ['/assets/images/products/cnc-brake-levers.webp'],
    isFlashSale: false,
    isNewArrival: false,
    isFeatured: true,
    attributes: [{ key: 'Material', value: 'CNC Aluminum' }, { key: 'Feature', value: '6-Position Adjustable' }]
  },

  // ==================== SPARE PARTS ====================
  {
    name: 'O-Ring Chain Sprocket Set (Rolon)',
    slug: 'chain-sprocket-set',
    description: 'High-durability O-ring chain and sprocket set by Rolon. Ensures smooth power transmission and long chain life.',
    price: 2500,
    salePrice: 2200,
    discountRate: Math.round(((2500 - 2200) / 2500) * 100),
    purchasePrice: 1700,
    stock: 25,
    sku: 'SPR-RLN-CHN',
    categorySlug: 'spare-parts',
    images: ['/assets/images/products/chain-sprocket.webp'],
    isFlashSale: true,
    isNewArrival: true,
    isFeatured: false,
    attributes: [{ key: 'Type', value: 'O-Ring' }, { key: 'Brand', value: 'Rolon' }]
  },
  {
    name: 'NGK Iridium Spark Plug',
    slug: 'ngk-spark-plug',
    description: 'Genuine NGK Iridium spark plug for better acceleration, superior fuel efficiency, and longer lifespan.',
    price: 850,
    purchasePrice: 550,
    stock: 100,
    sku: 'SPR-NGK-IR',
    categorySlug: 'spare-parts',
    images: ['/assets/images/products/ngk-spark-plug.webp'],
    isFlashSale: false,
    isNewArrival: false,
    isFeatured: true,
    attributes: [{ key: 'Material', value: 'Iridium' }, { key: 'Brand', value: 'NGK' }]
  },
  {
    name: 'Bosch Front Disc Brake Pads',
    slug: 'bosch-brake-pads',
    description: 'High-quality sintered disc brake pads from Bosch. Delivers strong stopping power and excellent heat dissipation.',
    price: 550,
    purchasePrice: 350,
    stock: 55,
    sku: 'SPR-BSH-PAD',
    categorySlug: 'spare-parts',
    images: ['/assets/images/products/bosch-brake-pads.webp'],
    isFlashSale: true,
    isNewArrival: false,
    isFeatured: false,
    attributes: [{ key: 'Position', value: 'Front' }, { key: 'Brand', value: 'Bosch' }]
  },
  {
    name: 'Exide 12V Motorcycle Battery',
    slug: 'exide-12v-battery',
    description: 'Maintenance-free 12V VRLA battery for motorcycles. Reliable starting power even in extreme weather conditions.',
    price: 2100,
    purchasePrice: 1600,
    stock: 20,
    sku: 'SPR-EXD-BAT',
    categorySlug: 'spare-parts',
    images: ['/assets/images/products/exide-battery.webp'],
    isFlashSale: false,
    isNewArrival: true,
    isFeatured: true,
    attributes: [{ key: 'Voltage', value: '12V' }, { key: 'Brand', value: 'Exide' }]
  },
  {
    name: 'K&N High Flow Air Filter',
    slug: 'kn-air-filter',
    description: 'Performance high-flow air filter. Washable and reusable, designed to increase horsepower and throttle response.',
    price: 3200,
    purchasePrice: 2100,
    stock: 15,
    sku: 'SPR-KN-FLT',
    categorySlug: 'spare-parts',
    images: ['/assets/images/products/kn-air-filter.webp'],
    isFlashSale: false,
    isNewArrival: false,
    isFeatured: true,
    attributes: [{ key: 'Type', value: 'High Flow' }, { key: 'Brand', value: 'K&N' }]
  }
];

async function seed() {
  try {
    await mongoose.connect(mongodbUri);
    console.log('Connected to MongoDB successfully.');

    // Delete existing products
    const deleteResult = await Product.deleteMany({});
    console.log(`Cleared ${deleteResult.deletedCount} existing products.`);

    // Get all categories to map their ObjectIds
    const categories = await Category.find({});
    const categoryMap = {};
    categories.forEach((cat) => {
      categoryMap[cat.slug] = cat._id;
    });

    // Map categories and create docs
    const productsToInsert = baseProducts.map((p) => {
      const categoryId = categoryMap[p.categorySlug];
      if (!categoryId) {
        console.warn(`Category slug '${p.categorySlug}' not found in DB! Assigning empty array.`);
      }

      return {
        ...p,
        categories: categoryId ? [categoryId] : [],
        isPublished: true,
      };
    });

    const insertResult = await Product.insertMany(productsToInsert);
    console.log(`Seeded ${insertResult.length} new products successfully!`);

  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  }
}

seed();
