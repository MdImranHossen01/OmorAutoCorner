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

const FAQSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const FAQ = mongoose.models.FAQ || mongoose.model('FAQ', FAQSchema);

const faqs = [
  {
    question: 'What type of products does Omor Auto Corner offer?',
    answer: 'Omor Auto Corner specializes in premium motorcycle parts and accessories. We offer authentic engine oils, safety gear like DOT/ECE certified helmets and gloves, high-grip tyres, modification items like LED fog lights, and genuine spare parts.',
    order: 1,
    isActive: true,
  },
  {
    question: 'Are your helmets and engine oils 100% authentic?',
    answer: 'Yes, absolutely! We guarantee that all our products, including MT/Axor helmets and Motul/Shell engine oils, are 100% genuine and sourced directly from authorized distributors.',
    order: 2,
    isActive: true,
  },
  {
    question: 'What are the shipping charges and delivery times?',
    answer: 'Delivery within Dhaka takes 24 to 48 hours with a shipping fee of 60 BDT. For locations outside Dhaka, shipping is 120 BDT and delivery takes 2 to 4 business days via our courier partners.',
    order: 3,
    isActive: true,
  },
  {
    question: 'Do you offer installation or fitting services for accessories?',
    answer: 'Currently, we operate as an online retail store and do not provide direct installation services. However, any local motorcycle mechanic can easily install our accessories and spare parts.',
    order: 4,
    isActive: true,
  },
  {
    question: 'What is your return and exchange policy?',
    answer: 'We accept returns within 3 days of delivery if the product is defective, damaged during transit, or if you received the wrong item. Please ensure the product is unused and in its original packaging.',
    order: 5,
    isActive: true,
  }
];

async function seed() {
  try {
    await mongoose.connect(mongodbUri);
    console.log('Connected to MongoDB successfully.');

    // Clear existing FAQs
    const deleteResult = await FAQ.deleteMany({});
    console.log(`Cleared ${deleteResult.deletedCount} existing FAQs.`);

    // Insert new FAQs
    const insertResult = await FAQ.insertMany(faqs);
    console.log(`Seeded ${insertResult.length} FAQs successfully:`);
    insertResult.forEach((f, i) => {
      console.log(`[FAQ ${i + 1}] Question: "${f.question}"`);
    });

  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  }
}

seed();
