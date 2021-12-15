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
|  |  +-- index.js 
|  |  |
|  |  +-- auth.controller.js 
|  |  |
|  |  +-- user.controller.js 
|  |
|  +-- middlewares/ 
|  |  |
|  |  +-- index.js 
|  |  |
|  |  +-- auth.middleware.js 
|  |  |
|  |  +-- error-handler.middleware.js 
|  |
|  +-- models/ 
|  |  |
|  |  +-- index.js 
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
touch src/controllers/index.js src/controllers/user.controller.js src/controllers/auth.controller.js
touch src/middlewares/index.js src/middlewares/auth.middleware.js src/middlewares/error-handler.middleware.js
touch src/models/index.js src/models/user.model.js
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
