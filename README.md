#### college-management-api-server" 
#### Backend API , custom library using NodeJS with typescript.

Requirements: node v12.x above. latest typescript.

  ## Install on local system.
   # clone project from git URL.
   # Install all dependencies using---<npm install>
   # run project with command....<npm run start>

 ## deployment configuration on Heroku.
  # set env configuration ----- heroku config:set NODE_ENV='production'----- from terminal in project directory. 
  # create---- Procfile--- file in root directory. added path for index.js...which one is ---- <node public/index.js>
  # create build....using command----<npm run tsc>
  # now command.... <heroku login>
  # .....<heroku create>.....select git repository.
  # git add .
  # git commit -m "Final deployment"
  # git push
  # git push heroku main.

## use remote mongodb database
  # login mongodb ...and set configuration for MongoDB Atlas.
  # changed mongDB url in....config > production.config.ts.


##IMPORTANT need to add manually super admin account in database by using this query
db.User.insertOne({
    "fName" : "super",
    "lName" : "admin",
    "username" : "super-admin",
    "email" : "deepak@admin.com",
    "password" : "123456",
    "userRole" : 0,
    "status" : 1
})

## super admin login details...
  email: deepak@admin.com
  password: 123456

## live heroku URL for nodejs
   https://ds-college-management-server.herokuapp.com/ping
