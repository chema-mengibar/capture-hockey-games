
# Errores

23436
23439


23487 -> 23508  : no hay videos

# todo


## Usage

`node capture.js 23335` 


## Docs

// https://cheerio.js.org/docs/api/classes/Element#attribs

## Source Videos

http://europe.worldskate.tv/video/?videoId=e-23328

**video id:** e-23291  

***range:** 23291 <> 23487
http://europe.worldskate.tv/video/?videoId=e-23291  
...
http://europe.worldskate.tv/video/?videoId=e-23487  


Get video-source url (domain, stream-id, etc...)
```
<meta property="twitter:image" content="http://progressive.enetres.net/getMiniature.php?u=A217BCEBB2594BDF8FE2E65131DBF663&amp;c=006&amp;f=dvr-a4a97ba9-210723-010440.jpg">
```
and replace the endpoint api to:

```
http://progressive.enetres.net//
getMedia.php
?u=A217BCEBB2594BDF8FE2E65131DBF663
&c=006
&f=dvr-a4a97ba9-210723-010440-live2500.mp4
```

