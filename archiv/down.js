const http = require('http'); // or 'https' for https:// URLs
const fs = require('fs');

const file = fs.createWriteStream("1.mp4");
const request = http.get("http://progressive.enetres.net//getMedia.php?u=A217BCEBB2594BDF8FE2E65131DBF663&c=006&f=dvr-a4a97ba9-210723-010440-live2500.mp4", function(response) {
   response.pipe(file);

   // after download completed close filestream
   file.on("finish", () => {
       file.close();
       console.log("Download Completed");
   });
});