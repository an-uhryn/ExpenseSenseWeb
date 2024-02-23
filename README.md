# ExpenseSenseWeb

This repository contains the backend and web interface part of the ExpenseSense application. The ExpenseSense is designed to help users manage and track their expenses conveniently. This README provides an overview of the setup, features, and how to get started with the backend and web interface.

## Features

- **Expense Management**: Allows users to add, edit, and delete expenses.
- **Category Tracking**: Organizes expenses into categories for better management.
- **Tags**: For even more precise organization.
- **User Authentication**: Secure user authentication system to protect user data.
- **Data Visualization**: Provides visual representations of expenses through charts.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **MongoDB**: A NoSQL database for storing expense data.
- **Express.js**: A web application framework for Node.js used for building the backend.
- **Node.js**: A JavaScript runtime for building scalable server-side applications.

## Getting Started

To get started with the Expense Tracker backend and web interface, follow these steps:

### General steps

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/expense-tracker-backend.git
    ```
2. **Create database and setup Environment Variables**:
    - Create database at https://cloud.mongodb.com/
    - Create a `.env` file based on the provided `.env.example` and fill in the necessary details such as MongoDB connection URI and password.
   ```bash
    MONGO_URI=
    MONGO_USERNAME=
    MONGO_PASSWORD=
    ```
   
### Running with Docker
1. **Install Docker**
2. **If you have Docker installed on your machine just run next command from root folder:** 
   ```bash
    docker compose up
   ```
3. **To stop and remove containers run:**
   ```bash
    docker compose stop
   ```
   
   Server is running at http://localhost:4000 and UI is running at http://localhost:3000
   
   
### To run server without Docker
1. **Go to `/backend` folder.**
2. **Install dependencies:**
   ```bash
    npm i
   ```
3. **Start backend from `/backend` folder by running:**
    ```bash
    npm run dev
    ```
   Done! Server is running at http://localhost:4000

### To run web interface without Docker
1. **Go to `/frontend` folder.**
2. **Install dependencies:**
   ```bash
    npm i
   ```
3. **Start frontend from `/frontend` folder by running:**
    ```bash
    npm run start
    ```
   Done! UI is running at http://localhost:3000

## Contributing

Contributions are welcome! If you'd like to contribute to the Expense Tracker project, please follow these steps:

1. Fork the repository.
2. Create your feature branch:
    ```bash
    git checkout -b feat/your-feature
    ```
3. Commit your changes:
    ```bash
    git commit -m 'feat: add some feature'
    ```
4. Push to the branch:
    ```bash
    git push origin feat/your-feature
    ```
5. Submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
