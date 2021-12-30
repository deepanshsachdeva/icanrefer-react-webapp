# I Can Refer

`React` based web application with Express server preseneted as final project for the course `INFO6250 Web Development Tools & Methods` instructed by `Brett Ritter`.

## Introduction

`I Can Refer` project is created keeping in mind the current situation caused by COVID19 pandemic. Many people have lost their jobs and are struggling to find new ones during the pandemic. Also, some people have come forward to support and help others by providing referrals for their current organization's available positions.

The application provides a consolidated platform for the users to post details about referral or any professional help they can provide. The post can have details such as organization's name, available positions with required skills, contact details, etc.

Users can view all the available posts and contact the concerned person via given details. Also, users can log into the application and open the dashboard to manage i.e. view, create & delete their posts.

## Installation & Usage

1. Clone the repository.

2. Go to project root directory and use the `npm` to install modules.

```
npm install
```

3. Run the below command to create a build and start the serve.

```
npm start
```

4. Go to `http://localhost:5000` to use application.

## Usage

- Application starts with a `Home` page with posts created on the platform by different users.

- Click on `Login` link in the navbar to go to the login page to authenticate and access the `Dashboard`.

- `Dashboard` only displays posts created by the logged in user with an option to `delete` a post.

- From the navbar, the user has option to create a post using `Create` or log out using `Logout` link. Only authenticated users can perform these actions. 

- `About` page tells you about the application.

## Contributing Libraries
Following external libraries are used in the application:

- react
- react-dom
- react-scripts
- react-router
- express
- uuid
- cookie-parser