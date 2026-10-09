/* 모든 테스트 공통: 상단 '← 메인' 버튼 + 진행 중 이탈 경고 팝업 */
(function(){
var T={ko:{b:"메인",t:"테스트를 그만할까요?",d:"지금 나가면 진행 중인 응답이 사라질 수 있어요.",y:"나가기",n:"계속하기"},
en:{b:"Home",t:"Leave this test?",d:"If you leave now, your progress may be lost.",y:"Leave",n:"Keep going"},
zh:{b:"主页",t:"要退出测试吗？",d:"现在退出，进行中的作答可能会丢失。",y:"退出",n:"继续"},
ja:{b:"メイン",t:"テストをやめますか？",d:"今出ると、進行中の回答が失われることがあります。",y:"やめる",n:"続ける"}};
function L(){var l=document.documentElement.lang;return T[l]?l:"ko"}
function hub(){return (window.SITE&&window.SITE.HUB_URL)||"../"}
function busy(){var a=document.querySelector(".screen.active");return !!a&&a.id!=="intro"&&a.id!=="result"}
function go(){location.href=hub()}
function modal(){
 var t=T[L()],o=document.createElement("div");
 o.style.cssText="position:fixed;inset:0;z-index:200;background:rgba(0,0,0,.65);display:flex;align-items:center;justify-content:center;padding:20px";
 o.innerHTML='<div role="dialog" aria-modal="true" style="max-width:340px;width:100%;background:#1a2030;color:#eef1f8;border:1px solid #2c3550;border-radius:20px;padding:24px;text-align:center;font-family:inherit"><div style="font-size:18px;font-weight:800;margin-bottom:8px">'+t.t+'</div><div style="font-size:14px;line-height:1.6;color:#aab4c8;margin-bottom:20px">'+t.d+'</div><div style="display:flex;gap:10px"><button id="xn" style="flex:1;border:0;border-radius:12px;padding:13px;font-weight:800;font-size:15px;background:#eef1f8;color:#10131a;cursor:pointer">'+t.n+'</button><button id="xy" style="flex:1;border:1px solid #3a4566;border-radius:12px;padding:13px;font-weight:700;font-size:15px;background:transparent;color:#dfe4eb;cursor:pointer">'+t.y+'</button></div></div>';
 document.body.appendChild(o);
 o.querySelector("#xn").onclick=function(){o.remove()};
 o.querySelector("#xy").onclick=go;
 o.addEventListener("click",function(e){if(e.target===o)o.remove()});
}
function exit(){busy()?modal():go()}
function init(){
 var lg=document.querySelector(".logo");if(!lg||document.getElementById("exitBtn"))return;
 var b=document.createElement("button");b.id="exitBtn";b.type="button";b.setAttribute("aria-label","home");
 b.style.cssText="background:#151b2b;color:#dfe4eb;border:1px solid #2c3550;border-radius:10px;padding:5px 10px;font-size:12px;font-weight:700;cursor:pointer;margin-right:10px;letter-spacing:0;font-family:inherit";
 function lab(){b.textContent="← "+T[L()].b}
 lab();b.onclick=exit;lg.insertBefore(b,lg.firstChild);
 new MutationObserver(lab).observe(document.documentElement,{attributes:true,attributeFilter:["lang"]});
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
