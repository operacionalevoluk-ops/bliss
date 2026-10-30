// @ts-nocheck
// Interações da landing page Bliss Clinic (animações, carrosséis, lightbox, FAQ).
export function initLanding(){
document.documentElement.classList.add('js');
var reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
var hd=document.querySelector('.hd');addEventListener('scroll',function(){hd.classList.toggle('is-s',scrollY>10)},{passive:true});
var mb=document.querySelector('.hd-menu'),mn=document.querySelector('.mnav');mb.addEventListener('click',function(){var o=mn.classList.toggle('is-o');mb.setAttribute('aria-expanded',o)});mn.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){mn.classList.remove('is-o')})});
// fade in e fade out
var io=new IntersectionObserver(function(es){es.forEach(function(e){e.target.classList.toggle('in',e.isIntersecting)})},{threshold:.14,rootMargin:'0px 0px -6% 0px'});
document.querySelectorAll('.rv').forEach(function(r){io.observe(r)});
// contadores
var cio=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var b=e.target,t=+b.dataset.n,dec=b.dataset.dec,s=performance.now();(function f(n){var p=Math.min((n-s)/1500,1),v=t*(1-Math.pow(1-p,3));b.textContent=dec?v.toFixed(1).replace('.',','):Math.round(v);if(p<1)requestAnimationFrame(f)})(s)})},{threshold:.6});
document.querySelectorAll('[data-n]').forEach(function(b){cio.observe(b)});
// triangulos animados com cursor invisivel
var COL=['#B2D4E9','#5EC1E0','#8FB3CC','#D3E6F2','#6A8099'];
document.querySelectorAll('.tri-cv').forEach(function(cv,ci){var ctx=cv.getContext('2d'),T=[],W,H,dpr=Math.min(devicePixelRatio||1,2),mx=-999,my=-999,vis=false,off=ci*2.1;
 function build(){W=cv.offsetWidth;H=cv.offsetHeight;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);T=[];var s=Math.max(64,W/18),h=s*.866;
  for(var r=-1;r*h<H+h;r++)for(var c=-1;c*s/2<W+s;c++){if(Math.random()>.36)continue;T.push({x:c*s/2,y:r*h,s:s,h:h,up:(r+c)%2===0,col:COL[(Math.random()*COL.length)|0],ph:Math.random()*6.28,sp:.4+Math.random()*.8,base:.04+Math.random()*.12})}}
 function glow(q,px,py,R,k){var dx=q.x+q.s/2-px,dy=q.y+q.h/2-py,d=Math.sqrt(dx*dx+dy*dy);return d<R?(1-d/R)*k:0}
 function draw(t){if(vis){var tt=t/1000+off;
  var ax=W*(.5+.42*Math.sin(tt*.23)),ay=H*(.5+.38*Math.sin(tt*.37+1.3));
  var bx=W*(.5+.4*Math.cos(tt*.17+2)),by=H*(.5+.36*Math.cos(tt*.29));
  ctx.clearRect(0,0,W,H);T.forEach(function(q){var a=q.base+Math.sin(tt*q.sp+q.ph)*.05+glow(q,ax,ay,260,.34)+glow(q,bx,by,200,.22)+glow(q,mx,my,200,.3);ctx.globalAlpha=Math.max(0,Math.min(.85,a));ctx.fillStyle=q.col;ctx.beginPath();if(q.up){ctx.moveTo(q.x,q.y+q.h);ctx.lineTo(q.x+q.s/2,q.y);ctx.lineTo(q.x+q.s,q.y+q.h)}else{ctx.moveTo(q.x,q.y);ctx.lineTo(q.x+q.s,q.y);ctx.lineTo(q.x+q.s/2,q.y+q.h)}ctx.closePath();ctx.fill()});ctx.globalAlpha=1}
  if(!reduce)requestAnimationFrame(draw)}
 build();addEventListener('resize',build);var host=cv.parentElement;host.addEventListener('pointermove',function(e){var r=cv.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top});host.addEventListener('pointerleave',function(){mx=my=-999});
 new IntersectionObserver(function(es){vis=es[0].isIntersecting},{threshold:0}).observe(cv);vis=true;requestAnimationFrame(draw)});
