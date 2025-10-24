(function(){
  const track = document.getElementById('revTrack');
  const prev = document.getElementById('revPrev');
  const next = document.getElementById('revNext');
  const prevM = document.getElementById('revPrevM');
  const nextM = document.getElementById('revNextM');
  if(track){
    let index = 0, anim = false, T = 220;
    const step = () => {
      const item = track.querySelector('.carousel-item');
      if(!item) return 0;
      const gap = 16;
      return item.getBoundingClientRect().width + gap;
    };
    const move = (dir) => {
      if (anim) return;
      const total = track.querySelectorAll('.carousel-item').length;
      index = Math.max(0, Math.min(total-1, index + dir));
      track.style.transform = `translateX(${-index * step()}px)`;
      anim = true; setTimeout(()=> anim=false, T);
    };
    [prev, prevM].forEach(b=> b && b.addEventListener('click', ()=> move(-1)));
    [next, nextM].forEach(b=> b && b.addEventListener('click', ()=> move(1)));
    let startX = 0;
    track.addEventListener('touchstart', e => startX = e.touches[0].clientX, {passive:true});
    track.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) move(dx < 0 ? 1 : -1);
    }, {passive:true});
  }
  const fill = document.getElementById('stockFill');
  const text = document.getElementById('stockText');
  if(fill && text){
    let pct = 64, piezas = 27;
    setInterval(()=>{
      pct = Math.max(12, pct - Math.random()*1.2);
      piezas = Math.max(6, piezas - Math.round(Math.random()*1));
      fill.style.width = pct.toFixed(0) + '%';
      text.innerHTML = `Quedan <strong>${piezas}</strong> unidades con envío prioritario hoy.`;
    }, 9000);
  }
})();