var di=Object.defineProperty;var te=i=>{throw TypeError(i)};var fi=(i,e,t)=>e in i?di(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var C=(i,e,t)=>fi(i,typeof e!="symbol"?e+"":e,t),Ot=(i,e,t)=>e.has(i)||te("Cannot "+t);var v=(i,e,t)=>(Ot(i,e,"read from private field"),t?t.call(i):e.get(i)),P=(i,e,t)=>e.has(i)?te("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(i):e.set(i,t),A=(i,e,t,n)=>(Ot(i,e,"write to private field"),n?n.call(i,t):e.set(i,t),t),p=(i,e,t)=>(Ot(i,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();function pi(i){for(var e=[],t=0;t<i.length;){var n=i[t];if(n==="*"||n==="+"||n==="?"){e.push({type:"MODIFIER",index:t,value:i[t++]});continue}if(n==="\\"){e.push({type:"ESCAPED_CHAR",index:t++,value:i[t++]});continue}if(n==="{"){e.push({type:"OPEN",index:t,value:i[t++]});continue}if(n==="}"){e.push({type:"CLOSE",index:t,value:i[t++]});continue}if(n===":"){for(var r="",s=t+1;s<i.length;){var o=i.charCodeAt(s);if(o>=48&&o<=57||o>=65&&o<=90||o>=97&&o<=122||o===95){r+=i[s++];continue}break}if(!r)throw new TypeError("Missing parameter name at ".concat(t));e.push({type:"NAME",index:t,value:r}),t=s;continue}if(n==="("){var c=1,a="",s=t+1;if(i[s]==="?")throw new TypeError('Pattern cannot start with "?" at '.concat(s));for(;s<i.length;){if(i[s]==="\\"){a+=i[s++]+i[s++];continue}if(i[s]===")"){if(c--,c===0){s++;break}}else if(i[s]==="("&&(c++,i[s+1]!=="?"))throw new TypeError("Capturing groups are not allowed at ".concat(s));a+=i[s++]}if(c)throw new TypeError("Unbalanced pattern at ".concat(t));if(!a)throw new TypeError("Missing pattern at ".concat(t));e.push({type:"PATTERN",index:t,value:a}),t=s;continue}e.push({type:"CHAR",index:t,value:i[t++]})}return e.push({type:"END",index:t,value:""}),e}function qt(i,e){e===void 0&&(e={});for(var t=pi(i),n=e.prefixes,r=n===void 0?"./":n,s=e.delimiter,o=s===void 0?"/#?":s,c=[],a=0,u=0,l="",h=function(R){if(u<t.length&&t[u].type===R)return t[u++].value},f=function(R){var E=h(R);if(E!==void 0)return E;var O=t[u],Ut=O.type,ui=O.index;throw new TypeError("Unexpected ".concat(Ut," at ").concat(ui,", expected ").concat(R))},m=function(){for(var R="",E;E=h("CHAR")||h("ESCAPED_CHAR");)R+=E;return R},g=function(R){for(var E=0,O=o;E<O.length;E++){var Ut=O[E];if(R.indexOf(Ut)>-1)return!0}return!1},y=function(R){var E=c[c.length-1],O=R||(E&&typeof E=="string"?E:"");if(E&&!O)throw new TypeError('Must have text between two parameters, missing text after "'.concat(E.name,'"'));return!O||g(O)?"[^".concat(k(o),"]+?"):"(?:(?!".concat(k(O),")[^").concat(k(o),"])+?")};u<t.length;){var b=h("CHAR"),$=h("NAME"),Z=h("PATTERN");if($||Z){var S=b||"";r.indexOf(S)===-1&&(l+=S,S=""),l&&(c.push(l),l=""),c.push({name:$||a++,prefix:S,suffix:"",pattern:Z||y(S),modifier:h("MODIFIER")||""});continue}var _=b||h("ESCAPED_CHAR");if(_){l+=_;continue}l&&(c.push(l),l="");var z=h("OPEN");if(z){var S=m(),N=h("NAME")||"",st=h("PATTERN")||"",Y=m();f("CLOSE"),c.push({name:N||(st?a++:""),pattern:N&&!st?y(S):st,prefix:S,suffix:Y,modifier:h("MODIFIER")||""});continue}f("END")}return c}function Te(i,e){return Ue(qt(i,e),e)}function Ue(i,e){e===void 0&&(e={});var t=Gt(e),n=e.encode,r=n===void 0?function(a){return a}:n,s=e.validate,o=s===void 0?!0:s,c=i.map(function(a){if(typeof a=="object")return new RegExp("^(?:".concat(a.pattern,")$"),t)});return function(a){for(var u="",l=0;l<i.length;l++){var h=i[l];if(typeof h=="string"){u+=h;continue}var f=a?a[h.name]:void 0,m=h.modifier==="?"||h.modifier==="*",g=h.modifier==="*"||h.modifier==="+";if(Array.isArray(f)){if(!g)throw new TypeError('Expected "'.concat(h.name,'" to not repeat, but got an array'));if(f.length===0){if(m)continue;throw new TypeError('Expected "'.concat(h.name,'" to not be empty'))}for(var y=0;y<f.length;y++){var b=r(f[y],h);if(o&&!c[l].test(b))throw new TypeError('Expected all "'.concat(h.name,'" to match "').concat(h.pattern,'", but got "').concat(b,'"'));u+=h.prefix+b+h.suffix}continue}if(typeof f=="string"||typeof f=="number"){var b=r(String(f),h);if(o&&!c[l].test(b))throw new TypeError('Expected "'.concat(h.name,'" to match "').concat(h.pattern,'", but got "').concat(b,'"'));u+=h.prefix+b+h.suffix;continue}if(!m){var $=g?"an array":"a string";throw new TypeError('Expected "'.concat(h.name,'" to be ').concat($))}}return u}}function k(i){return i.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function Gt(i){return i&&i.sensitive?"":"i"}function mi(i,e){if(!e)return i;for(var t=/\((?:\?<(.*?)>)?(?!\?)/g,n=0,r=t.exec(i.source);r;)e.push({name:r[1]||n++,prefix:"",suffix:"",modifier:"",pattern:""}),r=t.exec(i.source);return i}function vi(i,e,t){var n=i.map(function(r){return Oe(r,e,t).source});return new RegExp("(?:".concat(n.join("|"),")"),Gt(t))}function gi(i,e,t){return _i(qt(i,t),e,t)}function _i(i,e,t){t===void 0&&(t={});for(var n=t.strict,r=n===void 0?!1:n,s=t.start,o=s===void 0?!0:s,c=t.end,a=c===void 0?!0:c,u=t.encode,l=u===void 0?function(E){return E}:u,h=t.delimiter,f=h===void 0?"/#?":h,m=t.endsWith,g=m===void 0?"":m,y="[".concat(k(g),"]|$"),b="[".concat(k(f),"]"),$=o?"^":"",Z=0,S=i;Z<S.length;Z++){var _=S[Z];if(typeof _=="string")$+=k(l(_));else{var z=k(l(_.prefix)),N=k(l(_.suffix));if(_.pattern)if(e&&e.push(_),z||N)if(_.modifier==="+"||_.modifier==="*"){var st=_.modifier==="*"?"?":"";$+="(?:".concat(z,"((?:").concat(_.pattern,")(?:").concat(N).concat(z,"(?:").concat(_.pattern,"))*)").concat(N,")").concat(st)}else $+="(?:".concat(z,"(").concat(_.pattern,")").concat(N,")").concat(_.modifier);else{if(_.modifier==="+"||_.modifier==="*")throw new TypeError('Can not repeat "'.concat(_.name,'" without a prefix and suffix'));$+="(".concat(_.pattern,")").concat(_.modifier)}else $+="(?:".concat(z).concat(N,")").concat(_.modifier)}}if(a)r||($+="".concat(b,"?")),$+=t.endsWith?"(?=".concat(y,")"):"$";else{var Y=i[i.length-1],R=typeof Y=="string"?b.indexOf(Y[Y.length-1])>-1:Y===void 0;r||($+="(?:".concat(b,"(?=").concat(y,"))?")),R||($+="(?=".concat(b,"|").concat(y,")"))}return new RegExp($,Gt(t))}function Oe(i,e,t){return i instanceof RegExp?mi(i,e):Array.isArray(i)?vi(i,e,t):gi(i,e,t)}function W(i){return typeof i=="object"&&!!i}function ut(i){return typeof i=="function"}function L(i){return typeof i=="string"}function Rt(i=[]){return Array.isArray(i)?i:[i]}function V(i){return`[Vaadin.Router] ${i}`}class Ie extends Error{constructor(t){super(V(`Page not found (${t.pathname})`));C(this,"code");C(this,"context");this.context=t,this.code=404}}const Q=Symbol("NotFoundResult");function Le(i){return new Ie(i)}function Me(i){return(Array.isArray(i)?i[0]:i)??""}function Pt(i){return Me(i==null?void 0:i.path)}function yi(i){return Array.isArray(i)&&i.length>0?i:void 0}const Ht=new Map;Ht.set("|false",{keys:[],pattern:/(?:)/u});function ee(i){try{return decodeURIComponent(i)}catch{return i}}function bi(i,e,t=!1,n=[],r){const s=`${i}|${String(t)}`,o=Me(e);let c=Ht.get(s);if(!c){const l=[];c={keys:l,pattern:Oe(i,l,{end:t,strict:i===""})},Ht.set(s,c)}const a=c.pattern.exec(o);if(!a)return null;const u={...r};for(let l=1;l<a.length;l++){const h=c.keys[l-1],f=h.name,m=a[l];(m!==void 0||!Object.hasOwn(u,f))&&(h.modifier==="+"||h.modifier==="*"?u[f]=m?m.split(/[/?#]/u).map(ee):[]:u[f]=m&&ee(m))}return{keys:[...n,...c.keys],params:u,path:a[0]}}var $i=bi;function Ne(i,e,t,n,r){let s,o,c=0,a=Pt(i);return a.startsWith("/")&&(t&&(a=a.substring(1)),t=!0),{next(u){if(i===u)return{done:!0,value:void 0};i.__children??(i.__children=yi(i.children));const l=i.__children??[],h=!i.__children&&!i.children;if(!s&&(s=$i(a,e,h,n,r),s))return{value:{keys:s.keys,params:s.params,path:s.path,route:i}};if(s&&l.length>0)for(;c<l.length;){if(!o){const m=l[c];m.parent=i;let g=s.path.length;g>0&&e.charAt(g)==="/"&&(g+=1),o=Ne(m,e.substring(g),t,s.keys,s.params)}const f=o.next(u);if(!f.done)return{done:!1,value:f.value};o=null,c+=1}return{done:!0,value:void 0}}}}var wi=Ne;function Ei(i){if(ut(i.route.action))return i.route.action(i)}function Ai(i,e){let t=i;for(;t;)if(t=t.parent,t===e)return!0;return!1}function xi(i){return!!i&&typeof i=="object"&&"next"in i&&"params"in i&&"result"in i&&"route"in i}class Ri extends Error{constructor(t,n){let r=`Path '${t.pathname}' is not properly resolved due to an error.`;const s=Pt(t.route);s&&(r+=` Resolution had failed on route: '${s}'`);super(r,n);C(this,"code");C(this,"context");this.code=n==null?void 0:n.code,this.context=t}warn(){console.warn(this.message)}}function Pi(i,e){var r;const{path:t,route:n}=e;if(n&&!n.__synthetic){const s={path:t,route:n};if(n.parent&&i.chain)for(let o=i.chain.length-1;o>=0&&i.chain[o].route!==n.parent;o--)i.chain.pop();(r=i.chain)==null||r.push(s)}}var G,x;class He{constructor(e,{baseUrl:t="",context:n,errorHandler:r,resolveRoute:s=Ei}={}){C(this,"baseUrl");P(this,G);C(this,"errorHandler");C(this,"resolveRoute");P(this,x);if(Object(e)!==e)throw new TypeError("Invalid routes");this.baseUrl=t,this.errorHandler=r,this.resolveRoute=s,Array.isArray(e)?A(this,x,{__children:e,__synthetic:!0,action:()=>{},path:""}):A(this,x,{...e,parent:void 0}),A(this,G,{...n,hash:"",async next(){return Q},params:{},pathname:"",resolver:this,route:v(this,x),search:"",chain:[]})}get root(){return v(this,x)}get context(){return v(this,G)}get __effectiveBaseUrl(){return this.baseUrl?new URL(this.baseUrl,document.baseURI||document.URL).href.replace(/[^/]*$/u,""):""}getRoutes(){return[...v(this,x).__children??[]]}removeRoutes(){v(this,x).__children=[]}async resolve(e){const t=this,n={...v(this,G),...L(e)?{pathname:e}:e,next:u},r=wi(v(this,x),this.__normalizePathname(n.pathname)??n.pathname,!!this.baseUrl),s=this.resolveRoute;let o=null,c=null,a=n;async function u(l=!1,h=(m=>(m=o==null?void 0:o.value)==null?void 0:m.route)(),f){var b,$;const g=f===null?(b=o==null?void 0:o.value)==null?void 0:b.route:void 0;if(o=c??r.next(g),c=null,!l&&(o.done||!Ai(o.value.route,h)))return c=o,Q;if(o.done)throw Le(n);a={...n,params:o.value.params,route:o.value.route,chain:($=a.chain)==null?void 0:$.slice()},Pi(a,o.value);const y=await s(a);return y!=null&&y!==Q?(a.result=xi(y)?y.result:y,A(t,G,a),a):await u(l,h,y)}try{return await u(!0,v(this,x))}catch(l){const h=l instanceof Ie?l:new Ri(a,{code:500,cause:l});if(this.errorHandler)return a.result=this.errorHandler(h),a;throw l}}setRoutes(e){v(this,x).__children=[...Rt(e)]}__normalizePathname(e){if(!this.baseUrl)return e;const t=this.__effectiveBaseUrl,n=e.startsWith("/")?new URL(t).origin+e:`./${e}`,r=new URL(n,t).href;if(r.startsWith(t))return r.slice(t.length)}addRoutes(e){return v(this,x).__children=[...v(this,x).__children??[],...Rt(e)],this.getRoutes()}}G=new WeakMap,x=new WeakMap;function ke(i,e,t,n){var s;const r=e.name??(n==null?void 0:n(e));if(r&&(i.has(r)?(s=i.get(r))==null||s.push(e):i.set(r,[e])),Array.isArray(t))for(const o of t)o.parent=e,ke(i,o,o.__children??o.children,n)}function ie(i,e){const t=i.get(e);if(t){if(t.length>1)throw new Error(`Duplicate route with name "${e}". Try seting unique 'name' route properties.`);return t[0]}}function Si(i,e={}){if(!(i instanceof He))throw new TypeError("An instance of Resolver is expected");const t=new Map,n=new Map;return(r,s)=>{let o=ie(n,r);if(!o&&(n.clear(),ke(n,i.root,i.root.__children,e.cacheKeyProvider),o=ie(n,r),!o))throw new Error(`Route "${r}" not found`);let c=o.fullPath?t.get(o.fullPath):void 0;if(!c){let l=Pt(o),h=o.parent;for(;h;){const g=Pt(h);g&&(l=`${g.replace(/\/$/u,"")}/${l.replace(/^\//u,"")}`),h=h.parent}const f=qt(l),m=Object.create(null);for(const g of f)L(g)||(m[g.name]=!0);c={keys:m,tokens:f},t.set(l,c),o.fullPath=l}let u=Ue(c.tokens,{encode:encodeURIComponent,...e})(s)||"/";if(e.stringifyQueryParams&&s){const l={};for(const[f,m]of Object.entries(s))!(f in c.keys)&&m&&(l[f]=m);const h=e.stringifyQueryParams(l);h&&(u+=h.startsWith("?")?h:`?${h}`)}return u}}var Ci=Si;const Ti=/\/\*[\*!]\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i,yt=window.Vaadin&&window.Vaadin.Flow&&window.Vaadin.Flow.clients;function Ui(){function i(){return!0}return De(i)}function Oi(){try{return Ii()?!0:Li()?yt?!Mi():!Ui():!1}catch{return!1}}function Ii(){return localStorage.getItem("vaadin.developmentmode.force")}function Li(){return["localhost","127.0.0.1"].indexOf(window.location.hostname)>=0}function Mi(){return!!(yt&&Object.keys(yt).map(e=>yt[e]).filter(e=>e.productionMode).length>0)}function De(i,e){if(typeof i!="function")return;const t=Ti.exec(i.toString());if(t)try{i=new Function(t[1])}catch(n){console.log("vaadin-development-mode-detector: uncommentAndRun() failed",n)}return i(e)}window.Vaadin=window.Vaadin||{};const ne=function(i,e){if(window.Vaadin.developmentMode)return De(i,e)};window.Vaadin.developmentMode===void 0&&(window.Vaadin.developmentMode=Oi());function Ni(){/*! vaadin-dev-mode:start
  (function () {
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var getPolymerVersion = function getPolymerVersion() {
  return window.Polymer && window.Polymer.version;
};

var StatisticsGatherer = function () {
  function StatisticsGatherer(logger) {
    classCallCheck(this, StatisticsGatherer);

    this.now = new Date().getTime();
    this.logger = logger;
  }

  createClass(StatisticsGatherer, [{
    key: 'frameworkVersionDetectors',
    value: function frameworkVersionDetectors() {
      return {
        'Flow': function Flow() {
          if (window.Vaadin && window.Vaadin.Flow && window.Vaadin.Flow.clients) {
            var flowVersions = Object.keys(window.Vaadin.Flow.clients).map(function (key) {
              return window.Vaadin.Flow.clients[key];
            }).filter(function (client) {
              return client.getVersionInfo;
            }).map(function (client) {
              return client.getVersionInfo().flow;
            });
            if (flowVersions.length > 0) {
              return flowVersions[0];
            }
          }
        },
        'Vaadin Framework': function VaadinFramework() {
          if (window.vaadin && window.vaadin.clients) {
            var frameworkVersions = Object.values(window.vaadin.clients).filter(function (client) {
              return client.getVersionInfo;
            }).map(function (client) {
              return client.getVersionInfo().vaadinVersion;
            });
            if (frameworkVersions.length > 0) {
              return frameworkVersions[0];
            }
          }
        },
        'AngularJs': function AngularJs() {
          if (window.angular && window.angular.version && window.angular.version) {
            return window.angular.version.full;
          }
        },
        'Angular': function Angular() {
          if (window.ng) {
            var tags = document.querySelectorAll("[ng-version]");
            if (tags.length > 0) {
              return tags[0].getAttribute("ng-version");
            }
            return "Unknown";
          }
        },
        'Backbone.js': function BackboneJs() {
          if (window.Backbone) {
            return window.Backbone.VERSION;
          }
        },
        'React': function React() {
          var reactSelector = '[data-reactroot], [data-reactid]';
          if (!!document.querySelector(reactSelector)) {
            // React does not publish the version by default
            return "unknown";
          }
        },
        'Ember': function Ember() {
          if (window.Em && window.Em.VERSION) {
            return window.Em.VERSION;
          } else if (window.Ember && window.Ember.VERSION) {
            return window.Ember.VERSION;
          }
        },
        'jQuery': function (_jQuery) {
          function jQuery() {
            return _jQuery.apply(this, arguments);
          }

          jQuery.toString = function () {
            return _jQuery.toString();
          };

          return jQuery;
        }(function () {
          if (typeof jQuery === 'function' && jQuery.prototype.jquery !== undefined) {
            return jQuery.prototype.jquery;
          }
        }),
        'Polymer': function Polymer() {
          var version = getPolymerVersion();
          if (version) {
            return version;
          }
        },
        'LitElement': function LitElement() {
          var version = window.litElementVersions && window.litElementVersions[0];
          if (version) {
            return version;
          }
        },
        'LitHtml': function LitHtml() {
          var version = window.litHtmlVersions && window.litHtmlVersions[0];
          if (version) {
            return version;
          }
        },
        'Vue.js': function VueJs() {
          if (window.Vue) {
            return window.Vue.version;
          }
        }
      };
    }
  }, {
    key: 'getUsedVaadinElements',
    value: function getUsedVaadinElements(elements) {
      var version = getPolymerVersion();
      var elementClasses = void 0;
      // NOTE: In case you edit the code here, YOU MUST UPDATE any statistics reporting code in Flow.
      // Check all locations calling the method getEntries() in
      // https://github.com/vaadin/flow/blob/master/flow-server/src/main/java/com/vaadin/flow/internal/UsageStatistics.java#L106
      // Currently it is only used by BootstrapHandler.
      if (version && version.indexOf('2') === 0) {
        // Polymer 2: components classes are stored in window.Vaadin
        elementClasses = Object.keys(window.Vaadin).map(function (c) {
          return window.Vaadin[c];
        }).filter(function (c) {
          return c.is;
        });
      } else {
        // Polymer 3: components classes are stored in window.Vaadin.registrations
        elementClasses = window.Vaadin.registrations || [];
      }
      elementClasses.forEach(function (klass) {
        var version = klass.version ? klass.version : "0.0.0";
        elements[klass.is] = { version: version };
      });
    }
  }, {
    key: 'getUsedVaadinThemes',
    value: function getUsedVaadinThemes(themes) {
      ['Lumo', 'Material'].forEach(function (themeName) {
        var theme;
        var version = getPolymerVersion();
        if (version && version.indexOf('2') === 0) {
          // Polymer 2: themes are stored in window.Vaadin
          theme = window.Vaadin[themeName];
        } else {
          // Polymer 3: themes are stored in custom element registry
          theme = customElements.get('vaadin-' + themeName.toLowerCase() + '-styles');
        }
        if (theme && theme.version) {
          themes[themeName] = { version: theme.version };
        }
      });
    }
  }, {
    key: 'getFrameworks',
    value: function getFrameworks(frameworks) {
      var detectors = this.frameworkVersionDetectors();
      Object.keys(detectors).forEach(function (framework) {
        var detector = detectors[framework];
        try {
          var version = detector();
          if (version) {
            frameworks[framework] = { version: version };
          }
        } catch (e) {}
      });
    }
  }, {
    key: 'gather',
    value: function gather(storage) {
      var storedStats = storage.read();
      var gatheredStats = {};
      var types = ["elements", "frameworks", "themes"];

      types.forEach(function (type) {
        gatheredStats[type] = {};
        if (!storedStats[type]) {
          storedStats[type] = {};
        }
      });

      var previousStats = JSON.stringify(storedStats);

      this.getUsedVaadinElements(gatheredStats.elements);
      this.getFrameworks(gatheredStats.frameworks);
      this.getUsedVaadinThemes(gatheredStats.themes);

      var now = this.now;
      types.forEach(function (type) {
        var keys = Object.keys(gatheredStats[type]);
        keys.forEach(function (key) {
          if (!storedStats[type][key] || _typeof(storedStats[type][key]) != _typeof({})) {
            storedStats[type][key] = { firstUsed: now };
          }
          // Discards any previously logged version number
          storedStats[type][key].version = gatheredStats[type][key].version;
          storedStats[type][key].lastUsed = now;
        });
      });

      var newStats = JSON.stringify(storedStats);
      storage.write(newStats);
      if (newStats != previousStats && Object.keys(storedStats).length > 0) {
        this.logger.debug("New stats: " + newStats);
      }
    }
  }]);
  return StatisticsGatherer;
}();

var StatisticsStorage = function () {
  function StatisticsStorage(key) {
    classCallCheck(this, StatisticsStorage);

    this.key = key;
  }

  createClass(StatisticsStorage, [{
    key: 'read',
    value: function read() {
      var localStorageStatsString = localStorage.getItem(this.key);
      try {
        return JSON.parse(localStorageStatsString ? localStorageStatsString : '{}');
      } catch (e) {
        return {};
      }
    }
  }, {
    key: 'write',
    value: function write(data) {
      localStorage.setItem(this.key, data);
    }
  }, {
    key: 'clear',
    value: function clear() {
      localStorage.removeItem(this.key);
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      var storedStats = this.read();
      var empty = true;
      Object.keys(storedStats).forEach(function (key) {
        if (Object.keys(storedStats[key]).length > 0) {
          empty = false;
        }
      });

      return empty;
    }
  }]);
  return StatisticsStorage;
}();

var StatisticsSender = function () {
  function StatisticsSender(url, logger) {
    classCallCheck(this, StatisticsSender);

    this.url = url;
    this.logger = logger;
  }

  createClass(StatisticsSender, [{
    key: 'send',
    value: function send(data, errorHandler) {
      var logger = this.logger;

      if (navigator.onLine === false) {
        logger.debug("Offline, can't send");
        errorHandler();
        return;
      }
      logger.debug("Sending data to " + this.url);

      var req = new XMLHttpRequest();
      req.withCredentials = true;
      req.addEventListener("load", function () {
        // Stats sent, nothing more to do
        logger.debug("Response: " + req.responseText);
      });
      req.addEventListener("error", function () {
        logger.debug("Send failed");
        errorHandler();
      });
      req.addEventListener("abort", function () {
        logger.debug("Send aborted");
        errorHandler();
      });
      req.open("POST", this.url);
      req.setRequestHeader("Content-Type", "application/json");
      req.send(data);
    }
  }]);
  return StatisticsSender;
}();

var StatisticsLogger = function () {
  function StatisticsLogger(id) {
    classCallCheck(this, StatisticsLogger);

    this.id = id;
  }

  createClass(StatisticsLogger, [{
    key: '_isDebug',
    value: function _isDebug() {
      return localStorage.getItem("vaadin." + this.id + ".debug");
    }
  }, {
    key: 'debug',
    value: function debug(msg) {
      if (this._isDebug()) {
        console.info(this.id + ": " + msg);
      }
    }
  }]);
  return StatisticsLogger;
}();

var UsageStatistics = function () {
  function UsageStatistics() {
    classCallCheck(this, UsageStatistics);

    this.now = new Date();
    this.timeNow = this.now.getTime();
    this.gatherDelay = 10; // Delay between loading this file and gathering stats
    this.initialDelay = 24 * 60 * 60;

    this.logger = new StatisticsLogger("statistics");
    this.storage = new StatisticsStorage("vaadin.statistics.basket");
    this.gatherer = new StatisticsGatherer(this.logger);
    this.sender = new StatisticsSender("https://tools.vaadin.com/usage-stats/submit", this.logger);
  }

  createClass(UsageStatistics, [{
    key: 'maybeGatherAndSend',
    value: function maybeGatherAndSend() {
      var _this = this;

      if (localStorage.getItem(UsageStatistics.optOutKey)) {
        return;
      }
      this.gatherer.gather(this.storage);
      setTimeout(function () {
        _this.maybeSend();
      }, this.gatherDelay * 1000);
    }
  }, {
    key: 'lottery',
    value: function lottery() {
      return true;
    }
  }, {
    key: 'currentMonth',
    value: function currentMonth() {
      return this.now.getYear() * 12 + this.now.getMonth();
    }
  }, {
    key: 'maybeSend',
    value: function maybeSend() {
      var firstUse = Number(localStorage.getItem(UsageStatistics.firstUseKey));
      var monthProcessed = Number(localStorage.getItem(UsageStatistics.monthProcessedKey));

      if (!firstUse) {
        // Use a grace period to avoid interfering with tests, incognito mode etc
        firstUse = this.timeNow;
        localStorage.setItem(UsageStatistics.firstUseKey, firstUse);
      }

      if (this.timeNow < firstUse + this.initialDelay * 1000) {
        this.logger.debug("No statistics will be sent until the initial delay of " + this.initialDelay + "s has passed");
        return;
      }
      if (this.currentMonth() <= monthProcessed) {
        this.logger.debug("This month has already been processed");
        return;
      }
      localStorage.setItem(UsageStatistics.monthProcessedKey, this.currentMonth());
      // Use random sampling
      if (this.lottery()) {
        this.logger.debug("Congratulations, we have a winner!");
      } else {
        this.logger.debug("Sorry, no stats from you this time");
        return;
      }

      this.send();
    }
  }, {
    key: 'send',
    value: function send() {
      // Ensure we have the latest data
      this.gatherer.gather(this.storage);

      // Read, send and clean up
      var data = this.storage.read();
      data["firstUse"] = Number(localStorage.getItem(UsageStatistics.firstUseKey));
      data["usageStatisticsVersion"] = UsageStatistics.version;
      var info = 'This request contains usage statistics gathered from the application running in development mode. \n\nStatistics gathering is automatically disabled and excluded from production builds.\n\nFor details and to opt-out, see https://github.com/vaadin/vaadin-usage-statistics.\n\n\n\n';
      var self = this;
      this.sender.send(info + JSON.stringify(data), function () {
        // Revert the 'month processed' flag
        localStorage.setItem(UsageStatistics.monthProcessedKey, self.currentMonth() - 1);
      });
    }
  }], [{
    key: 'version',
    get: function get$1() {
      return '2.1.2';
    }
  }, {
    key: 'firstUseKey',
    get: function get$1() {
      return 'vaadin.statistics.firstuse';
    }
  }, {
    key: 'monthProcessedKey',
    get: function get$1() {
      return 'vaadin.statistics.monthProcessed';
    }
  }, {
    key: 'optOutKey',
    get: function get$1() {
      return 'vaadin.statistics.optout';
    }
  }]);
  return UsageStatistics;
}();

try {
  window.Vaadin = window.Vaadin || {};
  window.Vaadin.usageStatsChecker = window.Vaadin.usageStatsChecker || new UsageStatistics();
  window.Vaadin.usageStatsChecker.maybeGatherAndSend();
} catch (e) {
  // Intentionally ignored as this is not a problem in the app being developed
}

}());

  vaadin-dev-mode:end **/}const Hi=function(){if(typeof ne=="function")return ne(Ni)};function ki(i,e=window.Vaadin??(window.Vaadin={})){e.registrations??(e.registrations=[]),e.registrations.push({is:"@vaadin/router",version:"2.0.0"})}ki();Hi();const Di=i=>{const e=getComputedStyle(i).getPropertyValue("animation-name");return e&&e!=="none"},Fi=(i,e)=>{const t=()=>{i.removeEventListener("animationend",t),e()};i.addEventListener("animationend",t)};async function Vi(i,e){return i.classList.add(e),await new Promise(t=>{if(Di(i)){const n=i.getBoundingClientRect(),r=`height: ${n.bottom-n.top}px; width: ${n.right-n.left}px`;i.setAttribute("style",`position: absolute; ${r}`),Fi(i,()=>{i.classList.remove(e),i.removeAttribute("style"),t()})}else i.classList.remove(e),t()})}var re=Vi;function Fe(i){if(!i||!L(i.path))throw new Error(V('Expected route config to be an object with a "path" string property, or an array of such objects'));if(!ut(i.action)&&!Array.isArray(i.children)&&!ut(i.children)&&!L(i.component)&&!L(i.redirect))throw new Error(V(`Expected route config "${i.path}" to include either "component, redirect" or "action" function but none found.`));i.redirect&&["bundle","component"].forEach(e=>{e in i&&console.warn(V(`Route config "${String(i.path)}" has both "redirect" and "${e}" properties, and "redirect" will always override the latter. Did you mean to only use "${e}"?`))})}function se(i){Rt(i).forEach(e=>Fe(e))}function ji({next:i,...e}){return e}function bt(i,e){const t=e.__effectiveBaseUrl;return t?new URL(i.replace(/^\//u,""),t).pathname:i}function Ve(i){return i.map(e=>e.path).reduce((e,t)=>t.length?`${e.replace(/\/$/u,"")}/${t.replace(/^\//u,"")}`:e,"")}function zi(i){return Ve(i.map(e=>e.route))}function T({chain:i=[],hash:e="",params:t={},pathname:n="",redirectFrom:r,resolver:s,search:o=""},c){const a=i.map(u=>u.route);return{baseUrl:(s==null?void 0:s.baseUrl)??"",getUrl:(u={})=>s?bt(Te(zi(i))({...t,...u}),s):"",hash:e,params:t,pathname:n,redirectFrom:r,route:c??(Array.isArray(a)?a.at(-1):void 0)??null,routes:a,search:o,searchParams:new URLSearchParams(o)}}function oe(i,e){const t={...i.params};return{redirect:{from:i.pathname,params:t,pathname:e}}}function Bi(i,e){if(e.location=T(i),i.chain){const t=i.chain.map(n=>n.route).indexOf(i.route);i.chain[t].element=e}return e}function $t(i,e,...t){if(typeof i=="function")return i.apply(e,t)}function ae(i,e,...t){return n=>n&&W(n)&&("cancel"in n||"redirect"in n)?n:$t(e==null?void 0:e[i],e,...t)}function Wi(i,e){if(!Array.isArray(i)&&!W(i))throw new Error(V(`Incorrect "children" value for the route ${String(e.path)}: expected array or object, but got ${String(i)}`));const t=Rt(i);t.forEach(n=>Fe(n)),e.__children=t}function ct(i,e){return!window.dispatchEvent(new CustomEvent(`vaadin-router-${i}`,{cancelable:i==="go",detail:e}))}function qi(i){if(typeof i!="object")return String(i);const[e="Unknown"]=/ (.*)\]$/u.exec(String(i))??[];return e==="Object"||e==="Array"?`${e} ${JSON.stringify(i)}`:e}function Gi(i){const{port:e,protocol:t}=i,s=t==="http:"&&e==="80"||t==="https:"&&e==="443"?i.hostname:i.host;return`${t}//${s}`}function ce(i){if(i instanceof Element)return i.nodeName.toLowerCase()}function he(i){if(i.defaultPrevented||i.button!==0||i.shiftKey||i.ctrlKey||i.altKey||i.metaKey)return;let e=i.target;const t=i instanceof MouseEvent?i.composedPath():i.path??[];for(let a=0;a<t.length;a++){const u=t[a];if("nodeName"in u&&u.nodeName.toLowerCase()==="a"){e=u;break}}for(;e&&e instanceof Node&&ce(e)!=="a";)e=e.parentNode;if(!e||ce(e)!=="a")return;const n=e;if(n.target&&n.target.toLowerCase()!=="_self"||n.hasAttribute("download")||n.hasAttribute("router-ignore")||n.pathname===window.location.pathname&&n.hash!==""||(n.origin||Gi(n))!==window.location.origin)return;const{hash:s,pathname:o,search:c}=n;ct("go",{hash:s,pathname:o,search:c})&&i instanceof MouseEvent&&(i.preventDefault(),i.type==="click"&&window.scrollTo(0,0))}const Ki={activate(){window.document.addEventListener("click",he)},inactivate(){window.document.removeEventListener("click",he)}};var Ji=Ki;function le(i){if(i.state==="vaadin-router-ignore")return;const{hash:e,pathname:t,search:n}=window.location;ct("go",{hash:e,pathname:t,search:n})}const Qi={activate(){window.addEventListener("popstate",le)},inactivate(){window.removeEventListener("popstate",le)}};var Xi=Qi;let ue=[];const Zi={CLICK:Ji,POPSTATE:Xi};function de(i=[]){ue.forEach(e=>e.inactivate()),i.forEach(e=>e.activate()),ue=i}const Yi=256;function ot(){return{cancel:!0}}const fe={__renderId:-1,params:{},route:{__synthetic:!0,children:[],path:"",action(){}},pathname:"",async next(){return Q}};var vt,it,gt,K,F,J,I,U,d,ze,Be,wt,kt,We,qe,Dt,Ft,Vt,H,jt,zt,Et,Bt,Ge,Ke,Je,Qe,Xe,Ze,Wt;class je extends He{constructor(t,n){const r=document.head.querySelector("base"),s=r==null?void 0:r.getAttribute("href");super([],{baseUrl:s?new URL(s,document.URL).href.replace(/[^/]*$/u,""):void 0,...n,resolveRoute:async o=>await p(this,d,ze).call(this,o)});P(this,d);C(this,"location",T({resolver:this}));C(this,"ready",Promise.resolve(this.location));P(this,vt,new WeakSet);P(this,it,new WeakSet);P(this,gt,p(this,d,Wt).bind(this));P(this,K,0);P(this,F);C(this,"__previousContext");P(this,J);P(this,I,null);P(this,U,null);de(Object.values(Zi)),this.setOutlet(t),this.subscribe()}setOutlet(t){t&&p(this,d,zt).call(this,t),A(this,F,t)}getOutlet(){return v(this,F)}async setRoutes(t,n=!1){return this.__previousContext=void 0,A(this,J,void 0),se(t),super.setRoutes(t),n||p(this,d,Wt).call(this),await this.ready}addRoutes(t){return se(t),super.addRoutes(t)}async render(t,n=!1){A(this,K,v(this,K)+1);const r=v(this,K),s={...fe,...L(t)?{hash:"",search:"",pathname:t}:t,__renderId:r};return this.ready=p(this,d,Be).call(this,s,n),await this.ready}subscribe(){window.addEventListener("vaadin-router-go",v(this,gt))}unsubscribe(){window.removeEventListener("vaadin-router-go",v(this,gt))}static setTriggers(...t){de(t)}urlForName(t,n){return v(this,J)||A(this,J,Ci(this,{cacheKeyProvider(r){return"component"in r&&typeof r.component=="string"?r.component:void 0}})),bt(v(this,J).call(this,t,n??void 0),this)}urlForPath(t,n){return bt(Te(t)(n??void 0),this)}static go(t){const{pathname:n,search:r,hash:s}=L(t)?new URL(t,"http://a"):t;return ct("go",{pathname:n,search:r,hash:s})}}vt=new WeakMap,it=new WeakMap,gt=new WeakMap,K=new WeakMap,F=new WeakMap,J=new WeakMap,I=new WeakMap,U=new WeakMap,d=new WeakSet,ze=async function(t){const{route:n}=t;if(ut(n.children)){let s=await n.children(ji(t));ut(n.children)||({children:s}=n),Wi(s,n)}const r={component:s=>{const o=document.createElement(s);return v(this,it).add(o),o},prevent:ot,redirect:s=>oe(t,s)};return await Promise.resolve().then(async()=>{if(p(this,d,H).call(this,t))return await $t(n.action,n,t,r)}).then(s=>{if(s!=null&&(typeof s=="object"||typeof s=="symbol")&&(s instanceof HTMLElement||s===Q||W(s)&&"redirect"in s))return s;if(L(n.redirect))return r.redirect(n.redirect)}).then(s=>{if(s!=null)return s;if(L(n.component))return r.component(n.component)})},Be=async function(t,n){var s;const{__renderId:r}=t;try{const o=await this.resolve(t),c=await p(this,d,wt).call(this,o);if(!p(this,d,H).call(this,c))return this.location;const a=this.__previousContext;if(c===a)return p(this,d,Et).call(this,a,!0),this.location;if(this.location=T(c),n&&p(this,d,Et).call(this,c,r===1),ct("location-changed",{router:this,location:this.location}),c.__skipAttach)return p(this,d,Bt).call(this,c,a),this.__previousContext=c,this.location;p(this,d,Ge).call(this,c,a);const u=p(this,d,Ze).call(this,c);if(p(this,d,Xe).call(this,c),p(this,d,Qe).call(this,c,a),await u,p(this,d,H).call(this,c))return p(this,d,Ke).call(this),this.__previousContext=c,this.location}catch(o){if(r===v(this,K)){n&&p(this,d,Et).call(this,this.context);for(const c of((s=v(this,F))==null?void 0:s.children)??[])c.remove();throw this.location=T(Object.assign(t,{resolver:this})),ct("error",{router:this,error:o,...t}),o}}return this.location},wt=async function(t,n=t){const r=await p(this,d,kt).call(this,n),o=r!==n?r:t,a=bt(Ve(r.chain??[]),this)===r.pathname,u=async(h,f=h.route,m)=>{const g=await h.next(!1,f,m);return g===null||g===Q?a?h:f.parent!=null?await u(h,f.parent,g):g:g},l=await u(r);if(l==null||l===Q)throw Le(o);return l!==r?await p(this,d,wt).call(this,o,l):await p(this,d,We).call(this,r)},kt=async function(t){const{result:n}=t;if(n instanceof HTMLElement)return Bi(t,n),t;if(n&&"redirect"in n){const r=await p(this,d,jt).call(this,n.redirect,t.__redirectCount,t.__renderId);return await p(this,d,kt).call(this,r)}throw n instanceof Error?n:new Error(V(`Invalid route resolution result for path "${t.pathname}". Expected redirect object or HTML element, but got: "${qi(n)}". Double check the action return value for the route.`))},We=async function(t){return await p(this,d,qe).call(this,t).then(async n=>n===this.__previousContext||n===t?n:await p(this,d,wt).call(this,n))},qe=async function(t){const n=this.__previousContext??{},r=n.chain??[],s=t.chain??[];let o=Promise.resolve(void 0);const c=a=>oe(t,a);if(t.__divergedChainIndex=0,t.__skipAttach=!1,r.length){for(let a=0;a<Math.min(r.length,s.length)&&!(r[a].route!==s[a].route||r[a].path!==s[a].path&&r[a].element!==s[a].element||!p(this,d,Vt).call(this,r[a].element,s[a].element));t.__divergedChainIndex++,a++);if(t.__skipAttach=s.length===r.length&&t.__divergedChainIndex===s.length&&p(this,d,Vt).call(this,t.result,n.result),t.__skipAttach){for(let a=s.length-1;a>=0;a--)o=p(this,d,Dt).call(this,o,t,{prevent:ot},r[a]);for(let a=0;a<s.length;a++)o=p(this,d,Ft).call(this,o,t,{prevent:ot,redirect:c},s[a]),r[a].element.location=T(t,r[a].route)}else for(let a=r.length-1;a>=t.__divergedChainIndex;a--)o=p(this,d,Dt).call(this,o,t,{prevent:ot},r[a])}if(!t.__skipAttach)for(let a=0;a<s.length;a++)a<t.__divergedChainIndex?a<r.length&&r[a].element&&(r[a].element.location=T(t,r[a].route)):(o=p(this,d,Ft).call(this,o,t,{prevent:ot,redirect:c},s[a]),s[a].element&&(s[a].element.location=T(t,s[a].route)));return await o.then(async a=>{if(a&&W(a)){if("cancel"in a&&this.__previousContext)return this.__previousContext.__renderId=t.__renderId,this.__previousContext;if("redirect"in a)return await p(this,d,jt).call(this,a.redirect,t.__redirectCount,t.__renderId)}return t})},Dt=async function(t,n,r,s){const o=T(n);let c=await t;if(p(this,d,H).call(this,n)&&(c=ae("onBeforeLeave",s.element,o,r,this)(c)),!(W(c)&&"redirect"in c))return c},Ft=async function(t,n,r,s){const o=T(n,s.route),c=await t;if(p(this,d,H).call(this,n))return ae("onBeforeEnter",s.element,o,r,this)(c)},Vt=function(t,n){return t instanceof Element&&n instanceof Element?v(this,it).has(t)&&v(this,it).has(n)?t.localName===n.localName:t===n:!1},H=function(t){return t.__renderId===v(this,K)},jt=async function(t,n=0,r=0){if(n>Yi)throw new Error(V(`Too many redirects when rendering ${t.from}`));return await this.resolve({...fe,pathname:this.urlForPath(t.pathname,t.params),redirectFrom:t.from,__redirectCount:n+1,__renderId:r})},zt=function(t=v(this,F)){if(!(t instanceof Element||t instanceof DocumentFragment))throw new TypeError(V(`Expected router outlet to be a valid DOM Element | DocumentFragment (but got ${t})`))},Et=function({pathname:t,search:n="",hash:r=""},s){if(window.location.pathname!==t||window.location.search!==n||window.location.hash!==r){const o=s?"replaceState":"pushState";window.history[o](null,document.title,t+n+r),window.dispatchEvent(new PopStateEvent("popstate",{state:"vaadin-router-ignore"}))}},Bt=function(t,n){var s;let r=v(this,F);for(let o=0;o<(t.__divergedChainIndex??0);o++){const c=(s=n==null?void 0:n.chain)==null?void 0:s[o].element;if(c)if(c.parentNode===r)t.chain[o].element=c,r=c;else break}return r},Ge=function(t,n){var o;p(this,d,zt).call(this),p(this,d,Je).call(this);const r=p(this,d,Bt).call(this,t,n);A(this,I,[]),A(this,U,Array.from((r==null?void 0:r.children)??[]).filter(c=>v(this,vt).has(c)&&c!==t.result));let s=r;for(let c=t.__divergedChainIndex??0;c<(((o=t.chain)==null?void 0:o.length)??0);c++){const a=t.chain[c].element;a&&(s==null||s.appendChild(a),v(this,vt).add(a),s===r&&v(this,I).push(a),s=a)}},Ke=function(){if(v(this,U))for(const t of v(this,U))t.remove();A(this,U,null),A(this,I,null)},Je=function(){if(v(this,U)&&v(this,I)){for(const t of v(this,I))t.remove();A(this,U,null),A(this,I,null)}},Qe=function(t,n){var r;if(!(!(n!=null&&n.chain)||t.__divergedChainIndex==null))for(let s=n.chain.length-1;s>=t.__divergedChainIndex&&p(this,d,H).call(this,t);s--){const o=n.chain[s].element;if(o)try{const c=T(t);$t(o.onAfterLeave,o,c,{},this)}finally{if((r=v(this,U))!=null&&r.includes(o))for(const c of o.children)c.remove()}}},Xe=function(t){if(!(!t.chain||t.__divergedChainIndex==null))for(let n=t.__divergedChainIndex;n<t.chain.length&&p(this,d,H).call(this,t);n++){const r=t.chain[n].element;if(r){const s=T(t,t.chain[n].route);$t(r.onAfterEnter,r,s,{},this)}}},Ze=async function(t){var a,u;const n=(a=v(this,U))==null?void 0:a[0],r=(u=v(this,I))==null?void 0:u[0],s=[],{chain:o=[]}=t;let c;for(let l=o.length-1;l>=0;l--)if(o[l].route.animate){c=o[l].route.animate;break}if(n&&r&&c){const l=W(c)&&c.leave?c.leave:"leaving",h=W(c)&&c.enter?c.enter:"entering";s.push(re(n,l)),s.push(re(r,h))}return await Promise.all(s),t},Wt=function(t){const{pathname:n,search:r,hash:s}=t instanceof CustomEvent?t.detail:window.location;L(this.__normalizePathname(n))&&(t!=null&&t.preventDefault&&t.preventDefault(),this.render({pathname:n,search:r,hash:s},!0))};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const At=globalThis,Kt=At.ShadowRoot&&(At.ShadyCSS===void 0||At.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Jt=Symbol(),pe=new WeakMap;let Ye=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==Jt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(Kt&&e===void 0){const n=t!==void 0&&t.length===1;n&&(e=pe.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&pe.set(t,e))}return e}toString(){return this.cssText}};const tn=i=>new Ye(typeof i=="string"?i:i+"",void 0,Jt),ti=(i,...e)=>{const t=i.length===1?i[0]:e.reduce((n,r,s)=>n+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+i[s+1],i[0]);return new Ye(t,i,Jt)},en=(i,e)=>{if(Kt)i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const n=document.createElement("style"),r=At.litNonce;r!==void 0&&n.setAttribute("nonce",r),n.textContent=t.cssText,i.appendChild(n)}},me=Kt?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(const n of e.cssRules)t+=n.cssText;return tn(t)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:nn,defineProperty:rn,getOwnPropertyDescriptor:sn,getOwnPropertyNames:on,getOwnPropertySymbols:an,getPrototypeOf:cn}=Object,j=globalThis,ve=j.trustedTypes,hn=ve?ve.emptyScript:"",It=j.reactiveElementPolyfillSupport,ht=(i,e)=>i,St={toAttribute(i,e){switch(e){case Boolean:i=i?hn:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},Qt=(i,e)=>!nn(i,e),ge={attribute:!0,type:String,converter:St,reflect:!1,hasChanged:Qt};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),j.litPropertyMetadata??(j.litPropertyMetadata=new WeakMap);class tt extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ge){if(t.state&&(t.attribute=!1),this._$Ei(),this.elementProperties.set(e,t),!t.noAccessor){const n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&rn(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){const{get:r,set:s}=sn(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get(){return r==null?void 0:r.call(this)},set(o){const c=r==null?void 0:r.call(this);s.call(this,o),this.requestUpdate(e,c,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ge}static _$Ei(){if(this.hasOwnProperty(ht("elementProperties")))return;const e=cn(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(ht("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ht("properties"))){const t=this.properties,n=[...on(t),...an(t)];for(const r of n)this.createProperty(r,t[r])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[n,r]of t)this.elementProperties.set(n,r)}this._$Eh=new Map;for(const[t,n]of this.elementProperties){const r=this._$Eu(t,n);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const n=new Set(e.flat(1/0).reverse());for(const r of n)t.unshift(me(r))}else e!==void 0&&t.push(me(e));return t}static _$Eu(e,t){const n=t.attribute;return n===!1?void 0:typeof n=="string"?n:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return en(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var n;return(n=t.hostConnected)==null?void 0:n.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var n;return(n=t.hostDisconnected)==null?void 0:n.call(t)})}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$EC(e,t){var s;const n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&n.reflect===!0){const o=(((s=n.converter)==null?void 0:s.toAttribute)!==void 0?n.converter:St).toAttribute(t,n.type);this._$Em=e,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(e,t){var s;const n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){const o=n.getPropertyOptions(r),c=typeof o.converter=="function"?{fromAttribute:o.converter}:((s=o.converter)==null?void 0:s.fromAttribute)!==void 0?o.converter:St;this._$Em=r,this[r]=c.fromAttribute(t,o.type),this._$Em=null}}requestUpdate(e,t,n){if(e!==void 0){if(n??(n=this.constructor.getPropertyOptions(e)),!(n.hasChanged??Qt)(this[e],t))return;this.P(e,t,n)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(e,t,n){this._$AL.has(e)||this._$AL.set(e,t),n.reflect===!0&&this._$Em!==e&&(this._$Ej??(this._$Ej=new Set)).add(e)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var n;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[s,o]of this._$Ep)this[s]=o;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[s,o]of r)o.wrapped!==!0||this._$AL.has(s)||this[s]===void 0||this.P(s,this[s],o)}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(n=this._$EO)==null||n.forEach(r=>{var s;return(s=r.hostUpdate)==null?void 0:s.call(r)}),this.update(t)):this._$EU()}catch(r){throw e=!1,this._$EU(),r}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(n=>{var r;return(r=n.hostUpdated)==null?void 0:r.call(n)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Ej&&(this._$Ej=this._$Ej.forEach(t=>this._$EC(t,this[t]))),this._$EU()}updated(e){}firstUpdated(e){}}tt.elementStyles=[],tt.shadowRootOptions={mode:"open"},tt[ht("elementProperties")]=new Map,tt[ht("finalized")]=new Map,It==null||It({ReactiveElement:tt}),(j.reactiveElementVersions??(j.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const lt=globalThis,Ct=lt.trustedTypes,_e=Ct?Ct.createPolicy("lit-html",{createHTML:i=>i}):void 0,ei="$lit$",D=`lit$${Math.random().toFixed(9).slice(2)}$`,ii="?"+D,ln=`<${ii}>`,X=document,dt=()=>X.createComment(""),ft=i=>i===null||typeof i!="object"&&typeof i!="function",Xt=Array.isArray,un=i=>Xt(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",Lt=`[ 	
\f\r]`,at=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ye=/-->/g,be=/>/g,B=RegExp(`>|${Lt}(?:([^\\s"'>=/]+)(${Lt}*=${Lt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),$e=/'/g,we=/"/g,ni=/^(?:script|style|textarea|title)$/i,dn=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),xt=dn(1),nt=Symbol.for("lit-noChange"),w=Symbol.for("lit-nothing"),Ee=new WeakMap,q=X.createTreeWalker(X,129);function ri(i,e){if(!Xt(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return _e!==void 0?_e.createHTML(e):e}const fn=(i,e)=>{const t=i.length-1,n=[];let r,s=e===2?"<svg>":e===3?"<math>":"",o=at;for(let c=0;c<t;c++){const a=i[c];let u,l,h=-1,f=0;for(;f<a.length&&(o.lastIndex=f,l=o.exec(a),l!==null);)f=o.lastIndex,o===at?l[1]==="!--"?o=ye:l[1]!==void 0?o=be:l[2]!==void 0?(ni.test(l[2])&&(r=RegExp("</"+l[2],"g")),o=B):l[3]!==void 0&&(o=B):o===B?l[0]===">"?(o=r??at,h=-1):l[1]===void 0?h=-2:(h=o.lastIndex-l[2].length,u=l[1],o=l[3]===void 0?B:l[3]==='"'?we:$e):o===we||o===$e?o=B:o===ye||o===be?o=at:(o=B,r=void 0);const m=o===B&&i[c+1].startsWith("/>")?" ":"";s+=o===at?a+ln:h>=0?(n.push(u),a.slice(0,h)+ei+a.slice(h)+D+m):a+D+(h===-2?c:m)}return[ri(i,s+(i[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]};class pt{constructor({strings:e,_$litType$:t},n){let r;this.parts=[];let s=0,o=0;const c=e.length-1,a=this.parts,[u,l]=fn(e,t);if(this.el=pt.createElement(u,n),q.currentNode=this.el.content,t===2||t===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(r=q.nextNode())!==null&&a.length<c;){if(r.nodeType===1){if(r.hasAttributes())for(const h of r.getAttributeNames())if(h.endsWith(ei)){const f=l[o++],m=r.getAttribute(h).split(D),g=/([.?@])?(.*)/.exec(f);a.push({type:1,index:s,name:g[2],strings:m,ctor:g[1]==="."?mn:g[1]==="?"?vn:g[1]==="@"?gn:Tt}),r.removeAttribute(h)}else h.startsWith(D)&&(a.push({type:6,index:s}),r.removeAttribute(h));if(ni.test(r.tagName)){const h=r.textContent.split(D),f=h.length-1;if(f>0){r.textContent=Ct?Ct.emptyScript:"";for(let m=0;m<f;m++)r.append(h[m],dt()),q.nextNode(),a.push({type:2,index:++s});r.append(h[f],dt())}}}else if(r.nodeType===8)if(r.data===ii)a.push({type:2,index:s});else{let h=-1;for(;(h=r.data.indexOf(D,h+1))!==-1;)a.push({type:7,index:s}),h+=D.length-1}s++}}static createElement(e,t){const n=X.createElement("template");return n.innerHTML=e,n}}function rt(i,e,t=i,n){var o,c;if(e===nt)return e;let r=n!==void 0?(o=t._$Co)==null?void 0:o[n]:t._$Cl;const s=ft(e)?void 0:e._$litDirective$;return(r==null?void 0:r.constructor)!==s&&((c=r==null?void 0:r._$AO)==null||c.call(r,!1),s===void 0?r=void 0:(r=new s(i),r._$AT(i,t,n)),n!==void 0?(t._$Co??(t._$Co=[]))[n]=r:t._$Cl=r),r!==void 0&&(e=rt(i,r._$AS(i,e.values),r,n)),e}class pn{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:n}=this._$AD,r=((e==null?void 0:e.creationScope)??X).importNode(t,!0);q.currentNode=r;let s=q.nextNode(),o=0,c=0,a=n[0];for(;a!==void 0;){if(o===a.index){let u;a.type===2?u=new _t(s,s.nextSibling,this,e):a.type===1?u=new a.ctor(s,a.name,a.strings,this,e):a.type===6&&(u=new _n(s,this,e)),this._$AV.push(u),a=n[++c]}o!==(a==null?void 0:a.index)&&(s=q.nextNode(),o++)}return q.currentNode=X,r}p(e){let t=0;for(const n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}}class _t{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=w,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=(r==null?void 0:r.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=rt(this,e,t),ft(e)?e===w||e==null||e===""?(this._$AH!==w&&this._$AR(),this._$AH=w):e!==this._$AH&&e!==nt&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):un(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==w&&ft(this._$AH)?this._$AA.nextSibling.data=e:this.T(X.createTextNode(e)),this._$AH=e}$(e){var s;const{values:t,_$litType$:n}=e,r=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=pt.createElement(ri(n.h,n.h[0]),this.options)),n);if(((s=this._$AH)==null?void 0:s._$AD)===r)this._$AH.p(t);else{const o=new pn(r,this),c=o.u(this.options);o.p(t),this.T(c),this._$AH=o}}_$AC(e){let t=Ee.get(e.strings);return t===void 0&&Ee.set(e.strings,t=new pt(e)),t}k(e){Xt(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let n,r=0;for(const s of e)r===t.length?t.push(n=new _t(this.O(dt()),this.O(dt()),this,this.options)):n=t[r],n._$AI(s),r++;r<t.length&&(this._$AR(n&&n._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var n;for((n=this._$AP)==null?void 0:n.call(this,!1,!0,t);e&&e!==this._$AB;){const r=e.nextSibling;e.remove(),e=r}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class Tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,s){this.type=1,this._$AH=w,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=s,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=w}_$AI(e,t=this,n,r){const s=this.strings;let o=!1;if(s===void 0)e=rt(this,e,t,0),o=!ft(e)||e!==this._$AH&&e!==nt,o&&(this._$AH=e);else{const c=e;let a,u;for(e=s[0],a=0;a<s.length-1;a++)u=rt(this,c[n+a],t,a),u===nt&&(u=this._$AH[a]),o||(o=!ft(u)||u!==this._$AH[a]),u===w?e=w:e!==w&&(e+=(u??"")+s[a+1]),this._$AH[a]=u}o&&!r&&this.j(e)}j(e){e===w?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class mn extends Tt{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===w?void 0:e}}class vn extends Tt{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==w)}}class gn extends Tt{constructor(e,t,n,r,s){super(e,t,n,r,s),this.type=5}_$AI(e,t=this){if((e=rt(this,e,t,0)??w)===nt)return;const n=this._$AH,r=e===w&&n!==w||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,s=e!==w&&(n===w||r);r&&this.element.removeEventListener(this.name,this,n),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class _n{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){rt(this,e)}}const Mt=lt.litHtmlPolyfillSupport;Mt==null||Mt(pt,_t),(lt.litHtmlVersions??(lt.litHtmlVersions=[])).push("3.2.1");const yn=(i,e,t)=>{const n=(t==null?void 0:t.renderBefore)??e;let r=n._$litPart$;if(r===void 0){const s=(t==null?void 0:t.renderBefore)??null;n._$litPart$=r=new _t(e.insertBefore(dt(),s),s,void 0,t??{})}return r._$AI(i),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let et=class extends tt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=yn(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return nt}};var Ce;et._$litElement$=!0,et.finalized=!0,(Ce=globalThis.litElementHydrateSupport)==null||Ce.call(globalThis,{LitElement:et});const Nt=globalThis.litElementPolyfillSupport;Nt==null||Nt({LitElement:et});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const bn={attribute:!0,type:String,converter:St,reflect:!1,hasChanged:Qt},$n=(i=bn,e,t)=>{const{kind:n,metadata:r}=t;let s=globalThis.litPropertyMetadata.get(r);if(s===void 0&&globalThis.litPropertyMetadata.set(r,s=new Map),s.set(t.name,i),n==="accessor"){const{name:o}=t;return{set(c){const a=e.get.call(this);e.set.call(this,c),this.requestUpdate(o,a,i)},init(c){return c!==void 0&&this.P(o,void 0,i),c}}}if(n==="setter"){const{name:o}=t;return function(c){const a=this[o];e.call(this,c),this.requestUpdate(o,a,i)}}throw Error("Unsupported decorator location: "+n)};function si(i){return(e,t)=>typeof t=="object"?$n(i,e,t):((n,r,s)=>{const o=r.hasOwnProperty(s);return r.constructor.createProperty(s,o?{...n,wrapped:!0}:n),o?Object.getOwnPropertyDescriptor(r,s):void 0})(i,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function oi(i){return si({...i,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const wn=(i,e,t)=>(t.configurable=!0,t.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(i,e,t),t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function En(i,e){return(t,n,r)=>{const s=o=>{var c;return((c=o.renderRoot)==null?void 0:c.querySelector(i))??null};return wn(t,n,{get(){return s(this)}})}}const An=ti`
  
`,xn="modulepreload",Rn=function(i){return"/"+i},Ae={},xe=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),c=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));r=Promise.allSettled(t.map(a=>{if(a=Rn(a),a in Ae)return;Ae[a]=!0;const u=a.endsWith(".css"),l=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${a}"]${l}`))return;const h=document.createElement("link");if(h.rel=u?"stylesheet":xn,u||(h.as="script"),h.crossOrigin="",h.href=a,c&&h.setAttribute("nonce",c),document.head.appendChild(h),u)return new Promise((f,m)=>{h.addEventListener("load",f),h.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${a}`)))})}))}function s(o){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=o,window.dispatchEvent(c),!c.defaultPrevented)throw o}return r.then(o=>{for(const c of o||[])c.status==="rejected"&&s(c.reason);return e().catch(s)})};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let ai=class extends Event{constructor(e,t,n,r){super("context-request",{bubbles:!0,composed:!0}),this.context=e,this.contextTarget=t,this.callback=n,this.subscribe=r??!1}};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *//**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let Re=class{constructor(e,t,n,r){if(this.subscribe=!1,this.provided=!1,this.value=void 0,this.t=(s,o)=>{this.unsubscribe&&(this.unsubscribe!==o&&(this.provided=!1,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=s,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=!0,this.callback&&this.callback(s,o)),this.unsubscribe=o},this.host=e,t.context!==void 0){const s=t;this.context=s.context,this.callback=s.callback,this.subscribe=s.subscribe??!1}else this.context=t,this.callback=n,this.subscribe=r??!1;this.host.addController(this)}hostConnected(){this.dispatchRequest()}hostDisconnected(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=void 0)}dispatchRequest(){this.host.dispatchEvent(new ai(this.context,this.host,this.t,this.subscribe))}};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Pn{get value(){return this.o}set value(e){this.setValue(e)}setValue(e,t=!1){const n=t||!Object.is(e,this.o);this.o=e,n&&this.updateObservers()}constructor(e){this.subscriptions=new Map,this.updateObservers=()=>{for(const[t,{disposer:n}]of this.subscriptions)t(this.o,n)},e!==void 0&&(this.value=e)}addCallback(e,t,n){if(!n)return void e(this.value);this.subscriptions.has(e)||this.subscriptions.set(e,{disposer:()=>{this.subscriptions.delete(e)},consumerHost:t});const{disposer:r}=this.subscriptions.get(e);e(this.value,r)}clearCallbacks(){this.subscriptions.clear()}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let Sn=class extends Event{constructor(e,t){super("context-provider",{bubbles:!0,composed:!0}),this.context=e,this.contextTarget=t}};class Pe extends Pn{constructor(e,t,n){var r,s;super(t.context!==void 0?t.initialValue:n),this.onContextRequest=o=>{if(o.context!==this.context)return;const c=o.contextTarget??o.composedPath()[0];c!==this.host&&(o.stopPropagation(),this.addCallback(o.callback,c,o.subscribe))},this.onProviderRequest=o=>{if(o.context!==this.context||(o.contextTarget??o.composedPath()[0])===this.host)return;const c=new Set;for(const[a,{consumerHost:u}]of this.subscriptions)c.has(a)||(c.add(a),u.dispatchEvent(new ai(this.context,u,a,!0)));o.stopPropagation()},this.host=e,t.context!==void 0?this.context=t.context:this.context=t,this.attachListeners(),(s=(r=this.host).addController)==null||s.call(r,this)}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest),this.host.addEventListener("context-provider",this.onProviderRequest)}hostConnected(){this.host.dispatchEvent(new Sn(this.context,this.host))}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Cn({context:i}){return(e,t)=>{const n=new WeakMap;if(typeof t=="object")return t.addInitializer(function(){n.set(this,new Pe(this,{context:i}))}),{get(){return e.get.call(this)},set(r){var s;return(s=n.get(this))==null||s.setValue(r),e.set.call(this,r)},init(r){var s;return(s=n.get(this))==null||s.setValue(r),r}};{e.constructor.addInitializer(o=>{n.set(o,new Pe(o,{context:i}))});const r=Object.getOwnPropertyDescriptor(e,t);let s;if(r===void 0){const o=new WeakMap;s={get(){return o.get(this)},set(c){n.get(this).setValue(c),o.set(this,c)},configurable:!0,enumerable:!0}}else{const o=r.set;s={...r,set(c){n.get(this).setValue(c),o==null||o.call(this,c)}}}return void Object.defineProperty(e,t,s)}}}/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Tn({context:i,subscribe:e}){return(t,n)=>{typeof n=="object"?n.addInitializer(function(){new Re(this,{context:i,callback:r=>{t.set.call(this,r)},subscribe:e})}):t.constructor.addInitializer(r=>{new Re(r,{context:i,callback:s=>{r[n]=s},subscribe:e})})}}const ci=Symbol("router-context"),Se=[{path:"/",name:"Home",component:"coffee-home",action:async()=>{await xe(()=>import("./coffee-home-B0zu12jJ.js"),[])}},{path:"/users",name:"Users",component:"coffee-users",action:async()=>{await xe(()=>import("./coffee-users-ifEOpzTz.js"),[])}}],Un=ti`
  body {
    background-color: #80cf7c;
    font-family: Lato, sans-serif;
    margin: 0;
    padding: 0;
  }

  nav {
    background-color: #fff;
  }

  nav i {
    margin: 22px 0 0 30px;
    transform: scale(2);
    transition: all 0.2s linear;
  }

  nav ul {
    display: inline;
    list-style: none;
  }

  nav li {
    cursor: pointer;
    display: inline;
  }

  #logo {
    position: fixed;
    left: 0vw;
  }

  #navToggle {
    cursor: pointer;
    display: none;
    height: 30px;
    position: fixed;
    right: 30px;
  }

  #top-nav {
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    height: 75px;
    transition: all 0.2s linear;
  }

  #top-nav ul {
    float: right;
    margin: 22px 30px 0 0;
  }

  #top-nav li {
    font-size: 1.2em;
    padding-right: 20px;
  }

  #bottom-nav {
    background-color: #fff;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.12),
      5px 1px 10px rgba(0, 0, 0, 0.24);
    position: fixed;
    text-align: center;
    bottom: 0px;
    width: 100%;
    height: 0px;
    opacity: 0;
    transition: all 0.2s linear;
  }

  #bottom-nav-items {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    width: 100vw;
  }

  #bottom-nav-items span:nth-child(even) {
    color: #a0a0a0;
    cursor: pointer;
  }

  #bottom-nav i {
    display: block;
    margin-bottom: 8px;
    font-size: 1.5em;
    cursor: pointer;
  }

  .main-content-area {
    background-color: #fff;
    border-radius: 4px;
    height: 200px;
    max-width: 300px;
    margin: 100px auto;
    text-align: center;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }

  .main-content-area h1 {
    padding-top: 80px;
  }

  /*==========  Media Queries  ==========*/

  /* Extra Small Devices, Phones */
  @media only screen and (max-width: 480px) {
    nav i {
      transform: scale(1.2);
      margin: 11px 0 0 0;
      transition: all 0.2s linear;
    }

    #logo {
      left: 46vw;
    }

    #navToggle {
      display: block;
    }

    #top-nav {
      height: 45px;
    }

    #top-nav ul {
      display: none;
    }

    #bottom-nav {
      height: 75px;
      opacity: 100;
      transition: all 0.2s linear;
    }
  }
`;var On=Object.defineProperty,hi=(i,e,t,n)=>{for(var r=void 0,s=i.length-1,o;s>=0;s--)(o=i[s])&&(r=o(e,t,r)||r);return r&&On(e,t,r),r},M;const Zt=(M=class extends et{constructor(){super(...arguments),this.navItems=[]}render(){var e,t;return xt`
      <nav>
        <div id="top-nav">
          <i id="logo" class="material-icons">face</i>
          <i id="navToggle" class="material-icons">menu</i>
          <ul id="top-nav-items">
            ${(e=this.navItems)==null?void 0:e.map(n=>xt`<li
                  @click="${()=>M._onClick(n)}"
                  @keyup="${()=>M._onClick(n)}"
                >
                  ${n.name}
                </li>`)}
          </ul>
        </div>
        <div id="bottom-nav">
          <div id="bottom-nav-items">
            ${(t=this.navItems)==null?void 0:t.map(n=>xt`<div
                  @click="${()=>M._onClick(n)}"
                  @keyup="${()=>M._onClick(n)}"
                >
                  <span><i class="material-icons">face</i></span>
                  <span>${n.name}</span>
                </div>`)}
          </div>
        </div>
      </nav>

      <slot></slot>
    `}static _onClick(e){je.go(e.path)}},M.styles=[Un],M);hi([Tn({context:ci,subscribe:!0}),oi()],Zt.prototype,"router");hi([si({type:Array,attribute:"nav-items"})],Zt.prototype,"navItems");let In=Zt;customElements.define("flexible-nav",In);var Ln=Object.defineProperty,li=(i,e,t,n)=>{for(var r=void 0,s=i.length-1,o;s>=0;s--)(o=i[s])&&(r=o(e,t,r)||r);return r&&Ln(e,t,r),r};const Yt=class Yt extends et{firstUpdated(e){super.firstUpdated(e),console.log("this.outlet",this.outlet),this.router=new je(this.outlet),this.router.setRoutes(Se)}render(){return xt`
      <flexible-nav .navItems="${Se}">
        <div id="outlet"></div>
      </flexible-nav>
    `}};Yt.styles=[An];let mt=Yt;li([Cn({context:ci}),oi()],mt.prototype,"router");li([En("#outlet")],mt.prototype,"outlet");customElements.define("my-coffee-app",mt);export{oi as a,ti as i,et as r,xt as x};
