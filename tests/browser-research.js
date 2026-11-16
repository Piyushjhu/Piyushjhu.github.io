"use strict";
const frame=document.getElementById('site'),wait=ms=>new Promise(r=>setTimeout(r,ms));
frame.addEventListener('load',async()=>{
const checks=[],measurements={},violations=[],w=frame.contentWindow,d=w.document,q=s=>d.querySelector(s),all=s=>[...d.querySelectorAll(s)];
const check=(name,passed,detail)=>{checks.push({name,passed:Boolean(passed),detail});document.getElementById("results").textContent=JSON.stringify({partial:true,checks});};
const change=(s,value,type='change')=>{q(s).value=value;q(s).dispatchEvent(new w.Event(type,{bubbles:true}));};
const settle=()=>wait(200);
d.addEventListener('securitypolicyviolation',e=>violations.push(e.violatedDirective));
try{
d.documentElement.style.scrollBehavior="auto";
await settle();
check('research before tools',q('#research').compareDocumentPosition(q('#work'))&w.Node.DOCUMENT_POSITION_FOLLOWING);
check('three directions',all('.research-direction').length===3);
check('16 closed studies',all('.paper-story').length===16&&!all('.paper-story[open]').length);
check('23 preview cards',all('.paper-figure img').length===23&&all('.paper-figure img').every(i=>i.src.includes('/previews/')));
measurements.desktopResearchStarts=Math.round(q('#research').getBoundingClientRect().top+w.scrollY);
q('[data-research-tab="past"]').click();await settle();
measurements.desktopPhDHeight=Math.round(q('#research-panel-past').getBoundingClientRect().height);
w.location.hash='paper-underwater-energy';await settle();
check('paper hash opens tab and story',!q('#research-panel-past').hidden&&q('#paper-underwater-energy-details').open);
check('paper below sticky navigation',q('#paper-underwater-energy').getBoundingClientRect().top>=q('.research-navigation').getBoundingClientRect().bottom-2,{paper:q('#paper-underwater-energy').getBoundingClientRect().top,nav:q('.research-navigation').getBoundingClientRect().bottom});
check('sticky below header',Math.abs(q('.research-navigation').getBoundingClientRect().top-q('.site-header').getBoundingClientRect().bottom)<3);
check('nested theme retains current nav',q('[data-nav="research"]').getAttribute('aria-current')==='location');
change('#research-topic','research-models-and-measurements');await settle();
check('topic picker',w.location.hash==='#research-models-and-measurements'&&q('#research-topic').value==='research-models-and-measurements');
q('[data-nav="publications"]').click();await settle();
check('global Publications reveals panel',!q('#research-panel-publications').hidden&&q('[data-nav="publications"]').getAttribute('aria-current')==='location');
check('publications heading visible',q('#publications').getBoundingClientRect().top>=q('.research-navigation').getBoundingClientRect().bottom-2&&q('#publications').getBoundingClientRect().top<450);
check('selected default',q('[data-paper-filter="selected"]').getAttribute('aria-pressed')==='true'&&all('.publication').length===w.SITE_CONTENT.publications.filter(p=>p.featured).length);
q('[data-paper-filter="all"]').click();change('#publication-search','copper','input');
check('keyword search',all('.publication').length>0&&all('.publication').every(p=>p.querySelector('.publication-actions a[href^="#paper-"]')?.hash==='#paper-copper-spall-statistics'));
change('#publication-year','2026');change('#publication-topic','spall-strength');check('combined year/topic/search',all('.publication').length===1);
change('#publication-search','<img src=x onerror=alert(1)>','input');check('empty recovery',!all('.publication').length&&q('.publication-empty').textContent.includes('clear the filters'));
q('#publication-reset').click();check('clear retains category',all('.publication').length===14&&q('[data-paper-filter="all"]').getAttribute('aria-pressed')==='true');
q('.publication-actions a[href^="#paper-"]').click();await settle();check('results link opens study',q(w.location.hash+' .paper-story')?.open&&!q(w.location.hash).closest('[role="tabpanel"]').hidden);
q('[data-research-tab="active"]').click();q('#paper-copper-spall-statistics-details').open=true;
const trigger=q('#paper-copper-spall-statistics [data-paper-figure]');trigger.focus();trigger.click();await settle();
const full=q('.research-figure-canvas img');if(!full.complete)await new Promise(r=>full.addEventListener('load',r,{once:true}));
check('viewer loads original figure',q('#detail-dialog').open&&full.src.includes('/papers/'));
const fitWidth=full.getBoundingClientRect().width;q('[aria-label="Zoom in"]').click();await settle();
check('desktop actual magnification',full.getBoundingClientRect().width>fitWidth*1.9&&q('.research-figure-viewport').scrollWidth>q('.research-figure-viewport').clientWidth);
q('.dialog-close').click();check('dialog restores focus',d.activeElement===trigger);
frame.width='390';frame.height='844';all('.paper-story').forEach(s=>s.open=false);q('[data-research-tab="past"]').click();await settle();
measurements.mobileResearchStarts=Math.round(q('#research').getBoundingClientRect().top+w.scrollY);measurements.mobilePhDHeight=Math.round(q('#research-panel-past').getBoundingClientRect().height);
check('phone no overflow',d.documentElement.scrollWidth===d.documentElement.clientWidth,{width:d.documentElement.clientWidth,scroll:d.documentElement.scrollWidth});
q('.menu-toggle').click();check('phone menu opens',q('.menu-toggle').getAttribute('aria-expanded')==='true');q('[data-nav="publications"]').click();await settle();
check('phone menu reveals Publications and closes',!q('#research-panel-publications').hidden&&q('.menu-toggle').getAttribute('aria-expanded')==='false');
q('[data-research-tab="active"]').click();w.location.hash='paper-copper-spall-statistics';await settle();
check('phone anchor avoids sticky navigation',q('#paper-copper-spall-statistics').getBoundingClientRect().top>=q('.research-navigation').getBoundingClientRect().bottom-2);
q('#paper-copper-spall-statistics [data-paper-figure]').click();await settle();
const phoneImage=q('.research-figure-canvas img');if(!phoneImage.complete)await new Promise(r=>phoneImage.addEventListener('load',r,{once:true}));
const phoneFit=phoneImage.getBoundingClientRect().width;q('[aria-label="Zoom in"]').click();q('[aria-label="Zoom in"]').click();await settle();
measurements.mobileFigureFitWidth=Math.round(phoneFit);measurements.mobileFigureZoomWidth=Math.round(phoneImage.getBoundingClientRect().width);
check('phone real 3x magnification',phoneImage.getBoundingClientRect().width>phoneFit*2.9&&q('.research-figure-viewport').scrollWidth>700);
const vp=q('.research-figure-viewport');vp.focus();const before=vp.scrollLeft;vp.dispatchEvent(new w.KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true}));check('keyboard pan',vp.scrollLeft>before);
q('[aria-label="Fit the whole figure"]').click();check('fit resets figure',Math.abs(phoneImage.getBoundingClientRect().width-phoneFit)<2);q('.dialog-close').click();
check('CSP intact',violations.length===0,violations);

for(const width of [320,360,768,1100,1440]){frame.width=String(width);await settle();for(const tab of ['active','past','publications']){q('[data-research-tab="'+tab+'"]').click();check('no overflow at '+width+'px in '+tab,d.documentElement.scrollWidth===d.documentElement.clientWidth,{width:d.documentElement.clientWidth,scroll:d.documentElement.scrollWidth});}}

for(const hash of ['paper-foam-stress-waves','paper-aimdl-laboratory','publications','research-autonomous-discovery']){
 const deepFrame=document.createElement('iframe');deepFrame.width='390';deepFrame.height='844';deepFrame.title='Direct research link check';
 const loaded=new Promise(resolve=>deepFrame.addEventListener('load',resolve,{once:true}));deepFrame.src='../_site/index.html#'+hash;document.body.append(deepFrame);await loaded;await settle();
 const direct=deepFrame.contentDocument,target=direct.getElementById(hash),panel=target.closest('[role="tabpanel"]');
 check('direct URL '+hash,!panel.hidden&&(!hash.startsWith('paper-')||target.querySelector('.paper-story').open));deepFrame.remove();
}

}catch(error){checks.push({name:'Unexpected browser error',passed:false,detail:error.stack});}
const failed=checks.filter(c=>!c.passed),output=document.getElementById('results');output.dataset.result=failed.length?'fail':'pass';output.textContent=JSON.stringify({passed:checks.length-failed.length,total:checks.length,failed,measurements,checks},null,2);
},{once:true});
