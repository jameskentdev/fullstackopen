describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    cy.createUser({
      name: 'Teddy Kent',
      username: 'teddy',
      password: 'password',
    });
    cy.visit('');
  });

  it('Login form is shown', function () {
    cy.contains('log in to application');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('teddy');
      cy.get('#password').type('password');
      cy.contains('login').click();
      cy.contains('Teddy Kent logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('teddy');
      cy.get('#password').type('wrong');
      cy.contains('login').click();

      cy.get('.notification')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid');

      cy.get('html').should('not.contain', 'Teddy Kent logged in');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'teddy', password: 'password' });
    });

    it('A blog can be created', function () {
      cy.contains('new note').click();
      cy.contains('create new');

      cy.contains('title').type('new blog');
      cy.contains('author').type('Mishka Aldanova');
      cy.contains('url').type('http://example.com');
      cy.get('#submit-button').click();

      cy.contains('new blog Mishka Aldanova');
    });

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'blog one',
          author: 'Mishka Aldanova',
          url: 'http://example.com',
          likes: 1,
        });
        cy.createBlog({
          title: 'blog two',
          author: 'Mishka Aldanova',
          url: 'http://example.com',
          likes: 2,
        });
        cy.createBlog({
          title: 'blog three',
          author: 'Mishka Aldanova',
          url: 'http://example.com',
          likes: 3,
        });

        cy.contains('blog one').parent().find('button').as('viewButton');
        cy.get('@viewButton').click();
      });

      it('a blog can be liked', function () {
        cy.contains('1 likes').parent().find('button').as('likeButton');
        cy.get('@likeButton').click();
        cy.contains('2 likes');
      });

      it('a blog can be deleted', function () {
        cy.contains('remove').click();
        cy.get('html').should('not.contain', 'blog one');
      });

      it('only creators can delete a blog', function () {
        cy.createUser({
          name: 'Mishka Kent',
          username: 'mishka',
          password: 'password',
        });

        cy.contains('log out').click();
        cy.login({ username: 'mishka', password: 'password' });
        cy.get('@viewButton').click();
        cy.get('.blog').should('not.contain', 'remove');
      });

      it('blogs are ordered by likes', function () {
        cy.get('.blog').eq(0).should('contain', 'blog three');
        cy.get('.blog').eq(1).should('contain', 'blog two');
        cy.get('.blog').eq(2).should('contain', 'blog one');
      });
    });
  });
});
