# Backend example

This project was created for teaching purposes. It will be implemented from zero, step by step. The steps are stored in the branches. 
## Creating structure

### branch: [step-01-structure](https://github.com/geomarb/backend-example/tree/step-01-structure)

- creating the basic folder structure and files via terminal/console

```console
git clone git@github.com:geomarb/backend-example.git
cd backend-example
git chekout -b step-01-structure
mkdir -p src/controllers src/models src/routes src/middlewares src/config
touch src/index.js src/app.js src/models/index.js src/models/user.model.js src/routes/index.js src/routes/user.routes.js src/routes/auth.routes.js src/routes/index.routes.js src/controllers/index.js src/controllers/user.controller.js src/controllers/auth.controller.js src/middlewares/auth.middleware.js src/middlewares/error-handler.middleware.js
git add .
git commit -m "create structure"
git push --set-upstream origin step-01-structure
```