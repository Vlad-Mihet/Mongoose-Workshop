const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const UserModel = require('./models/User');

const app = express();

const PORT = 5050;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log('App is running on port 5050');
});

mongoose.connect('mongodb+srv://admin:CZAQ9B9TwLbRcfv8@workshop-cluster.xvvmlzi.mongodb.net/?retryWrites=true&w=majority', () => {
  console.log('Succesfully connected to DB!');
});

app.post('/', async (req, res) => {
  const { name, age, occupation } = req.body;

  try {
    const user = await UserModel.create({
      name,
      age,
    });

    res.status(201).json({ user });
  } catch (err) {
    console.error(err);
    res.status(400).json({ err });
  }
});

app.get('/', async (req, res) => {
  const { age } = req.query;

  try {
    const users = await UserModel.find({ age });

    res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err });
  }
});


app.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findById(id);

    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err });
  }
});

app.put('/:id', async (req, res) => {
  const { id } = req.params;

  const { posts } = req.body;

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(id, { posts });

    res.status(200).json({ updatedUser });
  } catch (err) {
    console.error(err);
    res.status(400).json({ err });
  }
});

app.delete('/', async (req, res) => {
  const { age } = req.query;

  try {
    await UserModel.find({ age: { '$lte': age } }).deleteMany();

    res.status(200).json();
  } catch (err) {
    console.error(err);
    res.status(400).json({ err });
  }
});

