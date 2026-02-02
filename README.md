# Fit techical test fullstack system

### Necessary tools
 - [nodejs LTS](https://nodejs.org/en)
 - [MySQL Community Server 8.0.44 ](https://downloads.mysql.com/archives/installer/)

### Installment
Open MySQL 8.0 Command Line Client or run `mysql -u root -p` in terminal, login in the mysql and then run:
```SQL
CREATE DATABASE fitdatabase;
```

Go to a folder and run `git clone https://github.com/YuriShimoi/fitbooking.git`.
Open the folder and then run `install`.

Inside _backend_ folder create a file _.env_ and insert the database parameters:
```BASH
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_USER=root
DB_PASSWORD="rootpassword"
DB_NAME=fitdatabase

DATABASE_URL="mysql://root:rootpassword@localhost:3306/fitdatabase"
```
> Remember that you must change the "rootpassword" to the password you set ins the installment of MySQL, or create another user with permission to manipulate databases.

Inside _backend_ run `npx prisma migrate dev --name init`


### Running
In the _root_ folder run `npm run dev`

Access `localhost:8080`
