import{i as f,r as u,x as n,a as h}from"./index-Chnr9jXW.js";const p='const r=`const e=async s=>{const a=await fetch(s);postMessage(await a.json())};onmessage=s=>{const{url:a}=s.data;e(a)};\n`,o=typeof self<"u"&&self.Blob&&new Blob(["URL.revokeObjectURL(import.meta.url);",r],{type:"text/javascript;charset=utf-8"});function m(t){let e;try{if(e=o&&(self.URL||self.webkitURL).createObjectURL(o),!e)throw"";const s=new Worker(e,{type:"module",name:t==null?void 0:t.name});return s.addEventListener("error",()=>{(self.URL||self.webkitURL).revokeObjectURL(e)}),s}catch{return new Worker("data:text/javascript;charset=utf-8,"+encodeURIComponent(r),{type:"module",name:t==null?void 0:t.name})}}const f=async()=>{var n;const e=await(await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")).json(),s=[];console.log("pokemon in the worker",e.results),(n=e==null?void 0:e.results)==null||n.map(c=>{const a=new m;a.onmessage=async l=>{s.push({...l.data}),s.length===e.results.length&&postMessage(s),a.terminate()},a.postMessage(c)})};onmessage=t=>{console.log("pokemon worker message",t.data),f()};\n',d=typeof self<"u"&&self.Blob&&new Blob(["URL.revokeObjectURL(import.meta.url);",p],{type:"text/javascript;charset=utf-8"});function k(t){let e;try{if(e=d&&(self.URL||self.webkitURL).createObjectURL(d),!e)throw"";const s=new Worker(e,{type:"module",name:t==null?void 0:t.name});return s.addEventListener("error",()=>{(self.URL||self.webkitURL).revokeObjectURL(e)}),s}catch{return new Worker("data:text/javascript;charset=utf-8,"+encodeURIComponent(p),{type:"module",name:t==null?void 0:t.name})}}const v=f`
  :host {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    justify-items: center;
    align-items: center;
  }

  .card {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
  }
  img {
    width: 5rem;
  }
`;var g=Object.defineProperty,w=(t,e,s,l)=>{for(var a=void 0,o=t.length-1,i;o>=0;o--)(i=t[o])&&(a=i(e,s,a)||a);return a&&g(e,s,a),a};const m=new k,c=class c extends u{constructor(){super(...arguments),this.pokemon=[]}connectedCallback(){super.connectedCallback(),m.onmessage=async e=>{console.log("message on main thread",e.data),this.pokemon=[...e.data].sort((s,l)=>s.id<l.id?1:0)}}firstUpdated(e){super.firstUpdated(e),m.postMessage("pokemon")}render(){return n`${this.pokemon.length?n`${this.pokemon.map(e=>n`<div class="card">
              <div class="top-section">
                <h3>#${e.id}: ${e.name}</h3>
              </div>
              <div class="image-section">
                <img
                  src="${e.sprites.other.dream_world.front_default}"
                  loading="lazy"
                  alt="${e.name}"
                />
              </div>
              <div class="body"></div>
            </div>`)}`:n`<p>Loading Pokemon...</p>`}`}};c.styles=[v];let r=c;w([h()],r.prototype,"pokemon");customElements.define("coffee-users",r);
