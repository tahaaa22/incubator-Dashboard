#include <DHT.h>

#define DHTPIN 2       // Digital pin for DHT11
#define DHTTYPE DHT11  // DHT sensor type
#define BUZZER 3       // Digital pin for Buzzer
#define FAN 5          // PWM pin for DC Fan

DHT dht(DHTPIN, DHTTYPE);

const int pulsePin = A0;  // Analog pin for Pulse Sensor
int pulseValue = 0;       // Stores raw pulse value
int threshold = 550;      // Adjust this based on sensor readings

int fanSpeed = 0; // Fan speed (0 - 255)
bool fanActive = false;

void setup() {
    Serial.begin(9600);
    dht.begin();
    pinMode(pulsePin, INPUT);
    pinMode(BUZZER, OUTPUT);
    pinMode(FAN, OUTPUT);
    
    digitalWrite(BUZZER, LOW); // Ensure buzzer is off initially
    analogWrite(FAN, 0); // Ensure fan is off initially
}

void loop() {
    float humidity = dht.readHumidity();
    float temperature = dht.readTemperature(); // Celsius
    pulseValue = analogRead(pulsePin);

    
    if (!isnan(humidity) && !isnan(temperature)) {
        Serial.print("Humidity: ");
        Serial.println(humidity);
        Serial.print("%  Temperature: ");
        Serial.print(temperature);
        Serial.println("°C");
    } else {
        Serial.println("Failed to read from DHT sensor!");
    }

    Serial.print("Pulse Value: ");
    Serial.println(pulseValue);

    // Convert pulse sensor value to an estimated BPM (simple threshold method)
    int heartRate = map(pulseValue, 550, 750, 50, 120); // Approximate mapping

    Serial.print("Heart Rate: ");
    Serial.println(heartRate);
    Serial.println(" BPM");

    // Alarm Conditions
    bool temperatureAlert = (temperature < 36 || temperature > 37.5);
    bool heartRateAlert = (heartRate < 60 || heartRate > 100);

    if (temperatureAlert) {
        Serial.println("🚨 Temperature Alert! 🚨");
        activateBuzzer();
    } else if (heartRateAlert) {
        Serial.println("🚨 Heart Rate Alert! 🚨");
        activateBuzzer();
    } else {
        digitalWrite(BUZZER, LOW);
    }

    // Fan Speed Control
    controlFan(temperature);

    Serial.println("=================================");
    
    delay(1000);  // Wait 1 second before next reading
}

void activateBuzzer() {
    digitalWrite(BUZZER, HIGH);
    delay(500);
    digitalWrite(BUZZER, LOW);
    delay(500);
}

// Function to incrementally adjust fan speed
void controlFan(float temperature) {
    if (temperature > 37.5) {
        fanActive = true;
        fanSpeed = map(temperature, 37.5, 40, 100, 255); // Scale fan speed from 100 to 255
        if (fanSpeed > 255) fanSpeed = 255;
        Serial.print("Fan Speed Increasing: ");
    } 
    else if (temperature < 36) {
        fanActive = true;
        fanSpeed = map(temperature, 35, 36, 150, 50); // Reduce fan speed gradually
        if (fanSpeed < 50) fanSpeed = 50;
        Serial.print("Fan Speed Decreasing: ");
    } 
    else {
        fanActive = false;
        fanSpeed = 0;
        Serial.println("Fan Off");
    }

    //Serial.println(fanSpeed);
    analogWrite(FAN, fanSpeed);
}

