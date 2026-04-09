/* EMAIL - assembled in JS to avoid scraping */
(function(){
  var u='enzotamietto',d='gmail.com',e=u+'@'+d;
  var span=document.getElementById('email-val');
  if(span){span.textContent=e;span.addEventListener('click',function(){window.location='mailto:'+e;});}
  var btn=document.getElementById('btn-contact');
  if(btn){btn.href='mailto:'+e;}
})();
var gc='rgba(255,255,255,0.05)',tc='#565e75';
function bOpts(ex){ex=ex||{};return Object.assign({responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{ticks:{font:{size:10},color:tc},grid:{color:gc}},x:{ticks:{font:{size:10},color:tc},grid:{color:gc}}}},ex);}

/* HAMBURGER */
var burger=document.getElementById('burger');
var drawer=document.getElementById('drawer');
function closeDrawer(){burger.classList.remove('open');drawer.classList.remove('open');document.body.style.overflow='';}
burger.addEventListener('click',function(){
  var open=drawer.classList.toggle('open');
  burger.classList.toggle('open',open);
  document.body.style.overflow=open?'hidden':'';
});

/* PROJECT CARDS */
document.querySelectorAll('.proj-card[data-modal]').forEach(function(card){
  card.addEventListener('click',function(){openModal(this.dataset.modal);});
});

/* CLOSE BUTTONS */
document.querySelectorAll('.modal-close[data-close]').forEach(function(btn){
  btn.addEventListener('click',function(){closeModal(this.dataset.close);});
});

/* OVERLAY CLICK */
document.querySelectorAll('.modal-overlay').forEach(function(overlay){
  overlay.addEventListener('click',function(e){
    if(e.target===this){closeModal(this.id.replace('modal-',''));}
  });
});

/* ESC */
document.addEventListener('keydown',function(e){
  if(e.key==='Escape'){
    document.querySelectorAll('.modal-overlay.open').forEach(function(m){m.classList.remove('open');});
    document.body.style.overflow='';
  }
});

/* MODAL OPEN/CLOSE */
function openModal(id){
  document.getElementById('modal-'+id).classList.add('open');
  document.body.style.overflow='hidden';
  setTimeout(function(){buildCharts(id);},80);
}
function closeModal(id){
  document.getElementById('modal-'+id).classList.remove('open');
  document.body.style.overflow='';
}

/* MAIN CHARTS */
new Chart(document.getElementById('lineChart'),{type:'line',data:{labels:['Jan','Fev','Mar','Abr','Mai','Jun'],datasets:[{data:[28,32,29,38,41,39],borderColor:'#00c8a0',backgroundColor:'rgba(0,200,160,0.07)',tension:0.4,pointRadius:3,fill:true},{data:[1.2,1.5,1.35,1.9,2.1,2.0],borderColor:'#0ea5e9',backgroundColor:'rgba(14,165,233,0.07)',tension:0.4,pointRadius:3,borderDash:[5,4],fill:true,yAxisID:'y2'}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{ticks:{font:{size:10},color:tc},grid:{color:gc}},y2:{position:'right',ticks:{font:{size:10},color:'#0ea5e9'},grid:{drawOnChartArea:false}},x:{ticks:{font:{size:10},color:tc},grid:{color:gc}}}}});
new Chart(document.getElementById('donutChart'),{type:'doughnut',data:{labels:['Google Ads','Meta Ads','Orgânico','Email'],datasets:[{data:[38,27,20,15],backgroundColor:['#00c8a0','#0ea5e9','#a78bfa','#f97316'],borderWidth:0,hoverOffset:8}]},options:{responsive:true,maintainAspectRatio:false,cutout:'68%',plugins:{legend:{display:false}}}});
new Chart(document.getElementById('healthChart'),{type:'bar',data:{labels:['Clínica Geral','Cardiologia','Ortopedia','Pediatria','Ginecologia','Neurologia'],datasets:[{data:[14.2,8.7,6.4,9.1,5.8,4.3],backgroundColor:'rgba(0,166,81,0.75)',borderRadius:4,borderSkipped:false},{data:[12,10,7,8,7,5],backgroundColor:'rgba(0,200,160,0.25)',borderRadius:4,borderSkipped:false,borderColor:'#00c8a0',borderWidth:1}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{ticks:{font:{size:10},color:tc,callback:function(v){return v+'K';}},grid:{color:gc}},x:{ticks:{font:{size:9},color:tc,maxRotation:30,autoSkip:false},grid:{display:false}}}}});
new Chart(document.getElementById('roiChart'),{type:'bar',data:{labels:['Brand Awareness','Retargeting','Lead Gen','Promo Verão','Lançamento'],datasets:[{data:[4.1,3.8,3.5,2.9,2.4],backgroundColor:['rgba(167,139,250,0.85)','rgba(167,139,250,0.7)','rgba(167,139,250,0.6)','rgba(167,139,250,0.45)','rgba(167,139,250,0.3)'],borderRadius:4,borderSkipped:false}]},options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{ticks:{font:{size:10},color:tc,callback:function(v){return v+'×';}},grid:{color:gc}},y:{ticks:{font:{size:10},color:tc},grid:{display:false}}}}});

