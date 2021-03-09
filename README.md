# NOT YOUR AVERAGE LIFE COACH

### Navigation
  - [Getting Started](#getting-started)
  - [Project Description](#project-description)
  - [Project Limitations](#project-limitations)
  - [Project Documentation](#project-documentation)
  - [Software Architecture Organization](#software-architecture-organization-because-this-is-a-component-based-architecture-not-class-based)
  - [Sample Output](#sample-output)
  - [Contributors](#contributors)

## Getting Started

***Pre-requisites*** - Install nodejs on your device. After cloning the repository to your local machine, follow these steps to interact with the bot:   

**Step 1:** Open the repository in your preferred ide ([Visual Studio Code](https://visualstudio.microsoft.com/vs/) is recommended)

**Step 2:** Open a terminal in your vscode by going to ***Terminal > New Terminal***

**Step 3:** Split the terminal into two windows in vscode by clicking the *book* icon on the top left of the terminal

**Step 4:** Run `npm install` command in one of the terminal screens

**Step 5:** After the `npm install` command has finished installing and there are no issues, type `cd frontend` in one of the terminal windows and `cd backend` into the other

**Step 6:** In the terminal where you wrote `cd frontend` type the command `npm run serve`

**Step 7:** In the terminal where you wrote `cd backend` type the command `npm run backend`

**Step 8:** Open your internet browser and type `localhost:8080` to run the chatbot application through the frontend.

**Step 9:** That is it. Now you are ready to chat with the bot!

<div align="center">
  <img height="300" src="./Documentation/img/chatbot-screen.png">
</div>

## Project Description

Not Your Average Life Coach is a chat bot capable of holding sustained conversations and responding differently depending on your input. The goal of the bot is to give you life advice. The advice is poor by design. The user plays the role of someone in need of advice, help, or just someone wanting to have a general conversation. The bot will reply in the most disingenuous way it can, often giving the opposite of what's needed. The bot can be passive aggressive or simply rude, and will never give real advice beyond the occasional unhelpful adage.

## Project Limitations

In general, the chatbot can produce a sample output of good feasible conversation lasting a minimum of 30 turns. That being said, this chatbot has some limitations. Firstly, the chatbot will not produce the answer you expect. This chatbot uses natural language processing, which is a machine-based algorithm that builds a model based on the data given. Since our dataset is currently not large enough, the chatbot may repeat answers if the conversation is long enough, which means that the chatbot produces textbook-style conversation.

Given that information, the chatbot cannot handle incorrect spelling, as there is no natural spell checker attached. Also, the chatbot does not handle synonyms properly and treats them as unique words. Lastly, the program does not remember the conversations it holds after refreshing the page.

## Project Documentation

 - [Work Breakdown Structure](https://github.com/Take-Your-Money-Corp/not-avg-lifecoach/blob/master/Documentation/WBS.png)
 - [Gantt Chart](https://github.com/Take-Your-Money-Corp/not-avg-lifecoach/blob/master/Documentation/GanttChart.png)

## Software Architecture Organization (Because this is a component based architecture not class based)

- ### Context Diagram (click to expand)

 <div align="center">
  <img height="300" src="./Documentation/img/SoftwareArchitecture-Container-View.png">
</div> 

- ### Compenent Diagram (click to expand)

 <div align="center">
  <img height="400" src="./Documentation/img/SoftwareArchitecture-Component-View.png">
</div> 


## Sample Output 

<div align="center">
  <img height="700" src="./Documentation/img/sample.gif">
</div>

## Contributors

### Matt Borle
#### Assignment 2:
- Peer evaluations 
- Helped a bit with backend (w/ Shawn and Guy)
- Contributed project plan document (w/ everyone)
- Created Presentation Video

### Guy Kaminsky
#### Assignment 2:
- Organized / ran meetings (w/ Dani)
- Did the WBS (w/ Dani)
- Wrote project limitations 
- Wrote gantt and WBS descriptions
- Contributed project plan document (w/ everyone)
- Helped a bit with backend (w/ Shawn and Matt)
- Edit README (w/ Dani)
- Final edit project pdf
- Peer evaluations 

### Danielle Macdonald
#### Assignment 2:
- Organized / ran meetings (w/ Guy)
- Assisted with creation of project plan document
- Created WBS (w/ Guy)
- Assisted with task tracking in Kanban board
- Created README file
- Edited frontend of chatbot (w/ Harman)
- Finalized chat bot styling and user icons (w/ JQ)
- Tested chatbot output and recorded sample output.
- Assigned tasks to group members (w/ Guy)
- Peer evaluations

### Shawn Paul Mountenay
#### Assignment 2:
- Peer evaluations 
- Contributed project plan document (w/ everyone)
- Contributed to Meetings
- Taught some Web Development Concepts to other group members.
- Made the repository and explained GitHub to other group members.
- Setup base architecture and proposed main libraries and explained.
- Setup project libraries on frontend and backend (with help from JQ)
- Helped with styles
- Contributed to all Vue Components
- Peer evaluations
- Made Chatbot work on mobile

### Wee Jia Quan
#### Assignment 2:
- Reverse engineered the API of NLPJs to integrate with our Vue frontend. (w/ Shawn)
- Added welcome message / initial message for the chatbot.
- Finalized chat bot styling and user icons (w/ Danielle)
- Initialized corpus.json with the message that suits the attitude of our chatbot.
- Project plan document (w/ everyone)
- Made animated gif / video demonstration draft
- Peer evaluations 

### Harman Sahota
#### Assignment 2:
- Peer evaluations 
- Contributed project plan document (w/ everyone)
- Contributed to making the UI(with danielle)
- Contributed to the documentation in the github readme file
- Wrote the task breakdown(with JQ)
- Worked on the gantt chart (with JQ)
- Peer evaluations
