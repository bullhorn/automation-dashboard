# Initial Setup
Before going through the setup steps please take a look at the other files in the docs folder to get a better understanding of how the collecitons are connected.

## Database
We use [mLab](http://docs.mlab.com/#account-setup) for hosting our MongoDB instance since the free account is more than enough for our needs and it is very simple to setup. 

Once your database instance is setup with mLab, copy the url below "To connect using a driver via the standard MongoDB URI" and set that as your `DATABASE_URL` environment variable

After that, the database should be all setup and you are ready to move on to the backend setup

## Backend
Open a new terminal and run `npm install` and then `node server` and you should see a console message saying your backend is started and pointing to the database you set as your `DATABASE_URL` variable

Go to `server/setup/config.json` and edit the defaults if you would like something different. 

Run `node server/setup/initDatabase` which will setup useful defaults in your database for the front-end to use. 

## Front-end
In `src/app/config/config.ts` add the location of your backend as the backendURL variable. Ex: localhost:3000

In a seperate terminal window, run `npm start` which will start the front-end. Navigate to localhost:3000 and you should have the test you added in the initDatabase script and the dropdowns in the sidebar should be respect what you configured in `server/setup/config.json`

## Building for production
Run `ng build` and webpack will build everything and place it in the dist folder

