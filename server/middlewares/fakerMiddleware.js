/**
 * Faker middleware
 */

const faker = require('faker');

class Appartment {
  constructor(index) {
    this.index = index;
    this.nbPictures = 5;
    this.areaMin = 25;
    this.areaMax = 150;
    this.peopleMax = 10;
    this.bedsMax = 7;
    this.roomsMax = 5;


    this.appartment = {
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

  getAppartment() {
    return this.appartment;
  }

  getTitle() {
    return 'Appartment n° ' + this.index;
  }

  getDescription() {
    return faker.lorem.paragraphs();
  }

  getPictures() {
    let pictures = [];
    for(let i=0; i<this.nbPictures; i++) {
      pictures.push('https://picsum.photos/500/500/?random');
    }
    return pictures;
  }

  getAddress() {
    return faker.address.streetAddress() + ', ' + faker.address.zipCode() + ' ' + faker.address.city()
  }

  getArea() {
    return Math.floor(Math.random() * (this.areaMax - this.areaMin) + this.areaMin);
  }

  getPeople() {
    return Math.floor(Math.random() * (this.peopleMax - 1) + 1);
  }

  getBeds() {
    return Math.floor(Math.random() * (this.bedsMax - 1) + 1);
  }

  getRooms() {
    return Math.floor(Math.random() * (this.roomsMax - 1) + 1);
  }

  getPrice() {
    return Math.floor(Math.random() * (150 - 50) + 50);
  }

  getBoolean() {
    return faker.random.boolean();
  }
}


module.exports = () => {
  let appartments = [];
  for (let i=0; i<10; i++) {
    appartments.push(new Appartment(i).getAppartment());
  }
  return appartments;
};
