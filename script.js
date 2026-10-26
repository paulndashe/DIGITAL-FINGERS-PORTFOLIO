(() => {
  const grid = document.querySelector('#project-grid');
  const dialog = document.querySelector('.project-dialog');
  const dialogContent = dialog.querySelector('.dialog-content');
  const icon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V5m0 14h16M7 15l4-4 3 2 6-7"/></svg>';
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const projects = window.portfolioProjects || [];
  const motifs = {
    erp: '<div class="scene scene-ledger"><span class="scene-kicker">OPERATIONS / OVERVIEW</span><div class="ledger-blocks"><i></i><i></i><i></i></div><div class="ledger-lines"><i></i><i></i><i></i></div><div class="ledger-bars"><i></i><i></i><i></i><i></i><i></i></div></div>',
    claims: '<div class="scene scene-claims"><span class="scene-kicker">CLAIMS / WORKFLOW</span><div class="claim-document"><i></i><i></i><i></i></div><div class="claim-route"><i></i><i></i><i></i></div><span class="claim-state">REVIEW</span></div>',
    brand: '<div class="scene scene-brand"><span class="scene-kicker">BRAND / DIGITAL</span><div class="brand-frame"><i></i><b></b><span></span><span></span><em></em></div></div>',
    construction: '<div class="scene scene-construction"><span class="scene-kicker">STRAIGHT EDGE / WEB</span><div class="construction-frame"><i></i><i></i><b></b><span></span><span></span></div></div>',
    business: '<div class="scene scene-business"><span class="scene-kicker">DIGITAL PRESENCE</span><div class="business-window"><i></i><b></b><span></span><span></span><em></em></div></div>',
    workflow: '<div class="scene scene-flow"><span class="scene-kicker">PEOPLE / PROCESS</span><div class="flow-track"><i></i><b></b><i></i><b></b><i></i></div><div class="flow-labels"><span>GOALS</span><span>REVIEW</span><span>OUTCOME</span></div></div>',
    devices: '<div class="scene scene-devices"><span class="scene-kicker">MOBILE / COMPUTING</span><div class="device-phone"><i></i><span></span></div><div class="device-laptop"><b></b><i></i><span></span></div></div>',
    agriculture: '<div class="scene scene-agriculture"><span class="scene-kicker">AGRICULTURE / AI</span><div class="crop-row"><i></i><i></i><i></i><i></i><i></i></div><div class="chat-bubble">Ask about crops</div></div>',
    messenger: '<div class="scene scene-messenger"><span class="scene-kicker">CHAT / CONVERSATION</span><div class="message message-left"></div><div class="message message-right"></div><div class="message message-left short"></div></div>',
    webcode: '<div class="scene scene-code"><span class="scene-kicker">APPLICATION / DEVELOPMENT</span><div class="code-window"><i></i><i></i><i></i><span></span><span></span><span></span><span></span></div></div>',
    flask: '<div class="scene scene-flask"><span class="scene-kicker">PYTHON / FLASK</span><div class="flask-mark">{ }</div><div class="flask-lines"><i></i><i></i><i></i></div></div>',
    cloud: '<div class="scene scene-cloud"><span class="scene-kicker">APPLICATION / CLOUD</span><div class="cloud-nodes"><i>UI</i><b>API</b><i>AWS</i></div><div class="cloud-connectors"></div></div>',
    enterprise: '<div class="scene scene-enterprise"><span class="scene-kicker">ENTERPRISE / SYSTEMS</span><div class="enterprise-stack"><i></i><i></i><i></i></div><div class="enterprise-node">BUSINESS<br>SYSTEMS</div></div>',
    rack: '<div class="scene scene-rack"><span class="scene-kicker">NETWORK / INFRASTRUCTURE</span><div class="rack-illustration"><i></i><i></i><i></i><i></i></div><div class="rack-lines"><b></b><b></b></div></div>'
  };
  const card = (p, index) => `<article class="project-card" style="--card-index:${index}"><div class="project-art art-${esc(p.visual)}" aria-hidden="true">${motifs[p.visual] || motifs.webcode}<span class="art-disclaimer">Illustrative visual · not a product screenshot</span></div><div class="project-meta"><span>${esc(p.client)}</span><span class="status status-${p.status.toLowerCase().replaceAll(' ','-')}"><i></i>${esc(p.status)}</span></div><h3>${esc(p.name)}</h3><p class="project-description">${esc(p.description)}</p><div class="project-bottom"><button class="project-open" data-project="${projects.indexOf(p)}" aria-label="View details for ${esc(p.name)}">View details</button></div></article>`;
  const render = filter => { const shown = filter === 'All' ? projects : projects.filter(p=>p.category===filter); grid.innerHTML = shown.map(card).join(''); };
  document.querySelectorAll('.filter-button').forEach(button => {
    const count = button.dataset.filter === 'All' ? projects.length : projects.filter(p=>p.category===button.dataset.filter).length;
    button.querySelector('[data-count]').textContent = String(count).padStart(2,'0');
    button.addEventListener('click', () => { document.querySelectorAll('.filter-button').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));}); render(button.dataset.filter); });
  });
  grid.addEventListener('click', event => {
    const trigger = event.target.closest('[data-project]'); if (!trigger) return;
    const p = projects[Number(trigger.dataset.project)]; if (!p) return;
    dialogContent.innerHTML = `<span class="dialog-client">${esc(p.client)}</span><span class="status status-${p.status.toLowerCase().replaceAll(' ','-')}"><i></i>${esc(p.status)}</span><h2 id="dialog-title">${esc(p.name)}</h2><p class="dialog-summary">${esc(p.description)}</p><div class="dialog-detail-grid"><section><h3>Business need</h3><p>${esc(p.need)}</p></section><section><h3>Approach</h3><p>${esc(p.solution)}</p></section><section><h3>Role</h3><p>${esc(p.role)}</p></section><section><h3>Project notes</h3><p>${esc(p.detail)}</p></section></div>${p.stack.length?`<div class="dialog-stack"><h3>Technology</h3><div class="tech-tags">${p.stack.map(x=>`<span>${esc(x)}</span>`).join('')}</div></div>`:''}`;
    dialog.showModal();
  });
  dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
  document.querySelector('#year').textContent = new Date().getFullYear();
  const toggle=document.querySelector('.menu-toggle'), nav=document.querySelector('#primary-nav');
  toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');nav.classList.toggle('nav-open',open);});
  nav.addEventListener('click',event=>{if(event.target.closest('a')){toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');nav.classList.remove('nav-open');}});
  render('All');
})();
