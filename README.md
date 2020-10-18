## Information Management System

Information management system is a system that contains api endpoints for user by the client side.

### Development

This application was developed using the following:

- NodeJs
- Express
- Mongodb

### Tools and Modules Required

The following are required to enable you run this locally

- [NodeJs](https://nodejs.org/en) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- Express - fast node.js network app framework
- [Mongodb](https://docs.mongodb.com/)- A NoSQL database
- [Postman](https://www.getpostman.com/) - To test APi's

### Features!

- Creation of new users
- Fetch authorised user

### Installation

---

```sh
$ git clone https://github.com/daisymacharia/Infor-manage.git
$ cd Infor-manage
```

- create a .env file example below

```
PORT=8080
MONGO_USER=****
MONGO_PASSWORD=****
MONGO_DB=****
APP_SECRET=***
REACT_APP_URL=http://localhost:3000
```

- run `yarn install`

- run `yarn start`

### Endpoints

| EndPoint       | Functionality                 |
| -------------- | ----------------------------- |
| POST /login    | Login an existing user        |
| POST /register | Register a new user           |
| GET /users     | Get new an authenticated User |
| POST /logout   | Logout a logged in user       |
