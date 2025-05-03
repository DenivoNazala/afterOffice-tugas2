require('dotenv').config();
const chai = require('chai');
const expect = chai.expect;
const supertest = require('supertest');

const apiRequest = supertest.agent('https://restful-booker.herokuapp.com');

const username = process.env.AUTH_USERNAME;
const password = process.env.AUTH_PASSWORD;

let token = ''; 

describe('Auth API', function () {
    it('dapatkan token', async function () {
        this.timeout(10000);

        const response = await apiRequest
            .post('/auth')
            .set('Content-Type', 'application/json')
            .send({ username, password });

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('token');

        token = response.body.token;

        console.log("Status Code:", response.status);
        console.log("Token:", token);
    });
});

module.exports = { token };
