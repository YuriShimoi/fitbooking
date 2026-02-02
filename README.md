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

Access `localhost:8080` for the site webpage.

You can also access `http://localhost:5000/swagger/` to check the API documentation.

### Testing
You can run automatic unit testing for the backend going to _backend_ folder and running `npm test`.

# Pages in the system
### Swagger page for API testing
<img width="1446" height="740" alt="image" src="https://github.com/user-attachments/assets/31dcb7f2-4e45-4808-8c0c-31d8f3ead0e9" />

### Homepage with all books listed and searching feature
<img width="1314" height="1079" alt="image" src="https://github.com/user-attachments/assets/23b920a0-0f65-4a24-95b5-e5b50b64bb2b" />
<img width="1209" height="787" alt="image" src="https://github.com/user-attachments/assets/badcf37a-81b5-47fc-85a9-8820624f23a8" />

### Registration form to add books
<img width="1230" height="805" alt="image" src="https://github.com/user-attachments/assets/b4afdeb4-2abd-47c0-8b1e-c471aae1cd6d" />

### Inspection page to check the book information, with updating and delete features
<img width="1121" height="676" alt="image" src="https://github.com/user-attachments/assets/58ed61bf-fce8-4fb6-952b-2f25eee514ca" />
<img width="1185" height="931" alt="image" src="https://github.com/user-attachments/assets/e09e5154-88af-48de-9c0d-a2d232d7b7d1" />
<img width="1159" height="713" alt="image" src="https://github.com/user-attachments/assets/0ed37568-7207-4478-a3e6-422ba3f19873" />
