# URL Shortener
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fbaleinesurseine%2Fshortener.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fbaleinesurseine%2Fshortener?ref=badge_shield)

## What is shortener ?
Shortener is a simple, experimental, url shortener. It was built with node.js, express.js and mongoDB.
## How to use this image ?
### start a mongodb image
```
docker run --name some-mongo -d mongo
```
### start a shortener image
```
docker run --name some-shortener --link some-mongo:mongo -p 80:8000 -d baleinesurseine/shortener
```
This image includes `expose 8000`.
### configuration options
 `-e "DB=db`: sets the database name (default is 'url_shortener')
 `-e "WEBHOST=host"`: sets the web host url (default is 'http://localhost/')
### reset database contents
```
docker exec <instance-name> node reset.js
```


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fbaleinesurseine%2Fshortener.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fbaleinesurseine%2Fshortener?ref=badge_large)