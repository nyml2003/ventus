import{Q as n}from"./QBtn.1c2ebfdf.js";import{Q as x}from"./QCardActions.f7e48c27.js";import{u as F,Q,a as h,_ as A}from"./CharacterCard.5e67d3c5.js";import{Q as b}from"./QCardSection.3808d317.js";import{Q as k}from"./QPage.c63ed68c.js";import{Q as y}from"./QCard.4360eb04.js";import{e as g}from"./requests.9c957d79.js";import{d as V,r as i,Z as w,o as S,x as r,y as m,z as l,f as u,A as f,a1 as D,a2 as N,F as z,a3 as H,V as L}from"./index.9a14d4d5.js";import"./QIcon.cd84a8c9.js";import"./render.63e50adf.js";import"./use-prevent-scroll.a882a72b.js";import"./scroll.51ef5c47.js";import"./use-dark.86a1bce4.js";import"./QItem.bca069bc.js";import"./QList.16e487af.js";const P=L("div",{class:"text-caption q-ma-md absolute-bottom text-center"}," \u672C\u9875\u9762\u4EC5\u4F9B\u6F14\u793A\uFF0C\u6240\u6709\u6D89\u53CA\u7684\u540D\u5B57\u5747\u7531\u968F\u673A\u751F\u6210\uFF0C\u4E0E\u73B0\u5B9E\u4EBA\u7269\u65E0\u5173\u3002 \u6240\u6709\u6570\u636E\u5747\u4E3A\u7B26\u5408\u6B63\u6001\u5206\u5E03\u7684\u968F\u673A\u6570, \u65E0\u4EFB\u4F55\u5B9E\u9645\u610F\u4E49 ",-1),ee=V({__name:"ChooseHeroPage",setup(q){const a=i([]),p=w(),C=F();async function E(){a.value=await g(),t.value=a.value[0].id}const t=i(0);S(async()=>{await E()});async function v(){await C.setHero(t.value),p.push("/game/choose/enemy")}function _(){var o;(o=s.value)==null||o.next()}function B(){var o;(o=s.value)==null||o.previous()}const s=i();return(o,c)=>(r(),m(k,{class:"flex flex-center"},{default:l(()=>[u(f(y),{class:"rounded-3xl min-h-[80vh] flex items-start flex-col"},{default:l(()=>[u(x,null,{default:l(()=>{var e,d;return[u(n,{label:"\u4E0A\u4E00\u4E2A",onClick:B,disable:t.value===((e=a.value[0])==null?void 0:e.id)},null,8,["disable"]),u(n,{label:"\u4E0B\u4E00\u4E2A",onClick:_,disable:t.value===((d=a.value[a.value.length-1])==null?void 0:d.id)},null,8,["disable"]),u(n,{onClick:v,label:"\u9009\u62E9"})]}),_:1}),a.value.length>0?(r(),m(b,{key:0},{default:l(()=>[u(f(Q),{ref_key:"carousel",ref:s,modelValue:t.value,"onUpdate:modelValue":c[0]||(c[0]=e=>t.value=e),"transition-prev":"scale","transition-next":"scale",swipeable:"",animated:"","control-color":"primary","control-size":"2em"},{default:l(()=>[(r(!0),D(z,null,N(a.value,e=>(r(),m(h,{name:e.id,key:e.id},{default:l(()=>[u(A,{id:e.id},null,8,["id"])]),_:2},1032,["name"]))),128))]),_:1},8,["modelValue"])]),_:1})):H("",!0)]),_:1}),P]),_:1}))}});export{ee as default};
