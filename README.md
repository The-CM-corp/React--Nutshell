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
      "password": "lesley",
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
      "title": "On The Road with Joe goes to Buena on Monday",
      "synopsis": "Maybe we had a miracle on Wednesday during our On The Road to Buena and Buena Vista. \n\nWhen we went to Buena, we were pleasantly surprised by Marie D'Andrea, who founded the Shrine in 1997! She was there alongside her granddaughter, Ali. They were both very nice, showing us around to each item available at the gift shop, gave us the tour and even did an interview with us on the spot.\n\nHowever, after we finished our second interview in Buena Vista with Mayor Chuck Chiarello, we realized something. The audio cut out on Ali and I's interview partway through the shoot. ",
      "url": "www.pressofatlanticcity.com/news/on-the-road-with-joe-goes-to-buena-on-monday/article_f6d229b7-2ae0-5f92-b024-fa78d41ea28e.html",
      "user_id": 1,
      "timestamp": "12-3-2018 11:20",
      "image": "https://ichef.bbci.co.uk/news/660/cpsprodpb/15A10/production/_104529588_hi050420593.jpg",
      "id": 9
    },
    {
      "title": "Lesley University receives funding for bat study",
      "synopsis": "The Morris Animal Foundation has awarded a $10,000 grant to Lesley University researcher Christopher Richardson to study the effect of white-nose syndrome on little brown myotis bats.\n\nWhite-nose syndrome was first documented in 2006 and has since devastated countless populations of hibernating bats in eastern North America. Richardson’s study will address how the disease affects energy use, immune response and the impact on reproduction of the little brown bat, one of the species hit hardest by the disease. Less than 10 percent of a once-robust population has survived the outbreak.\n\n“In some places they’re coming back, they’re reproducing, they’re surviving, but other colonies are not doing so well,” said faculty member Richardson. “The question is why.”",
      "url": "cambridge.wickedlocal.com/news/20181108/lesley-university-receives-funding-for-bat-study",
      "user_id": 2,
      "timestamp": "12-3-2018 23:36",
      "id": 21,
      "image": "https://cosmos-images2.imgix.net/file/spina/photo/14156/180223-bats-full.jpg?ixlib=rails-2.1.4&auto=format&ch=Width%2CDPR&fit=max&w=835"
    },
    {
      "title": "Joe Named SEC Player of the Week",
      "synopsis": "FAYETTEVILLE – University of Arkansas freshman Isaiah Joe was named the Southeastern Conference Men’s Basketball Player of the Week, the league announced today.\n\nJoe scored 34 points – 17 in each half – and made 10-of-13 shots from 3-point range to lead the Razorbacks to a 121-89 victory over FIU this past Saturday. Joe joins Courtney Fortson (Dec. 15, 2009) as the only Razorback freshman to be named SEC Player of the Week.",
      "url": "www.arkansasrazorbacks.com/joe-named-sec-player-of-the-week/",
      "user_id": 1,
      "timestamp": "12-3-2018 23:18",
      "id": 22,
      "image": "http://www.arkansasrazorbacks.com/wp-content/uploads/2018/12/Isaiah-Joe-vs-FIU-Crop.jpg"
    },
    {
      "title": "More Than 500 Aftershocks Rattle Residents After Major Earthquake Strikes Anchorage, Alaska",
      "synopsis": "More than 500 aftershocks continued to rattle residents Saturday in Anchorage, Alaska, a day after a powerful earthquake rocked the region, damaging roads and buildings.   The U.S. Geological Survey said the 7 magnitude tremor struck about 10 miles north of Anchorage at 8:29 a.m. local time (12:29 p.m. EST) Friday morning. A 5.8 magnitude aftershock struck minutes later.  \"It was anarchy,\" Brandon Slaton, who just moved to Kenai from Arizona, told the Associated Press. \"There's no pictures left on the walls, there's no power, there's no fish tank left. Everything that's not tied down is broke.\"  Geophysicist Paul Caruso told the Associated Press 11 aftershocks have had magnitudes of 4.5 or greater, including a 5.7 magnitude aftershock. ",
      "url": "weather.com/news/news/2018-11-30-anchorage-alaska-earthquake-impacts",
      "timestamp": "12-3-2018 23:13",
      "user_id": 4,
      "id": 25,
      "image": "https://cdn.abcotvs.com/dip/images/4801150_113018ccapakquakeAP18334791426941.jpg"
    },
    {
      "title": "Microsoft beats Apple for biggest market value",
      "synopsis": "The software giant ended Friday with a market value of more than $851bn (£668bn) compared with Apple's $847bn.  The two firms have been vying for top place all week, with Apple remaining ahead at the end of each trading day.  But the iPhone maker, which has seen its share price plunge in recent weeks, finally lost its lead.  On Friday, Microsoft shares gained more than 0.6% to close at $110.89, while Apple shares finished at $178.60, down about 0.5%.  Apple's shares have fallen almost 25% since October - more steeply than the market overall - amid concerns about slowing smart phone demand and the possibility of additional US tariffs on Chinese-made goods.",
      "url": "www.bbc.com/news/business-46365239",
      "timestamp": "12-3-2018 22:10",
      "user_id": 3,
      "id": 26,
      "image": "https://i0.wp.com/www.mac-history.net/wp-content/uploads/2011/01/microsoft-vs-apple.jpg?fit=599%2C311&ssl=1"
    }
    ],
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
      "userId": 4,
      "time": "2018-12-01T17:04:53.698Z",
      "message": "Seriously!!! It's like super cold. I thought it was supposed to be warm down south!",
      "id": 16
    },
    {
      "userId": 3,
      "time": "2018-12-02T20:22:50.937Z",
      "message": "Just finished updating the database!",
      "id": 17
    },
    {
      "userId": 2,
      "time": "2018-12-02T16:14:40.156Z",
      "message": "I can't believe how much we've learned in a two months!",
      "id": 18
    },
    {
      "userId": 1,
      "time": "2018-12-03T13:33:48.382Z",
      "message": "I am proud of each and every one of you. Except Bryan. I'm really disappointed in you.",
      "id": 19
    }],
"friends": [
    {
      "id": 1,
      "currentUserId": 1,
      "followedUserId": 2
    }
  ]
}
```

Traverse back to the React—Nutshell folder and run: ```npm install```
This will install all libraries and their dependencies used by Nutshell.
Be sure to run the following in order to view Nutshell in your browser: ```npm start```
Open [http://localhost:3000]( http://localhost:3000) to view it in the browser.
In another window of your terminal traverse into ```src/api``` and run: ```json-server -p 5002 -w nutshell.json```

# We covered many topics in the creation of Nutshell, some of which include:
1. React
1. Functions
1. Stand-Up meetings
1. ERD Diagrams
1. Databases/API
1. Objects
1. CSS
1. Handling user events
1. Factory functions
1. Data entry/editing
1. CRUD functionality
1. Modular code 
1. Github

# Enjoy Nutshell
This project was bootstrapped with [Create React App]( https://github.com/facebook/create-react-app).
### Contributors
* [Austin Zoradi]( https://github.com/amazoradi)
* [Bryan Nilsen]( https://github.com/BryanNilsen)
* [Jessica Barnett]( https://github.com/jessicabarnett8219)
* [Lesley Boyd]( https://github.com/laboyd001)