/* SKILL WHEELS */
var CIRC=276.46;
document.querySelectorAll('.skill-wheel-card').forEach(function(card){
  var dotsEl=card.querySelector('.swc-dots');
  var inner=card.querySelector('.swc-ticker-inner');
  var arc=card.querySelector('.swc-arc');
  var color=dotsEl.dataset.color;
  var count=parseInt(dotsEl.dataset.count);
  var cur=0;
  for(var i=0;i<count;i++){
    var d=document.createElement('div');
    d.className='swc-dot'+(i===0?' active':'');
    d.style.background=i===0?color:'rgba(255,255,255,0.15)';
    dotsEl.appendChild(d);
  }
  function go(idx){
    inner.style.transform='translateY(-'+(idx*26)+'px)';
    dotsEl.querySelectorAll('.swc-dot').forEach(function(d,i){
      d.classList.toggle('active',i===idx);
      d.style.background=i===idx?color:'rgba(255,255,255,0.15)';
    });
    arc.style.strokeDashoffset=CIRC*(1-(idx+1)/count);
  }
  requestAnimationFrame(function(){setTimeout(function(){go(0);},400);});
  setInterval(function(){cur=(cur+1)%count;go(cur);},2400+Math.random()*400);
});

/* MODAL CHARTS */
var mC={};
function kill(k){if(mC[k]){mC[k].destroy();delete mC[k];}}

