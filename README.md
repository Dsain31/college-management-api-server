"# college-management-api-server" 
set env configuration ----- heroku config:set NODE_ENV='production'
heroku login
heroku create > select git repository
git add .
git commit -m "Final deployment"
git push
git push heroku main ------ finally deployment