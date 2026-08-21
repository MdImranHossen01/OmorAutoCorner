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

const GlobalSettingsSchema = new mongoose.Schema({}, { strict: false, collection: 'globalsettings' });
const GlobalSettings = mongoose.models.GlobalSettings || mongoose.model('GlobalSettings', GlobalSettingsSchema);

const testimonialsData = [
  {
    name: 'Rakib Hasan',
    role: 'Bike Enthusiast',
    content: 'Bought Motul 7100 and an MT helmet. Very fast delivery and 100% genuine products. Highly recommended for bikers!',
    image: 'https://i.pravatar.cc/150?u=rakib',
    rating: 5
  },
  {
    name: 'Mahbubul Alam',
    role: 'Daily Commuter',
    content: 'Changed my MRF tyres from Omor Auto Corner. The grip is fantastic and the price was very reasonable compared to the local market.',
    image: 'https://i.pravatar.cc/150?u=mahbub',
    rating: 5
  },
  {
    name: 'Siam Ahmed',
    role: 'Tourer',
    content: 'Their customer service is top-notch. I ordered fog lights for my Sylhet tour and received them within 2 days perfectly packed.',
    image: 'https://i.pravatar.cc/150?u=siam',
    rating: 5
  },
  {
    name: 'Kazi Asif',
    role: 'Student',
    content: 'Installed the Akrapovic slip-on exhaust and CNC brake levers. My bike looks and sounds amazing now. Thanks Omor Auto Corner!',
    image: 'https://i.pravatar.cc/150?u=kazi',
    rating: 4
  },
  {
    name: 'Tanjirul Islam',
    role: 'Professional Rider',
    content: 'Best place to buy authentic safety gear in Bangladesh. The Axor Apex helmet I got is original and fits perfectly.',
    image: 'https://i.pravatar.cc/150?u=tanjirul',
    rating: 5
  }
];

async function seedTestimonials() {
  try {
    await mongoose.connect(mongodbUri);
    console.log('Connected to MongoDB successfully.');

    let settings = await GlobalSettings.findOne({});
    
    if (settings) {
      await GlobalSettings.updateOne(
        { _id: settings._id }, 
        { $set: { testimonials: testimonialsData } }
      );
      console.log('Successfully updated GlobalSettings with 5 new motorcycle relevant testimonials.');
    } else {
      await GlobalSettings.create({ testimonials: testimonialsData });
      console.log('Created new GlobalSettings with testimonials.');
    }

  } catch (error) {
    console.error('Error seeding testimonials:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  }
}

seedTestimonials();
