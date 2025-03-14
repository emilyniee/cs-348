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

## Production Dataset
The production dataset is generated by running the scripts in the `backend/data_processing_scripts` directory. 

These scripts scrape and download raw data from basketball-reference.com using the `basketball_reference_web_scraper` API. 

The processed data is saved as CSV files in the `backend/data` folder. 

The database schema is set up with the `create_tables.sql` (located in `backend/sql_queries`), and the data is populated into PostgreSQL using the populate function in `database.py`.

## Sample features/functionalities
Homepage
![image](https://github.com/user-attachments/assets/baf548ff-4a62-48a0-b4e4-90b9199a9c13)
frontend implementation in frontend/src/app/page.js

Leaderboard of players of all time, in terms of average points scored per game played
![image](https://github.com/user-attachments/assets/7f524516-873c-45fb-a23a-6c2c0611d7dd)
frontend implementation in frontend/src/app/leaderboard/page.js

Best and worst matchups for a given team this season
![image](https://github.com/user-attachments/assets/a29dcd27-3634-4a16-b322-7fcd011c5478)
![image](https://github.com/user-attachments/assets/5fffb156-c034-4602-9d31-e177398d7d8c)
frontend implementation in frontend/src/app/matchups/page.js

Finding players that share the same birthday as you
![image](https://github.com/user-attachments/assets/4657e57a-a500-4fff-851b-b9fc58711f89)
![image](https://github.com/user-attachments/assets/c67ac2fa-4c2d-4752-9ed4-8f8515f4812a)
frontend implementation in frontend/src/app/birthdays/page.js

## Error Handling
If docker does not successfully build the frontend, run `npm install`
