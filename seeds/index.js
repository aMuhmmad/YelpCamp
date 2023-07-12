const mongoose = require('mongoose');
const Campground = require('../models/campground');

const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        await Campground.create({
            author: '649ae50957ee18bbff368ecf',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: `https://source.unsplash.com/random/300x300?camping,${i}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/ding7zvwj/image/upload/v1688069846/YelpCamp/e8opzsywtni55jedudfw.webp',
                    filename: 'YelpCamp/e8opzsywtni55jedudfw'
                },
                {
                    url: 'https://res.cloudinary.com/ding7zvwj/image/upload/v1688069847/YelpCamp/bjppgl654iwew7q2tt2a.jpg',
                    filename: 'YelpCamp/bjppgl654iwew7q2tt2a'
                }
            ],
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut accusantium, quos velit aspernatur a tempore, veritatis officiis ex molestiae enim minus suscipit id consequuntur magni at perspiciatis. Iusto, explicabo laudantium!',
            price
        })

    }
}

seedDB().then(() => {
    db.close();
})