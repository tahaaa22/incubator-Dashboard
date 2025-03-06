let patientID = '1'; // Global patient ID with default value

function fetchBackend() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      updatePatientTable(data.data);
    })
    .catch(error => {
      console.error('Error fetching employee data:', error);
    });
}

// Initialize the charts
let temperatureChart, humidityChart, heartRateChart;
let temperatureHistogram, humidityHistogram, heartRateHistogram;

function initializeCharts() {
  const temperatureCtx = document.getElementById('temperatureChart').getContext('2d');
  temperatureChart = new Chart(temperatureCtx, {
    type: 'line',
    data: {
      labels: [], // Labels for X-axis (time series)
      datasets: [{
        label: 'Temperature',
        data: [], // Data for Y-axis
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'second'
          },
          ticks: {
            autoSkip: true,
            maxTicksLimit: 10
          }
        },
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        zoom: {
          pan: {
            enabled: true,
            mode: 'x'
          },
          zoom: {
            enabled: true,
            mode: 'x'
          }
        }
      }
    }
  });

  const humidityCtx = document.getElementById('humidityChart').getContext('2d');
  humidityChart = new Chart(humidityCtx, {
    type: 'line',
    data: {
      labels: [], // Labels for X-axis (time series)
      datasets: [{
        label: 'Humidity',
        data: [], // Data for Y-axis
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'second'
          },
          ticks: {
            autoSkip: true,
            maxTicksLimit: 10
          }
        },
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        zoom: {
          pan: {
            enabled: true,
            mode: 'x'
          },
          zoom: {
            enabled: true,
            mode: 'x'
          }
        }
      }
    }
  });

  const heartRateCtx = document.getElementById('heartRateChart').getContext('2d');
  heartRateChart = new Chart(heartRateCtx, {
    type: 'line',
    data: {
      labels: [], // Labels for X-axis (time series)
      datasets: [{
        label: 'Heart Rate',
        data: [], // Data for Y-axis
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'second'
          },
          ticks: {
            autoSkip: true,
            maxTicksLimit: 10
          }
        },
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        zoom: {
          pan: {
            enabled: true,
            mode: 'x'
          },
          zoom: {
            enabled: true,
            mode: 'x'
          }
        }
      }
    }
  });

  const temperatureHistogramCtx = document.getElementById('temperatureHistogram').getContext('2d');
  temperatureHistogram = new Chart(temperatureHistogramCtx, {
    type: 'bar',
    data: {
      labels: [], // Labels for X-axis
      datasets: [{
        label: 'Temperature Histogram',
        data: [], // Data for Y-axis
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  const humidityHistogramCtx = document.getElementById('humidityHistogram').getContext('2d');
  humidityHistogram = new Chart(humidityHistogramCtx, {
    type: 'bar',
    data: {
      labels: [], // Labels for X-axis
      datasets: [{
        label: 'Humidity Histogram',
        data: [], // Data for Y-axis
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  const heartRateHistogramCtx = document.getElementById('heartRateHistogram').getContext('2d');
  heartRateHistogram = new Chart(heartRateHistogramCtx, {
    type: 'bar',
    data: {
      labels: [], // Labels for X-axis
      datasets: [{
        label: 'Heart Rate Histogram',
        data: [], // Data for Y-axis
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Update the chart with new data
function updateChart(chart, label, value) {
  chart.data.labels.push(label);
  chart.data.datasets[0].data.push(value);
  if (chart.data.labels.length > 10) {
    chart.options.scales.x.min = chart.data.labels[chart.data.labels.length - 10];
    chart.options.scales.x.max = label;
  }
  chart.update();
}

// Update the histogram with new data
function updateHistogram(histogram, value) {
  histogram.data.labels.push('');
  histogram.data.datasets[0].data.push(value);
  histogram.update();
}

// Fetch temperature data and update the chart and histogram
function fetchTemperature() {
  fetch('http://localhost:3000/api/v1/employee/temperature', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: patientID }) // Use the global patient ID
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const now = new Date();
      updateChart(temperatureChart, now, data.temperature);
      updateHistogram(temperatureHistogram, data.temperature);
    })
    .catch(error => {
      console.error('Error fetching temperature data:', error);
    });
}

// Fetch humidity data and update the chart and histogram
function fetchHumidity() {
  fetch('http://localhost:3000/api/v1/employee/humidity', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: patientID }) // Use the global patient ID
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const now = new Date();
      updateChart(humidityChart, now, data.humidity);
      updateHistogram(humidityHistogram, data.humidity);
    })
    .catch(error => {
      console.error('Error fetching humidity data:', error);
    });
}

// Fetch heart rate data and update the chart and histogram
function fetchHeartRate() {
  fetch('http://localhost:3000/api/v1/employee/heartRate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: patientID }) // Use the global patient ID
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const now = new Date();
      updateChart(heartRateChart, now, data.heartRate);
      updateHistogram(heartRateHistogram, data.heartRate);
    })
    .catch(error => {
      console.error('Error fetching heart rate data:', error);
    });
}

// Function to fetch all data and update the charts
function fetchAllData() {
  fetchBackend();
  fetchTemperature();
  fetchHumidity();
  fetchHeartRate();
}

// Search for patients and update the displayed sections
function searchPatient() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  fetch(`http://localhost:3000/api/v1/employee/search?q=${input}`)
    .then(response => response.json())
    .then(data => {
      const patient = data.data[0]; // Assuming the first match is the desired patient
      if (patient) {
        patientID = patient.id; // Update the global patient ID
        // Clear existing chart data
        temperatureChart.data.labels = [];
        temperatureChart.data.datasets[0].data = [];
        humidityChart.data.labels = [];
        humidityChart.data.datasets[0].data = [];
        heartRateChart.data.labels = [];
        heartRateChart.data.datasets[0].data = [];
        // Update charts with the patient's data
        patient.temperature.forEach((temp, index) => {
          const now = new Date();
          now.setSeconds(now.getSeconds() + index);
          updateChart(temperatureChart, now, temp);
        });
        patient.humidity.forEach((hum, index) => {
          const now = new Date();
          now.setSeconds(now.getSeconds() + index);
          updateChart(humidityChart, now, hum);
        });
        patient.heartRate.forEach((hr, index) => {
          const now = new Date();
          now.setSeconds(now.getSeconds() + index);
          updateChart(heartRateChart, now, hr);
        });
        // Update histograms with the patient's data
        patient.temperature.forEach(temp => updateHistogram(temperatureHistogram, temp));
        patient.humidity.forEach(hum => updateHistogram(humidityHistogram, hum));
        patient.heartRate.forEach(hr => updateHistogram(heartRateHistogram, hr));
      }
    })
    .catch(error => {
      console.error('Error searching for patients:', error);
    });
}

// Update the patient table with data
function updatePatientTable(patients) {
  const tableBody = document.getElementById('patientTable').getElementsByTagName('tbody')[0];
  tableBody.innerHTML = ''; // Clear existing rows

  patients.forEach(patient => {
    const row = tableBody.insertRow();
    row.insertCell(0).innerText = patient.id;
    row.insertCell(1).innerText = patient.name;
    const temperatureArray = JSON.parse(patient.temperature);
    const humidityArray = JSON.parse(patient.humidity);
    const heartRateArray = JSON.parse(patient.heartRate);
    
    console.log("patient.temperature: ");
    console.log(temperatureArray[temperatureArray.length - 1]);
    row.insertCell(2).innerText = temperatureArray[temperatureArray.length - 1];
    row.insertCell(3).innerText = humidityArray[humidityArray.length - 1];
    row.insertCell(4).innerText = heartRateArray[heartRateArray.length - 1];
    
    const statusCell = row.insertCell(5);
    let status = 'Normal';
    if (temperatureArray[temperatureArray.length - 1] < 36 || temperatureArray[temperatureArray.length - 1] > 37.5) {
      status = 'Temperature Alert';
      row.classList.add('alarm');
    } else if (heartRateArray[heartRateArray.length - 1] < 60 || heartRateArray[heartRateArray.length - 1] > 100) {
      status = 'Heart Rate Alert';
      row.classList.add('alarm');
    }
    statusCell.innerText = status;
  });
}

initializeCharts();
fetchAllData();

// Continuously fetch data and update the charts every 5 seconds
setInterval(fetchAllData, 3000);