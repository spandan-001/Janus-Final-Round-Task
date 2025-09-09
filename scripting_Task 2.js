let port;
let reader;
let textDecoder = new TextDecoderStream();
let dataBuffer = "";
let timeData = [];
let altitudeData = [];

// Setup Plotly graph
Plotly.newPlot("plot", [{
  x: [],
  y: [],
  mode: "lines",
  name: "Altitude"
}], {
  title: "CanSat Altitude vs Time",
  xaxis: { title: "Time (s)" },
  yaxis: { title: "Altitude (m)" }
});

document.getElementById("connectBtn").addEventListener("click", async () => {
    // Request serial port from user
    port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });

    // Setup reader
    const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
    reader = textDecoder.readable.getReader();

    // Continuously read data
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      if (value) {
        dataBuffer += value;
        let lines = dataBuffer.split("\n");
        dataBuffer = lines.pop(); // keep incomplete line

        lines.forEach(line => {
          line = line.trim();
          if (line) {
            console.log("Arduino:", line); // Debugging

            // Assume Arduino sends: time,altitude
            let parts = line.split(",");
            if (parts.length >= 2) {
              let t = parseFloat(parts[0]);
              let alt = parseFloat(parts[1]);

              timeData.push(t);
              altitudeData.push(alt);

              // Update graph
              Plotly.update("plot", {
                x: [timeData],
                y: [altitudeData]
              });
            }
          }
        });
      }
    }
  
});
