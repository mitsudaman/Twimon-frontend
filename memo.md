■設定
docker-compose build
docker-compose up -d
docker-compose exec nuxt sh




--------------------------------------------

■vuetify

 $ vue init vuetifyjs/nuxt my-project


■apollo nuxt
yarn add @nuxtjs/apollo


https://takumon.com/nuxt-apollo-with-graphpack



# axios
yarn add axios




#heroku 
heroku create twimon-frontend
heroku git:remote --app twimon-frontend

heroku config:set HTTP_ENDPOINT=http://localhost:8001/graphql