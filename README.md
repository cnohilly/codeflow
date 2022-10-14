# CodeFlow

[![License](https://img.shields.io/badge/License-MIT-blue)](https://opensource.org/licenses/MIT)

## Description

CodeFlow is a social media application where users can post and share their coding projects with others. By logging in or signing up the user will be able to use the project form to submit their project with a title, description, tags, repository link and deployed application link. Other users can then view those projects and like it, comment on it and also reply to other comments made on the project.

Along with this the user will have access to their own personal profile page where they can add a biography and custom profile picture and view their posted projects. The user also has the option to friend other users which allows them to view their friends profiles and projects.

Check out the deployed application using the links below!

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Technologies Used](#technologies-used)
- [Credits](#credits)
- [Links](#links)
- [License](#license)

## Installation

To install this application on your local machine:

- Clone the application's repository and place it into a local directory on your computer.
- Ensure that your computer has node.js installed.
- Open a command-line interface (VS Code, Git Bash, etc.) and navigate to the root directory.
- In the command-line, download the application's dependencies by typing:

```
    npm install
```

- To seed the database, type the following command:

```
    npm run seed
```

- Start the application by typing the following command. Your default web browser will then open the application in a new tab.

```
    npm run develop
```

## Usage

- To start the server, type the following command:

```
npm run develop
```

- This will open a local host tab in your browser with the application.
- Sign up as a new user or log in as an existing user in the upper right of the navigation bar to begin posting projects or liking and adding comments to existing projects.
- On the homepage, the most recent projects posted will be shown. By clicking on them you will be taken to the individual project page which will show all comments and replies.
- In the navigation bar on the top of the page is a search bar allowing you to search for projects. Select either title or tag from the dropdown and input your title or tag the search field. A search results page will display projects matching the user input.
- You can like a comment by clicking on the heart below the comment text.
- You can also leave a comment by filling out the comment form field and clicking on the comment button. The page will automaticaly update with the new comments appearing below the form.
- Clicking on the profile link in the navigation bar will take you to your profile and allow them to add a profile picture, update their biography, view their previous project posts or add friends.
- To log out of your account, click on the logout button on the upper right of the navigation bar.

## Screenshots

The following images demonstrate the application's appearance and functionality.

### Homepage

![alt='homepage'](./assets/Screen%20Shot%202022-10-13%20at%207.12.33%20PM.png)

### Project Forms

![alt='projectform](./assets/Screen%20Shot%202022-10-13%20at%208.21.45%20PM.png)

### User Profile Page

![alt='profilepage'](./assets/Screen%20Shot%202022-10-13%20at%208.23.06%20PM.png)

## Technologies Used

- GraphQL
- JWT-Decode
- React
- React-Dom
- React-Router-Dom
- Sass
- Apollo/Client
- Yaireo/tagify
- JsonWebToken
- Mongoose
- Express
- Apollo-Server-Express
- Nodemon
- Bcrypt
- Concurrently
- Animate.css
- GoogleFonts

## Credits

Special thanks to these developers for making this project possible:

- [cnohilly](https://github.com/cnohilly)
- [kt946](https://github.com/kt946)
- [StephonT](https://github.com/StephonT)
- [braulioloaizac](https://github.com/braulioloaizac)
- [ianzyvith](https://github.com/ianzyvith)

## Links

- [Link to deployed application on Heroku](https://code-flow-app.herokuapp.com/)

- [Link to GitHub repository](https://github.com/cnohilly/codeflow)

## License

This application is covered under the [MIT](https://opensource.org/licenses/MIT) License.
