const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run('CREATE TABLE patient (id TEXT, name TEXT, temperature TEXT, humidity TEXT, heartRate TEXT)');
  db.run('INSERT INTO patient (id, name, temperature, humidity , heartRate) VALUES (?, ?, ?, ?, ?)', ['1', 'Mohamed Sayed', JSON.stringify([36]), JSON.stringify([50]), JSON.stringify([70])]);
  db.run('INSERT INTO patient (id, name, temperature, humidity , heartRate) VALUES (?, ?, ?, ?, ?)', ['2', 'Ahmed Mostafa', JSON.stringify([37]), JSON.stringify([52]), JSON.stringify([71])]);
  db.run('INSERT INTO patient (id, name, temperature, humidity , heartRate) VALUES (?, ?, ?, ?, ?)', ['3', 'Ahmed Ali', JSON.stringify([37.5]), JSON.stringify([60]), JSON.stringify([80])]);
  db.run('INSERT INTO patient (id, name, temperature, humidity , heartRate) VALUES (?, ?, ?, ?, ?)', ['4', 'Ali Mohamed', JSON.stringify([37]), JSON.stringify([70]), JSON.stringify([50])]);
  db.run('INSERT INTO patient (id, name, temperature, humidity , heartRate) VALUES (?, ?, ?, ?, ?)', ['5', 'Sayed Ahmed', JSON.stringify([39]), JSON.stringify([80]), JSON.stringify([100])]);
});

exports.getPatients = async (req, res, next) => {
  db.all('SELECT * FROM patient', (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.status(200).json({ data: rows });
  });
};

exports.searchPatients = async (req, res, next) => {
  const query = req.query.q.toLowerCase();
  db.all('SELECT * FROM patient WHERE LOWER(name) LIKE ? OR id LIKE ?', [`%${query}%`, `%${query}%`], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.status(200).json({ data: rows });
  });
};

exports.generateAndSaveTemperature = async (req, res, next) => {
  const generateRandomTemperature = () => (Math.random() * 10 + 20).toFixed(1);
  const temperatureData = generateRandomTemperature();
  const { id } = req.body;
  db.get('SELECT temperature FROM patient WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }
    if (!row) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    const temperatures = JSON.parse(row.temperature);
    temperatures.push(parseFloat(temperatureData));
    db.run('UPDATE patient SET temperature = ? WHERE id = ?', [JSON.stringify(temperatures), id], function(err) {
      if (err) {
        return res.status(500).json({ message: 'Database error', error: err });
      }
      res.status(200).json({ temperature: temperatureData });
    });
  });
};

exports.generateAndSaveHumidity = async (req, res, next) => {
  const generateRandomHumidity = () => Math.floor(Math.random() * 100);
  const humidityData = generateRandomHumidity();
  const { id } = req.body;
  db.get('SELECT humidity FROM patient WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }
    if (!row) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    const humidities = JSON.parse(row.humidity);
    humidities.push(parseFloat(humidityData));
    db.run('UPDATE patient SET humidity = ? WHERE id = ?', [JSON.stringify(humidities), id], function(err) {
      if (err) {
        return res.status(500).json({ message: 'Database error', error: err });
      }
      res.status(200).json({ humidity: humidityData });
    });
  });
};

exports.generateAndSaveHeartRate = async (req, res, next) => {
  const generateRandomHeartRate = () => Math.floor(Math.random() * 100);
  const heartRateData = generateRandomHeartRate();
  const { id } = req.body;
  db.get('SELECT heartRate FROM patient WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }
    if (!row) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    const heartRates = JSON.parse(row.heartRate);
    heartRates.push(parseFloat(heartRateData));
    db.run('UPDATE patient SET heartRate = ? WHERE id = ?', [JSON.stringify(heartRates), id], function(err) {
      if (err) {
        return res.status(500).json({ message: 'Database error', error: err });
      }
      res.status(200).json({ heartRate: heartRateData });
    });
  });
};

exports.createPatient = async (req, res, next) => {
  const { id, name, temperature, humidity , heartRate } = req.body;
  db.run('INSERT INTO patient (id, name, temperature, humidity , heartRate) VALUES (?, ?, ?, ?, ?)', [id, name, JSON.stringify(temperature), JSON.stringify(humidity), JSON.stringify(heartRate)], function(err) {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.status(201).json({ message: 'Patient created' });
  });
};