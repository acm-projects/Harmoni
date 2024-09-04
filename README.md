

<p align="center">
  <img src="https://github.com/acm-projects/SpeakWise/assets/112922432/463d7323-d94d-4dad-ad6b-39a99ba1cde9" alt="animated" />
</p>

<h1 align="center"> Harmoni </h1>

<div align="center"> Struggling to coordinate group projects or social plans with busy friends/family, especially when exams and deadlines seem to always get in the way? Meet Harmoni, your ultimate scheduling companion designed just for college students. Harmoni takes the hassle out of planning by syncing all your group members’ calendars into one unified view. It smartly identifies free time slots that work for everyone, while carefully avoiding clashes with exams and critical deadlines on your academic calendar. The app then creates a poll with these optimal time slots. Once the group votes on the best time, Harmoni automatically confirms the meeting and adds it to everyone’s calendars, complete with a notification. With Harmoni, group scheduling becomes effortless and efficient. </div>


## MVP
- MyCalendar Tab
- Create/Join Groups Feature
- View Synced Calendar for Each Group
- Schedule Event Feature
- Harmoni Algorithm
- Interactive Poll
- Do Not Disturb Type Feature (shows others you're currently unavailable)
- Harmoni automatically adds events to all group members’ calendars once time is confirmed.

## Stretch Goals 
- Notifications
- QR Code to efficiently connect calendars with someone.
- Chat feature for each group
- Feature that shows which group members/friends are currently available
- Voice Activated Scheduling with Amazon Lex
- Schedule Tasks through app that will automatically add to group members’ calendars
- Chatbot where you can ask about hangout ideas
- Expand to other Calendars like Outlook, etc.
- Make calendars searchable with Amazon Kendra.
- Place for shared documents or plan creation



## Milestones 
<details closed>
<summary>  <strong> Week 1 </strong> </summary>
<br>
  
- Decide frontend/backend teams
- Finalize tech stack
- Research/Learn Tech Stack
- Environment Setup
- Learn Git/Github
- Begin App Design with Figma


</details>

<details closed>
<summary>  <strong> Week 2 </strong> </summary>
<br>
  
- Frontend:
  - Finish Figma Design and Prototype by the end of week
  - Learn React Native
- Backend:
  - Start looking into the API’s
  - Set up User Authentication
  - Set up Database

  
</details>

<details closed>
<summary>  <strong> Week 3/4 </strong> </summary>
<br>
  
- Frontend:
  - Login/Sign Up Pages
  - Home Page
  - MyCalendar/Connect Calendar Page
  - Shows schedule for current week
  - Groups page
- Backend:
  - Integrate Google Calendar API to display schedule in app
  - Develop Group Feature 
  - Create groups, Join groups
  - Start looking into how to find free time slots/developing algorithm idea

</details>

<details closed>
<summary>  <strong> Week 5/6 </strong> </summary>
<br>
  
- Start Integrating finished backend features with finished frontend pages (Groups, User Auth) 
- Frontend
  - Groups Page
    - Display all groups the user is in, including individual people the user has synced calendars with
  - Individual Groups Page
    - Shows synced calendar + each member and their calendar
    - Would hide specific events, just show blocks of when time is occupied
    - Shows Poll if applicable
  - Schedule Meetup Page
    - Can either pick a date range or find next best time
    - If picking date range, will find all free slots and generate a poll
  - Poll Page
    - Shows all free time slots, anonymously vote
- Backend
  - Sync events on calendar based on free time slots
  - Research how to incorporate academic deadlines into syncing and implement
  - Poll feature

</details>

<details closed>
<summary>  <strong> Week 7 </strong> </summary>
<br>
  
- Integrate finished backend features with finished frontend pages
- Finish all features
- Work on stretch goals if possible
- Frontend
  - Finish all pages
- Backend
  - Feature to add scheduled events to all group members’ calendars
  - Poll feature

</details>

<details closed>
<summary>  <strong> Week 8 </strong> </summary>
<br>
  
- Finish backend/frontend integration
- Add finishing touches
- Finish stretch goals if possible
- Begin work on presentation 

</details>

<details closed>
<summary>  <strong> Week 9/10 </strong> </summary>
<br>
  
- Prep for Presentation Night
- Finish Slides + Script + Demo

</details>


## Tech Stack 

IDE: VSCode
Emulator: XCode or Android Studio
Wireframe: [Figma](https://www.figma.com/) 

1st Choice Stack: MERN
- Frontend: React Native
- Backend: MongoDB + Express + Node.js

Backup: Flutter
- Frontend: Flutter
- Backend: Firebase + Dart

 
## Helpful Resources/Tutorials 

 <strong> React Native: </strong>
- [React Native Basics](https://reactnative.dev/docs/tutorial?language=javascript)
- [Environment Setup](https://reactnative.dev/docs/environment-setup)
- [Environment Setup with Expo](https://docs.expo.dev/router/installation/)
- [Build Full Stack App in React Native](https://www.youtube.com/watch?v=eYByUtXQbEo)
- [React Native Course](https://www.youtube.com/watch?v=ZBCUegTZF7M&t=1396s)
- [React Native Tutorial](https://www.youtube.com/watch?v=6ZnfsJ6mM5c)
 
<strong> Flutter: </strong>
- [Documentation](https://docs.flutter.dev/)
- [Install Flutter on Mac](https://www.youtube.com/watch?v=KdO9B_CZmzo)
- [Install Flutter on Windows](https://www.youtube.com/watch?v=DvZuJeTHWaw)
- [Intro to Flutter/Dart](https://www.youtube.com/watch?v=CzRQ9mnmh44)
- [Flutter + Firebase](https://www.youtube.com/watch?v=0RWLaJxW7Oc)


<strong> XCode: </strong>
- [Install IOS Simulator](https://www.youtube.com/watch?v=Ws-wnDywtMI)
  
<strong> Android Studio: </strong>
- [Install on Mac](https://www.youtube.com/watch?v=8ILww0tUSxw)
- [Install on Windows](https://www.youtube.com/watch?v=fxSKQPG37IA)

<strong> MERN Stack Backend: </strong>
- [Node + Express](https://www.youtube.com/watch?v=P5QbE9aRCLQ&list=PLaAoUJDWH9WrPXMOkqHHsPHxbhvRDqryM)
- [MongoDB tutorial for beginners](https://www.youtube.com/watch?v=6DoLxeMlVTI) 
- [What is MongoDB?](https://www.youtube.com/watch?v=ExcRbA7fy_A&list=PL4cUxeGkcC9h77dJ-QJlwGlZlTd4ecZOA)
- [Mastering Authentication in React Native](https://www.youtube.com/watch?v=tsvZFNgoXy0)
- [Login Register Authentication in React Native with Node JS, Express JS and Mongo DB](https://www.youtube.com/watch?v=p-YhMj1XHzs)


<strong> APIs: </strong>
- [Fetching Data from an API in React Native](https://www.youtube.com/watch?v=KJhg761xb3c)
- [React Native Tutorial - POST Request](https://www.youtube.com/watch?v=BecN2PxyR_0)
- [React Native tutorial - API Call](https://www.youtube.com/watch?v=NuKQk7nbk0k) 
- [Google Calendar API with Node.js](https://www.youtube.com/watch?v=2byT7fYT8UE)
- [Postman Tutorial](https://www.youtube.com/watch?v=MFxk5BZulVU)
- [RapidAPI](https://rapidapi.com/search/restaurants)
- [Google Cloud Natural Language API](https://cloud.google.com/natural-language)

<strong> Other Technologies for Finding Free Time Slots: </strong>
- [GraphQL Course for Beginners](https://www.youtube.com/watch?v=5199E50O7SI)
- [GraphQL With React Tutorial - Apollo Client](https://www.youtube.com/watch?v=YyUWW04HwKY)
- [date-fns](https://www.youtube.com/watch?v=9YZIQAmgD0o)
- [AWS Lambda](https://www.youtube.com/watch?v=UsaiOEFdfs0)
- [Associating a Lambda function to your Amazon Lex v2 bot](https://www.youtube.com/watch?v=57ZqpzHtQX4) 
- [Amazon Lex: Validate Slot data with Lambda](https://www.youtube.com/watch?v=1xRl8Ipa018)

<strong> Optional/Stretch Goals: </strong>
- [Amazon Kendra: Search Calendars](https://www.youtube.com/watch?v=Yo9YQCGG5zM)
- [Amazon Lex: Voice Activated Scheduling](https://www.youtube.com/watch?v=3AZ1n2oHtEI)




Git Cheat Sheets:      
[Git Cheat Sheet 1](https://education.github.com/git-cheat-sheet-education.pdf)                                                                                                                                                
[Git Cheat Sheet 2](https://drive.google.com/file/d/1OddwoSvNJ3dQuEBw3RERieMXmOicif9_/view)  

Resources for Design:    
[Best App Design](https://dribbble.com/tags/best-app-design) - copy and paste link if it takes you to forbidden                                                                                                                 
[Dribble](https://dribbble.com/)  - copy and paste link if it takes you to forbidden                                                                                                                                            
[Color Palettes](https://www.canva.com/colors/color-palettes/)                                                                                                                                                                  
[More Color Palettes](https://colorhunt.co/)                                                                                                                                                                                    
[Do's and Don'ts of Mobile App Design](https://realmonkey.co/mobile-app-design/the-dos-and-donts-of-mobile-app-design/)



Other Resources:           
[Git Tutorial](https://www.youtube.com/watch?v=USjZcfj8yxE)  
[Figma](https://www.figma.com/files/project/81846282/Team-project?fuid=1155168864304822849)                                                                                                                                     
[Helpful Vids Playlist](https://youtube.com/playlist?list=PLKjOhYfrGFCatnsBMIHOX0JVfcVbSZWSW&si=2M_sZDABO2NeyfB)
[How to be Successful in Projects](https://docs.google.com/document/d/18Zi3DrKG5e6g5Bojr8iqxIu6VIGl86YBSFlsnJnlM88/edit)

## GitHub Cheat Sheet ⚡️

General Use

| Command | Description |
| ------ | ------ |
| cd "SpeakWise" | Change directories over to our repository |
| git branch | Lists branches for you |
| git branch "branch name" | Makes new branch |
| git checkout "branch name" | Switch to branch |
| git checkout -b "branch name" | Same as 2 previous commands together |
| git add . | Finds all changed files |
| git commit -m "Testing123" | Commit with message |
| git push origin "branch" | Push to branch |
| git pull origin "branch" | Pull updates from a specific branch |

## Developers‼️‼️ 
Mathew Biji
Kartik Joshi
Muhd Haque
Leo dos Remedios

Kanchan Javalkar - *Project Manager*  
Nirranjan Akilan - *Industry Mentor*


