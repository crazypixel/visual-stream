**Data driven visualization example**
-------------------------------------

Twitter stream visualization using react redux and three.js

This is a simple usage for twitter stream along with Three.js and redux.

Installation
------------

    run npm install

 1. Go to [Twitter Application Manager](https://apps.twitter.com/), create a new app and generate a **consumer_key, consumer_secret, access_token_key, access_token_secret**.
 2. Go to twitter.config.js and place there your keys.
 3. open terminal
 
 For the server part run **npm run server** ( now the stream is open )
 To run the application run **npm run dev** and go to :

 localhost:8080/saturn or
 localhost:8080/globe

To change the twitter terms - go to server.js

    twitterClient.stream('statuses/filter', {
      track: 'my,custom,terms'
    }, function(stream) {


Feel free to use it and share.

Screenshots
--------
![saturn example](https://raw.githubusercontent.com/crazypixel/visual-stream/master/screenshots/1.png)

![App Layers](https://raw.githubusercontent.com/crazypixel/visual-stream/master/screenshots/layers.png)

License
-------

[MIT license](https://opensource.org/licenses/MIT)
The globe example is taken from google's open source project.
