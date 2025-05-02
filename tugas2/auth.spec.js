require('dotenv').config();
const chai = require ('chai');
const expect = chai.expect;
const supertest = require('supertest'); 

const username = process.env.AUTH_USERNAME;
const password = process.env.AUTH_PASSWORD;

const apiRequest = supertest.agent('https://restful-booker.herokuapp.com');

let credential = {
    username : username,
    password : password
}

describe('Auth API', function(){
    it('dapatkan token', async function() {
        this.timeout(600000);
        
        const response = await apiRequest
        .post('/auth')
        .set('Content-Type', 'application/json')
        .send(credential)

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('token');

        console.log("status code: ", response.status);
        console.log("token: ", response.body.token);
    });

})



