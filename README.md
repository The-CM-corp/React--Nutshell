# React Nutshell
Nutshell is a new app that provides everything a user could need, all in one nice shell. The app provides a way for users to keep track of their daily tasks, chat with other users, and share news articles and events. Nutshell is written using the React framework.

# Getting Started
To run Nutshell locally, create an empty directory and clone the project by running the following command in your terminal: ```git@github.com:The-CM-corp/React--Nutshell.git```

Nutshell uses a database.json file to store all data. To create the database, run:
```
mkdir api
cd api
touch nutshell.json
```


Open **database.json** and copy the following into the file to create a database skeleton:
```{
  "users": [
    {
      "id": 1,
      "name": "lesley",
      "password": "broccoli",
      "email": "lesley@lesley.com"
    },
    {
      "id": 2,
      "name": "austin",
      "password": "austin",
      "email": "austin@austin.com"
    },
    {
      "name": "jessica",
      "password": "jessica",
      "email": "jessica@jessica.com",
      "id": 3
    },
    {
      "name": "bryan",
      "password": "bryan",
      "email": "bryan@bryan.com",
      "id": 4
    }],
"events": [
    {
      "title": "Movie Night at the Odeon",
      "date": "2018-11-19",
      "synopsis": "Screening of the Classic Movie Joe Dirt",
      "location": "Franklin Theatre",
      "user_id": 2,
      "id": 3
    },
    {
      "title": "Date Night",
      "date": "2018-11-28",
      "synopsis": "dinner at Kayne Prime",
      "location": "The Gulch",
      "user_id": 4,
      "id": 5
    },
    {
      "title": "Death Row Challenge!!",
      "date": "2018-11-30",
      "synopsis": "Hot Chicken Contest",
      "location": "Hattie B's",
      "user_id": 3,
      "id": 6
    },
    {
      "title": "Jack White Concert",
      "date": "2018-11-19",
      "synopsis": "Jack White has announced a show at Nashville's Bridgestone Arena on November 20, 2018 as a makeup show for Pilgrimage Music & Cultural Festival's recent cancellation,",
      "location": "Bridgestone Arena",
      "user_id": 1,
      "id": 7
    }],
"news": [
{
      "title": "Amazon Could Bring Increased Home Prices",
      "synopsis": " The company promises to bring 5,000 jobs to the city.",
      "url": "www.newschannel5.com",
      "user_id": 1,
      "timestamp": "11-14-2018 19:13",
      "id": 16
    },
    {
      "title": "Cohort 26 Ends On A High Note",
      "synopsis": "Cohort 26 graduated last week!",
      "url": "www.google.com",
      "user_id": 3,
      "timestamp": "11-14-2018 19:29",
      "id": 17
    },
    {
      "title": "52nd Annual CMA Awards",
      "synopsis": "It's the biggest night in country music.",
      "url": "www.newschannel5.com",
      "user_id": 2,
      "timestamp": "11-14-2018 19:31",
      "id": 18
    },
    {
      "title": "How to Milk a Cat",
      "synopsis": "pretty much all you need to know about how to milk a cat",
      "url": "youtu.be/bXNwzKo5Yps?t=80",
      "user_id": 4,
      "timestamp": "11-14-2018 23:32",
      "id": 20
    }],
"todos": [
    {
      "id": 1,
      "task": "Take out trash",
      "date": "11/8/18",
      "completed": true,
      "user_id": 1
    },
    {
      "task": "Discuss React",
      "date": "2018-11-26",
      "completed": false,
      "user_id": 2,
      "id": 23
    },
    {
      "task": "Buy the turkey for next week",
      "date": "2018-11-20",
      "completed": false,
      "user_id": 3,
      "id": 24
    },
    {
      "task": "Learning Team Meeting Agenda",
      "date": "2018-11-16",
      "completed": false,
      "user_id": 4,
      "id": 25
    }],
"messages": [
    {
      "userId": 1,
      "time": "11-08-2018 17:46",
      "message": "How about that Amazon news???",
      "id": 8
    },
    {
      "userId": 3,
      "time": "11-09-2018 07:46",
      "message": "Did you guys see the last episode of This Is Us?  I can't believe what happened!",
      "id": 9
    },
    {
      "userId": 2,
      "time": "11-08-2018 12:46",
      "message": "Windows 7 Rules!",
      "id": 11
    },
    {
      "userId": 2,
      "time": "11-10-2018 08:13",
      "message": "Come to me for help with github.",
      "id": 12
    }],
"friends": [
    {
      "id": 1,
      "stalkerId": 1,
      "bystanderId": 2
    }
  ]
}
```

Traverse back the React—Nutshell folder and run: ```npm install```
This is will install all libraries and their dependencies used by Nutshell.
Be sure to run the following in order to view Nutshell in your browser: ```npm start```
Open [http://localhost:3000]( http://localhost:3000) to view it in the browser.
In another window of your terminal traverse into ```src/api``` and run: ```json-server -p 5002 -w nutshell.json```

# Enjoy Nutshell
This project was bootstrapped with [Create React App]( https://github.com/facebook/create-react-app).
### Contributors
* [Austin Zoradi]( https://github.com/amazoradi)
* [Bryan Nilsen]( https://github.com/BryanNilsen)
* [Jessica Barnett]( https://github.com/jessicabarnett8219)
* [Lesley Boyd]( https://github.com/laboyd001)

