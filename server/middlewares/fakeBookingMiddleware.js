/**
 * Fake Booking middleware
 */
const faker = require('faker');

const AREA_MIN = 25;
const AREA_MAX = 150;
const BEDS_MIN = 2;
const BEDS_MAX = 10;
const NB_PICTURES = 5;
const PEOPLE_MIN = 1;
const PEOPLE_MAX = 10;
const PRICE_MIN = 25;
const PRICE_MAX = 250;
const ROOMS_MIN = 2;
const ROOMS_MAX = 10;

class Apartment {
  constructor(index) {
    this.apartment = {
      id: this.index,
      title: this.getTitle(),
      description: this.getDescription(),
      pictures: this.getPictures(),
      address: this.getAddress(),
      area: this.getArea(),
      nbPeople: this.getPeople(),
      nbBeds: this.getBeds(),
      nbRooms: this.getRooms(),
      wifi: this.getBoolean(),
      carPark: this.getBoolean(),
      price: this.getPrice(),
    }
  }

  getApartment() {
    return this.apartment;
  }

  getTitle() {
    return 'Appartment n° ' + this.index;
  }

  getDescription() {
    return faker.lorem.paragraphs();
  }

  getPictures() {
    let pictures = [];
    for(let i=0; i < NB_PICTURES; i++) {
      pictures.push('https://picsum.photos/500/500/?random');
    }
    return pictures;
  }

  getAddress() {
    return faker.address.streetAddress() + ', ' + faker.address.zipCode() + ' ' + faker.address.city()
  }

  getArea() {
    return Math.floor(Math.random() * (AREA_MAX - AREA_MIN) + AREA_MIN);
  }

  getPeople() {
    return Math.floor(Math.random() * (PEOPLE_MAX - PEOPLE_MIN) + PEOPLE_MIN);
  }

  getBeds() {
    return Math.floor(Math.random() * (BEDS_MAX - BEDS_MIN) + BEDS_MIN);
  }

  getRooms() {
    return Math.floor(Math.random() * (ROOMS_MAX - ROOMS_MIN) + ROOMS_MIN);
  }

  getPrice() {
    return Math.floor(Math.random() * (PRICE_MAX - PRICE_MIN) + PRICE_MIN);
  }

  getBoolean() {
    return faker.random.boolean();
  }
}

module.exports = (req, res, next) => {
  let apartments = [];
  for (let i=0; i<10; i++) {
    apartments.push(new Apartment(i).getApartment());
  }

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({bookingData: apartments}));
};
