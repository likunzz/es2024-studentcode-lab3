const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const app = express();

app.use(cors()); 
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Student to the API!");
});

mongoose.connect('mongodb://mongodb:27017/students', { useNewUrlParser: true, useUnifiedTopology: true });

const studentSchema = new mongoose.Schema({
  studentCode: String,
  firstName: String,
  lastName: String,
  telNumber: String,
}, { versionKey: false });

const Student = mongoose.model('Student', studentSchema);

app.get('/students', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

app.post('/students', async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json(student);
});

app.put('/students/:id', async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(student);
});

app.delete('/students/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: 'Student deleted' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
