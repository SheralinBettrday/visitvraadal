// Visit Vrådal – felles header, footer, navigasjon og sesongforhåndsvisning.
// Header og footer bygges her, slik at menyen bare må vedlikeholdes ett sted.
(function () {
  const root = document.documentElement;
  const page = document.body.dataset.page || 'home';

  // ---------- Sesong ----------
  // Prioritet: ?sesong=… i URL → valgt sesong i denne fanen → data-season i <html>
  const valid = ['winter', 'spring', 'summer', 'autumn'];
  const fromUrl = new URLSearchParams(location.search).get('sesong');
  let stored = null;
  try { stored = sessionStorage.getItem('vv-season'); } catch (e) {}
  if (valid.includes(fromUrl)) {
    root.dataset.season = fromUrl;
    try { sessionStorage.setItem('vv-season', fromUrl); } catch (e) {}
  } else if (valid.includes(stored)) root.dataset.season = stored;

  const logo = (cls = '') => `
    <a class="logo ${cls}" href="index.html" aria-label="Visit Vrådal – forsiden">
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <circle cx="29" cy="10" r="2.2" fill="currentColor"/>
        <path d="M3 33 L15 15 L21 23 L26 17 L37 33 Z" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>
        <path d="M11.5 20.3 L15 15 L18.2 19.3" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>
      </svg>
      <span><span class="logo-visit">Visit</span>Vrådal<small>Telemark · Norge</small></span>
    </a>`;

  const menu = [
    { id: 'opplevelser', label: 'Opplevelser', href: 'opplevelser.html', sub: [
      ['label', 'Vinter'],
      ['Alpint i Vrådal Panorama', 'opplevelser.html#alpint'],
      ['Langrenn og skiløyper', 'opplevelser.html#langrenn'],
      ['Stjernekikking og trugeturer', 'opplevelser.html#stjernekikking'],
      ['Hundekjøring, aking og vintermoro', 'opplevelser.html#vintermoro'],
      ['label', 'Vår, sommer og høst'],
      ['Fotturer og toppturer', 'opplevelser.html#fotturer'],
      ['Bading, padling og båtliv', 'opplevelser.html#padling'],
      ['Sykkel og golf', 'opplevelser.html#sykkel-golf'],
      ['Motorsykkel og bil', 'opplevelser.html#motor'],
      ['label', 'Hele året'],
      ['Velvære, basseng og badstue', 'opplevelser.html#velvaere'],
      ['For hele familien', 'opplevelser.html#familie'],
      ['Utflukter i Telemark', 'opplevelser.html#utflukter'],
    ]},
    { id: 'overnatting', label: 'Overnatting', href: 'overnatting.html', sub: [
      ['Hotell', 'overnatting.html#hotell'],
      ['Leiligheter og hytter', 'overnatting.html#leiligheter'],
      ['Pakketilbud', 'overnatting.html#pakker'],
    ]},
    { id: 'mat', label: 'Mat og drikke', href: 'mat-og-drikke.html', sub: [
      ['Restauranter', 'mat-og-drikke.html#restauranter'],
      ['Barer og uteservering', 'mat-og-drikke.html#barer'],
      ['Unike matopplevelser', 'mat-og-drikke.html#matopplevelser'],
      ['Lokale smaker', 'mat-og-drikke.html#lokale-smaker'],
    ]},
    { id: 'aktuelt', label: 'Hva skjer', href: 'hva-skjer.html' },
    { id: 'planlegg', label: 'Planlegg reisen', href: 'planlegg-reisen.html', sub: [
      ['Slik kommer du hit', 'planlegg-reisen.html#reise'],
      ['Kart over Vrådal', 'planlegg-reisen.html#kart'],
      ['Praktisk informasjon', 'planlegg-reisen.html#praktisk'],
      ['Vrådal gjennom året', 'planlegg-reisen.html#sesonger'],
      ['Om Vrådal', 'planlegg-reisen.html#om-vradal'],
    ]},
  ];

  const menuHtml = menu.map(item => {
    const active = item.id === page ? ' aria-current="page"' : '';
    if (!item.sub) return `<li><a href="${item.href}"${active}>${item.label}</a></li>`;
    const sub = item.sub.map(([a, b]) => a === 'label'
      ? `<li class="sub-label">${b}</li>`
      : `<li><a href="${b}">${a}</a></li>`).join('');
    return `<li class="has-sub"><a href="${item.href}"${active}>${item.label}</a>
      <button class="sub-toggle" aria-label="Vis undermeny for ${item.label}" aria-expanded="false"></button>
      <ul class="submenu">${sub}</ul></li>`;
  }).join('');

  const header = document.createElement('header');
  header.className = 'site-header';
  header.innerHTML = `
    <div class="container nav">
      ${logo()}
      <ul class="menu" id="menu">${menuHtml}</ul>
      <div class="nav-actions">
        <button class="icon-btn" aria-label="Søk">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
        </button>
        <a class="lang" href="#" aria-label="English version">EN</a>
        <a class="btn btn-accent" href="overnatting.html">Finn overnatting</a>
        <button class="icon-btn burger" aria-label="Åpne meny" aria-expanded="false">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
        </button>
      </div>
    </div>`;
  document.body.prepend(header);

  const col = (title, links) => `<div><h4>${title}</h4><ul>${links.map(([t, h]) => `<li><a href="${h}">${t}</a></li>`).join('')}</ul></div>`;
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div>${logo()}
          <p>Vrådal er en liten, idyllisk bygd i Kviteseid i Vest-Telemark – omgitt av fjell, skog og innsjøene Nisser og Vråvatn.</p>
        </div>
        ${col('Opplevelser', [['Alpint', 'opplevelser.html#alpint'], ['Langrenn', 'opplevelser.html#langrenn'], ['Fotturer', 'opplevelser.html#fotturer'], ['Padling og bading', 'opplevelser.html#padling'], ['Velvære', 'opplevelser.html#velvaere']])}
        ${col('Bo og spis', [['Hotell', 'overnatting.html#hotell'], ['Leiligheter og hytter', 'overnatting.html#leiligheter'], ['Pakketilbud', 'overnatting.html#pakker'], ['Mat og drikke', 'mat-og-drikke.html']])}
        ${col('Planlegg', [['Hva skjer', 'hva-skjer.html'], ['Slik kommer du hit', 'planlegg-reisen.html#reise'], ['Kart', 'planlegg-reisen.html#kart'], ['Praktisk informasjon', 'planlegg-reisen.html#praktisk']])}
        ${col('Om oss', [['Om Vrådal', 'planlegg-reisen.html#om-vradal'], ['Kontakt', '#'], ['For næringslivet', '#'], ['Presse', '#']])}
      </div>
      <div class="footer-bottom">
        <span>© 2026 Visit Vrådal · 3853 Vrådal, Telemark</span>
        <span><a href="#">Personvern</a> · <a href="#">Informasjonskapsler</a></span>
      </div>
    </div>`;
  document.body.append(footer);

  // Sesongvelger – KUN for forhåndsvisning, fjernes før lansering
  const demo = document.createElement('div');
  demo.className = 'season-demo';
  demo.setAttribute('role', 'group');
  demo.setAttribute('aria-label', 'Forhåndsvis sesong');
  demo.innerHTML = [['winter', 'Vinter'], ['spring', 'Vår'], ['summer', 'Sommer'], ['autumn', 'Høst']]
    .map(([v, l]) => `<button data-set="${v}">${l}</button>`).join('');
  document.body.append(demo);
  const buttons = demo.querySelectorAll('button');
  const sync = () => buttons.forEach(b => b.setAttribute('aria-pressed', b.dataset.set === root.dataset.season));
  buttons.forEach(b => b.addEventListener('click', () => {
    root.dataset.season = b.dataset.set;
    try { sessionStorage.setItem('vv-season', b.dataset.set); } catch (e) {}
    sync();
  }));
  sync();

  // ---------- Header-oppførsel ----------
  const hasHero = !!document.querySelector('.hero');
  const onScroll = () => header.classList.toggle('is-solid', !hasHero || window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const burger = header.querySelector('.burger');
  burger.addEventListener('click', () => {
    const open = header.classList.toggle('menu-open');
    burger.setAttribute('aria-expanded', open);
  });
  header.querySelectorAll('.sub-toggle').forEach(t => t.addEventListener('click', () => {
    const li = t.closest('li');
    t.setAttribute('aria-expanded', li.classList.toggle('sub-open'));
  }));
  header.querySelectorAll('.menu a').forEach(a => a.addEventListener('click', () => header.classList.remove('menu-open')));

  // ---------- Filter (brukes på Hva skjer) ----------
  document.querySelectorAll('[data-filter-group]').forEach(group => {
    const target = document.querySelector(group.dataset.filterGroup);
    group.querySelectorAll('button').forEach(btn => btn.addEventListener('click', () => {
      group.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', b === btn));
      const f = btn.dataset.filter;
      target.querySelectorAll('[data-cat]').forEach(el => {
        el.hidden = f !== 'alle' && !el.dataset.cat.split(' ').includes(f);
      });
    }));
  });
})();
