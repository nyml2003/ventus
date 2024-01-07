import{Q as D,R as k}from"./QBtn.1c2ebfdf.js";import{b as r,Q as x,a as i}from"./QItem.bca069bc.js";import{Q as A}from"./QCardSection.3808d317.js";import{Q as V}from"./QSeparator.7cc09c77.js";import{Q as y}from"./QIcon.cd84a8c9.js";import{Q as B}from"./QChip.c315b96c.js";import{Q as h}from"./QAvatar.f5efa17d.js";import{Q as E}from"./QList.16e487af.js";import{Q as N}from"./QCard.4360eb04.js";import{Q as P}from"./QPage.c63ed68c.js";import{g as z}from"./requests.9c957d79.js";import{d as R,ab as T,r as I,Z as j,o as U,ac as q,x as o,y as f,z as e,f as t,a3 as $,$ as s,a0 as l,a1 as m,a2 as _,F as p,I as C,V as v}from"./index.9a14d4d5.js";import"./render.63e50adf.js";import"./use-dark.86a1bce4.js";const O={class:"text-h6 text-weight-bolder"},M={class:"text-h6 text-weight-bolder"},Z=["src"],G={class:"text-h6 text-weight-bolder"},H={class:"text-caption text-weight-bolder"},J=["src"],K={key:0,class:"flex items-center justify-center"},me=R({__name:"FolderCard",setup(W){const Q=T(),F=I(parseInt(Q.params.id)),b=j(),u=I({});async function L(){var c;u.value.id!==0&&b.push(`/folder/detail/${(c=u.value.parent)==null?void 0:c.id}`)}async function g(c){b.push(`/folder/detail/${c}`)}async function w(c){b.push(`/folder/article/${c}`)}U(async()=>{u.value=await z(F.value)}),q(async()=>{F.value!==parseInt(Q.params.id)&&(F.value=parseInt(Q.params.id),u.value=await z(F.value))});function S(){return!(u.value.hasOwnProperty("folders")&&u.value.folders.length>0||u.value.hasOwnProperty("articles")&&u.value.articles.length>0)}return(c,X)=>(o(),f(P,{class:"flex items-start justify-center"},{default:e(()=>[t(N,{class:"q-ma-md w-[700px] rounded-3xl min-h-[95vh]"},{default:e(()=>[t(A,{class:"flex items-center justify-start"},{default:e(()=>{var a;return[u.value.parent?(o(),f(D,{key:0,label:(a=u.value.parent)==null?void 0:a.name,class:"q-mr-md",color:"primary",flat:"",icon:"arrow_back",onClick:L},null,8,["label"])):$("",!0),t(r,{class:"text-h6"},{default:e(()=>[s(l(u.value.name),1)]),_:1})]}),_:1}),t(V),t(A,null,{default:e(()=>[t(E,{class:"desktop-only"},{default:e(()=>[(o(!0),m(p,null,_(u.value.folders,a=>C((o(),f(x,{key:a.id,clickable:"",onClick:n=>g(a.id)},{default:e(()=>[t(i,{avatar:""},{default:e(()=>[t(y,{name:"folder",size:"xl"})]),_:1}),t(i,null,{default:e(()=>[t(r,null,{default:e(()=>[v("div",O,l(a.name),1)]),_:2},1024),t(r,{caption:""},{default:e(()=>[s(l(a.articleCount)+" \u7BC7\u6587\u7AE0, "+l(a.folderCount)+" \u4E2A\u5B50\u6587\u4EF6\u5939 ",1)]),_:2},1024)]),_:2},1024),t(i,{side:"",top:""},{default:e(()=>[t(r,{caption:""},{default:e(()=>[s(" \u66F4\u65B0\u65F6\u95F4\uFF1A "+l(new Date(a.updateTime).toLocaleString()),1)]),_:2},1024)]),_:2},1024)]),_:2},1032,["onClick"])),[[k]])),128)),(o(!0),m(p,null,_(u.value.articles,a=>C((o(),f(x,{key:a.id,clickable:"",onClick:n=>w(a.id)},{default:e(()=>[t(i,{avatar:""},{default:e(()=>[t(y,{name:"article",size:"xl"})]),_:1}),t(i,null,{default:e(()=>[t(r,null,{default:e(()=>[v("div",M,[s(l(a.title),1),(o(!0),m(p,null,_(a.tags,(n,d)=>(o(),f(B,{key:d,label:n.name},null,8,["label"]))),128))])]),_:2},1024),t(r,{caption:"",lines:"2"},{default:e(()=>[s(l(a.brief),1)]),_:2},1024)]),_:2},1024),t(i,{side:"",top:""},{default:e(()=>[t(r,{caption:""},{default:e(()=>{var n;return[s(" \u4F5C\u8005\uFF1A "),t(h,{size:"sm"},{default:e(()=>{var d;return[v("img",{src:(d=a.author)==null?void 0:d.avatarUrl},null,8,Z)]}),_:2},1024),s(" "+l((n=a.author)==null?void 0:n.name),1)]}),_:2},1024),t(r,{caption:""},{default:e(()=>[s(" \u66F4\u65B0\u65F6\u95F4\uFF1A "+l(new Date(a.updateTime).toLocaleString()),1)]),_:2},1024)]),_:2},1024)]),_:2},1032,["onClick"])),[[k]])),128))]),_:1}),t(E,{class:"mobile-only"},{default:e(()=>[(o(!0),m(p,null,_(u.value.folders,a=>C((o(),f(x,{key:a.id,clickable:"",onClick:n=>g(a.id)},{default:e(()=>[t(i,{avatar:""},{default:e(()=>[t(y,{name:"folder",size:"xl"})]),_:1}),t(i,null,{default:e(()=>[t(r,null,{default:e(()=>[v("div",G,l(a.name),1)]),_:2},1024),t(r,{caption:""},{default:e(()=>[s(l(a.articleCount)+" \u7BC7\u6587\u7AE0, "+l(a.folderCount)+" \u4E2A\u5B50\u6587\u4EF6\u5939 ",1)]),_:2},1024)]),_:2},1024)]),_:2},1032,["onClick"])),[[k]])),128)),(o(!0),m(p,null,_(u.value.articles,a=>C((o(),f(x,{key:a.id,clickable:"",onClick:n=>w(a.id)},{default:e(()=>[t(i,{avatar:""},{default:e(()=>[t(y,{name:"article",size:"xl"})]),_:1}),t(i,null,{default:e(()=>[t(r,null,{default:e(()=>[v("div",H,[s(l(a.title),1),(o(!0),m(p,null,_(a.tags,(n,d)=>(o(),f(B,{key:d,label:n.name,size:"sm"},null,8,["label"]))),128))])]),_:2},1024),t(r,{caption:"",lines:"2"},{default:e(()=>[s(l(a.brief),1)]),_:2},1024),t(r,{caption:""},{default:e(()=>{var n;return[s(" \u4F5C\u8005\uFF1A "),t(h,{size:"sm"},{default:e(()=>{var d;return[v("img",{src:(d=a.author)==null?void 0:d.avatarUrl},null,8,J)]}),_:2},1024),s(" "+l((n=a.author)==null?void 0:n.name),1)]}),_:2},1024),t(r,{caption:""},{default:e(()=>[s(" \u66F4\u65B0\u65F6\u95F4\uFF1A "+l(new Date(a.updateTime).toLocaleString()),1)]),_:2},1024)]),_:2},1024)]),_:2},1032,["onClick"])),[[k]])),128))]),_:1}),S()?(o(),m("div",K,[t(r,{class:"text-h6"},{default:e(()=>[s("\u7A7A\u7A7A\u5982\u4E5F")]),_:1})])):$("",!0)]),_:1})]),_:1})]),_:1}))}});export{me as default};