function buildCharts(m){
  if(m==='saude'){
    kill('sb');kill('sl');kill('sn');
    mC.sb=new Chart(document.getElementById('m-saude-bar'),{type:'bar',data:{labels:['Clín. Geral','Cardio','Ortoped.','Pediatria','Gineco.','Neuro.'],datasets:[{data:[14.2,8.7,6.4,9.1,5.8,4.3],backgroundColor:'rgba(0,166,81,0.8)',borderRadius:4,borderSkipped:false},{data:[12,10,7,8,7,5],backgroundColor:'rgba(0,200,160,0.25)',borderRadius:4,borderSkipped:false,borderColor:'#00c8a0',borderWidth:1}]},options:bOpts({scales:{y:{ticks:{font:{size:9},color:tc,callback:function(v){return v+'K';}},grid:{color:gc}},x:{ticks:{font:{size:8},color:tc,maxRotation:20,autoSkip:false},grid:{display:false}}}})});
    mC.sl=new Chart(document.getElementById('m-saude-line'),{type:'line',data:{labels:['Jan','Fev','Mar','Abr','Mai','Jun'],datasets:[{data:[66.1,67.4,68.2,67.8,69.1,68.2],borderColor:'#00a651',backgroundColor:'rgba(0,166,81,0.08)',tension:0.4,fill:true,pointRadius:3},{data:[72,72,72,72,72,72],borderColor:'#f87171',borderDash:[6,3],pointRadius:0,borderWidth:1.5}]},options:bOpts({scales:{y:{min:60,max:80,ticks:{font:{size:9},color:tc,callback:function(v){return v+'%';}},grid:{color:gc}},x:{ticks:{font:{size:9},color:tc},grid:{color:gc}}}})});
    mC.sn=new Chart(document.getElementById('m-saude-nps'),{type:'line',data:{labels:['Q1 23','Q2 23','Q3 23','Q4 23','Q1 24','Q2 24'],datasets:[{data:[55,58,60,64,68,72],borderColor:'#00a651',tension:0.4,pointRadius:3,fill:false},{data:[48,51,54,57,61,65],borderColor:'#00c8a0',tension:0.4,pointRadius:3,fill:false},{data:[42,45,48,52,55,60],borderColor:'#a78bfa',tension:0.4,pointRadius:3,fill:false},{data:[38,41,45,48,52,58],borderColor:'#f97316',tension:0.4,pointRadius:3,fill:false}]},options:bOpts()});
  }
  if(m==='vendas'){
    kill('vl');kill('vf');kill('vd');
    mC.vl=new Chart(document.getElementById('m-vendas-line'),{type:'line',data:{labels:['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],datasets:[{data:[180,210,195,240,265,280,null,null,null,null,null,null],borderColor:'#0ea5e9',backgroundColor:'rgba(14,165,233,0.07)',tension:0.4,fill:true,pointRadius:3},{data:[175,205,200,235,260,275,290,310,320,340,360,400],borderColor:'#a78bfa',borderDash:[5,4],tension:0.4,fill:false,pointRadius:2}]},options:bOpts({scales:{y:{ticks:{font:{size:9},color:tc,callback:function(v){return 'R$'+v+'K';}},grid:{color:gc}},x:{ticks:{font:{size:8},color:tc},grid:{color:gc}}}})});
    mC.vf=new Chart(document.getElementById('m-vendas-funil'),{type:'bar',data:{labels:['Leads','Qualificados','Proposta','Negociação','Fechados'],datasets:[{data:[1200,680,340,180,92],backgroundColor:['rgba(14,165,233,0.3)','rgba(14,165,233,0.45)','rgba(14,165,233,0.6)','rgba(14,165,233,0.75)','rgba(14,165,233,0.95)'],borderRadius:4,borderSkipped:false}]},options:bOpts()});
    mC.vd=new Chart(document.getElementById('m-vendas-donut'),{type:'doughnut',data:{labels:['Enterprise','Mid-market','SMB'],datasets:[{data:[42,31,27],backgroundColor:['#0ea5e9','#a78bfa','#00c8a0'],borderWidth:0,hoverOffset:6}]},options:{responsive:true,maintainAspectRatio:false,cutout:'65%',plugins:{legend:{display:false}}}});
  }
  if(m==='rh'){
    kill('rt');kill('re');kill('ra');
    mC.rt=new Chart(document.getElementById('m-rh-turnover'),{type:'bar',data:{labels:['Comercial','TI','Operações','RH','Financeiro','Marketing'],datasets:[{data:[18.2,10.4,14.1,6.2,8.8,11.5],backgroundColor:['rgba(167,139,250,0.85)','rgba(167,139,250,0.7)','rgba(167,139,250,0.75)','rgba(167,139,250,0.5)','rgba(167,139,250,0.6)','rgba(167,139,250,0.65)'],borderRadius:4,borderSkipped:false}]},options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{ticks:{font:{size:9},color:tc,callback:function(v){return v+'%';}},grid:{color:gc}},y:{ticks:{font:{size:9},color:tc},grid:{display:false}}}}});
    mC.re=new Chart(document.getElementById('m-rh-enps'),{type:'line',data:{labels:['Q1 23','Q2 23','Q3 23','Q4 23','Q1 24','Q2 24'],datasets:[{data:[38,42,46,50,54,58],borderColor:'#a78bfa',backgroundColor:'rgba(167,139,250,0.08)',tension:0.4,fill:true,pointRadius:3},{data:[45,45,45,45,45,45],borderColor:'#565e75',borderDash:[5,4],pointRadius:0,borderWidth:1.5}]},options:bOpts({scales:{y:{min:25,ticks:{font:{size:9},color:tc},grid:{color:gc}},x:{ticks:{font:{size:9},color:tc},grid:{color:gc}}}})});
    mC.ra=new Chart(document.getElementById('m-rh-abs'),{type:'bar',data:{labels:['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],datasets:[{data:[3.8,4.1,3.6,3.9,4.4,3.7,4.0,3.8,4.2,3.5,4.1,3.9],backgroundColor:'rgba(86,94,117,0.5)',borderRadius:3,borderSkipped:false},{data:[3.2,3.4,3.0,3.1,3.5,3.1,null,null,null,null,null,null],backgroundColor:'rgba(167,139,250,0.75)',borderRadius:3,borderSkipped:false}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{ticks:{font:{size:9},color:tc,callback:function(v){return v+'%';}},grid:{color:gc}},x:{ticks:{font:{size:8},color:tc},grid:{display:false}}}}});
  }
  if(m==='mkt'){
    kill('mb');kill('md');kill('ml');
    mC.mb=new Chart(document.getElementById('m-mkt-bar'),{type:'bar',data:{labels:['Google Ads','Meta Ads','Email','Orgânico'],datasets:[{data:[4.2,3.1,2.8,1.9],backgroundColor:['rgba(0,200,160,0.8)','rgba(14,165,233,0.75)','rgba(249,115,22,0.7)','rgba(167,139,250,0.65)'],borderRadius:6,borderSkipped:false}]},options:bOpts({scales:{y:{ticks:{font:{size:9},color:tc,callback:function(v){return v+'%';}},grid:{color:gc}},x:{ticks:{font:{size:9},color:tc},grid:{display:false}}}})});
    mC.md=new Chart(document.getElementById('m-mkt-donut'),{type:'doughnut',data:{labels:['Google','Meta','Email','Outros'],datasets:[{data:[45,30,15,10],backgroundColor:['#00c8a0','#0ea5e9','#f97316','#a78bfa'],borderWidth:0,hoverOffset:6}]},options:{responsive:true,maintainAspectRatio:false,cutout:'65%',plugins:{legend:{display:false}}}});
    mC.ml=new Chart(document.getElementById('m-mkt-line'),{type:'line',data:{labels:['S1','S2','S3','S4','S5','S6','S7','S8'],datasets:[{data:[148,162,155,178,191,185,204,218],borderColor:'#00c8a0',backgroundColor:'rgba(0,200,160,0.07)',tension:0.4,fill:true,pointRadius:3,yAxisID:'y'},{data:[280,320,295,380,410,390,440,470],borderColor:'#f97316',tension:0.4,pointRadius:3,fill:false,borderDash:[4,3],yAxisID:'y2'}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{ticks:{font:{size:9},color:tc,callback:function(v){return v+'K';}},grid:{color:gc}},y2:{position:'right',ticks:{font:{size:9},color:'#f97316'},grid:{drawOnChartArea:false}},x:{ticks:{font:{size:9},color:tc},grid:{color:gc}}}}});
  }
}
