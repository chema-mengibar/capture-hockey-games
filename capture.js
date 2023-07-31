import  cheerio  from 'cheerio'; 
import http  from 'http'; // or 'https' for https:// URLs
import fs  from 'fs';
import fetch from 'node-fetch';


const downloads = {};
let nextStart = 0;
let interval = 0; // todo

function showDownloadingProgress() {
  console.clear();
  const currentDownloads = {...downloads};
  Object.entries(currentDownloads).forEach((item)=>{
    const key = item[0];
    const obj = item[1];
    
    obj.procent = Math.round((100 * obj.state) / obj.size) + '%';
  })
  console.log(currentDownloads);
  console.log(nextStart);
  
  // if all finished, clearInterval(interval)  // todo
}


function log(videoId, text){
    let line = videoId + ' > ' +  text + '\r\n '
    fs.appendFile('info.log', line, ()=>{});
}

function last(videoId){
    let line = videoId + '\r\n '
    fs.appendFile('last-id.log', line, ()=>{});
}

async function getVideo( videoId ) {
  
  const response = await fetch('http://europe.worldskate.tv/video/?videoId=e-' + videoId ); 
  const html = await response.text();
  // fs.appendFile('./capture_html/' + videoId + '.html', html, ()=>{});

  const $ = cheerio.load(html);
  
  const divsWithAttribute = $('a[title="Descarrega el video"]');
  if(divsWithAttribute.length === 0){    return  }
  const targetUrl = divsWithAttribute[0].attribs.href;
  
  // log(videoId, targetUrl );

  const titleHtml = $('title').text();
  
  const allowed = titleHtml.includes('Senior') && titleHtml.includes('World Skate Europe - Video European Championship - Charleroi 2023 (Belgium)');
 
  if( !allowed ){
    log(videoId, 'no includes title' );
    return;
  }
 
  const title = titleHtml.replace('World Skate Europe - Video European Championship - Charleroi 2023 (Belgium) - ', '').replace('/','-');
  
  const file = fs.createWriteStream('./capture_videos/' + videoId + '__' +title + ".mp4");
  
  file.on('error', function(err) {
    console.log("ERROR:" + err);

    log(videoId, 'file.on:error' );
    file.close();
  });
    
  
  const request = http.get(targetUrl, function(response) {
    response.pipe(file);
    
    downloads[videoId] = { 
      size: parseInt(response.headers[ 'content-length' ]), 
      state: 0, 
      title: title,
      id: videoId,
      procent: ''
    }
          
    response
      .on('response', (data) => {
       // const total_bytes = parseInt(data.headers['content-length']);
      })
      .on('data', (chunk) => {
          downloads[videoId].state += chunk.length;
      })
      .on("finish", () => {
         file.close();
         console.log("Download Completed");
         downloads[videoId].end = 1;  // todo
      });
  });
}


// ---------------------------------------------------- init -----------------------------------------------

interval = setInterval(()=>{
  showDownloadingProgress();
}, 3000);


/*
//_________________________________ OPTION: single id _________________________________
getVideo(23291);

*/


 //_________________________________ OPTION: list of ids _________________________________

const todo = [
  23439
];
  
for(let i = 0; i < todo.length; i+=1 ){
  try{
    getVideo(todo[i]);
  }catch(e){
    console.error(e, i)
  }
}
  
  
/*
//_________________________________ OPTION: range of ids _________________________________
const start = parseInt(process.argv[2]) || 23301;
const limit = 10;

nextStart = start + limit;
last(nextStart);

for(let i = start; i < start + limit; i+=1 ){
  try{
    getVideo(i);
  }catch(e){
    console.error(e, i)
  }
}
*/

