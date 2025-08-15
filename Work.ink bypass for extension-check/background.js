(() =>{
    "use strict";
    const __awaiter=this && this.__awaiter || function (t,r,n,e){
      return new (n || (n=Promise))((function (o,i){
        function c(t){try{a(e.next(t))} catch (t){i(t)}}
        function s(t){try{a(e.throw(t))} catch (t){i(t)}}
        function a(t){
          var r;
          t.done?o(t.value):(r=t.value,r instanceof n ? r :new n((function (t){t(r);}))).then(c,s);
        }
        a((e=e.apply(t,r||[])).next());
      }));
    };
    chrome.tabs.query({active:true,currentWindow:true},() =>{});
    chrome.runtime.onMessageExternal.addListener((msg,sender,respond) =>{
      if (msg && msg.message==="wk_installed"){
        respond({installed:true,name:"pdfeditor"});
      }
      return true;
    });
    chrome.runtime.onMessage.addListener((msg,sender,respond) =>{
      if (msg.type==="checkRedirect"){
        const key="redirected_" + msg.host;
        chrome.storage.session.get([key]).then(result =>{
          const timestamp=result[key];
          if (timestamp && timestamp + 3600000 >= Date.now()){
            respond(true);
          } else{
            chrome.storage.session.remove(key).then(() => respond(false));
          }
        });
        return true;
      }
      if (msg.type==="setRedirect"){
        const key="redirected_"+msg.host;
        const data={};
        data[key]=Date.now();
        chrome.storage.session.set(data).then(() => respond(true));
        return true;
      }
      if (msg.type==="getFingerprint"){
        chrome.storage.local.get(["fingerprint"]).then(__awaiter(void 0,void 0,void 0,function* (){
          let fingerprint=yield chrome.storage.local.get(["fingerprint"]);
          if (!fingerprint.fingerprint){
            fingerprint="pdfeditor-"+crypto.randomUUID();
            yield chrome.storage.local.set({fingerprint});
          }else{
            fingerprint=fingerprint.fingerprint;
          }
          respond(fingerprint);
        }));
        return true;
      }
      if (msg.type==="getAdblockerStatus"){
        respond(0);
        return true;
      }
      return false;
    });
    chrome.storage.session.setAccessLevel({accessLevel:"TRUSTED_AND_UNTRUSTED_CONTEXTS" });
      __awaiter(void 0,void 0,void 0,function* (){
      const{fingerprint}=yield chrome.storage.local.get(["fingerprint"]);
      if (!fingerprint){
        yield chrome.storage.local.set({fingerprint:"pdfeditor-"+crypto.randomUUID()});
      }
    });
  })();