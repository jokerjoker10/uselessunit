# Visit the Webiste
Here is the current version hosted:
https://uselessunit.jokerjoker10.cloud


# Hosting
If you want to host it yourself (not sure why you want that):

The website is created as a single docker container. There is no container image available at any regrestry. So you have to build it yourselve:

```
git pull https://github.com/jokerjoker10/uselessunit.git
cd uselessunit
docker-compose build
docker-compose up
```

# Development
To host it localy you need to install node and the ionic cli after that you need to pull the repo and host the local development server:
```
git pull https://github.com/jokerjoker10/uselessunit.git
cd uselessunit
ionic serve
```