# Access postgres (in order)
docker exec -it backend-recetas.pg-1 /bin/bash
psql -U recetas -d recetas

# Useful pg commands

## \du+
list all users

## \l
list all databases

## \c recetas
switch to recetas database

## \dt
list all tables

# Seleccionar todos los productos que tienen el ingrediente '5'
SELECT * FROM product p INNER JOIN product_ingredient pi ON pi.PRODUCT_ID = p.PRODUCT_ID WHERE pi.INGR_ID = '5';




# Run Locally

Clone the project

```bash
  git clone https://github.com/lucasangelino/TPOG5.git
```

Go to the project directory

```bash
  cd recetas
```

Go to the backend directory and install dependencies

```bash
  cd backend
  npm i
```
Run Backend (NOTA: El la autenticacion de la App no esta implementada al 100%, por lo que no es necesario correr el Backend para usar el Frontend. Podes saltar este paso y continuar con la instalacion de Frontend)

```bash
  npm run dev
```

Go to the frontend directory and install dependencies

```bash
  cd ../frontend
  npm i
```
Run frontend 

```bash
  npm run dev
```

Open browser and go to
 
http://localhost:3000/
