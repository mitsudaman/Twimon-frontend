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



## error

heroku buildpacks:set heroku/nodejs

▼Troubleshooting Node.js Deploys
https://devcenter.heroku.com/articles/troubleshooting-node-deploys

# lodash

## フィールドを絞るとき
let updateTalks = _.map(this.me.talks,(n)=>{
  return _.pick(n, ['id','sentence1', 'sentence2','sentence3']);
})

## 特定のkey,idを除外するとき
this.me.talks = _.reject(this.me.talks, { 'id': delId});