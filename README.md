CanSat Ground Control System
=================================

This project implements a browser-based ground control system (GCS) for real-time telemetry monitoring of a CanSat or any Arduino-based system. It leverages the Web Serial API for direct USB communication between the Arduino and the browser, eliminating the need for dedicated desktop applications or drivers. Data is processed in JavaScript and visualized using Plotly.js for live graphing.

System Overview
---------------
The system is designed to:
1. Establish a serial connection between the Arduino and the browser at a defined baud rate (default 9600).
2. Continuously read data packets from the Arduino over USB.
3. Parse incoming data, assuming a comma-separated structure.
4. Store time-series telemetry values in arrays for further processing.
5. Dynamically update an interactive graph that displays altitude against elapsed time.

While the default implementation focuses on altitude, the architecture is modular and can be extended to additional telemetry streams such as temperature, pressure, voltage, or GPS coordinates.

Data Handling
-------------
Telemetry must be transmitted by the Arduino in a comma-separated format with the following structure:

time,altitude

- The first field corresponds to elapsed time in seconds (or any consistent unit).
- The second field corresponds to altitude in meters.
- Each data packet must be terminated with a newline character for correct parsing.

Example transmission sequence:
- 0.00,12.3
- 1.00,13.0
- 2.00,14.2

The JavaScript logic concatenates incoming serial fragments, buffers incomplete lines, and processes complete packets. Each valid packet is split into numerical values and appended to arrays representing time and altitude.

Graphing with Plotly
--------------------
Plotly.js is integrated for data visualization. The system initializes an empty graph with properly labeled axes:
- X-axis: Time (seconds)
- Y-axis: Altitude (meters)

As data is received, the graph is updated dynamically by injecting new arrays. Plotly ensures smooth rendering, zoom capability, and export functions for later analysis.

Technical Requirements
----------------------
- Browser: Chrome or Edge with Web Serial API enabled
- Arduino: Configured to output telemetry over serial using Serial.print and Serial.println commands
- Baud Rate: 9600 (must match the JavaScript configuration)
- Dependencies: Plotly.js (loaded via CDN in the HTML file)

Workflow
--------
1. The Arduino continuously sends telemetry in the required format.
2. The user opens the HTML interface in a supported browser.
3. Upon pressing "Connect to Arduino," the browser prompts the user to select the correct serial port.
4. The serial stream is piped through a text decoder, and data is parsed line by line.
5. Valid numerical values are stored in arrays, and the graph is refreshed in real time.

Extensibility
-------------
This ground control system is designed to be adaptable. Engineers can:
- Add additional data channels (e.g., temperature, pressure, battery voltage).
- Modify the JavaScript parser to handle multi-parameter telemetry.
- Extend the Plotly graph to display multiple traces simultaneously.
- Implement data logging to local storage or CSV for post-flight analysis.

Limitations
-----------
- The Web Serial API is not supported in all browsers; only Chrome and Edge provide stable implementations.
- Communication is limited to USB serial devices; Bluetooth and other protocols require different handling.
- The accuracy of data depends on the Arduino’s sensor hardware and transmission frequency.
