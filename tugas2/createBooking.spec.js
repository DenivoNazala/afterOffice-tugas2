const json = require('../data/bookingData.json');
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const apiRequest = request.agent('https://restful-booker.herokuapp.com');

describe('Create Booking API', function () {
  it('berhasil membuat booking baru', async function () {
    this.timeout(600000);
    let bookingData = JSON.parse(JSON.stringify(json)); // deep copy
    
    // Modifikasi data di sini
    bookingData.firstname = 'ivo';
    bookingData.lastname = 'nazala';
    bookingData.totalprice = 123;

    const response = await apiRequest
      .post('/booking')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(bookingData);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('bookingid');
    expect(response.body.booking).to.include({
      firstname: bookingData.firstname,
      lastname: bookingData.lastname
    });

    console.log(response.body);
  });

  
});
