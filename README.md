# Employee Tracker

## Description
The Employee Tracker is a command line app used to keep track and manage the departments, roles, and employees of an organization. Features include viewing, adding, and updating employees, roles, managers, departments.


![Employe-Tracker Screenshot](https://user-images.githubusercontent.com/77217156/118411824-9522c200-b664-11eb-8d9e-044807ea9404.png)

## How to Install
** This app uses MySQL and you will need to have MySQL installed to operate this application.**

* Clone the repository onto your local machine.
* Once the the Employee Tracker is on your machine, open your terminal and cd into. the root folder of the Employee Tracker.
* While in the root folder, you must first run `npm install` to load all the dependancies needed for the app run.
* Next you should open the connection.js file and edit it to contain your MySQL credentials. [screenshot of file].
* In your terminal while still in the root folder of employee-tracker run `mysql -u root -p` then enter your MySQL password when prompted.
* Now in the MySQL shell run `source db/db.sql` to create the employee database.
* Next run `source db/schema.sql`to create the departments, roles, and employees tables.
* There is also a seeds file you can use to pre-populate you tables with dummy data. Run `source db/seeds.sql` to do so. Otherwise skip this step so you can add your won data.
* Type `quit;` to exit the MySQL shell.

## How To Use
* After following the installation instructions you are able to use the application. Run `node index.js` to do so. 
* You will be taken to the main menu where you can choose what you would like do in the Employee Tracker. The main menu looks like following: 

<img width="338" alt="Screen Shot 2021-05-16 at 4 25 26 PM" src="https://user-images.githubusercontent.com/77217156/118411786-5260ea00-b664-11eb-8d65-44de454e7478.png">

* To exit the application use CTL + C

* Pick which ever action you would like to execute and and follow the prompts. See the [Walkthrough-Video](#walkthrough-video) for more on how to use the app.

## Walkthrough-Video
