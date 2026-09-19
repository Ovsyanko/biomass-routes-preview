const FEEDSTOCKS=window.DRYER_SELECTION_DATA?.feedstocks||{};
const TECH=[
{name:'Барабанная сушилка прямого нагрева',forms:['тверд','куск','сыпуч'],maxSize:100,wi:[5,65],wf:[5,25],stick:2,tmin:80,heat:1.10,el:35,capex:1.0,carrier:'Продукты сгорания / горячий воздух',temp:'120–600 °C',pros:['Робастная и хорошо освоенная технология','Широкий диапазон производительности','Относительно невысокий CAPEX'],cons:['Повышенные требования к пожарной безопасности','Пылеунос и большой поток отходящих газов','Прямой контакт продукта с теплоносителем']},
{name:'Низкотемпературная ленточная сушилка',forms:['тверд','куск','волок','сыпуч'],maxSize:150,wi:[10,80],wf:[5,35],stick:2,tmin:35,heat:.85,el:55,capex:1.3,carrier:'Горячий воздух',temp:'40–120 °C, обычно 55–100 °C',pros:['Подходит для низкопотенциального и отходящего тепла','Низкая температура продукта','Низкий пылеунос и пожарный риск'],cons:['Более высокий CAPEX, чем у барабанной','Большая площадь установки','Чувствительность к равномерности слоя']},
{name:'Паровая дисковая сушилка непрямого нагрева (Stord/Atlas Stord тип)',forms:['влаж','паста','тверд','липк'],maxSize:50,wi:[20,85],wf:[5,30],stick:3,tmin:80,heat:.80,el:45,capex:1.5,carrier:'Насыщенный пар, косвенный нагрев',temp:'Обычно 100–200 °C по давлению пара',pros:['Нет контакта продукта с дымовыми газами','Хороша для липких и пахучих материалов','Относительно низкий удельный расход тепла'],cons:['Нужен пар или отдельный паровой контур','Более высокий CAPEX','Механическая сложность ротора/дисков']},
{name:'АС-4 сушка-измельчение',forms:['растит','сыпуч','волок','тверд'],maxSize:100,wi:[10,80],wf:[5,15],stick:3,tmin:80,heat:1.00,el:90,capex:1.2,grind:true,carrier:'Горячий воздух / продукты сгорания',temp:'Около 450–500 °C после теплогенератора; 85–125 °C на выходе агрегата',pros:['Одновременная сушка и измельчение','Компактная технологическая схема','Хороша для ряда волокнистых растительных материалов'],cons:['Повышенное электропотребление','Нужна проверка конкретного сырья на испытаниях','Больше мелкой фракции и нагрузка на аспирацию']},
{name:'Труба-сушилка / flash / пневматическая',forms:['мелкод','порош','сыпуч'],maxSize:10,wi:[10,65],wf:[5,15],stick:1,tmin:50,heat:1.15,el:75,capex:1.0,carrier:'Горячий воздух / продукты сгорания',temp:'150–500 °C на входе, короткое время контакта',pros:['Низкий относительный CAPEX','Очень короткое время сушки','Компактность'],cons:['Требуется мелкая однородная фракция','Высокий пылеунос','Не подходит для липких материалов']},
{name:'Сушилка с кипящим слоем',forms:['мелк','гранул','сыпуч'],maxSize:5,wi:[2,35],wf:[.5,10],stick:1,tmin:40,heat:1.05,el:110,capex:1.4,carrier:'Горячий воздух / инертный газ',temp:'80–180 °C типично для биопродуктов',pros:['Равномерная интенсивная сушка','Хороший тепло- и массообмен','Точный контроль конечной влажности'],cons:['Высокое электропотребление','Плохо работает с крупным, липким и волокнистым сырьем','Требует устойчивой псевдоожиженности']},
{name:'Распылительная сушилка',forms:['жидк','раствор','суспенз','эмульс'],maxSize:.5,wi:[30,95],wf:[1,8],stick:2,tmin:40,heat:1.25,el:160,capex:2.0,carrier:'Горячий воздух / инертный газ',temp:'150–250 °C пищевые; выше для технических продуктов',pros:['Прямое получение порошка из жидкости','Очень короткое тепловое воздействие','Точный контроль дисперсности продукта'],cons:['Высокий CAPEX','Высокие требования к распылению и реологии','Высокое энергопотребление']},
{name:'Распылительно-кипящий слой / spray fluid bed',forms:['жидк','суспенз','гранул'],maxSize:5,wi:[20,95],wf:[1,10],stick:3,tmin:40,heat:1.15,el:180,capex:2.2,carrier:'Горячий воздух',temp:'80–200 °C, температура слоя ниже',pros:['Сушка и грануляция в одном процессе','Управление размером гранул','Хорошая однородность продукта'],cons:['Самый высокий относительный CAPEX в перечне','Высокое электропотребление','Сложная гидродинамика и управление процессом']},
{name:'Вакуумная контактная / лопастная сушилка',forms:['паста','шлам','термочув','влаж','липк'],maxSize:50,wi:[20,95],wf:[1,20],stick:3,tmin:30,heat:.95,el:85,capex:1.8,carrier:'Пар / горячая вода / термомасло, косвенный нагрев',temp:'Температура кипения снижена вакуумом',pros:['Низкая температура продукта','Закрытая схема, удобна для запахов и ценных продуктов','Нет контакта с дымовыми газами'],cons:['Высокий CAPEX','Вакуумная система усложняет обслуживание','Обычно не лучший выбор для дешевого массового сырья']}
];
const stickLevel=s=>({Низкая:1,Средняя:2,Высокая:3}[s]||2);
const capexText=c=>c<=1.05?'низкий':c<=1.4?'средний':c<=1.7?'выше среднего':'высокий';
const escapeHtml=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); const val=id=>document.getElementById(id)?.value?.trim(); const num=id=>{const x=parseFloat(val(id));return Number.isFinite(x)?x:null};
function syncConditional(){const yes=val('readyHeat')==='Да';document.querySelectorAll('.heat-cond').forEach(x=>x.classList.toggle('show',yes));const f=val('fuel');document.querySelectorAll('.fuel-cond').forEach(x=>x.classList.toggle('show',!!f));document.querySelector('.pressure-cond')?.classList.toggle('steam-selected',yes&&val('heatType')==='Насыщенный пар');}
function autofill(){
 let n=val('feedstock'),other=document.getElementById('otherFeed');
 if(other?.closest('.field')) other.closest('.field').style.display=n==='Другое'?'flex':'none';
 let d=FEEDSTOCKS[n],hint=document.getElementById('feedDefaults');
 if(!d){if(hint)hint.textContent='';return}
 const map={form:'form',maxSize:'maxSize',density:'density',wiMin:'wiMin',wiMax:'wiMax',wfMin:'wfMin',wfMax:'wfMax',stick:'stick',tmax:'tmax',dust:'dust',abrasive:'abrasive'};
 Object.entries(map).forEach(([k,id])=>{let e=document.getElementById(id);if(e&&d[k]!=null)e.value=d[k]});
 if(hint)hint.textContent=`Справочник: фракция ${d.minSize}–${d.maxSize} мм; насыпная плотность ${d.densityMin}–${d.densityMax} кг/м³ (в поле подставлено среднее ${d.density}); исходная влажность ${d.wiMin}–${d.wiMax}%; конечная ${d.wfMin}–${d.wfMax}%.`;
 updateRawPreview();
}
function rawThroughput(product,wi,wf){if(product==null||wi==null||wf==null||wi>=100||wf>=100)return null;return product*(1-wf/100)/(1-wi/100)}
function materialBalance(product,wi,wf){let raw=rawThroughput(product,wi,wf);if(raw==null)return null;let water=raw-product;return{raw,water,dry:product*(1-wf/100)}}
function heatPrice(){if(val('readyHeat')==='Да'){let p=num('heatCost');return p!=null&&p>=0?p:null}let cost=num('fuelCost'),lhv=num('lhv'),eff=num('eff');if(cost!=null&&lhv&&eff)return cost/(lhv*eff);return null}
function validate(){let e=[];if(!val('feedstock'))e.push('Укажите наименование сырья.');if(val('feedstock')==='Другое'&&!val('otherFeed'))e.push('Введите наименование другого сырья.');if(num('wiMax')==null)e.push('Укажите максимальную исходную влажность.');if(num('wfMin')==null||num('wfMax')==null)e.push('Укажите минимальную и максимальную конечную влажность.');if(num('productRate')==null||num('productRate')<=0)e.push('Укажите производительность по высушенному материалу.');if(!val('grind'))e.push('Ответьте на вопрос об одновременном измельчении.');if(!val('readyHeat'))e.push('Укажите наличие готового теплоносителя.');if(val('readyHeat')==='Да'){if(!val('heatType'))e.push('Выберите тип готового теплоносителя.');if(num('heatTemp')==null)e.push('Укажите температуру теплоносителя.');if(val('heatType')==='Насыщенный пар'&&num('steamPressure')==null)e.push('Укажите давление пара.');if(num('heatCost')==null)e.push('Укажите стоимость готового тепла.')}if(val('fuel')&&!val('fuelUnit'))e.push('Для выбранного топлива укажите единицу стоимости.');let wi=num('wiMax'),a=num('wfMin'),b=num('wfMax');if(num('wiMin')!=null&&wi!=null&&num('wiMin')>wi)e.push('Минимальная исходная влажность не может быть выше максимальной.');if(wi!=null&&(wi<0||wi>=100))e.push('Исходная влажность должна быть от 0 до 99,9%.');if(a!=null&&b!=null&&a>b)e.push('Минимальная конечная влажность не может быть выше максимальной.');if(wi!=null&&b!=null&&b>=wi)e.push('Конечная влажность должна быть ниже исходной.');return e}
function scoreTech(t,d){
 let hard=[],score=100,notes=[];
 const name=t.name, isAS4=name.includes('АС-4'), isDrum=name.includes('Барабан'), isBelt=name.includes('ленточ'),
       isVac=name.includes('Вакуум'), isSteam=name.includes('Паровая'), isFlash=name.includes('Труба-сушилка');
 let form=(d.form||'').toLowerCase();
 if(form&&t.forms.length&&!t.forms.some(x=>form.includes(x))){score-=18;notes.push('форма сырья нетипична для технологии')}
 if(d.maxSize!=null&&d.maxSize>t.maxSize)hard.push(`фракция до ${d.maxSize} мм выше ориентировочного предела ${t.maxSize} мм`);
 if(d.wiMax!=null){if(d.wiMax>t.wi[1]){score-=18;notes.push('исходная влажность выше типичного окна технологии')}else if(d.wiMax<t.wi[0])score-=5}
 if(d.wfMin!=null&&d.wfMin<t.wf[0]){score-=15;notes.push('целевая минимальная влажность ниже типичного диапазона')}
 if(d.wfMax!=null&&d.wfMax>t.wf[1])score-=4;
 if(d.tmax!=null&&t.tmin>d.tmax)hard.push(`минимальная типичная температура продукта около ${t.tmin} °C выше допустимой ${d.tmax} °C`);

 // Правило 2: измельчение
 if(d.grind==='Да'&&isAS4){score+=25;notes.push('приоритет: требуется измельчение материала')}
 if(d.grind==='Недопустимо'&&isAS4)hard.push('измельчение материала недопустимо, а АС-4 совмещает сушку с измельчением');

 // Правило 3: налипание
 if(d.stick==='Высокая'){
   if(isAS4){score+=25;notes.push('приоритет для сильно налипающего материала')}
   if(isDrum||isBelt)hard.push('высокая склонность к налипанию: технология не рекомендуется');
 }else if(d.stick==='Средняя'&&(isDrum||isBelt)){
   score-=8;notes.push('при средней склонности к налипанию применять с осторожностью');
 }

 if(d.dust==='Высокая'&&[true,isFlash,isAS4].some((x,i)=>i===0?isDrum:x)){score-=7;notes.push('нужна усиленная аспирация и взрывозащита')}

 // Правило 4: готовый теплоноситель
 if(d.readyHeat==='Да'){
   let h=(d.heatType||'').toLowerCase(),c=t.carrier.toLowerCase(),compatible=false,lowGrade=false;
   if(h.includes('пар')&&c.includes('пар'))compatible=true;
   if(h.includes('горяч')&&c.includes('горяч'))compatible=true;
   if(h.includes('вод')&&(isBelt||isVac))compatible=true;
   if(h.includes('термомас')&&(isBelt||isVac))compatible=true;
   if(h.includes('продукт')&&c.includes('продукт'))compatible=true;
   if(compatible){score+=12;notes.push('плюс за совместимость с готовым теплоносителем')}
   else if((h.includes('вод')||h.includes('пар')||h.includes('термомас')||h.includes('горяч'))&&(isBelt||isVac||isSteam)){score+=8;notes.push('может эффективно использовать готовое тепло через нагрев воздуха/непрямой контур')}
 }

 // Правило 5: сохранение качества
 if(d.quality==='Да'){
   if(isBelt){score+=18;notes.push('приоритет: щадящая низкотемпературная сушка')}
   else if(isVac){score+=15;notes.push('приоритет: низкая температура продукта и закрытая схема')}
   else if(isSteam){score+=8;notes.push('непрямой нагрев благоприятен для чувствительного продукта')}
 }

 // Правило 6: конечная влажность выше 20%
 if(d.wfMin!=null&&d.wfMin>20){
   if(isBelt){score+=18;notes.push('приоритет при конечной влажности >20%: удобное регулирование выхода')}
   else if(isSteam||isVac){score+=10;notes.push('подходит для мягкой регулируемой сушки до высокой остаточной влажности')}
   else if(isAS4||isFlash){score-=15;notes.push('менее предпочтительна при требуемой конечной влажности >20%')}
 }

 score=Math.max(0,Math.min(100,score));
 return{...t,score,hard,notes}
}
function buildReport(){let errs=validate(),box=document.getElementById('errors');box.innerHTML=errs.map(x=>`• ${x}`).join('<br>');box.classList.toggle('show',errs.length>0);if(errs.length)return;let fs=FEEDSTOCKS[val('feedstock')]||{};let d={form:val('form')||fs.form,maxSize:num('maxSize')??fs.maxSize,density:num('density')??fs.density,wiMin:num('wiMin'),wiMax:num('wiMax'),wfMin:num('wfMin'),wfMax:num('wfMax'),stick:val('stick')||fs.stick,tmax:num('tmax')??fs.tmax,grind:val('grind'),dust:val('dust')||fs.dust,abrasive:val('abrasive')||fs.abrasive,readyHeat:val('readyHeat'),heatType:val('heatType'),quality:val('quality'),odor:val('odor')};let bal=materialBalance(num('productRate'),d.wiMax,d.wfMin);let hp=heatPrice(),reserve=num('reserve')??.10,tariff=num('powerTariff'),emcost=num('emissionCost')??0,rawCost=num('rawCost');let ranked=TECH.map(t=>{let r=scoreTech(t,d);let th=bal?bal.water*t.heat*(1+reserve):null,el=bal?bal.water*t.el:null,opex=null;if(th!=null&&hp!=null){opex=th*hp+(el||0)*(tariff||0)+(bal.raw||0)*emcost}return{...r,thermal:th,electric:el,opex,opexProduct:opex!=null?opex/num('productRate'):null}}).sort((a,b)=>(a.hard.length-b.hard.length)||(b.score-a.score)||((a.opexProduct??1e99)-(b.opexProduct??1e99)));
let feasible=ranked.filter(x=>x.hard.length===0).slice(0,4);if(!feasible.length)feasible=ranked.slice(0,3);
document.getElementById('kpis').innerHTML=`<div class="kpi"><b>${bal.raw.toFixed(2)}</b><span>т/ч исходного сырья при max влажности</span></div><div class="kpi"><b>${bal.water.toFixed(2)}</b><span>т H₂O/ч испарение</span></div><div class="kpi"><b>${num('productRate').toFixed(2)}</b><span>т/ч готового продукта</span></div><div class="kpi"><b>${hp!=null?Math.round(hp):'—'}</b><span>руб/МВт·ч полезного тепла</span></div>`;
let assumptions=[];if(d.wiMax!=null&&d.wiMax>70)assumptions.push('Исходная влажность выше 70%: перед сушкой рекомендуется рассмотреть предварительное механическое обезвоживание — пресс или декантер.');['form','maxSize','density','stick','tmax','dust','abrasive'].forEach(k=>{let ids={form:'Форма сырья',maxSize:'Размер фракции',density:'Насыпная плотность',stick:'Налипание',tmax:'Макс. температура продукта',dust:'Пылевзрывоопасность',abrasive:'Абразивность'};let map={form:'form',maxSize:'maxSize',density:'density',stick:'stick',tmax:'tmax',dust:'dust',abrasive:'abrasive'};if(!val(map[k])&&fs[k]!=null)assumptions.push(`${ids[k]}: принято по справочнику (${fs[k]})`) });
let html=`<h2>Предварительная рекомендация</h2><p>Расчет выполнен для <b>${val('feedstock')==='Другое'?escapeHtml(val('otherFeed')):escapeHtml(val('feedstock'))}</b>. Это предпроектный отбор, а не замена испытаний и коммерческого расчета поставщика.</p>`;
feasible.forEach((t,i)=>{let cls=t.hard.length?'bad':t.score>=82?'':'mid';html+=`<div class="tech ${i===0?'top':''}"><div class="tech-head"><div><b>${i+1}. ${t.name}</b><div class="muted">${t.carrier}; ${t.temp}</div></div><span class="badge ${cls}">${t.hard.length?'условно':'оценка '+Math.round(t.score)+'/100'}</span></div><div class="meta"><div><span>CAPEX</span><b>${capexText(t.capex)} (${t.capex.toFixed(1)}×)</b></div><div><span>Тепло</span><b>${t.heat.toFixed(2)} МВт·ч/т H₂O</b></div><div><span>OPEX*</span><b>${t.opexProduct!=null?Math.round(t.opexProduct)+' руб/т продукта':'н/д'}</b></div></div>${t.hard.length?`<div class="note"><b>Ограничения:</b> ${t.hard.join('; ')}.</div>`:''}${t.notes.length?`<p><b>Что проверить:</b> ${t.notes.join('; ')}.</p>`:''}<div class="grid"><div><b>Преимущества</b><ul>${t.pros.map(x=>`<li>${x}</li>`).join('')}</ul></div><div><b>Недостатки</b><ul>${t.cons.map(x=>`<li>${x}</li>`).join('')}</ul></div></div></div>`});
html+=`<div class="note"><b>* OPEX</b> показан только если введена цена готового тепла либо достаточно данных для расчета цены тепла из топлива. CAPEX — относительная сравнительная оценка из модели, а не цена оборудования.</div>${assumptions.length?`<div class="assumptions"><h3>Принятые значения для незаполненных необязательных полей</h3><ul>${assumptions.map(x=>`<li>${x}</li>`).join('')}</ul></div>`:''}`;
document.getElementById('report').innerHTML=html;document.getElementById('report').scrollIntoView({behavior:'smooth',block:'start'});
}
function updateRawPreview(){let p=num('productRate'),wi=num('wiMax'),wf=num('wfMin'),r=rawThroughput(p,wi,wf);document.getElementById('rawPreview').textContent=r!=null?`Расчетная подача исходного сырья при максимальной исходной и минимальной конечной влажности: ${r.toFixed(2)} т/ч`:'Заполните производительность, max исходную и min конечную влажность — здесь появится расчет подачи исходного сырья.'}
document.addEventListener('DOMContentLoaded',()=>{document.getElementById('feedstock').addEventListener('change',autofill);['readyHeat','fuel','heatType'].forEach(id=>document.getElementById(id).addEventListener('change',syncConditional));['productRate','wiMax','wfMin'].forEach(id=>document.getElementById(id).addEventListener('input',updateRawPreview));document.getElementById('calc').addEventListener('click',buildReport);document.getElementById('reset').addEventListener('click',()=>setTimeout(()=>{syncConditional();updateRawPreview();document.getElementById('report').innerHTML='<p class="report-placeholder">После заполнения формы здесь появится краткий сравнительный отчет.</p>';document.getElementById('kpis').innerHTML=''},0));autofill();syncConditional();updateRawPreview()});
