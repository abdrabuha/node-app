This Express.js application is a task management system that interacts with MongoDB using Mongoose as an Object Data Modeling (ODM) library. It performs various CRUD (Create, Read, Update, Delete) operations through defined routes.

Here's a breakdown of its functionality:

    Setting Up the Server:
        Requires necessary modules: express, body-parser, and mongoose.
        Initializes the Express app.
        Serves static files from the 'public' directory.

    Connecting to MongoDB:
        Establishes a connection to a MongoDB database named 'mydatabase' on the local instance.

    Defining Routes:
        GET /main: Serves the main HTML page.
        GET /about: Serves the about HTML page.
        POST /addTask: Handles the addition of a new task to the database. Expects JSON data with taskName and dueDate, then saves the new task to the MongoDB collection named Task.
        GET /getTasks: Fetches all tasks from the database and returns them as JSON to the client.
        GET /showTasks: Similar to /getTasks, this endpoint retrieves all tasks and sends them as JSON to the client.
        DELETE /deleteTask/:id: Deletes a task from the database based on the provided task ID (:id parameter).

    Error Handling:
        Contains error handling for different scenarios, such as errors in adding tasks, fetching tasks, or deleting tasks.
        Returns appropriate status codes and error messages when errors occur.

    Server Configuration:
        Sets up the server to listen on port 3000 or a specified environment variable.

This app essentially manages tasks, allowing users to add new tasks, fetch all tasks, display tasks, and delete specific tasks from the database using the defined routes and MongoDB interactions.


Created by Abdrabuh - feel free to use it
