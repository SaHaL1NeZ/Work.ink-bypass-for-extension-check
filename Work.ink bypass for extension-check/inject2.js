(() => {
    "use strict";
    ({ 428: function () {
      (this && this.__awaiter || function (t, n, e, o) {
        return new (e || (e = Promise))((function (i, r) {
          function c(t) { try { a(o.next(t)) } catch (t) { r(t) } }
          function s(t) { try { a(o.throw(t)) } catch (t) { r(t) } }
          function a(t) {
            var n;
            t.done ? i(t.value) : (n = t.value, n instanceof e ? n : new e((function (t) { t(n); }))).then(c, s);
          }
          a((o = o.apply(t, n || [])).next());
        }));
      })(void 0, void 0, void 0, (function* () {
        const t = window.location.href;
        if (!t || "" == t.trim() || !t.startsWith("http")) return;
        const n = yield chrome.runtime.sendMessage({ type: "getFingerprint" }),
              e = 0,
              o = yield fetch(`https://pass.work.ink/redirect/${encodeURIComponent(btoa(null != t ? t : ""))}?fingerprint=${encodeURIComponent(n)}&adblockerInstalled=${e}&base64=1&json=1`),
              i = yield o.json();
        i.noRedirect || (window.location.href = i.to);
      }));
    } })[428]();
  })();