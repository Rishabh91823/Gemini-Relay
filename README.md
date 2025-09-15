# Gemini Relay

*A real-time chat app, originating from a Class 10th ICT project, now enhanced with a Google Gemini AI chatbot. Built with Node.js and Socket.IO, this project showcases growth from a basic app to an intelligent, modern platform.*

![Gemini Relay Demo](./public/images/screenshot.png)
*(Note: You will need to add a screenshot of your app to your project folder and update the path above)*

---
## ✨ Core Features

- **Real-Time Messaging:** Instantly send and receive messages with multiple users using Socket.IO.
- **AI Chatbot Integration:** Converse with an intelligent AI by using the `@bot` command, powered by the Google Gemini API.
- **User Notifications:** See system messages when users join or leave the chat in real-time.
- **Personalized Welcome:** New users receive a private welcome message with instructions on how to use the bot.
- **Modern & Responsive UI:** A clean and intuitive interface that works seamlessly on both desktop and mobile devices.

---
## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js, Socket.IO
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **API:** Google Gemini API

---
## 🚀 Project Story

This project originated as a real-time chat application for my Class 10th ICT course, serving as my first deep dive into backend development with **Node.js, Express, and Socket.IO**. To showcase my growth as a developer, I recently revisited this foundation to build a more advanced and intelligent platform.

The most significant enhancement is the integration of a powerful AI chatbot using **Google's Gemini API**, which responds to user queries that start with the `@bot` command. The entire user interface was also redesigned from scratch with a clean, responsive layout using modern CSS3, ensuring a seamless experience on any device.

Additional features were implemented to create a more engaging chat environment, including real-time notifications for users joining or leaving and a private welcome message for new participants. The backend was also refactored for better security and maintainability, including the use of environment variables to protect the API key.

This evolution transforms a simple school project into a dynamic and interactive AI-powered application, demonstrating a comprehensive understanding of full-stack development, modern API integration, and user-focused design.

---
## ⚙️ Getting Started

To get a local copy up and running, follow these simple steps.

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/your-username/Gemini-Relay.git](https://github.com/your-username/Gemini-Relay.git)
    cd Gemini-Relay
    ```

2.  **Install NPM Packages**
    This will install all the necessary dependencies for the project.
    ```bash
    npm install
    ```

3.  **Set Up Environment Variables**
    You will need to provide your own Google Gemini API key.
    - Create a new file in the root of the project named `.env`
    - Open the `.env` file and add the following line, replacing the placeholder with your actual key:
        ```
        GEMINI_API_KEY=YOUR_API_KEY_HERE
        ```
    You can get a free API key from [Google AI Studio](https://aistudio.google.com/).

4.  **Run the Server**
    ```bash
    node server.js
    ```
    You should see a confirmation in your terminal: `Listening on port 3000`.

5.  **Open the Application**
    Open your web browser and navigate to `http://localhost:3000`. You can now start using the chat!
