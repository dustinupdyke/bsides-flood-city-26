/* reveal.js powers the audience view, synchronized speaker window and PDF. */
(async () => {
  'use strict';
  const params = new URLSearchParams(location.search);
  const printMode = params.has('print-pdf');
  const speakerPreview = params.has('receiver');
  const tools = document.querySelector('.deck-tools');
  const printTools = document.querySelector('#printTools');
  if (speakerPreview) document.body.classList.add('speaker-preview');
  // Old bookmarked slide URLs continue to work with reveal's named sections.
  if (/^#slide-\d+$/.test(location.hash)) {
    history.replaceState(null, '', location.pathname + location.search + '#/' + location.hash.slice(1));
  }
  const alerts = document.querySelector('#alertfield');
  for (let i = 0; alerts && i < 288; i++) {
    const cell = document.createElement('i');
    cell.style.setProperty('--delay', `${(i * 17 % 19) / 10}s`);
    alerts.append(cell);
  }
  function exportPdf(withNotes = false) {
    const url = new URL(location.href);
    url.search = '?print-pdf' + (withNotes ? '&notes' : '');
    url.hash = '';
    window.open(url.href, '_blank');
  }
  window.keynote = new Reveal(document.querySelector('#keynote'), {
    width:1600, height:900, margin:0, center:false,
    controls:false, progress:false, slideNumber:false,
    hash:!speakerPreview && !printMode, hashOneBasedIndex:true,
    transition:'fade', backgroundTransition:'none',
    scrollActivationWidth:null, pdfMaxPagesPerSlide:1,
    pdfSeparateFragments:false, pdfPageHeightOffset:0,
    showNotes:printMode && params.has('notes') ? 'separate-page' : false,
    plugins:[RevealNotes]
  });
  const deck = window.keynote;
  const openNotes = () => deck.getPlugin('notes').open();
  // Keep familiar shortcuts in addition to reveal's S, O, F, ? and arrows.
  deck.addKeyBinding({ keyCode:78, key:'N', description:'Presenter notes' }, openNotes);
  deck.addKeyBinding({ keyCode:80, key:'P', description:'Presenter notes' }, openNotes);
  deck.addKeyBinding({ keyCode:71, key:'G', description:'Slide overview' }, () => deck.toggleOverview());
  document.addEventListener('keydown', event => {
    if (event.ctrlKey || event.metaKey || event.altKey || /INPUT|TEXTAREA|SELECT/.test(event.target.tagName)) return;
    if (event.key.toLowerCase() === 'e') {
      event.preventDefault();
      exportPdf(event.shiftKey);
    }
  });
  document.querySelector('#speakerButton').onclick = openNotes;
  document.querySelector('#pdfButton').onclick = () => exportPdf();
  document.querySelector('#notesPdfButton').onclick = () => exportPdf(true);
  document.querySelector('#toolsClose').onclick = () => tools.classList.remove('is-visible');
  document.querySelector('#printButton').onclick = () => window.print();
  const returnUrl = new URL(location.href);
  returnUrl.search = '';
  document.querySelector('#returnLink').href = returnUrl.href;
  if (printMode) {
    printTools.hidden = false;
    deck.on('pdf-ready', () => {
      document.documentElement.dataset.pdfReady = 'true';
      document.querySelector('#printStatus').textContent = params.has('notes') ? 'PDF with notes ready' : 'PDF ready';
      document.querySelector('#printButton').disabled = false;
    });
  } else if (!speakerPreview) {
    tools.classList.add('is-visible');
    setTimeout(() => tools.classList.remove('is-visible'), 6000);
  }
  await document.fonts.ready;
  await Promise.all([...document.images].map(img => img.decode().catch(() => {})));
  await deck.initialize();
  const updateTitle = () => {
    if (!printMode) document.title = `${deck.getIndices().h + 1} · ${deck.getCurrentSlide().dataset.title} · AI Adoption`;
  };
  deck.on('slidechanged', updateTitle);
  updateTitle();
})();
