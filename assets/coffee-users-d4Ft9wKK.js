import{i as p,r as f,x as r,a as u}from"./index-cqt80gz1.js";const m='const n=`const e=async s=>{const a=await fetch(s);postMessage(await a.json())};onmessage=s=>{const{url:a}=s.data;e(a)};\n`,o=typeof self<"u"&&self.Blob&&new Blob(["URL.revokeObjectURL(import.meta.url);",n],{type:"text/javascript;charset=utf-8"});function k(t){let e;try{if(e=o&&(self.URL||self.webkitURL).createObjectURL(o),!e)throw"";const s=new Worker(e,{type:"module",name:t==null?void 0:t.name});return s.addEventListener("error",()=>{(self.URL||self.webkitURL).revokeObjectURL(e)}),s}catch{return new Worker("data:text/javascript;charset=utf-8,"+encodeURIComponent(n),{type:"module",name:t==null?void 0:t.name})}}const p=async()=>{var r;const e=await(await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")).json(),s=[];console.log("pokemon in the worker",e.results),(r=e==null?void 0:e.results)==null||r.map(c=>{const a=new k;a.onmessage=async l=>{s.push({...l.data}),s.length===e.results.length&&postMessage(s.sort((m,f)=>m.order>f.order?0:1)),a.terminate()},a.postMessage(c)})};onmessage=t=>{console.log("pokemon worker message",t.data),p()};\n',i=typeof self<"u"&&self.Blob&&new Blob(["URL.revokeObjectURL(import.meta.url);",m],{type:"text/javascript;charset=utf-8"});function k(t){let e;try{if(e=i&&(self.URL||self.webkitURL).createObjectURL(i),!e)throw"";const s=new Worker(e,{type:"module",name:t==null?void 0:t.name});return s.addEventListener("error",()=>{(self.URL||self.webkitURL).revokeObjectURL(e)}),s}catch{return new Worker("data:text/javascript;charset=utf-8,"+encodeURIComponent(m),{type:"module",name:t==null?void 0:t.name})}}const h=p`
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
`;var v=Object.defineProperty,g=(t,e,s,w)=>{for(var a=void 0,o=t.length-1,l;o>=0;o--)(l=t[o])&&(a=l(e,s,a)||a);return a&&v(e,s,a),a};const d=new k,c=class c extends f{constructor(){super(...arguments),this.pokemon=[]}connectedCallback(){super.connectedCallback(),d.onmessage=async e=>{console.log("message on main thread",e.data),this.pokemon=[...e.data]}}firstUpdated(e){super.firstUpdated(e),d.postMessage("pokemon")}render(){return r`${this.pokemon.length?r`${this.pokemon.map(e=>r`<div class="card">
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
            </div>`)}`:r`<p>Loading Pokemon...</p>`}`}};c.styles=[h];let n=c;g([u()],n.prototype,"pokemon");customElements.define("coffee-users",n);
