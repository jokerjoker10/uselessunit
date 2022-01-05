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
The default port of the container is 8501. If you want to change that just modify the docker-compose.yml.

# Development
If you want to contribute read the [development docs](docs/development.md)