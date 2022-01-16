# Backend example

## About

The idea behind it come out when I felt the need of providing my JavaScript students, at [Wild Code School in Lisbon campus](https://www.wildcodeschool.com/en-GB/campuses/lisbon), with more concise and complete code of an API example. As closest as possible of real project that will find when working after our training course.

### Contacts

Please, feel free to contact me on this project was created by Geomar Bastiani ([LinkedIn](http://linkedin.com/in/geomarb), [Twitter](http://twitter.com/geomarb), ) . The development was started in December of 2021. It implements a Node.JS REST API with express.

### Goals

#### Show how to

- structure a project (folders and files)
- apply best practices
- DRY: Don't Repeat Yourself

the folders and the code files, Authentication, Authorization, Middleware, etc. We have here 2 layers: Services and Controllers that is not really needed, for a project with this size and complexity we could call the Models strait from the Routes.

## Description

This Project is a basic, but almost complete User Management REST API with: Authentication, Registration, Session Management, Admin and User roles.

### Roles

- **User**: can register himself, see, change, and delete his own profile, but cannot set himself with admin role
- **Admin**: can see all registered users and admins, add, delete and change any other users and set them as admin

## Flow of the HTTP Requests and Responses

- REQUEST: `client > app > middlewares > routes > controllers > services > models`
- RESPONSE (`success`): `models > services > controller > client`
- RESPONSE (`error`): `models > services > controller > error-handling-middleware > client`

Note: The helpers and the validators are used in the `controllers` and the `services` layers

## How to install this project

- Clone this repository and use `npm install` to install all the dependencies
- Create the `.env` file in the root folder
- Add the variables: `HOST, PORT, DB_PORT, DB_NAME, DB_HOST, DB_USER, DB_PASSWORD, JWT_PRIVATE_KEY` in the `.env` file
- Make sure you have Mysql installed, up an running
- Run the `create-db.sql` scripts in your database
- Execute the command `npm run dev`

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

### Project Structure Tree creation via console/terminal

- clone in your local machine the repository you created in your GitHub account
- go into the cloned folder
- create all folders from above structure with `mkdir -p` command
- create all files listed about in the correct folders with the command `touch`
- create a new branch and checkout it in git
- stage all changes
- commit all changes
- push the committed changes to the remote repository in GitHub

```console
git clone git@github.com:geomarb/backend-example.git
cd backend-example
mkdir -p src/config src/controllers src/middlewares src/models src/routes src/services
touch .env
touch src/index.js src/app.js
touch src/controllers/user.controller.js src/controllers/auth.controller.js
touch src/middlewares/auth.middleware.js src/middlewares/error-handler.middleware.js
touch src/models/user.model.js
touch src/routes/index.js src/routes/user.routes.js src/routes/auth.routes.js
touch src/services/index.js src/services/user.service.js src/services/auth.service.js
git checkout -b step-01-structure
git add .
git commit -m "create structure"
git push --set-upstream origin step-01-structure
```

## Step 2 - Add NPM packages

### branch: [step-02-adding-npm-packages](https://github.com/geomarb/backend-example/tree/step-02-adding-npm-packages)

- create a new branch in git
- init npm to create the package.json file
- stage, commit and push the changes to the remote repository in GitHub

### NPM Packages

- [express](https://www.npmjs.com/package/express)
- [cors](https://www.npmjs.com/package/cors)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [mysql2](https://www.npmjs.com/package/mysql2)
- [joi](https://www.npmjs.com/package/joi)
- [nodemon](https://www.npmjs.com/package/nodemon)

#### npm commands

```console
npm init -y
npm install express cors cookie-parser dotenv mysql2 joi
npm install nodemon --save-dev
```

#### git commands

```console
git checkout -b step-02-adding-npm-packages
git add .
git commit -m "add npm packages"
git push --set-upstream origin step-02-adding-npm-packages
```

## Step 3 - Create the server

### branch: [step-03-creating-server](https://github.com/geomarb/backend-example/tree/step-03-creating-server)

#### Change log

##### `.env`

- edit the `.env` file to add the `PORT` variable

```console
PORT=4000
```

##### [src/app.js](src/app.js)

- require: `express, cors, cookie-parser`
- use middleware: `express.json(), cors(), cookieParser()`
- export `app`

##### [src/index.js](src/index.js)

- call: `dotenv`
- import: `app.js)`
- get the port to run from `process.env.PORT`, if undefined set it as `4000`
- make app listen on the defined port

##### [package.json](package.json)

- create the `dev` script with `nodemon run src/index.js`
- run the server with `npm run dev` and make sure it working, fix any issues

#### git commands

```console
git checkout -b step-03-creating-server
git add .
git commit -m "create server"
git push --set-upstream origin step-03-creating-server
```

## Step 4 - Users and auth endpoints

### branch: [step-04-get-user-route](https://github.com/geomarb/backend-example/tree/step-04-get-user-route)

### Users endpoints

| Method | Endpoint   | Description                     | Path Parameter | Request Query Parameter | Access Control        | Request Body                       | Response Body                          | Response Status |
| ------ | ---------- | ------------------------------- | -------------- | ----------------------- | --------------------- | ---------------------------------- | -------------------------------------- | --------------- |
| GET    | /users     | Returns a list with all users   | none           | none                    | adm role only         | none                               | list of users                          | 200             |
| GET    | /users/:id | Returns a single user by its id | id             | id                      | adm role only         | none                               | a single user                          | 200             |
| POST   | /users     | Create a new user               | none           | none                    | adm role only         | New user's name, email             | id, name, email, email                 | 201             |
| PUT    | /users/:id | Update a user                   | id             | id                      | adm role only         | User's name, email, role, password | Updated name, email and/or role        | 200             |
| DELETE | /users/:id | Delete a user                   | id             | id                      | and role and own user | none                               | id, name and email of the deleted user | 200             |

##### [src/models/user.model.js](src/models/user.model.js)

- create a fake hard coded users data (this will be changed later to get data from the database)
- create the `getAll` method which will return all users
- create the `findById` method which will return one user by the id
- create the `create` method which will create a new user and return the user with the id
- create the `update` method which will update the name and/or email of a user and return the updated user
- create the `delete` method which will remove a user by the id and return the deleted user
- create the `login` method which will check if the email exists and if the password id valid then the user or throw an error

##### [src/models/index.js](src/models/index.js)

- import `user.model.js` and export it as `userModel`

##### [src/controllers/user.controller.js](src/controllers/user.controller.js)

- import `userModel` from `models`
- create the `getUsers` method which will process the request and send a response with all users returned from `userModel.getUsers()`
- create the `getUserById` method which will process the request with user's id param and send a response with one user returned from `userModel.getUserById(req.params.id)`
- create the `createUser` method which will process the request with name, email and password in the body, create a new user send a response with the new user returned from `userModel.createUser(req.body)`
- create the `updateUser` method which will process the request with a changed name and/or email of a user and return the updated user
- create the `deleteUser` method which will process the request with an user's id to be deleted and return the deleted user
- create the `deleteUser` method which will process the request with an user's id to be deleted and return the deleted user

##### [src/controllers/index.js](src/controllers/index.js)

- import `user.controller.js` and export it as `userController`

##### [src/routes/user.routes.js](src/routes/user.routes.js)

- create the `router`, import `user.controller`
- create the `GET /` route which calls `userController.getUsers`
- create the `GET /` route which calls `userController.getUsersById`
- create the `POST /` route which calls `userController.createUser`
- create the `PUT /` route which calls `userController.updateUser`
- create the `DELETE /` route which calls `userController.deleteUser`
- export the `router`

### authorization and registration endpoints

| Method | Endpoint  | Description                | Path Parameter | Request Query Parameter | Access Control | Request Body                           | Response Body         | Response Status |
| ------ | --------- | -------------------------- | -------------- | ----------------------- | -------------- | -------------------------------------- | --------------------- | --------------- |
| POST   | /register | Create a new user          | none           | none                    | Anyone         | New user's name, email, role, password | id, name, email, role | 201             |
| POST   | /login    | Create a new login session | none           | none                    | Anyone         | User's email and password              | id, name, email, role | 200             |
| GET    | /logout   | Delete the current session | none           | none                    | Logged user    | none                                   | none                  | 200             |
| GET    | /me       | Get logged user's profile  | none           | none                    | Logged user    | none                                   | none                  | 200             |
| PUT    | /me       | Update user's profile      | none           | none                    | Logged user    | User's name, email, role, password     | none                  | 200             |
| PATCH  | /password | Update user's password     | none           | none                    | Logged user    | User's new password                    | none                  | 200             |

Note: We use PUT method when we need to update the entire resource (think of it either as replacing an object with another one or updating all fields of a record in a database's table). PATCH method is used when we need to update some properties of that resource (think it either as changing some attributes of an object or some fields of a record in database's table, but not all attributes/fields it would be a PUT method).

##### [src/routes/auth.routes.js](src/routes/auth.routes.js)

- create the `router`, import `user.controller`
- create the `POST /register` route which calls `authController.createUser`
- create the `POST /login` route which calls `authController.login`
- create the `GET /logout` route which calls `authController.logout`
- export the `router`

##### [src/routes/index.js](src/routes/index.js)

- create the `router`, import `./user.routes.js` as `userRoutes`
- use `userRoutes` in the router under `/users` endpoint
- use `authRoutes` in the router under `/` endpoint
- export `router`

##### [src/app.js](src/app.js)

- import `router` from `./routes`
- use it as a middleware under `/api` route

#### Run the server

- run the server with `npm run dev`
- fix all errors
- go to the route [http://localhost:4000/api/users](http://localhost:4000/api/users).
- check all users were returned

#### git commands

```console
git checkout -b step-04-get-user-route
git add .
git commit -m "create get user route"
git push --set-upstream origin step-04-get-user-route
```
