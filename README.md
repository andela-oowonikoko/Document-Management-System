[![Code Climate](https://codeclimate.com/github/andela-oowonikoko/Document-Management-System/badges/gpa.svg)](https://codeclimate.com/github/andela-oowonikoko/Document-Management-System)
[![Coverage Status](https://coveralls.io/repos/github/andela-oowonikoko/Document-Management-System/badge.svg?branch=development)](https://coveralls.io/github/andela-oowonikoko/Document-Management-System?branch=development)
[![Build Status](https://travis-ci.org/andela-oowonikoko/Document-Management-System.svg?branch=development)](https://travis-ci.org/andela-oowonikoko/Document-Management-System)

# Document-Management-System

This is a system (API) that manages documents with users and user roles. Each document defines access rights; the document defines which roles can access it. Also, each document specifies the date it was published. It is built with NodeJS, Express and Postgres as it's database.
Source code employs ES6 syntax traspiled down to ES5 using Babel.

### Features
---

**Users**
* Users can sign up/ log into the application
* Regular Users see a dashboard upon sign up/ login where they can
  * View documents (My Documents)
    * Create Documents
    * Edit documents
    * Delete documents
    * View their documents
    * Search for documents
    * Documents have different access levels (public and private).
  * View All Documents (All Documents)
    * View other users documents on public access
    * Search for documents
* Admin users from their dashboard can
  * View all users
  * Delete any user
  * Search for users
  * Search for documents


**Documents**:
Documents can be created and must have:
- title
- content
- access; set by default to public but can be any of `private or public`

**Authentication**:
Users are authenticated and validated using JSON web token (JWT).
By generating a token on registration and login, API endpoints and documents are protected from unauthorised access.
Requests to protected routes are validated using the generated token.


### Endpoints
---

This is the [link](https://mydms-staging.herokuapp.com) to the api documentation of this app. Here's the collection of routes.

#### Users
EndPoint                      |   Functionality
------------------------------|------------------------
POST /users/login         |   Logs in a user.
POST /users/logout        |   Logs out a user.
POST /users               |   Creates a new user.
GET /users                |   Gets all users (available to only the Admin).
GET /users/:id           |   Finds user by id.
PUT /users/:id           |   Updates a user's attributes based on the id specified
DELETE /users/:id        |   Deletes user (available only to the Admin)
GET /users/:id/documents   | Gets all documents for a particular user

#### Documents
EndPoint                      |   Functionality
------------------------------|------------------------
POST /documents           |   Creates a new document instance.
GET /documents            |   Gets all documents.
GET /documents/:id       |   Find document by id.
PUT /documents/:id       |   Updates a document attributes.
DELETE /documents/:id    |   Delete document.
GET search/documents/?q=${query} | Get all documents with title containing the search query

#### Roles
EndPoint                      |   Functionality
------------------------------|------------------------
GET /roles/               |   Get all Roles.
POST /roles/               |   Create a Role.
PUT /roles/:id               |   Edit a Role.
DELETE /roles/:id               |   Delete a Role.

It should be noted that the endpoints for roles here are only available to the Admin.


### Technologies Used
---

- ReactJS with Redux
- Material Design CSS Framework
- SASS/SCSS
- JavaScript (ES6)
- Node.js
- Express
- Postgresql
- Sequelize ORM.


### Installation
---

- Clone the project repository.
- Run git clone https://github.com/andela-oowonikoko/Document-Management-System.git
- Change directory into the Document-Management-System directory.
- Run npm install to install the dependencies in the package.json file.
- Use Postman or any API testing tool of your choice to access the endpoints defined above.


#### Contributing
---

1. Fork this repository to your account.
2. Clone your repository: git clone https://github.com/andela-oowonikoko/Document-Management-System.git
3. Create your feature branch: git checkout -b new-feature
4. Commit your changes: git commit -m "did something"
5. Push to the remote branch: git push origin new-feature
6. Open a pull request.

#### Licence
ISC

Copyright (c) 2017 Oluwaseun Owonikoko