const http=require('http'),fs=require('fs'),path=require('path'),cp=require('child_process');
const ROOT=path.join(__dirname,'..'), OUT=path.join(ROOT,'dist'), PORT=Number(process.env.PORT||8080); let timer;
function build(){try{cp.execFileSync(process.execPath,[path.join(__dirname,'build.js')],{stdio:'inherit'});}catch(e){console.error('Build failed');}}
build();
fs.watch(path.join(ROOT,'src'),{recursive:true},()=>{clearTimeout(timer);timer=setTimeout(build,120);});
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.webp':'image/webp','.xml':'application/xml','.txt':'text/plain'};
http.createServer((req,res)=>{let u=decodeURIComponent(req.url.split('?')[0]); if(u.endsWith('/'))u+='index.html'; let f=path.join(OUT,u); if(!path.extname(f)&&fs.existsSync(path.join(f,'index.html')))f=path.join(f,'index.html'); if(!fs.existsSync(f)){f=path.join(OUT,'404.html');res.statusCode=404;} try{res.setHeader('Content-Type',types[path.extname(f)]||'application/octet-stream'); res.end(fs.readFileSync(f));}catch(e){res.statusCode=500;res.end('Server error');}}).listen(PORT,()=>console.log(`\nPreview: http://localhost:${PORT}\nWatching src/ for changes...\n`));
