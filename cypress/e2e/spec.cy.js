import tags from '../fixtures/tags.json';
import { faker } from '@faker-js/faker'; 
import articles from '../fixtures/atricles.json'; 

tags.tags[0] = faker.animalmal.bird()
tags.tags[1] = faker.animalmal.bird()
tags.tags[2] = faker.animalmal.bird()

let article = articles.articles[0];

article.title = faker.music.genre()
article.description = faker.music.songName()
article.body = faker.music.songName()

articles.articles[2] = article;
article.articlesCount = 3;

    it('Login', () => {
    cy.log('Prepare intercept comand for tags list')
    cy.intercept('GET', '**/tags', tags)
     
    cy.log('Open home page')
    cy.visit('https://2c86-212-90-61-121.eu.ngrok.io/')

    cy.log('Log in user')
     cy.get('a[href="/user/login"]').click(); 
     cy.get('[placeholder="Email"]').type('miroslava_yankovska@ukr.net');
     cy.get('[placeholder="Password"]').type('MiraMiraYank1997');
     cy.get('button[type="submit"]').click();

     cy.log('verify fake tags on page')
     for(let i = 0; i < tags.tags.length; i++){
     cy.get('a.tag-pill').should('contain', tags.tags[i]);
     }
})

it('Fake articles', () => {
    cy.log('Prepare intercept comand for tags list')
    cy.intercept('GET', '**/articles/feed**', articles)

    cy.log('Open home page')
    cy.visit('https://2c86-212-90-61-121.eu.ngrok.io/')

    cy.log('Log in user')
     cy.get('a[href="/user/login"]').click(); 
     cy.get('[placeholder="Email"]').type('miroslava_yankovska@ukr.net');
     cy.get('[placeholder="Password"]').type('MiraMiraYank1997');
     cy.get('button[type="submit"]').click();

     cy.contains('li.nav-item', 'Global Feed').click();

        for(let i = 0; i < articles.articles.length; i++){
            cy.contains('.preview-link', articles.articles[i].description)
            .should('contain', articles.articles[i].description)
            .and('contain', articles.articles[i].title);
        }
})

