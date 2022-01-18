# Backend example

## About

This project was created for teaching purposes. As an Instructor at [Wild Code School in Lisbon campus](https://www.wildcodeschool.com/en-GB/campuses/lisbon), I've felt the need of offering a more concise and complete code of a Node.JS REST API example to my students, as closest as possible to a real project.

Note: You need have some previews knowledge about JavaScript, Node.JS and REST APIs.

### Contacts

Feel free to reach me at any point in time through [LinkedIn](http://linkedin.com/in/geomarb) or [Twitter](http://twitter.com/geomarb).

### Suggestions and Contributions

This project is free, but keep in mind, there are some hours of work behind it. If you use it, please, reference it. Your contributions and suggestions are welcome. If you find something you would prefer a different approach, please don't hold this information for you, contact me and let's talk about it, we both will grow with this kind of attitude. If you are here, you are automatically invited to be part of it.

### Main Goals

#### Show how to

- implement a **REST API** with **Node.JS** + **Express**
- handle authentication and authorization
- name: `variables`, `functions`, `folders` and `files`
- implement: `middlewares`, `routes`, `controlers`, `services`, `models`, `validators`, `helpers`
- to connect with a Database
- handle async tasks
- structure a project
- apply some best practices
- don't repeat yourself (DRY)
- keep it simple (and) stupid (KISS)

Note: The `services` and `controllers` layers could be implemented strait in the `router` layer. I prefer to have them separated like this since the beginning, but it is a personal taste, don't implement them like this if you don't feel the need of.

## Description

This Project is a basic, but almost complete User Management REST API with Authentication, Registration, Session Management, Admin and User roles. For this we are treating to different User's roles: **`user`**, and **`adm`**.

### Roles

- **`user`**: can register him/herself, access, update, or delete his own profile, cannot set him/herself with admin role, cannot see, add, update or delete other users
- **`adm`**: can register him/herself, access, update, or delete his own profile, cannot set him/herself with admin role, can see, add, update or delete other users and even promote other users to **`adm`**

### HTTP Requests' Flow

`client` > `app` > `middlewares` > `routes` > `controllers` > `services` > `models`

### HTTP Responses' Flow

- Success: `models` > `services` > `controller` > `client`
- Error: `models` > `services` > `controller` > `error-handling-middleware` > `client`

Note: The `helpers` and the `validators` are called in the `controllers` and the `services` layers.

## How to install an run this project

- clone this repository and go to its folder
- execute `npm install` to install all the dependencies
- create a `.env` file in the root folder and add the variables: `HOST`, `PORT`, `DB_PORT`, `DB_NAME`, `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `JWT_PRIVATE_KEY` on it
- make sure you have a MySQL database up an running, it can be in your computer or in remote server, you will provide `DB_PORT`, `DB_NAME`, `DB_HOST`, `DB_USER`, `DB_PASSWORD` variables to allow the server to properly connect with your database
- run the `create-db.sql` scripts in your database before starting the server
- once you are all set about the previews steps, execute the command `npm run dev`

## Packages

### Dependencies

- **[argon2](https://www.npmjs.com/package/argon2)**: to encrypt/compare the passwords
- **[cookie-parser](https://www.npmjs.com/package/cookie-parser)**: to parse the cookies
- **[cors](https://www.npmjs.com/package/cors)**: to set the origin header on the HTTP Response
- **[dotenv](https://www.npmjs.com/package/dotenv)**: to load and set the environment variables from the `.env`file
- **[express](https://www.npmjs.com/package/express)**: to parse the Http Requests and Responses
- **[express-async-handler](https://www.npmjs.com/package/express-async-handler)**: to handle async tasks and to catch and throw errors properly
- **[joi](https://www.npmjs.com/package/joi)**: to validate the data schema
- **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)**: to generate/decode the tokens sent in the auth cookies
- **[mysql2](https://www.npmjs.com/package/mysql2)**: to connect with the MySQL database and execute queries

### Dev Dependencies

- **[nodemon](https://www.npmjs.com/package/nodemon)**: to automatically restart the project when changing the code

## Project Structure Tree

```console

/ (root of the project)
|
+-- src/
|  |
|  +-- config/
|  |  |
|  |  +-- db.js
|  |
|  +-- controllers/
|  |  |
|  |  +-- index.js
|  |  |
|  |  +-- auth.controller.js
|  |  |
|  |  +-- user.controller.js
|  |
|  +-- helpers/
|  |  |
|  |  +-- index.js
|  |  |
|  |  +-- auth.helper.js
|  |  |
|  |  +-- user.helper.js
|  |
|  +-- middlewares/
|  |  |
|  |  +-- auth.middleware.js
|  |  |
|  |  +-- error-handling.middleware.js
|  |  |
|  |  +-- index.js
|  |  |
|  |  +-- protect.middleware.js
|  |
|  +-- models/
|  |  |
|  |  +-- index.js
|  |  |
|  |  +-- user.model.js
|  |
|  +-- routes/
|  |  |
|  |  +-- auth.router.js
|  |  |
|  |  +-- index.js
|  |  |
|  |  +-- user.router.js
|  |
|  +-- services/
|  |  |
|  |  +-- auth.service.js
|  |  |
|  |  +-- index.js
|  |  |
|  |  +-- user.service.js
|  |
|  +-- validators/
|  |  |
|  |  +-- auth.validator.js
|  |  |
|  |  +-- index.js
|  |  |
|  |  +-- user.validator.js
|  |
|  +-- app.js
|  |
|  +-- error-types.js
|  |
|  +-- index.js
|
+-- .env

```

### Endpoints

| Method | Endpoint       | Description                     | Path Parameter | Query Parameter   | Access Control | Request Body                           | Response Body                          | Response Status |
| ------ | -------------- | ------------------------------- | -------------- | ----------------- | -------------- | -------------------------------------- | -------------------------------------- | --------------- |
| POST   | /auth/register | Self register                   | none           | none              | none           | new user's name, email, role, password | id, name, email, role                  | 201             |
| POST   | /auth/login    | Create a new login session      | none           | none              | none           | user's email and password              | id, name, email, role                  | 200             |
| GET    | /auth/logout   | Delete the current session      | none           | none              | logged user    | none                                   | none                                   | 200             |
| GET    | /auth/current  | Get logged user's profile       | none           | none              | logged user    | none                                   | none                                   | 200             |
| PUT    | /auth/current  | Update user's profile           | none           | none              | logged user    | user's name, email, role, password     | none                                   | 200             |
| PATCH  | /auth/password | Update user's password          | none           | none              | logged user    | user's new password                    | none                                   | 200             |
| GET    | /api/users     | Returns a list with all users   | none           | role, email, name | adm role only  | none                                   | list of users                          | 200             |
| GET    | /api/users/:id | Returns a single user by its id | id             | none              | adm role only  | none                                   | a single user                          | 200             |
| POST   | /api/users     | Create a new user               | none           | none              | adm role only  | new user's name, email                 | id, name, email, email                 | 201             |
| PUT    | /api/users/:id | Update a user                   | id             | none              | adm role only  | user's name, email, role, password     | updated name, email and/or role        | 200             |
| DELETE | /api/users/:id | Delete a user                   | id             | none              | adm role only  | none                                   | id, name and email of the deleted user | 200             |
