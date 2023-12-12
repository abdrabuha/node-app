const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// Your application code using Mongoose

const app = express();
app.use(express.static('public'));

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: false,
  w: 'majority',
});

const Task = mongoose.model('Task', { taskName: String, dueDate: Date });

// Define routes
app.get('/main', (req, res) => {
  res.sendFile(__dirname + '/public/main.html');
});
app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/public/about.html');
});
  
app.post('/addTask', (req, res) => {
  const { taskName, dueDate } = req.body;
  const newTask = new Task({ taskName, dueDate });
  newTask.save()
    .then(task => {
      console.log('Task added:', task);
      res.json(task);
    })
    .catch(error => {
      console.error('Error adding task:', error);
      res.status(500).send('Error adding task');
    });
});


// Define a route to fetch tasks
app.get('/getTasks', async (req, res) => {
    try {
      const tasks = await Task.find({});
      res.json(tasks);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      res.status(500).json({ error: 'Error fetching tasks' });
    }
  });
  
  // Server-side route for /showTasks
// Server-side route for /showTasks
app.get('/showTasks', async (req, res) => {
    try {
      const tasks = await Task.find({}); // Fetch all tasks from the database
      res.json(tasks); // Send tasks as JSON to the client
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).send('Error fetching tasks');
    }
  });
  
  // Delete route
app.delete('/deleteTask/:id', async (req, res) => {
    const taskId = req.params.id;
  
    try {
      const deletedTask = await Task.findByIdAndDelete(taskId);
      if (!deletedTask) {
        return res.status(404).send('Task not found');
      }
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).send('Error deleting task');
    }
  });
  
// More routes for fetching tasks and deleting tasks would be added here

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
