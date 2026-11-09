const fs=require('fs'); const path=require('path');
const ROOT=path.join(__dirname,'..'); const SRC=path.join(ROOT,'src'); const OUT=path.join(ROOT,'dist');
const site=JSON.parse(fs.readFileSync(path.join(SRC,'data','site.json'),'utf8'));
const layout=fs.readFileSync(path.join(SRC,'components','layout.html'),'utf8');
const headerTpl=fs.readFileSync(path.join(SRC,'components','header.html'),'utf8');
const footerTpl=fs.readFileSync(path.join(SRC,'components','footer.html'),'utf8');
const esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
function fill(t,repls){for(const [k,v] of Object.entries(repls)) t=t.split(`{{${k}}}`).join(v??''); return t;}
function pageMeta(txt){const m=txt.match(/^<!--PAGE_META\n([\s\S]*?)\nPAGE_META-->\n?/); if(!m) throw new Error('Missing PAGE_META block'); return {meta:JSON.parse(m[1]),content:txt.slice(m[0].length)};}
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
function nav(active,mobile=false){return site.nav.map(i=>`<a href="${i.url}"${active===i.key?' class="active" aria-current="page"':''}>${i.label}</a>`).join('')+(mobile?`<a href="/book/">Book A$249 Diagnostic</a><div class="mobile-sub"><a href="/online-vastu-consultation-australia/">Online consultation</a><a href="/business-space-audit/">Free Business Space Audit</a></div>`:'');}
function copyDir(src,dst){fs.mkdirSync(dst,{recursive:true}); for(const e of fs.readdirSync(src,{withFileTypes:true})){const s=path.join(src,e.name),d=path.join(dst,e.name); e.isDirectory()?copyDir(s,d):fs.copyFileSync(s,d)}}
fs.rmSync(OUT,{recursive:true,force:true}); fs.mkdirSync(OUT,{recursive:true});
copyDir(path.join(SRC,'assets'),path.join(OUT,'assets')); copyDir(path.join(SRC,'static'),OUT);
const files=[path.join(SRC,'index.html'),...walk(path.join(SRC,'pages')).filter(f=>f.endsWith('.html'))];
for(const file of files){const {meta,content}=pageMeta(fs.readFileSync(file,'utf8')); const route=meta.route||'/'; let outFile=route==='/'?path.join(OUT,'index.html'):route.endsWith('.html')?path.join(OUT,route):path.join(OUT,route,'index.html'); fs.mkdirSync(path.dirname(outFile),{recursive:true});
  const header=fill(headerTpl,{SITE_NAME:site.name,SITE_ROLE:site.role,DIAGNOSTIC_PRICE:site.diagnosticPrice,PRIMARY_NAV:nav(meta.navKey,false),MOBILE_NAV:nav(meta.navKey,true)});
  const footer=fill(footerTpl,{SITE_NAME:site.name,SITE_ROLE:site.role,WHATSAPP_DISPLAY:site.whatsappDisplay,EMAIL:site.email});
  const html=fill(layout,{TITLE:esc(meta.title),DESCRIPTION:esc(meta.description),ROBOTS:esc(meta.robots||'index,follow'),DOMAIN:site.domain,ROUTE:route,HEADER:header,CONTENT:content,FOOTER:footer}); fs.writeFileSync(outFile,html);
}
console.log(`Built ${files.length} pages into dist/`);
