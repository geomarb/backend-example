# backend-example
Backend example

## Creating structure

### branch: [step-01-structure](https://github.com/geomarb/backend-example/tree/step-01-structure)

```console
git clone git@github.com:geomarb/backend-example.git
cd backend-example
git chekout -b step-01-structure
mkdir -p src/controllers src/models src/routes src/middlewares src/config
touch src/index.js src/app.js src/models/index.js src/models/user.model.js src/routes/index.js src/routes/user.routes.js src/auth.routes.js src/routes/index.routes.js src/controllers/index.js src/controllers/user.controller.js src/auth.controller.js src/middlewares/auth.middleware.js src/middlewares/error-handler.middleware.js
git add .
git commit -m "create structure"
git push --set-upstream origin step-01-structure
```

## Adding NPM packages

### branch: [step-02-adding-npm-packages](https://github.com/geomarb/backend-example/tree/step-02-adding-npm-packages)

```console
git checkout -b step-02-adding-npm-packages
npm init -y
npm install express cors cookie-parser dotenv mysql2 joi
npm install nodemon --save-dev
git add .
git commit -m "add npm packages"
git push --set-upstream origin step-02-adding-npm-packages
```

## Creating server

### branch: [step-03-creating-server](https://github.com/geomarb/backend-example/tree/step-03-creating-server)

#### Changed files

##### ` .env `
- Create ` .env ` file on root folder (terminal/console)
```console
touch .env
```
- edit the `.env` file to add `PORT` variable
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