(()=>{var o=class{constructor(t){if(this.element=document.querySelector(t),!this.element)throw new Error(`Element with selector "${t}" not found`);this.updateTime(),this.start()}formatTime(t){let e=l=>String(l).padStart(2,"0"),s=e(t.getHours()),i=e(t.getMinutes()),c=e(t.getSeconds());return`${s}:${i}:${c}`}updateTime(){let t=new Date;this.element.textContent=this.formatTime(t)}start(){this.interval-setInterval(()=>this.updateTime(),1e3)}stop(){clearInterval(this.interval)}};function n(){let r="start-hidden";document.querySelectorAll(`[${r}]`).forEach(e=>{e.removeAttribute(r)})}console.log("Hello World!");var d=new o(".hero_clock");n();})();
