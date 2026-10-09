/* TEST LAB 익명 이용 통계 — 응답·결과·개인정보는 보내지 않습니다.
   보내는 것: 임의 세션ID(탭을 닫으면 사라짐), 페이지, 이벤트 종류, 유입 경로(도메인만), 기기 구분(모바일/PC), 언어.
   끄기: 주소 끝에 ?notrack=1 (이 기기에서 영구 제외, ?notrack=0 으로 해제). 브라우저의 'Do Not Track'도 존중합니다. */
(function(){
  var S=window.SITE||{};
  if(!S.TRACK_URL||!S.TRACK_KEY)return;
  if(navigator.doNotTrack==='1'||window.doNotTrack==='1')return;
  try{
    var q=new URLSearchParams(location.search);
    if(q.get('notrack')==='1')localStorage.setItem('tl_off','1');
    if(q.get('notrack')==='0')localStorage.removeItem('tl_off');
    if(localStorage.getItem('tl_off')==='1')return;
  }catch(e){}
  var KNOWN=['react','prism','bond','nest','mind','about','privacy','terms','contact'];
  var segs=location.pathname.split('/').filter(Boolean),test='hub';
  for(var i=segs.length-1;i>=0;i--){if(KNOWN.indexOf(segs[i])>=0){test=segs[i];break}}
  var ss={get:function(k){try{return sessionStorage.getItem(k)}catch(e){return null}},set:function(k,v){try{sessionStorage.setItem(k,v)}catch(e){}}};
  var sid=ss.get('tl_sid');
  if(!sid){sid=(Math.random().toString(36).slice(2,8)+Date.now().toString(36)).slice(0,20);ss.set('tl_sid',sid)}
  var prev=ss.get('tl_last');ss.set('tl_last',test);
  var src=null,ref=null;
  try{
    if(document.referrer){
      var u=new URL(document.referrer);
      if(u.host===location.host){if(prev&&prev!==test)src=prev}
      else ref=u.hostname.slice(0,60);
    }
  }catch(e){}
  var shared=/(^|[#&])r=/.test(location.hash);
  var dev=/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)?'m':'d';
  function lang(){return (document.documentElement.lang||'ko').slice(0,5)}
  function send(ev,arg,extra){
    var b={sid:sid,test:test,ev:ev,lang:lang(),dev:dev,shared:shared};
    if(arg)b.arg=String(arg).slice(0,30);
    if(extra){for(var k in extra)b[k]=extra[k]}
    try{
      fetch(S.TRACK_URL+'/rest/v1/tl_events',{method:'POST',keepalive:true,
        headers:{apikey:S.TRACK_KEY,Authorization:'Bearer '+S.TRACK_KEY,'Content-Type':'application/json',Prefer:'return=minimal'},
        body:JSON.stringify(b)}).catch(function(){});
    }catch(e){}
  }
  window.TL={send:send,test:test};
  function boot(){
    send('view',null,{src:src,ref:ref});
    var started=false,done=false;
    function check(){
      var a=document.querySelector('.screen.active');if(!a)return;
      var id=a.id;
      if(id==='intro'){started=false;done=false;return}
      if(id==='result'){if(started&&!done){done=true;send('complete')}return}
      if(!started){started=true;done=false;send('start')}
    }
    if(document.querySelector('.screen')){
      new MutationObserver(check).observe(document.body,{attributes:true,subtree:true,attributeFilter:['class']});
      check();
    }
    function wrap(name,fn){
      var o=window[name];if(typeof o!=='function')return;
      window[name]=function(){try{fn.apply(null,arguments)}catch(e){}return o.apply(this,arguments)};
    }
    wrap('share',function(p){send('share',p||'link')});
    wrap('shareChal',function(){send('share','native')});
    wrap('copyRes',function(){send('share','copy')});
    wrap('goHub',function(){send('hub')});
    wrap('openTest',function(i){var t=(typeof TESTS!=='undefined')?TESTS:null;var u=(t&&t[i]&&t[i].u)||'';send('next',u.replace(/[^a-z]/g,''))});
    document.addEventListener('click',function(e){
      var a=e.target.closest&&e.target.closest('[data-tl-next]');
      if(a)send('next',a.getAttribute('data-tl-next'));
      var c=e.target.closest&&e.target.closest('a.card[href]');
      if(c&&test==='hub'){var m=(c.getAttribute('href')||'').match(/\.\/([a-z]+)\//);if(m)send('next',m[1])}
    },true);
  }
  if(document.readyState==='complete')boot();else window.addEventListener('load',boot);
})();
