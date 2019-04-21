# KitcheNexus Responsive Web App
This is the first full stack application I ever developed from scratch.  

It addresses common problems that arise when from every day kitchen use, such as misplacing recipes, forgetting grocery lists at home, or buying food with uncertainty about what's already at home.  This app helps users discover and keep track of new recipes, organize their grocery lists, and reference a digital record their pantry.  

This version uses React, Redux, Express, Passport, and PostgreSQL (a full list of dependencies can be found in `package.json`).

## Demo
[Heroku](https://kitchenexus.herokuapp.com/#/home)

## Prerequisites
Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)
- [Postico](https://eggerapps.at/postico/)

## Development Setup Instructions

1. Fork and clone this repo
2. Setup your local database
    * Create a new database called `kitcheNexus` using [Postico](https://eggerapps.at/postico/docs/v1.5.6/)
    * Run the database.sql file to set up tables 

3. Create a .env file at the root of the project and paste this line into the file. 
    ```
    SERVER_SESSION_SECRET=superSecretSession
    FOOD_APP_ID=foodAppId
    FOOD_APP_KEY=foodAppKey
    RECIPE_APP_ID=recipeAppId
    RECIPE_APP_KEY=recipeAppKey
    ```
    While you're in your new `.env` file replace:
    * `superSecretSession` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
    * `foodAppId` and `foodAppKey` with your own key and app id after creating a free developer account on [Edamam](https://developer.edamam.com/food-database-api)
    * `recipeAppId` and `recipeAppKey` with your own key and app id after creating a free developer account on [Edamam](https://developer.edamam.com/edamam-recipe-api)

4. In terminal in app root folder run the following commands
    ```bash
        brew services start postgresql
        npm install
        npm run server
        npm run client
    ```
5. Navigate to localhost:3000 to begin using the app. 

`If you have not set up your edamam api keys, most of the functionality of the app will be unavailable.`


## Deployment

1. Create a new Heroku project
1. Link the Heroku project to the project GitHub Repo
1. Create an Heroku Postgres database
1. Connect to the Heroku Postgres database from Postico
1. Create the necessary tables
1. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security
1. In the deploy section, select manual deploy

## Built With
* React, Redux, and Redux-Saga
* Node.js and Express
* pg and PostgreSQL
* Material UI

## Authors
* Anthony Dunahee - [Git Profile](https://github.com/adunahee)

## Acknowledgements
* Special thanks to Prime Digital Academy and their instructors for supporting me during the development of this app. 
* Thank you [Edamam](https://developer.edamam.com/) for being a great and easy to use API that saved me a lot of data entry.

## License
This project is licensed under the MIT License - see the LICENSE.md file for details