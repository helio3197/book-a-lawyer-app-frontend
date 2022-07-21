# Book A Lawyer

> A React/Redux full-stack app for managing appointments with lawyers

![screenshot](./screenshot.png)


This repository is a React/Redux developed frontend app named "Book a lawyer App". The purpose of the project is to automate the law services. The Application allows an authenticated user to log in to the system, get a list of all available lawyers whose can be bookeed for a specified date and time. The lawyers' bio has the contact details, location, pricing per hour of the lawyer from which a user gets more insights. It also has dedicated pages to see the user's reservations and a reserve form. An admin user has the right to add/edit/remove a lawyer from the database and hence can see the Manage tab.

**Main features:**
- Account system, users can:
  - Create an account and provide an optional avatar.
  - Login to the app using email and password
  - Edit a personal account, users can modify his personal information.
- Reserve/booking system, users can:
  - Book an appointment with a lawyer on an incoming date, and set the appointment's duration.
  - See personal reservations in the reservation page.
  - Modify an existing reservation.
  - Cancel a reservation.
- Visualize details for a lawyer.
- Optimized for mobile devices.

## Backend repo

[Click here](https://github.com/richardoppiyo/book-a-lawyer-App-backend)


## Built With

- React 18.2.0
- React-redux 8.0.2
- Sass 1.53
- React-bootstrap 2.4.0
- JavaScript
- [REST API](https://github.com/richardoppiyo/book-a-lawyer-App-backend)

## Live demo

[Click Here](https://book-a-lawyer-app.herokuapp.com)


## Getting Started

Follow these steps:

### Prerequisites

Have the following correctly installed.
- Node.js & NPM
- Git

Have the backend repo setup correctly
- [Instructions](https://github.com/richardoppiyo/book-a-lawyer-App-backend)

### Setup

- Open a terminal window where you want to have installed a clone of the repository.

### Install

- Use this command to clone the repo:
```
$ git clone git@github.com:helio3197/book-a-lawyer-app-frontend.git
```
- Install the required dependencies:
```
$ npm install
```
### Usage
- Run the backend server on the port: 3000
 ```
rails s --port=3000
```

- Run the frontend server on the specified port:
```
$ PORT=3001 npm start
```
- Build:
```
$ npm run build
```

## Authors

👤 **Kenny Salazar**

- GitHub: [@helio3197](https://github.com/helio3197)
- Twitter: [@kennysalazar31](https://twitter.com/kennysalazar31)
- LinkedIn: [LinkedIn](https://linkedin.com/in/kenny-salazar-1a1687110)

👤 **Richard Opiyo**

- GitHub: [@richaroppiyo](https://github.com/richardoppiyo)
- Twitter: [@blessed_ricky](https://twitter.com/blessed_ricky)
- LinkedIn: [LinkedIn](https://www.linkedin.com/in/richardoppiyo/)


## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](../../issues/).

## Show your support

Give a ⭐️ if you like this project!

## Acknowledgments

- Thanks to Microverse for the guidelines.
- Original design by [Murat Korkmaz](https://www.behance.net/muratk)


## 📝 License

This project is [MIT](./MIT.md) licensed.
