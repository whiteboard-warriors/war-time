# War Time - Whiteboard Warriors

## Prerequisites

-   [node js](https://nodejs.org/en/) - recommended version is 13.11.0
-   [Robo 3T -formerly Robomongo](https://robomongo.org/download)
-   [mongo db](https://docs.mongodb.com/manual/installation/)
-   npm

## Installation

On your command line run:

-   `git clone https://github.com/whiteboard-warriors/war-time-app.git`
-   cd war-time-app
-   npm install

## Running the app

### Database server:

-   Start Robo 3T

On your terminal run:

-   `mongod --config /usr/local/etc/mongod.conf --fork`

### Backend only:

On your terminal run, on the root folder:

-   `nodemon server`

### Frontend and Backend:

On your terminal run, on the root folder:

-   `npm start`
