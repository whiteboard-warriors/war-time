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
-   git checkout -b <- Branch Name ->

## Running the app

### Database server:

-   Start Robo 3T

On your terminal run:

-   `mongod --config /usr/local/etc/mongod.conf --fork`

### Backend only:

On your terminal, on the root folder, run:

-   `nodemon server`

### Frontend and Backend:

On your terminal, on the root folder, run:

-   `npm start`

### Notes on Deployment

- Create NodeJS Bitnami instance on LightSail
- SET ENV variables on machine like so
```
NODE_ENV=PROD
export PROD
```
- Run `npm run-scripts build` (before so client is compiled to optimized version, otherwise returns `cannot get /`)
- Start app with forever (setting PWD relative the app: `forever start server/index.js`)
- Use LetsEncryptCert tool which auto re-writes the VHOSTS file in `conf/bitnami/bitnami.conf` (for apache)
- Modify vhost file for HTTPS:
  - Look for node directory 
  - proxy all requests to internal `localhost:3000` app
- Setup Travis-CI Job:
  - Encrypt deployment key
  - add -e command to RSync for non-interactive/host key validation
