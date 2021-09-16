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
    "password" : "$2b$12$AaBHawX.qVpPgLgOWGLuyerhSCC1gHh190oZ.S7PY/EVapPdToV56",
    "address" : "",
    "userRole" : 0,
    "status" : 1,
    "modifiedDate" : ISODate("2021-09-15T02:39:16.362Z"),
    "createdDate" : ISODate("2021-09-14T12:54:53.684Z")
}) 
