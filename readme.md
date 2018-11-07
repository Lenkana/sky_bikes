#Environment
node 8.11.3
npm 4.0.3

#Usage
##Install the resources
`npm install`

##Run the project on localhost
`npm run serve`

##Build the project
`npm run build mode=production`

##Accounts
Two accounts are initialized when lauching the app: test@gmail.com" and "user@gmail.com".
You can connect with one of these accounts or create a new one. 
To access the administration to see the states of the account, you must login with "admin". 

#Overview
##Development
I decided to use Webpack to compile the sources into the app. It allowed me use ES6, which added a lot of 
useful functionalities compared to the previous version of JS.

##Code structure
I decided to use the custom HTML components to develop the differents modules of this app. 
I wanted to separate each component from one another to help its readability. It was the first time I used this feature. 
It helped me to find a structure since I couldn't use a framework. 
The different blocks of the site are shown and hidden thanks to the ComponentService. 
The only HTML file is the index.html. All the other parts are generated through JS. 

I used Bootstrap and FontAwesome to help me for the design/CSS part. 

###Ideas
- Add a templating engine to separate markup from script
- Improve the UI/UX design (adding a map to place the station)
- Add a routing engine

##Data
They are initialized with the initApp function. 
The data are saved on the brower localStorage. This includes stations state, bikes, accounts and the connected user. 
To be used through the app, they are saved throug a DataService. 

###Ideas
- Use an external database
- Store a cookie for the connected user instead of of using a localStorage entry
- Use Redux to insure the reliability of the app state
- Implement observable to improve the app reactivity, readibility and logic

#Summary
This project was challenging, because I never had to create a project with Javascript without a framework. 
I had to remember basic concepts that are easy to forget with modern development tools. 
I couldn't do everything I wanted because of the delay I had and the things I had to learn to code this app, but it was overall a good exercise. 