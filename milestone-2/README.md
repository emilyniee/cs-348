# cs-348 milestone-2

## Starting the application

### env file
Please create a .env file until milestone-2 with the following contents
```
POSTGRES_DB=mydb
POSTGRES_USER=myuser
POSTGRES_PASSWORD=mypassword
DATABASE_URL=postgresql://myuser:mypassword@db:5432/mydb
```

### docker
Run `docker-compose up`, and everything should be ready to go!

## Viewing the application
To view the web based application, visit http://localhost:3000/

Requests can be made to the backend at http://localhost:8000/

To view the database, you can access PgAdmin at http://localhost:5050
Use email admin@admin.com and password pgadmin to sign in.

## Sample features/functionalities
Homepage
<img width="991" alt="image" src="https://github.com/user-attachments/assets/4f466075-2cb1-4bd0-841a-36e7cc434c28" />

Leaderboard of players of all time, in terms of average points scored per game played
<img width="991" alt="image" src="https://github.com/user-attachments/assets/bb58e096-4221-49ca-adf2-582942191b06" />


## Error Handling
If docker does not successfully build the frontend, run `npm install`
