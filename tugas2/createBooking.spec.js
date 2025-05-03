const json = require('../data/bookingData.json');
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const apiRequest = request.agent('https://restful-booker.herokuapp.com');

const endpoint = '/booking'
const header = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

const modifikasiData = () => {
  const data = JSON.parse(JSON.stringify(json));
  data.firstname = 'ivo';
  data.lastname = 'nazala';
  data.totalprice = 6478;
  return data;  
};

let bookingId = null;
let bookingData = null;

describe('Create Booking API', function () {
  it('berhasil membuat booking baru', async function () {
    

    this.timeout(600000);
    bookingData = modifikasiData()

    const response = await apiRequest
      .post(endpoint)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(bookingData);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('bookingid');
    expect(response.body.booking).to.include({

      firstname: bookingData.firstname,
      lastname: bookingData.lastname
    });
    bookingId = response.body.bookingid
    console.log('create booking id : ', bookingId);
  });

  it('get data yang sudah dibuat', async function() {
    this.timeout(600000)
    const response = await apiRequest
    .get(`/booking/${bookingId}`)
    .set('Accept', 'application/json')

    expect(response.status).to.equal(200);
    expect(response.body).to.include({
      firstname: bookingData.firstname,
      lastname: bookingData.lastname,
      totalprice: bookingData.totalprice,
      depositpaid: bookingData.depositpaid,
      additionalneeds: bookingData.additionalneeds
    });
    expect(response.body.bookingdates).to.deep.equal(bookingData.bookingdates);

    console.log('Get Booking Data:', response.body);
  })

});
