<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Demo

```
https://nest-pokedex-avl.up.railway.app
```

# Ejecutar en desarrollo

:one: Clonar el repositorio

:two: Ejecutar

```
Yarn install
```

:three: Tener Nest CLI instalado

```
npm i -g @nestjs/cli
```

:four: Levantar la base de datos

```
docker-compose up -d
```

:five: Clonar el `.env.template`, renombar la copia a `.env` y editar o llenar el valor de las variables definidas en el `.env` de ser necesario

:six: Levantar la aplicación en **dev**

```
yarn start:dev
```

:eight: Reconstruir la base de datos

> Elimina unicamente la seed que se inserto o los datos que coincidan con la seed a insertar y luego inserta la seed

```
http://localhost:3000/api/v2/seed
```

> Elimina todos los datos y luego inserta la seed

```
http://localhost:3000/api/v2/seed?deleteType=hard
```

## Stack usado

- MongoDB
- Nest
- Docker
- Prettier
- ESLint

# Notas

Heroku redeploy sin cambios:

```
git commit --allow-empty -m "Tigger Heroku deploy"
git push heroku master
```

# Documentación

```
http://localhost:3000/doc
```
