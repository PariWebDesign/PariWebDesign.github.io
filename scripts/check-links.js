const fs=require('fs'), path=require('path');
const root=path.join(__dirname,'..','dist');
const files=[];
function walk(d){if(!fs.existsSync(d)) return; for(const f of fs.readdirSync(d)){const p=path.join(d,f); fs.statSync(p).isDirectory()?walk(p):files.push(p)}}
walk(root);
const html=files.filter(f=>f.endsWith('.html'));
const missing=[];
for(const file of html){const txt=fs.readFileSync(file,'utf8'); const re=/href="(\/[^"]*)"/g; let m; while((m=re.exec(txt))){let u=m[1].split(/[?#]/)[0]; if(!u||u.startsWith('//')) continue; let target=u.endsWith('/')?path.join(root,u,'index.html'):path.join(root,u); if(!path.extname(target)) target=path.join(target,'index.html'); if(!fs.existsSync(target) && !u.startsWith('/assets/')) missing.push(`${path.relative(root,file)} -> ${u}`);}}
if(missing.length){console.error('Missing internal links:\n'+missing.join('\n')); process.exit(1);} console.log(`OK: ${html.length} HTML pages checked; no missing internal links.`);
