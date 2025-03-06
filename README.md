# Incubator Dashboard - Nurse Call System (NCS) Simulation

## Overview
The **Incubator Dashboard** is a system designed to simulate a **Nurse Call System (NCS)** for monitoring multiple incubators. The system provides **visual alerts** on a dashboard and **hardware buzzer alerts** for critical conditions. It integrates various sensors to ensure real-time monitoring and control of incubator conditions.

## Features
- **Monitor multiple incubators** with real-time data visualization.
- **Visual Alerts** on the dashboard for critical conditions.
- **Buzzer Alerts** for emergencies.
- **Temperature Control** using a heating lamp and fan regulated with a **PWM timer**.
- **Humidity Monitoring** to ensure optimal incubator conditions.
- **Oxygen Saturation Monitoring** using a **pulse oximeter**.
- **Data Visualization** using **Chart.js**.
- **Data Storage** using **SQLite** to save monitoring data.

## Technologies & Components Used
### Software:
- **Express.js** (Backend server)
- **Node.js** (Runtime environment)
- **SQLite** (Database for storing data)
- **HTML, CSS, JavaScript** (Frontend development)
- **Chart.js** (Data visualization)

### Hardware:
- **Arduino Uno** (Microcontroller)
- **Buzzer** (For alerts)
- **Humidity Sensor** (For monitoring moisture levels)
- **Light Lamp** (For heating control)
- **Fan** (Controlled using a PWM timer for temperature regulation)
- **Pulse Oximeter** (For oxygen level monitoring)

## Installation & Setup
### Prerequisites:
- Node.js & npm installed
- SQLite installed
- Arduino IDE installed

### Steps:
1. **Clone the repository:**
   ```sh
   git clone https://github.com/tahaaa22/incubator-Dashboard.git
   cd incubator-Dashboard
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Upload Arduino code:**
   - Open the provided Arduino script in the Arduino IDE.
   - Select the correct board (**Arduino Uno**) and port.
   - Upload the script to the Arduino.
4. **Set up the SQLite database:**
   - Ensure SQLite is installed.
   - Run the database setup script (if provided).
5. **Run the server:**
   ```sh
   npm run start
   ```
6. **Run the FrontEnd:**
   install live server vscode extension https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer
   
## Usage
- The dashboard displays real-time sensor data.
- Alerts are triggered when conditions exceed safe thresholds.
- The fan and heating lamp adjust automatically to maintain a stable incubator environment.
- The buzzer activates when emergency conditions arise.
- Data is stored in **SQLite** for logging and analysis.

## Future Enhancements
- Integration with a remote database for cloud storage.
- Remote monitoring via a mobile app.
- AI-based predictive analysis for better incubator management.

## Contributors
- **[Ahmed mohamed taha]** – Software Engineer


