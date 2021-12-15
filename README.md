# Backend example

This project was created for teaching purposes. It will be implemented from zero, step by step. The steps are stored in the branches. 
## Step 1 - Create structure

### branch: [step-01-structure](https://github.com/geomarb/backend-example/tree/step-01-structure)

- creating the basic folder structure and files via terminal/console

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
|  |  +-- auth.controller.js 
|  |  |
|  |  +-- user.controller.js 
|  |
|  +-- middlewares/ 
|  |  |
|  |  +-- auth.middleware.js 
|  |  |
|  |  +-- error-handler.middleware.js 
|  |
|  +-- models/ 
|  |  |
|  |  +-- user.model.js 
|  |
|  +-- routes/
|  |  |
|  |  +-- index.js 
|  |  |
|  |  +-- auth.routes.js 
|  |  |
|  |  +-- user.routes.js 
|  |
|  +-- app.js
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
mkdir -p src/config src/controllers src/middlewares src/models src/routes
touch .env
touch src/index.js src/app.js
touch src/controllers/user.controller.js src/controllers/auth.controller.js
touch src/middlewares/auth.middleware.js src/middlewares/error-handler.middleware.js
touch src/models/user.model.js
touch src/routes/index.js src/routes/user.routes.js src/routes/auth.routes.js
git checkout -b step-01-structure
git add .
git commit -m "create structure"
git push --set-upstream origin step-01-structure
```

## Step 2 - Add NPM packages

### branch: [step-02-adding-npm-packages](https://github.com/geomarb/backend-example/tree/step-02-adding-npm-packages)

- create a new branch in git
- init npm to create the package.json file
- add some packages to create a very basic server
- stage, commit and push the changes to the remote repository in GitHub

```console
git checkout -b step-02-adding-npm-packages
npm init -y
npm install express cors cookie-parser dotenv mysql2 joi
npm install nodemon --save-dev
git add .
git commit -m "add npm packages"
git push --set-upstream origin step-02-adding-npm-packages
```
## Step 3 - Create the server

### branch: [step-03-creating-server](https://github.com/geomarb/backend-example/tree/step-03-creating-server)

#### Changed files

##### ` .env `

- edit the `.env` file to add the `PORT` variable
```console
PORT=4000
```
##### [src/app.js](src/app.js)

- require: ` express, cors, cookie-parser `
- use middleware: ` express.json(), cors(), cookieParser() `
- export ` app `

##### [src/index.js](src/index.js)

- call: ` dotenv `
- import: ` app.js) `
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

## Step 4 - Create GET /user Route

### branch: [step-04-get-user-route](https://github.com/geomarb/backend-example/tree/step-04-get-user-route)

##### [src/models/user.model.js](src/models/user.model.js)

- let's start with a fake and hard coded users array and add the getUsers method 

##### [src/controllers/user.controller.js](src/controllers/user.controller.js)

- import `userModel` from `user.model.js`
- treat the request and send back all users from `userModel.getAll`

##### [src/controllers/index.js](src/controllers/index.js)

- import and export `user.controller.js` as `UserController`

##### [src/routes/user.routes.js](src/routes/user.routes.js)

- create the `router`, import `UserController`
- create `get /` which will call `UserController.getUsers`
- export the `router`

##### [src/routes/index.js](src/controllers/index.js)

- create the `router`, import `./user.routes.js` as `userRoutes`
- use `userRoutes` in the router under `/users` endpoint
- export router

##### [src/app.js](src/app.js)

- import `router` from `./routes`
- use it as a middleware under `/api` route

#####

Once above steps are done, run the server, fix all error, and test the route [http://localhost:4000/api/users](http://localhost:4000/api/users). Make sure that all users are being showed.

#### git commands

```console
git checkout -b step-04-get-user-route
git add .
git commit -m "create get user route"
git push --set-upstream origin step-04-get-user-route
```