import{Q as f}from"./QBtn.2d7594d0.js";import{Q as p}from"./QCardActions.3e328c86.js";import{u as C,Q as _,a as E,_ as B}from"./CharacterCard.a314382e.js";import{Q as F}from"./QCardSection.fb1ce4b3.js";import{Q as x}from"./QPage.18c55fee.js";import{Q}from"./QCard.dd199783.js";import{e as v}from"./requests.1363126e.js";import{d as h,r as n,Z as g,o as y,x as r,y as s,z as e,f as u,a1 as A,a2 as V,F as k,a3 as w,A as b,V as S}from"./index.6c1a59d0.js";import"./QIcon.c5e8f9a1.js";import"./render.c5493b6f.js";import"./use-prevent-scroll.c89edb4c.js";import"./scroll.5f75d060.js";import"./use-dark.af45ec46.js";import"./QItem.04ca494c.js";import"./QList.82ed9043.js";const D=S("div",{class:"text-caption q-ma-md absolute-bottom text-center"}," \u672C\u9875\u9762\u4EC5\u4F9B\u6F14\u793A\uFF0C\u6240\u6709\u6D89\u53CA\u7684\u540D\u5B57\u5747\u7531\u968F\u673A\u751F\u6210\uFF0C\u4E0E\u73B0\u5B9E\u4EBA\u7269\u65E0\u5173\u3002 \u6240\u6709\u6570\u636E\u5747\u4E3A\u7B26\u5408\u6B63\u6001\u5206\u5E03\u7684\u968F\u673A\u6570, \u65E0\u4EFB\u4F55\u5B9E\u9645\u610F\u4E49 ",-1),T=h({__name:"ChooseHeroPage",setup(N){const t=n([]),i=g(),m=C();async function c(){t.value=await v(),o.value=t.value[0].id}const o=n(0);y(async()=>{await c()});async function d(){await m.setHero(o.value),i.push("/game/choose/enemy")}return(z,l)=>(r(),s(x,{class:"flex flex-center"},{default:e(()=>[u(b(Q),{class:"rounded-3xl min-h-[80vh] flex flex-center flex-col"},{default:e(()=>[u(p,null,{default:e(()=>[u(f,{onClick:d,label:"\u9009\u62E9"})]),_:1}),t.value.length>0?(r(),s(F,{key:0},{default:e(()=>[u(_,{modelValue:o.value,"onUpdate:modelValue":l[0]||(l[0]=a=>o.value=a),"transition-prev":"scale","transition-next":"scale",swipeable:"",animated:"",class:"full-height",arrows:"",vertical:"",infinite:"","control-color":"primary","control-size":"2em"},{default:e(()=>[(r(!0),A(k,null,V(t.value,a=>(r(),s(E,{name:a.id,key:a.id},{default:e(()=>[u(B,{id:a.id},null,8,["id"])]),_:2},1032,["name"]))),128))]),_:1},8,["modelValue"])]),_:1})):w("",!0)]),_:1}),D]),_:1}))}});export{T as default};