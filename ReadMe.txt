In order to use the application, before running Meteor, you must : 
- install iron router through the console : "meteor add iron:router"
- install accounts-password through the console : "meteor add accounts-password"
- install accounts-ui through the console : "meteor add accounts-ui"



This site features : 

#Routing

## Layout
- a main layout (navbar) configured as layout route
- 4 main tabs on the navbar rendering to 4 main routes (General, Instruments, Theory and MusicBuddy)
- the navbar also contains a sign in form to allow any user to sign in
- in the navbar there is also a search tool that renders the search route
- finally the navbar contains a home link 'Welcome to Music Buddy' that renders the main layout
- the main layout yields as well the home template on top of the layout

## Home
- this template is rendered inside the layout configuration
- inside the home layout is the welcome title and the welcome text that explains what a user can do if he is new to the website
- 4 columns explain the main titles for the 4 main groups of topics by genre with links that renders these routes as well
- finally in another div beneath, the newsfeed is rendered listing all the topics by latest changes, each of those can be accessed with a link that redirects to the singleTopic route

## Sidenav
- this template is rendered on all the pages except the home page, the search page and the newTopic page
- it has an effect when opening or closing
- it lists all the latests updated topics by date with links to quickly access them from anywhere

## General, Theory, Instruments, MusicBuddy
- each of these routes renders a different page with all the topics related to this category
- each route has a title, a quick description and a newsfeed as well with the latest updated topicsof this particular category

## Search
- when keyup on this form, the search tool renders all the topics containing the text that has been typed
- also the search tools displays the number of topics that the search engine has found

## New Topic +
- this route renders to a form in which an authenticated user may create a new topic
- the user chooses a title for the topic, a description of what the topic is about, and the user must choose a category to assign his new topic
- below, a quick reminder of all the 4 main categories and what their subject is about
- when clicking the create button, if the user is not authenticated, an alert message pops up, saying the user must login to contribute
- if logged in, when clicking the create button, the topic is inserted in the database and the single topic page is rendered with his new topic with a callback function assigning the new server database Id

## SingleTopic
- this route is associated with any topic title a user clicks
- it renders in the upper part of the window the title, category, description, the user that created it and the date of creation
- beneath, it renders all the comments associated to this topic
- each comment has its username, date of comment and comment
- there is also a form where any user can add a comment to the discussion
- when clicking the send button, if the user is not authenticated, an alert message is displayed saying the user must login to contribute
- if the user is logged in, the comment is added to the top of the discussion


# Features

## Infinite scroll
In order to avoid querying the whole collections each time I render a page, using Session.set, I have set the topic limit and the comment limit to 8 while the helpers go and make their find') query on the server. 
Then, I created two function that changes the topic limit and comment limit every time the scroll bar reaches the bottom, adding 4 to the current session number of items. 
Finally, in order to reset the topic limit and comment limit on each route, I applied these function to their respective template helpers using Template.templateName.onRendered(). 
Indeed, if a user scrolled to the bottom and loaded every database item on a route, when switching to another route, the session.set topic limit or comment limit would stay the same, so I needed to reset on every rendered route, making the website faster and more responsive. 


# Styles

## Main layout
Tha main layout consists only of the navbar, and probably soon the background fixed image
It also fits all the content of the rendered routes in a div with a 'main' id to ensure that the openNav and closeNav functions work, whenever the sidenav is displayed in the window

## Main routes : 
Each main route has the main layout, and two main divs :
- one top div with the class 'fixedPart' that consists of a fixed header describing what happens on the page
- one bottom div with the class 'scrollingPart' that consists of the list of topics or comments found on that page
- each bottom div also has a subclass (there is four of them) that defines the height and the top margin of the scrollable part
Only the 'newTopic' route doesn't have a scrollable part.  



















