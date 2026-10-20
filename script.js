const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
(()=>{
const bird=document.getElementById('bird');if(!bird)return;
const bub=document.createElement('span');bub.className='bubble';bird.appendChild(bub);
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
let P=[];
function measure(){const vh=innerHeight,sy=scrollY,w=bird.offsetWidth,h=bird.offsetHeight;
 P=[...document.querySelectorAll('[data-perch]')].map(el=>{const r=el.getBoundingClientRect();
  let x,y;
  if(el.tagName==='MARK'){x=Math.min(r.right+14,innerWidth-w-4);y=r.bottom+sy-h+4}
  else if(el.classList.contains('signup-card')){x=r.left+8;y=r.top+sy-h+2}
  else if(el.classList.contains('term')||el.classList.contains('book')){x=r.left+r.width*(el.classList.contains('term')?.42:.3);y=r.top+sy-h+8}
  else{x=Math.min(r.right-w-10,innerWidth-w-10);y=r.top+sy-h+(innerWidth<760?0:8)}
  return{x,y,s:Math.max(0,r.top+sy-vh*.45),say:el.dataset.chirp||'',halo:el.classList.contains('signup-card')}});
 P.sort((a,b)=>a.s-b.s);
}
// smooth in-out with slight overshoot on landing
const ease=t=>{const c1=1.1,c3=c1+1;return t<.5?(Math.pow(2*t,2)*((c3*1.2)*2*t-c1*1.2))/2:(Math.pow(2*t-2,2)*(c3*(t*2-2)+c1)+2)/2};
const easeOutBack=t=>{const c1=1.4,c3=c1+1;return 1+c3*Math.pow(t-1,3)+c1*Math.pow(t-1,2)};
let lastSay=null,wasFlying=false,px=0,py=0,hand=null,clickSay=0;
const lines=['ちゅん!','Chirp chirp!','짹짹!','Still $150. Still here.','Don’t poke the canary.','Ledger looks healthy ✓','No gas leaks today.'];
function puff(x,y){if(reduce)return;const p=document.createElement('div');p.className='puff';p.setAttribute('aria-hidden','true');
 p.style.transform=`translate(${x}px,${y}px)`;p.innerHTML='<i></i><i></i><i></i><i></i><i></i>';document.body.appendChild(p);setTimeout(()=>p.remove(),900)}
function pulse(c,ms){bird.classList.remove(c);void bird.offsetWidth;bird.classList.add(c);setTimeout(()=>bird.classList.remove(c),ms)}
function frame(now){
 const y=scrollY;let i=0;while(i<P.length-1&&y>=P[i+1].s)i++;
 const a=P[i],b=P[i+1]||a;const t=b===a?0:(y-a.s)/(b.s-a.s);
 const f=reduce?0:Math.max(0,Math.min(1,(t-.35)/.6));const e=ease(f);
 let x=a.x+(b.x-a.x)*e, arc=Math.sin(Math.min(1,f)*Math.PI)*-120;
 let dy=a.y+(b.y-a.y)*e+arc-y;
 let flying=f>0&&f<1, dir=b.x<a.x?-1:1;
 if(hand){const k=Math.min(1,(now-hand.t0)/900),q=easeOutBack(k);x=hand.x+(x-hand.x)*q;dy=hand.y+(dy-hand.y)*q+Math.sin(k*Math.PI)*-60;flying=k<1;dir=x>=px?1:-1;if(k>=1)hand=null}
 const vx=x-px,vy=dy-py;px=x;py=dy;
 const rot=flying?Math.max(-18,Math.min(18,vy*.9))*dir:0;
 bird.style.transform=`translate3d(${x.toFixed(1)}px,${dy.toFixed(1)}px,0) scaleX(${flying?dir:1}) rotate(${rot.toFixed(1)}deg)`;
 if(wasFlying&&!flying){pulse('land',520);puff(x+bird.offsetWidth*.5,dy+bird.offsetHeight*.9)}
 if(!wasFlying&&flying&&f<.2)pulse('takeoff',260);
 wasFlying=flying;
 bird.classList.toggle('flying',flying);bird.classList.toggle('perched',!flying);
 const p=f>=1?b:a;
 if(!flying&&p.say!==lastSay&&now>clickSay){lastSay=p.say;bub.textContent=p.say;bird.classList.toggle('talk',!!p.say);}
 if(!flying){bird.classList.toggle('left',x+bird.offsetWidth*.62+Math.min(210,innerWidth*.52)>innerWidth-8);bird.classList.toggle('below',p===P[0]);if(p.halo)bird.classList.remove('left');bird.classList.toggle('halo',!!p.halo)}else bird.classList.remove('halo');
 if(flying&&lastSay!==null){lastSay=null;bird.classList.remove('talk')}
 const g=document.getElementById('gauge');if(g){const ft=document.querySelector('.foot');g.classList.toggle('off',ft&&ft.getBoundingClientRect().top<innerHeight*.9);const pr=Math.min(1,y/Math.max(1,document.documentElement.scrollHeight-innerHeight));g.style.setProperty('--p',pr);g.querySelector('.t').textContent=Math.round(32+pr*56)+'°C'}
 requestAnimationFrame(frame);
}
bird.querySelector('svg').addEventListener('click',()=>{if(bird.classList.contains('flying'))return;bub.textContent=lines[Math.floor(Math.random()*lines.length)];bird.classList.add('talk');lastSay='__click';clickSay=performance.now()+1800;pulse('poke',600)});
addEventListener('loaderdone',ev=>{if(reduce||!ev.detail)return;hand={x:ev.detail.x,y:ev.detail.y,t0:performance.now()}});
addEventListener('resize',measure);addEventListener('load',()=>{measure();bird.classList.add('on')});
measure();requestAnimationFrame(frame);
})();
// count-up ledger
(()=>{const vs=[...document.querySelectorAll('.readout .v')];if(!vs.length)return;const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const fmt=n=>'$'+n.toFixed(2);const io2=new IntersectionObserver(es=>es.forEach(en=>{if(!en.isIntersecting)return;io2.disconnect();if(reduce)return;
 vs.forEach(v=>{const end=parseFloat(v.textContent.replace(/[^0-9.]/g,''))||0;if(!end)return;v.style.minWidth=v.offsetWidth+'px';const t0=performance.now();
  (function st(n){const k=Math.min(1,(n-t0)/1100),q=1-Math.pow(1-k,3);v.textContent=fmt(end*q);if(k<1)requestAnimationFrame(st)})(t0)})}),{threshold:.4});
io2.observe(document.querySelector('.readout'))})();
// magnetic buttons + hero parallax
(()=>{if(!matchMedia('(pointer:fine)').matches||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
document.querySelectorAll('.btn.primary,.nav-cta').forEach(btn=>{btn.addEventListener('mousemove',e=>{const r=btn.getBoundingClientRect();btn.style.setProperty('--mx',((e.clientX-r.left-r.width/2)*.22).toFixed(1)+'px');btn.style.setProperty('--my',((e.clientY-r.top-r.height/2)*.3).toFixed(1)+'px');btn.classList.add('mag')});
 btn.addEventListener('mouseleave',()=>{btn.style.setProperty('--mx','0px');btn.style.setProperty('--my','0px');btn.classList.remove('mag')})});
const art=document.querySelector('.hero-art');if(!art)return;let mx=0,my=0;
art.addEventListener('mousemove',e=>{const r=art.getBoundingClientRect();mx=(e.clientX-r.left)/r.width-.5;my=(e.clientY-r.top)/r.height-.5;apply()});art.addEventListener('mouseleave',()=>{mx=my=0;apply()});
addEventListener('scroll',()=>requestAnimationFrame(apply),{passive:true});
function apply(){const s=Math.min(1,scrollY/700);art.style.setProperty('--ix',(mx*14).toFixed(1)+'px');art.style.setProperty('--iy',(my*10+s*-24).toFixed(1)+'px');art.style.setProperty('--sx',(mx*-22).toFixed(1)+'px');art.style.setProperty('--sy',(my*-16+s*18).toFixed(1)+'px');art.style.setProperty('--bx',(mx*-6).toFixed(1)+'px');art.style.setProperty('--by',(my*-6+s*10).toFixed(1)+'px')}
})();
// seed cursor
(()=>{if(!matchMedia('(pointer:fine)').matches||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
const c=document.createElement('div');c.id='seed';c.setAttribute('aria-hidden','true');document.body.appendChild(c);
let tx=0,ty=0,cx=0,cy=0;addEventListener('mousemove',e=>{tx=e.clientX;ty=e.clientY;c.classList.add('on')});
addEventListener('mouseover',e=>c.classList.toggle('hot',!!e.target.closest('a,button,input,.gate li,.files li')));
(function L(){cx+=(tx-cx)*.25;cy+=(ty-cy)*.25;c.style.transform=`translate(${cx}px,${cy}px) rotate(${(tx-cx)*2}deg)`;requestAnimationFrame(L)})();})();
// theme toggle
(()=>{const b=document.getElementById('themeTog'),r=document.documentElement;if(!b)return;
const sync=()=>b.setAttribute('aria-pressed',r.dataset.theme==='light');sync();
b.addEventListener('click',()=>{b.classList.remove('flip');void b.offsetWidth;b.classList.add('flip');r.dataset.theme=r.dataset.theme==='light'?'dark':'light';localStorage.setItem('chirp-theme',r.dataset.theme);sync()});})();
// loader
(()=>{const L=document.getElementById('loader');if(!L)return;const t0=performance.now();
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;const min=reduce?300:1200;let done=false;
const hide=()=>{if(done)return;done=true;const lb=L.querySelector('.ld-bird');if(lb){const r=lb.getBoundingClientRect();dispatchEvent(new CustomEvent('loaderdone',{detail:{x:r.left+r.width*.1,y:r.top}}));lb.style.visibility='hidden'}L.classList.add('out');document.documentElement.classList.remove('loading');setTimeout(()=>L.remove(),600)};
addEventListener('load',()=>setTimeout(hide,Math.max(0,min-(performance.now()-t0))));
setTimeout(hide,3000);if(window.__holdLoader)done=true;})();
// parallax numerals + toggle label
(()=>{const n=[...document.querySelectorAll('.bignum')];if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
let tick=false;addEventListener('scroll',()=>{if(tick)return;tick=true;requestAnimationFrame(()=>{n.forEach(el=>{const r=el.parentElement.getBoundingClientRect();el.style.setProperty('--py',(r.top*-.06).toFixed(1))});tick=false})},{passive:true})})();
(()=>{const b=document.getElementById('themeTog');if(!b)return;const f=()=>b.setAttribute('aria-pressed',document.documentElement.dataset.theme==='light');new MutationObserver(f).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});f()})();
