const fields = ['spend','revenue','impressions','clicks','conversions','margin'];
const $ = id => document.getElementById(id);
const num = id => Math.max(0, Number($(id).value) || 0);
const money = value => '$' + (Number.isFinite(value) ? value.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2}) : '—');
const percent = value => Number.isFinite(value) ? value.toFixed(2)+'%' : '—';
function calculate(){
 const spend=num('spend'), revenue=num('revenue'), impressions=num('impressions'), clicks=num('clicks'), conversions=num('conversions'), margin=num('margin');
 const roas=spend?revenue/spend:0, cpa=conversions?spend/conversions:0, ctr=impressions?clicks/impressions*100:0, cpc=clicks?spend/clicks:0, cpm=impressions?spend/impressions*1000:0, cvr=clicks?conversions/clicks*100:0, beRoas=margin>0?100/margin:0;
 const aov=conversions?revenue/conversions:0, beCpa=aov*margin/100;
 $('roas').textContent=spend?roas.toFixed(2)+'x':'—'; $('cpa').textContent=conversions?money(cpa):'—'; $('ctr').textContent=impressions?percent(ctr):'—'; $('cpc').textContent=clicks?money(cpc):'—'; $('cpm').textContent=impressions?money(cpm):'—'; $('cvr').textContent=clicks?percent(cvr):'—'; $('beRoas').textContent=margin>0?beRoas.toFixed(2)+'x':'—'; $('beCpa').textContent=margin>0&&conversions?money(beCpa):'—';
 const insight=$('insight');
 if(!spend || !margin){insight.innerHTML='<span class="insight-icon">✦</span><div><strong>Performance insight</strong><p>Enter ad spend and product margin to evaluate your campaign against break-even targets.</p></div>';return;}
 if(roas>=beRoas){insight.innerHTML='<span class="insight-icon">✦</span><div><strong>Above break-even</strong><p>Your ROAS is above the break-even target based on the margin entered. This is before other operating costs.</p></div>';}
 else {insight.innerHTML='<span class="insight-icon">↗</span><div><strong>Below break-even</strong><p>Your current ROAS is below the estimated break-even point. Review your offer, conversion rate, average order value, or ad costs.</p></div>';}
}
$('metricsForm').addEventListener('submit',e=>{e.preventDefault();calculate();});
fields.forEach(id=>$(id).addEventListener('input',calculate));
$('resetBtn').addEventListener('click',()=>{ $('spend').value=1000; $('revenue').value=3500; $('impressions').value=100000; $('clicks').value=2200; $('conversions').value=70; $('margin').value=40; calculate(); });
calculate();
