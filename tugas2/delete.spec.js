const chai = require('chai');
const expect = chai.expect;
const supertest = require('supertest');

const apiRequest = supertest.agent('https://restful-booker.herokuapp.com');


const token = 'bf3e15d9ce9fadb'; 

describe('DELETE Booking API', function () {
    it('berhasil menghapus booking dengan ID valid', async function () {
        this.timeout(10000);
        const bookingIdToDelete = 1;

        const deleteResponse = await apiRequest
            .delete(`/booking/${bookingIdToDelete}`)
            .set('Content-Type', 'application/json')
            .set('Cookie', `token=${token}`);

        expect([200, 201, 204]).to.include(deleteResponse.status);
        console.log('Status Code:', deleteResponse.status);
    });
});
