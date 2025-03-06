const express = require('express');
const router = express.Router();
const {
  getPatients,
  searchPatients,
  generateAndSaveTemperature,
  generateAndSaveHumidity,
  generateAndSaveHeartRate,
  createPatient
} = require('../controllers/patients');

router.get('/', getPatients);
router.get('/search', searchPatients);
router.post('/temperature', generateAndSaveTemperature);
router.post('/humidity', generateAndSaveHumidity);
router.post('/heartRate', generateAndSaveHeartRate);
router.post('/create', createPatient);

module.exports = router;