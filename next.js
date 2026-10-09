/* 결과 화면에 '이어서 해볼 테스트' 2개를 보여 줍니다. 성향이 비슷한 테스트를 먼저 추천합니다. */
(function(){
  var N={
    react:{u:'../react/',ic:'⚡',c:'#ff7a59',n:{ko:'반응속도 챌린지',en:'Reaction Challenge',zh:'反应速度挑战',ja:'反応速度チャレンジ'},d:{ko:'공이 뜨면 바로 터치 · 약 1분',en:'Tap when the ball appears · ~1 min',zh:'球一出现就点击 · 约1分钟',ja:'ボールが出たらタップ · 約1分'}},
    prism:{u:'../prism/',ic:'🔮',c:'#b6a2ff',n:{ko:'PRISM 56 가치관 지도',en:'PRISM 56 Values Map',zh:'PRISM 56 价值观地图',ja:'PRISM 56 価値観マップ'},d:{ko:'4개 축으로 보는 가치관 유형 · 56문항',en:'Your values type on 4 axes · 56 Qs',zh:'四条轴看价值观类型 · 56题',ja:'4軸で見る価値観タイプ · 56問'}},
    bond:{u:'../bond/',ic:'🪢',c:'#f0b46c',n:{ko:'BOND 28 애착 스타일',en:'BOND 28 Attachment Style',zh:'BOND 28 依恋风格',ja:'BOND 28 愛着スタイル'},d:{ko:'관계 속 나의 애착 패턴 · 28문항',en:'Your attachment pattern in relationships · 28 Qs',zh:'亲密关系中的依恋模式 · 28题',ja:'関係の中の愛着パターン · 28問'}},
    nest:{u:'../nest/',ic:'🪺',c:'#8fd0a8',n:{ko:'NEST 24 육아 스타일',en:'NEST 24 Parenting Style',zh:'NEST 24 育儿风格',ja:'NEST 24 子育てスタイル'},d:{ko:'육아 장면으로 보는 나의 스타일 · 24문항',en:'Your style in parenting moments · 24 Qs',zh:'从育儿场景看你的风格 · 24题',ja:'子育て場面で見る自分のスタイル · 24問'}},
    mind:{u:'../mind/',ic:'🧠',c:'#2dd4bf',n:{ko:'MIND 5 강점 지도',en:'MIND 5 Strength Map',zh:'MIND 5 优势地图',ja:'MIND 5 強みマップ'},d:{ko:'5가지 사고 영역의 강점 모양 · 비공식',en:'Shape of your 5 thinking strengths · unofficial',zh:'五个思维领域的优势形状 · 非正式',ja:'5つの思考領域の強みの形 · 非公式'}}
  };
  var ORDER={react:['mind','prism','bond','nest'],prism:['mind','react','bond','nest'],mind:['react','prism','bond','nest'],bond:['nest','mind','prism','react'],nest:['bond','mind','prism','react']};
  var H={ko:'이어서 해보세요',en:'Try next',zh:'接着试试',ja:'次はこちら'};
  var segs=location.pathname.split('/').filter(Boolean),me=null;
  for(var i=segs.length-1;i>=0;i--){if(ORDER[segs[i]]){me=segs[i];break}}
  if(!me||me==='react')return;      // 반응속도는 자체 목록이 있어요
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function init(){
    var btn=document.querySelector('button[onclick="goHub()"]');if(!btn)return;
    var holder=btn.parentNode;if(!holder||document.getElementById('tlNext'))return;
    var st=document.createElement('style');
    st.textContent='#tlNext{margin:18px 0 14px}#tlNext .h{font-size:12px;letter-spacing:.14em;color:#8f9bb3;margin:0 0 8px;font-weight:700}'
      +'#tlNext a{display:flex;align-items:center;gap:12px;margin:0 0 8px;padding:13px 14px;border:1px solid #2c3550;border-left:4px solid var(--c);border-radius:14px;background:rgba(20,26,42,.9);color:#eef1f8;text-decoration:none}'
      +'#tlNext a:active{transform:scale(.99)}#tlNext .ic{font-size:26px}#tlNext b{display:block;font-size:15px}#tlNext small{display:block;font-size:12.5px;color:#9aa6bf;margin-top:2px}#tlNext i{margin-left:auto;font-style:normal;color:var(--c);font-weight:800}';
    document.head.appendChild(st);
    var box=document.createElement('div');box.id='tlNext';
    holder.parentNode.insertBefore(box,holder);
    function render(){
      var l=(document.documentElement.lang||'ko').slice(0,2);if(!H[l])l='ko';
      box.innerHTML='<div class="h">'+esc(H[l])+'</div>'+ORDER[me].slice(0,2).map(function(k){var t=N[k];
        return '<a href="'+t.u+'" data-tl-next="'+k+'" style="--c:'+t.c+'"><span class="ic">'+t.ic+'</span><span><b>'+esc(t.n[l])+'</b><small>'+esc(t.d[l])+'</small></span><i>→</i></a>'}).join('');
    }
    render();
    new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
