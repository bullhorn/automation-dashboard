# Prerequisites
- [Node 6](https://nodejs.org/en/)
- [Angular CLI](https://cli.angular.io/)

# Running locally
## Frontend
```
# Clone the project
git clone git@github.com:bullhorn/automation-dashboard.git

# Change directory
cd automation-dashboard

# Install
npm install

# Start
npm start

# Access the Demo in your browser at
http://localhost:4200/
```
## Backend
```
Open a new terminal and run npm install and then node server and you should see a console message saying your backend is started and pointing to the database you set as your DATABASE_URL variable.

Go to server/setup/config.json and edit the defaults if you would like something different.

Run node server/setup/initDatabase which will setup useful defaults in your database for the front-end to use.
```

# Further documentation
See [docs](docs/) for more in-depth setup information.

# Contribute
- [Submit](https://github.com/bullhorn/automation-dashboard/issues) feature requests and bugs, as well as solutions to other issues.
- [Review](https://github.com/bullhorn/automation-dashboard/pulls) code changes.

# Slack Integration

# License
Copyright (c) forever [Bullhorn](http://www.bullhorn.com/).
<br><br>
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
<br><br>
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
<br><br>
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.