// lightbox
var lb=document.querySelector('.lb'),li=lb.querySelector('img'),lc=lb.querySelector('.lb-c'),L=[],k=0;
function show(i){k=(i+L.length)%L.length;li.style.animation='none';void li.offsetWidth;li.style.animation='';li.src=L[k].src;li.alt=L[k].alt;lc.textContent=L[k].alt+'  ·  '+(k+1)+' / '+L.length}
function open(list,i){L=list;show(i);lb.classList.add('on');lb.setAttribute('aria-hidden','false');document.documentElement.style.overflow='hidden'}
function close(){lb.classList.remove('on');lb.setAttribute('aria-hidden','true');document.documentElement.style.overflow=''}
lb.querySelector('.x').onclick=close;lb.querySelector('.p').onclick=function(){show(k-1)};lb.querySelector('.n').onclick=function(){show(k+1)};lb.addEventListener('click',function(e){if(e.target===lb||e.target.classList.contains('lb-st'))close()});
addEventListener('keydown',function(e){if(!lb.classList.contains('on'))return;if(e.key==='Escape')close();if(e.key==='ArrowRight')show(k+1);if(e.key==='ArrowLeft')show(k-1)});
var tx=null;lb.addEventListener('touchstart',function(e){tx=e.touches[0].clientX},{passive:true});lb.addEventListener('touchend',function(e){if(tx===null)return;var d=e.changedTouches[0].clientX-tx;if(Math.abs(d)>50)show(k+(d<0?1:-1));tx=null});
// carrossel antes e depois
var tr=document.querySelector('.car-track'),items=[].slice.call(tr.querySelectorAll('.ba')),bar=document.querySelector('.car-bar i');
var BL=items.map(function(it){var im=it.querySelector('img');return{src:im.src,alt:it.querySelector('.ba-t').textContent}});
var vio=new IntersectionObserver(function(es){es.forEach(function(e){e.target.classList.toggle('vis',e.isIntersecting)})},{root:tr,threshold:.55});items.forEach(function(i){vio.observe(i)});
function prog(){var w=tr.clientWidth/tr.scrollWidth,m=tr.scrollWidth-tr.clientWidth,p=m>0?tr.scrollLeft/m:0;bar.style.width=(w*100)+'%';bar.style.transform='translateX('+(p*(1/w-1)*100)+'%)'}
tr.addEventListener('scroll',prog,{passive:true});prog();addEventListener('resize',prog);addEventListener('load',prog);
function step(){return items[0].offsetWidth+20}
document.querySelector('.cp').onclick=function(){tr.scrollBy({left:-step(),behavior:'smooth'})};document.querySelector('.cn').onclick=function(){tr.scrollBy({left:step(),behavior:'smooth'})};
var dn=false,sx=0,sl=0,mv=0;tr.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;dn=true;mv=0;sx=e.clientX;sl=tr.scrollLeft;tr.classList.add('drag')});addEventListener('pointermove',function(e){if(!dn)return;mv=e.clientX-sx;tr.scrollLeft=sl-mv});addEventListener('pointerup',function(){if(!dn)return;dn=false;tr.classList.remove('drag')});
items.forEach(function(it,i){it.addEventListener('click',function(){if(Math.abs(mv)>6){mv=0;return}open(BL,i)});it.addEventListener('keydown',function(e){if(e.key==='Enter')open(BL,i)})});
// como funciona
var tl=document.querySelector('.tl'),tli=tl.querySelector('.tl-line i'),sts=[].slice.call(tl.querySelectorAll('.st'));
function tlu(){var r=tl.getBoundingClientRect(),m=innerHeight*.55,p=Math.max(0,Math.min(1,(m-r.top)/r.height));tli.style.setProperty('--p',(p*100)+'%');sts.forEach(function(s){var b=s.getBoundingClientRect();s.classList.toggle('on',b.top<m&&b.bottom>innerHeight*.15)})}
addEventListener('scroll',function(){requestAnimationFrame(tlu)},{passive:true});tlu();
// slider da clinica
var sld=document.querySelector('.sld'),SI=[].slice.call(sld.querySelectorAll('img')),SB=[].slice.call(sld.querySelectorAll('.sld-bars i')),cap=sld.querySelector('.sld-cap'),si=0,stT;
function sgo(i){var prev=si;si=(i+SI.length)%SI.length;SI.forEach(function(im,n){im.classList.remove('out');if(n===prev&&n!==si)im.classList.add('out');im.classList.toggle('on',n===si)});SB.forEach(function(b,n){b.classList.remove('on','done');if(n<si)b.classList.add('done')});void SB[si].offsetWidth;SB[si].classList.add('on');cap.textContent=SI[si].alt;clearTimeout(stT);if(!reduce)stT=setTimeout(function(){sgo(si+1)},4500)}
sgo(0);sld.addEventListener('click',function(){open(SI.map(function(i){return{src:i.src,alt:i.alt}}),si)});
// faq
document.querySelectorAll('.faq details').forEach(function(d){var s=d.querySelector('summary');s.addEventListener('click',function(e){e.preventDefault();if(d.open){d.classList.remove('op');setTimeout(function(){d.open=false},450)}else{document.querySelectorAll('.faq details[open]').forEach(function(o){if(o!==d){o.classList.remove('op');setTimeout(function(){o.open=false},450)}});d.open=true;requestAnimationFrame(function(){d.classList.add('op')})}})});
// parallax no cta
var ci=document.querySelector('.cta>img');if(!reduce)addEventListener('scroll',function(){var r=ci.parentElement.getBoundingClientRect();if(r.top<innerHeight&&r.bottom>0)ci.style.transform='translateY('+((r.top/innerHeight)*-30)+'px)'},{passive:true});
}
