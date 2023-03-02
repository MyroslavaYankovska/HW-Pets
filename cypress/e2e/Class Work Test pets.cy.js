///<reference types="cypress"/>
import { faker } from '@faker-js/faker';
import pet from '../fixtures/pet.json';
import pet2 from '../fixtures/pet2.json'

//let petId;

pet.id = parseInt(faker.random.numeric(5));
pet.name = faker.animal.crocodilia.name;
pet.category.id = parseInt(faker.random.numeric(3));
pet.category.name = faker.animal.type();

pet2.id = parseInt(faker.random.numeric(5));
pet2.name = faker.animal.crocodilia.name;
pet2.category.id = parseInt(faker.random.numeric(3));
pet2.category.name = faker.animal.type();

let Status = 'available';


const formData  = {
    petID: `${pet2.id}` ,
    name: `${pet2.name}`,
    status: `${Status}`
}


describe('Pet suite', () => {

  it('Pet creation', () => {
    cy.log('Create pet');
    cy.request('POST', '/pet', pet).then( response => {
      console.log(response);
      cy.log(`Request body: ${response.allRequestResponses[0]["Request Body"]}`);
      cy.log(`Request headers:  ${JSON.stringify(response.allRequestResponses[0]["Request Headers"])}`);
      cy.log(`Request Url:  ${JSON.stringify(response.allRequestResponses[0]["Request URL"])}`);
      expect(response.status).to.be.equal(200);
      expect(response.statusText).to.be.equal('OK');
      expect(response.isOkStatusCode).to.be.true;
      expect(response.body.id).to.be.equal(pet.id);
      expect(response.body.name).to.be.equal(pet.name);
      expect(response.body.category.id).to.be.equal(pet.category.id);
      expect(response.body.category.name).to.be.equal(pet.category.name);
      //petId = response.body.id;
      //console.log(petId)
    })
  })

  it('Get pet with id ${pet.id}', () => {
    cy.log('Get pet with id ${pet.id}');
    cy.request('GET', `/pet/${pet.id}`).then( response => {
      console.log(response);
      cy.log(`Request body: ${response.allRequestResponses[0]["Request Body"]}`);
      cy.log(`Request headers:  ${JSON.stringify(response.allRequestResponses[0]["Request Headers"])}`);
      cy.log(`Request Url:  ${JSON.stringify(response.allRequestResponses[0]["Request URL"])}`);
      expect(response.status).to.be.equal(200);
      expect(response.statusText).to.be.equal('OK');
      expect(response.isOkStatusCode).to.be.true;
      expect(response.body.id).to.be.equal(pet.id);
      expect(response.body.name).to.be.equal(pet.name);
      expect(response.body.category.id).to.be.equal(pet.category.id);
      expect(response.body.category.name).to.be.equal(pet.category.name);
    })
  })

  it('Update pet with id', () => {
    cy.log('Update pet');
    cy.request('PUT', '/pet', pet2 ).then( response => {
      console.log(response);
      cy.log(`Request body: ${response.allRequestResponses[0]["Request Body"]}`);
      cy.log(`Request headers:  ${JSON.stringify(response.allRequestResponses[0]["Request Headers"])}`);
      cy.log(`Request Url:  ${JSON.stringify(response.allRequestResponses[0]["Request URL"])}`);
      expect(response.status).to.be.equal(200);
      expect(response.statusText).to.be.equal('OK');
      expect(response.isOkStatusCode).to.be.true;
      expect(response.body.id).to.be.equal(pet2.id);
      expect(response.body.name).to.be.equal(pet2.name);
      expect(response.body.category.id).to.be.equal(pet2.category.id);
      expect(response.body.category.name).to.be.equal(pet2.category.name);
      
    })
})

it('Find pet by status ${pet.status}', () => {
  cy.log('Find pet by status');
  cy.request('GET', `/pet/findByStatus?status=${Status}`, pet).then( response => {
    console.log(response);
      cy.log(`Request body: ${response.allRequestResponses[0]["Request Body"]}`);
      cy.log(`Request headers:  ${JSON.stringify(response.allRequestResponses[0]["Request Headers"])}`);
      cy.log(`Request Url:  ${JSON.stringify(response.allRequestResponses[0]["Request URL"])}`);
      
    expect(response.status).to.be.equal(200);
    expect(response.statusText).to.be.equal('OK'); 
    expect(response.body.length).to.be.equal(response.body.filter(pet =>pet.status === Status).length);
  
  })
})
 
    it('Update pet with id using form data', () => {
    cy.log('Update pet with id ${pet.id} using form data');
      cy.request('POST', `/pet/${pet2.id}`, formData.petID ).then( response => {
        console.log(response);
        cy.log(`Request body: ${response.allRequestResponses[0]["Request Body"]}`);
        cy.log(`Request headers:  ${JSON.stringify(response.allRequestResponses[0]["Request Headers"])}`);
        cy.log(`Request Url:  ${JSON.stringify(response.allRequestResponses[0]["Request URL"])}`);

        expect(response.status).to.be.equal(200);
        expect(response.statusText).to.be.equal('OK');
        expect(response.isOkStatusCode).to.be.true;
        expect(response.body.code).to.be.equal(200);
        expect(response.body.type).to.be.equal('unknown');
        expect(response.body.message).to.be.equal(`${pet2.id}`);
 
      })
  })


  it('Delete pet with id ${pet.id}', () => {
    cy.log('Delete pet');
    cy.request('DELETE', `/pet/${pet.id}`, pet).then( response => {
      console.log(response);
      cy.log(`Request body: ${response.allRequestResponses[0]["Request Body"]}`);
      cy.log(`Request headers:  ${JSON.stringify(response.allRequestResponses[0]["Request Headers"])}`);
      cy.log(`Request Url:  ${JSON.stringify(response.allRequestResponses[0]["Request URL"])}`);
      expect(response.body.code).to.be.equal(200);
      expect(response.body.type).to.be.equal('unknown');
      expect(response.body.message).to.be.equal(`${pet.id}`);
      

    })
})
})