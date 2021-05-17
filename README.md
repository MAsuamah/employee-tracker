# Employee Tracker

## Description
The Employee Tracker is a command line app used to keep track and manage the departments, roles, and employees of an organization. Features include viewing, adding, and updating employees, roles, managers, and departments.

<img width="364" alt="Screen Shot 2021-05-16 at 4 24 52 PM" src="https://user-images.githubusercontent.com/77217156/118413618-382c0980-b66e-11eb-8863-32ccdc50e9ff.png">

## How to Install
** This app uses MySQL and you will need to have MySQL installed to operate this application.**

* Clone the repository onto your local machine.
* Once the Employee Tracker is on your machine, open your terminal and cd into the root folder of the Employee Tracker.
* While in the root folder, you must first run `npm install` to load all the dependancies needed for the app to run.
* Next you should open the connection.js file and edit it to contain your MySQL credentials.
* In your terminal while still in the root folder of employee-tracker run `mysql -u root -p` then enter your MySQL password when prompted.
* Now in the MySQL shell run `source db/db.sql` to create the employee database.
* Next run `source db/schema.sql`to create the departments, roles, and employees tables.
* There is also a seeds file you can use to pre-populate you tables with dummy data. Run `source db/seeds.sql` to do so. Otherwise skip this step so you can add your own data.
* Type `quit;` to exit the MySQL shell.

## How To Use
* After following the installation instructions you are able to use the application. Run `node index.js` to do so. 
* You will be taken to the main menu where you can choose what you would like do in the Employee Tracker. The main menu looks like following: 

<img width="338" alt="Screen Shot 2021-05-16 at 4 25 26 PM" src="https://user-images.githubusercontent.com/77217156/118411786-5260ea00-b664-11eb-8d65-44de454e7478.png">

* Pick which ever action you would like to execute and and follow the prompts. See the [Walkthrough-Video](#walkthrough-video) for more on how to use the app.
* To exit the application use CTL + C

## Walkthrough-Video
https://drive.google.com/file/d/1z7SQHMx6fz1TZF-3L5BmW5CBpW8SVa0Z/view?usp=sharing

## Built With
* Node.js
* MySQL
* Inquirer


## Credits
https://stackoverflow.com/questions/18680680/can-a-foreign-key-refer-to-a-primary-key-in-the-same-table
https://www.w3schools.com/js/js_switch.asp
https://dev.mysql.com/doc/refman/8.0/en/string-functions.html
https://stackoverflow.com/questions/10710271/join-table-twice-on-two-different-columns-of-the-same-table
https://www.mysqltutorial.org/mysql-join/



## Contributors
Michelle Asuamah

## Contact
If you would like to contact me you can reach me at michey.asmah21@gmail.com.
