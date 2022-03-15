import express from 'express';
import Project from '../models/projectModel.js';

const router = new express.Router();

// Create new project
router.post('/project/new', async (req, res) => {
  console.log(req.body);
  const project = new Project(req.body);
  try {
    await project.save();
    res.status(201).send(project);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// Get all projects
router.get('/project/all', async (req, res) => {
  try {
    let projects = await Project.find({});
    if (!projects) return res.status(400).send([]);
    res.send(projects);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
