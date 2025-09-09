CanSat Ground Control System

This project is a simple ground control system for receiving and visualizing telemetry data from a CanSat (or any Arduino device) using the Web Serial API and Plotly.js.

How it works
Arduino sends data in the format:
time,altitude
The browser connects to the Arduino over serial.
Data is parsed and displayed as a real-time Altitude vs Time graph using Plotly.

Requirements
Chrome or Edge (supports Web Serial API)
Arduino sending serial data
Plotly.js (included via CDN)

Usage
Upload Arduino code that prints time,altitude over serial.
Open index.html in Chrome or Edge.
Click "Connect to Arduino" and select the device.
The graph updates in real time.
