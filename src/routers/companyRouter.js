import express from 'express';
import Company from '../models/companyModel.js';

const router = new express.Router();

// Create new company
router.post('/company/new', async (req, res) => {
  console.log(req.body);
  const company = new Company(req.body);
  try {
    await company.save();
    res.status(201).send(company);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// Get all companies
router.get('/company/all', async (req, res) => {
  try {
    let companies = await Company.find({}).populate('projects');
    if (!companies) return res.status(400).send([]);

    res.send(companies);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
