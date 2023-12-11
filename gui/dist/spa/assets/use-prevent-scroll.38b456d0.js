import{a7 as de,W as h,q as ce,X as fe,C as H,Y as z,G as F,J as B,D as _,r as j,c as x,w as X,g as ie,h as q,H as pe,O as D,a8 as ve,m as me,a9 as K,o as he,s as T,aa as ge}from"./index.db682a6f.js";import{d as ye,h as re}from"./render.53701d6f.js";import{b as we,d as be}from"./QBtn.e863b0c1.js";import{b as Pe,a as Ce,h as xe}from"./scroll.9b272687.js";const Y={left:!0,right:!0,up:!0,down:!0,horizontal:!0,vertical:!0},Te=Object.keys(Y);Y.all=!0;function G(e){const t={};for(const r of Te)e[r]===!0&&(t[r]=!0);return Object.keys(t).length===0?Y:(t.horizontal===!0?t.left=t.right=!0:t.left===!0&&t.right===!0&&(t.horizontal=!0),t.vertical===!0?t.up=t.down=!0:t.up===!0&&t.down===!0&&(t.vertical=!0),t.horizontal===!0&&t.vertical===!0&&(t.all=!0),t)}const Se=["INPUT","TEXTAREA"];function J(e,t){return t.event===void 0&&e.target!==void 0&&e.target.draggable!==!0&&typeof t.handler=="function"&&Se.includes(e.target.nodeName.toUpperCase())===!1&&(e.qClonedBy===void 0||e.qClonedBy.indexOf(t.uid)===-1)}function Ve(){if(window.getSelection!==void 0){const e=window.getSelection();e.empty!==void 0?e.empty():e.removeAllRanges!==void 0&&(e.removeAllRanges(),de.is.mobile!==!0&&e.addRange(document.createRange()))}else document.selection!==void 0&&document.selection.empty()}function Ae(e){const t=[.06,6,50];return typeof e=="string"&&e.length&&e.split(":").forEach((r,l)=>{const s=parseFloat(r);s&&(t[l]=s)}),t}var Ee=ye({name:"touch-swipe",beforeMount(e,{value:t,arg:r,modifiers:l}){if(l.mouse!==!0&&h.has.touch!==!0)return;const s=l.mouseCapture===!0?"Capture":"",o={handler:t,sensitivity:Ae(r),direction:G(l),noop:ce,mouseStart(n){J(n,o)&&fe(n)&&(H(o,"temp",[[document,"mousemove","move",`notPassive${s}`],[document,"mouseup","end","notPassiveCapture"]]),o.start(n,!0))},touchStart(n){if(J(n,o)){const a=n.target;H(o,"temp",[[a,"touchmove","move","notPassiveCapture"],[a,"touchcancel","end","notPassiveCapture"],[a,"touchend","end","notPassiveCapture"]]),o.start(n)}},start(n,a){h.is.firefox===!0&&z(e,!0);const p=F(n);o.event={x:p.left,y:p.top,time:Date.now(),mouse:a===!0,dir:!1}},move(n){if(o.event===void 0)return;if(o.event.dir!==!1){B(n);return}const a=Date.now()-o.event.time;if(a===0)return;const p=F(n),y=p.left-o.event.x,d=Math.abs(y),b=p.top-o.event.y,f=Math.abs(b);if(o.event.mouse!==!0){if(d<o.sensitivity[1]&&f<o.sensitivity[1]){o.end(n);return}}else if(window.getSelection().toString()!==""){o.end(n);return}else if(d<o.sensitivity[2]&&f<o.sensitivity[2])return;const v=d/a,g=f/a;o.direction.vertical===!0&&d<f&&d<100&&g>o.sensitivity[0]&&(o.event.dir=b<0?"up":"down"),o.direction.horizontal===!0&&d>f&&f<100&&v>o.sensitivity[0]&&(o.event.dir=y<0?"left":"right"),o.direction.up===!0&&d<f&&b<0&&d<100&&g>o.sensitivity[0]&&(o.event.dir="up"),o.direction.down===!0&&d<f&&b>0&&d<100&&g>o.sensitivity[0]&&(o.event.dir="down"),o.direction.left===!0&&d>f&&y<0&&f<100&&v>o.sensitivity[0]&&(o.event.dir="left"),o.direction.right===!0&&d>f&&y>0&&f<100&&v>o.sensitivity[0]&&(o.event.dir="right"),o.event.dir!==!1?(B(n),o.event.mouse===!0&&(document.body.classList.add("no-pointer-events--children"),document.body.classList.add("non-selectable"),Ve(),o.styleCleanup=C=>{o.styleCleanup=void 0,document.body.classList.remove("non-selectable");const P=()=>{document.body.classList.remove("no-pointer-events--children")};C===!0?setTimeout(P,50):P()}),o.handler({evt:n,touch:o.event.mouse!==!0,mouse:o.event.mouse,direction:o.event.dir,duration:a,distance:{x:d,y:f}})):o.end(n)},end(n){o.event!==void 0&&(_(o,"temp"),h.is.firefox===!0&&z(e,!1),o.styleCleanup!==void 0&&o.styleCleanup(!0),n!==void 0&&o.event.dir!==!1&&B(n),o.event=void 0)}};if(e.__qtouchswipe=o,l.mouse===!0){const n=l.mouseCapture===!0||l.mousecapture===!0?"Capture":"";H(o,"main",[[e,"mousedown","mouseStart",`passive${n}`]])}h.has.touch===!0&&H(o,"main",[[e,"touchstart","touchStart",`passive${l.capture===!0?"Capture":""}`],[e,"touchmove","noop","notPassiveCapture"]])},updated(e,t){const r=e.__qtouchswipe;r!==void 0&&(t.oldValue!==t.value&&(typeof t.value!="function"&&r.end(),r.handler=t.value),r.direction=G(t.modifiers))},beforeUnmount(e){const t=e.__qtouchswipe;t!==void 0&&(_(t,"main"),_(t,"temp"),h.is.firefox===!0&&z(e,!1),t.styleCleanup!==void 0&&t.styleCleanup(),delete e.__qtouchswipe)}});function qe(){const e=new Map;return{getCache:function(t,r){return e[t]===void 0?e[t]=r:e[t]},getCacheWithFn:function(t,r){return e[t]===void 0?e[t]=r():e[t]}}}const _e={name:{required:!0},disable:Boolean},Q={setup(e,{slots:t}){return()=>q("div",{class:"q-panel scroll",role:"tabpanel"},re(t.default))}},$e={modelValue:{required:!0},animated:Boolean,infinite:Boolean,swipeable:Boolean,vertical:Boolean,transitionPrev:String,transitionNext:String,transitionDuration:{type:[String,Number],default:300},keepAlive:Boolean,keepAliveInclude:[String,Array,RegExp],keepAliveExclude:[String,Array,RegExp],keepAliveMax:Number},Ue=["update:modelValue","beforeTransition","transition"];function We(){const{props:e,emit:t,proxy:r}=ie(),{getCacheWithFn:l}=qe();let s,o;const n=j(null),a=j(null);function p(i){const c=e.vertical===!0?"up":"left";A((r.$q.lang.rtl===!0?-1:1)*(i.direction===c?1:-1))}const y=x(()=>[[Ee,p,void 0,{horizontal:e.vertical!==!0,vertical:e.vertical,mouse:!0}]]),d=x(()=>e.transitionPrev||`slide-${e.vertical===!0?"down":"right"}`),b=x(()=>e.transitionNext||`slide-${e.vertical===!0?"up":"left"}`),f=x(()=>`--q-transition-duration: ${e.transitionDuration}ms`),v=x(()=>typeof e.modelValue=="string"||typeof e.modelValue=="number"?e.modelValue:String(e.modelValue)),g=x(()=>({include:e.keepAliveInclude,exclude:e.keepAliveExclude,max:e.keepAliveMax})),C=x(()=>e.keepAliveInclude!==void 0||e.keepAliveExclude!==void 0);X(()=>e.modelValue,(i,c)=>{const w=m(i)===!0?N(i):-1;o!==!0&&R(w===-1?0:w<N(c)?-1:1),n.value!==w&&(n.value=w,t("beforeTransition",i,c),D(()=>{t("transition",i,c)}))});function P(){A(1)}function V(){A(-1)}function u(i){t("update:modelValue",i)}function m(i){return i!=null&&i!==""}function N(i){return s.findIndex(c=>c.props.name===i&&c.props.disable!==""&&c.props.disable!==!0)}function le(){return s.filter(i=>i.props.disable!==""&&i.props.disable!==!0)}function R(i){const c=i!==0&&e.animated===!0&&n.value!==-1?"q-transition--"+(i===-1?d.value:b.value):null;a.value!==c&&(a.value=c)}function A(i,c=n.value){let w=c+i;for(;w>-1&&w<s.length;){const M=s[w];if(M!==void 0&&M.props.disable!==""&&M.props.disable!==!0){R(i),o=!0,t("update:modelValue",M.props.name),setTimeout(()=>{o=!1});return}w+=i}e.infinite===!0&&s.length!==0&&c!==-1&&c!==s.length&&A(i,i===-1?s.length:-1)}function I(){const i=N(e.modelValue);return n.value!==i&&(n.value=i),!0}function O(){const i=m(e.modelValue)===!0&&I()&&s[n.value];return e.keepAlive===!0?[q(ve,g.value,[q(C.value===!0?l(v.value,()=>({...Q,name:v.value})):Q,{key:v.value,style:f.value},()=>i)])]:[q("div",{class:"q-panel scroll",style:f.value,key:v.value,role:"tabpanel"},[i])]}function se(){if(s.length!==0)return e.animated===!0?[q(pe,{name:a.value},O)]:O()}function ue(i){return s=we(re(i.default,[])).filter(c=>c.props!==null&&c.props.slot===void 0&&m(c.props.name)===!0),s.length}function ae(){return s}return Object.assign(r,{next:P,previous:V,goTo:u}),{panelIndex:n,panelDirectives:y,updatePanelsList:ue,updatePanelIndex:I,getPanelContent:se,getEnabledPanels:le,getPanels:ae,isValidPanelName:m,keepAliveProps:g,needsUniqueKeepAliveWrapper:C,goToPanelByOffset:A,goToPanel:u,nextPanel:P,previousPanel:V}}function Xe(e,t,r){let l;function s(){l!==void 0&&(K.remove(l),l=void 0)}return me(()=>{e.value===!0&&s()}),{removeFromHistory:s,addToHistory(){l={condition:()=>r.value===!0,handler:t},K.add(l)}}}const De={modelValue:{type:Boolean,default:null},"onUpdate:modelValue":[Function,Array]},Ye=["beforeShow","show","beforeHide","hide"];function Re({showing:e,canShow:t,hideOnRouteChange:r,handleShow:l,handleHide:s,processOnMount:o}){const n=ie(),{props:a,emit:p,proxy:y}=n;let d;function b(u){e.value===!0?g(u):f(u)}function f(u){if(a.disable===!0||u!==void 0&&u.qAnchorHandled===!0||t!==void 0&&t(u)!==!0)return;const m=a["onUpdate:modelValue"]!==void 0;m===!0&&(p("update:modelValue",!0),d=u,D(()=>{d===u&&(d=void 0)})),(a.modelValue===null||m===!1)&&v(u)}function v(u){e.value!==!0&&(e.value=!0,p("beforeShow",u),l!==void 0?l(u):p("show",u))}function g(u){if(a.disable===!0)return;const m=a["onUpdate:modelValue"]!==void 0;m===!0&&(p("update:modelValue",!1),d=u,D(()=>{d===u&&(d=void 0)})),(a.modelValue===null||m===!1)&&C(u)}function C(u){e.value!==!1&&(e.value=!1,p("beforeHide",u),s!==void 0?s(u):p("hide",u))}function P(u){a.disable===!0&&u===!0?a["onUpdate:modelValue"]!==void 0&&p("update:modelValue",!1):u===!0!==e.value&&(u===!0?v:C)(d)}X(()=>a.modelValue,P),r!==void 0&&be(n)===!0&&X(()=>y.$route.fullPath,()=>{r.value===!0&&e.value===!0&&g()}),o===!0&&he(()=>{P(a.modelValue)});const V={show:f,hide:g,toggle:b};return Object.assign(y,V),V}let E=0,$,U,L,W=!1,Z,ee,te,S=null;function Le(e){Me(e)&&B(e)}function Me(e){if(e.target===document.body||e.target.classList.contains("q-layout__backdrop"))return!0;const t=ge(e),r=e.shiftKey&&!e.deltaX,l=!r&&Math.abs(e.deltaX)<=Math.abs(e.deltaY),s=r||l?e.deltaY:e.deltaX;for(let o=0;o<t.length;o++){const n=t[o];if(xe(n,l))return l?s<0&&n.scrollTop===0?!0:s>0&&n.scrollTop+n.clientHeight===n.scrollHeight:s<0&&n.scrollLeft===0?!0:s>0&&n.scrollLeft+n.clientWidth===n.scrollWidth}return!0}function oe(e){e.target===document&&(document.scrollingElement.scrollTop=document.scrollingElement.scrollTop)}function k(e){W!==!0&&(W=!0,requestAnimationFrame(()=>{W=!1;const{height:t}=e.target,{clientHeight:r,scrollTop:l}=document.scrollingElement;(L===void 0||t!==window.innerHeight)&&(L=r-t,document.scrollingElement.scrollTop=l),l>L&&(document.scrollingElement.scrollTop-=Math.ceil((l-L)/8))}))}function ne(e){const t=document.body,r=window.visualViewport!==void 0;if(e==="add"){const{overflowY:l,overflowX:s}=window.getComputedStyle(t);$=Pe(window),U=Ce(window),Z=t.style.left,ee=t.style.top,te=window.location.href,t.style.left=`-${$}px`,t.style.top=`-${U}px`,s!=="hidden"&&(s==="scroll"||t.scrollWidth>window.innerWidth)&&t.classList.add("q-body--force-scrollbar-x"),l!=="hidden"&&(l==="scroll"||t.scrollHeight>window.innerHeight)&&t.classList.add("q-body--force-scrollbar-y"),t.classList.add("q-body--prevent-scroll"),document.qScrollPrevented=!0,h.is.ios===!0&&(r===!0?(window.scrollTo(0,0),window.visualViewport.addEventListener("resize",k,T.passiveCapture),window.visualViewport.addEventListener("scroll",k,T.passiveCapture),window.scrollTo(0,0)):window.addEventListener("scroll",oe,T.passiveCapture))}h.is.desktop===!0&&h.is.mac===!0&&window[`${e}EventListener`]("wheel",Le,T.notPassive),e==="remove"&&(h.is.ios===!0&&(r===!0?(window.visualViewport.removeEventListener("resize",k,T.passiveCapture),window.visualViewport.removeEventListener("scroll",k,T.passiveCapture)):window.removeEventListener("scroll",oe,T.passiveCapture)),t.classList.remove("q-body--prevent-scroll"),t.classList.remove("q-body--force-scrollbar-x"),t.classList.remove("q-body--force-scrollbar-y"),document.qScrollPrevented=!1,t.style.left=Z,t.style.top=ee,window.location.href===te&&window.scrollTo($,U),L=void 0)}function He(e){let t="add";if(e===!0){if(E++,S!==null){clearTimeout(S),S=null;return}if(E>1)return}else{if(E===0||(E--,E>0))return;if(t="remove",h.is.ios===!0&&h.is.nativeMobile===!0){S!==null&&clearTimeout(S),S=setTimeout(()=>{ne(t),S=null},100);return}}ne(t)}function Ie(){let e;return{preventBodyScroll(t){t!==e&&(e!==void 0||t===!0)&&(e=t,He(t))}}}export{$e as a,Ue as b,We as c,Ve as d,De as e,Ye as f,G as g,Re as h,Xe as i,Ie as j,J as s,_e as u};