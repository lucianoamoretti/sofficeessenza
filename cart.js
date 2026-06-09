/* Soffice Essenza — persistent shopping cart (localStorage, all pages) */
(function(){
  "use strict";
  var WA = "353834408449", KEY = "se_cart";

  /* ---- i18n (own, syncs with window.I18N.lang) ---- */
  var T = {
    it:{ "Add":"Aggiungi","Add to cart":"Aggiungi al carrello","Added to cart ✓":"Aggiunto al carrello ✓","Your cart":"Il tuo carrello","Your cart is empty":"Il tuo carrello è vuoto","Add candles from any collection.":"Aggiungi candele da qualsiasi collezione.","Total":"Totale","Checkout on WhatsApp":"Ordina su WhatsApp","Clear":"Svuota","Remove":"Rimuovi","Some items will be priced on WhatsApp.":"Alcuni articoli verranno quotati su WhatsApp.","Cart":"Carrello" },
    pt:{ "Add":"Adicionar","Add to cart":"Adicionar ao carrinho","Added to cart ✓":"Adicionado ao carrinho ✓","Your cart":"Seu carrinho","Your cart is empty":"Seu carrinho está vazio","Add candles from any collection.":"Adicione velas de qualquer coleção.","Total":"Total","Checkout on WhatsApp":"Finalizar no WhatsApp","Clear":"Limpar","Remove":"Remover","Some items will be priced on WhatsApp.":"Alguns itens serão cotados no WhatsApp.","Cart":"Carrinho" }
  };
  function lang(){ return (window.I18N && window.I18N.lang) || "en"; }
  function ct(s){ var L=lang(); if(L==="en") return s; return (T[L]&&T[L][s])||s; }

  /* ---- state ---- */
  function load(){ try{ return JSON.parse(localStorage.getItem(KEY)) || []; }catch(e){ return []; } }
  function save(c){ try{ localStorage.setItem(KEY, JSON.stringify(c)); }catch(e){} }
  var cart = load();
  function count(){ var n=0; cart.forEach(function(i){ n+=i.qty; }); return n; }
  function keyOf(i){ return [i.coll||"",i.name||"",i.model||"",i.colour||""].join("|").toLowerCase(); }
  function add(item){
    item.qty = item.qty || 1;
    var k = keyOf(item), found = null;
    cart.forEach(function(i){ if(keyOf(i)===k) found=i; });
    if(found) found.qty += item.qty; else cart.push(item);
    save(cart); render(); toast(ct("Added to cart ✓")); pop();
  }
  function setQty(idx, q){ if(q<=0){ cart.splice(idx,1); } else { cart[idx].qty=q; } save(cart); render(); }

  /* ---- styles ---- */
  var css = ""
  + ".sc *{box-sizing:border-box}"
  + ".sc-fab{position:fixed;left:22px;bottom:22px;z-index:9998;width:58px;height:58px;border:none;border-radius:50%;cursor:pointer;background:#1b1916;color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 30px rgba(0,0,0,.28);transition:transform .25s}"
  + ".sc-fab:hover{transform:scale(1.06)}.sc-fab svg{width:26px;height:26px;fill:none;stroke:#fff;stroke-width:1.7}"
  + ".sc-fab .sc-badge{position:absolute;top:-3px;right:-3px;min-width:20px;height:20px;padding:0 5px;border-radius:10px;background:#a8843f;color:#fff;font:700 11px Inter,sans-serif;display:flex;align-items:center;justify-content:center;border:2px solid #f7f4ef}"
  + ".sc-fab.empty .sc-badge{display:none}"
  + ".sc-fab.bump{animation:sc-bump .4s ease}@keyframes sc-bump{30%{transform:scale(1.18)}}"
  + ".sc-ov{position:fixed;inset:0;z-index:10000;background:rgba(27,25,22,.45);backdrop-filter:blur(3px);opacity:0;pointer-events:none;transition:opacity .3s}"
  + ".sc-ov.open{opacity:1;pointer-events:auto}"
  + ".sc-drawer{position:fixed;top:0;right:0;z-index:10001;width:380px;max-width:92vw;height:100%;background:#f7f4ef;display:flex;flex-direction:column;box-shadow:-20px 0 60px rgba(0,0,0,.25);transform:translateX(100%);transition:transform .32s cubic-bezier(.3,.8,.3,1);font-family:Inter,system-ui,sans-serif}"
  + ".sc-drawer.open{transform:none}"
  + ".sc-h{display:flex;align-items:center;gap:10px;padding:20px 20px;border-bottom:1px solid #e6ded3}"
  + ".sc-h b{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:600;color:#1b1916;flex:1}"
  + ".sc-x{border:none;background:none;font-size:24px;line-height:1;color:#6b6358;cursor:pointer;padding:4px}"
  + ".sc-items{flex:1;overflow-y:auto;padding:8px 16px}"
  + ".sc-empty{text-align:center;color:#6b6358;padding:60px 20px}.sc-empty b{display:block;font-family:'Cormorant Garamond',serif;font-style:italic;font-size:22px;color:#1b1916;margin-bottom:8px}.sc-empty span{font-size:13px}"
  + ".sc-it{display:flex;gap:12px;padding:16px 4px;border-bottom:1px solid #ece4d8}"
  + ".sc-it-main{flex:1;min-width:0}"
  + ".sc-it .nm{font-family:'Cormorant Garamond',serif;font-size:19px;font-weight:500;color:#1b1916}"
  + ".sc-it .mt{font-size:12px;color:#6b6358;margin-top:2px}"
  + ".sc-it .cl{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#a8843f;font-weight:600;margin-top:4px}"
  + ".sc-it-r{display:flex;flex-direction:column;align-items:flex-end;justify-content:space-between;gap:8px}"
  + ".sc-pr{font-size:14px;color:#1b1916;white-space:nowrap}"
  + ".sc-qty{display:flex;align-items:center;gap:0;border:1px solid #d8cdbb;border-radius:30px;overflow:hidden}"
  + ".sc-qty button{border:none;background:#fff;width:28px;height:28px;cursor:pointer;color:#1b1916;font-size:15px;line-height:1}"
  + ".sc-qty button:hover{background:#f1ece4}.sc-qty span{min-width:26px;text-align:center;font-size:13px}"
  + ".sc-rm{border:none;background:none;color:#bd3b3b;font-size:11px;cursor:pointer;text-transform:uppercase;letter-spacing:1px}"
  + ".sc-f{padding:18px 20px;border-top:1px solid #e6ded3;background:#f1ece4}"
  + ".sc-tot{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px}"
  + ".sc-tot span:first-child{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#6b6358;font-weight:600}"
  + ".sc-tot b{font-family:'Cormorant Garamond',serif;font-size:28px;color:#1b1916}"
  + ".sc-note{font-size:11px;color:#9c9488;margin-bottom:14px}"
  + ".sc-co{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;border:none;cursor:pointer;background:#25D366;color:#fff;font:600 12px Inter,sans-serif;letter-spacing:1.5px;text-transform:uppercase;padding:15px;border-radius:40px;transition:transform .2s}"
  + ".sc-co:hover{transform:translateY(-2px)}.sc-co svg{width:17px;height:17px;fill:#fff}"
  + ".sc-clear{display:block;margin:12px auto 0;border:none;background:none;color:#9c9488;font-size:11px;letter-spacing:1px;text-transform:uppercase;cursor:pointer}"
  + ".sc-clear:hover{color:#bd3b3b}"
  + ".sc-add{font:600 11px Inter,sans-serif;letter-spacing:1.5px;text-transform:uppercase;color:#fff;background:#1b1916;border:none;border-radius:30px;padding:9px 16px;cursor:pointer;transition:background .2s,transform .2s;display:inline-flex;align-items:center;gap:6px}"
  + ".sc-add:hover{background:#a8843f;transform:translateY(-1px)}"
  + ".sc-toast{position:fixed;left:50%;bottom:92px;transform:translateX(-50%) translateY(12px);z-index:10002;background:#1b1916;color:#fff;font:500 13px Inter,sans-serif;padding:11px 20px;border-radius:30px;box-shadow:0 10px 30px rgba(0,0,0,.25);opacity:0;pointer-events:none;transition:opacity .25s,transform .25s}"
  + ".sc-toast.show{opacity:1;transform:translateX(-50%) translateY(0)}"
  + "@media(max-width:480px){.sc-fab{left:14px;bottom:14px}}";
  var st=document.createElement("style"); st.textContent=css; document.head.appendChild(st);

  /* ---- dom ---- */
  var root=document.createElement("div"); root.className="sc";
  root.innerHTML = ''
    + '<button class="sc-fab empty" aria-label="Cart"><span class="sc-badge">0</span>'
    +   '<svg viewBox="0 0 24 24"><path d="M6 7h12l-1 12H7L6 7z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg></button>'
    + '<div class="sc-ov"></div>'
    + '<aside class="sc-drawer" role="dialog" aria-label="Shopping cart">'
    +   '<div class="sc-h"><b class="sc-title">Your cart</b><button class="sc-x" aria-label="Close">&times;</button></div>'
    +   '<div class="sc-items"></div>'
    +   '<div class="sc-f"></div>'
    + '</aside>'
    + '<div class="sc-toast"></div>';
  document.body.appendChild(root);
  var fab=root.querySelector(".sc-fab"), badge=root.querySelector(".sc-badge"), ov=root.querySelector(".sc-ov"),
      drawer=root.querySelector(".sc-drawer"), itemsEl=root.querySelector(".sc-items"), footEl=root.querySelector(".sc-f"),
      titleEl=root.querySelector(".sc-title"), toastEl=root.querySelector(".sc-toast");

  var toastTimer;
  function toast(msg){ toastEl.textContent=msg; toastEl.classList.add("show"); clearTimeout(toastTimer); toastTimer=setTimeout(function(){ toastEl.classList.remove("show"); },1800); }
  function pop(){ fab.classList.remove("bump"); void fab.offsetWidth; fab.classList.add("bump"); }

  function lineLabel(i){ var p=[]; if(i.model) p.push(i.model); if(i.colour) p.push(i.colour); return p.join(" · "); }
  function render(){
    var n=count();
    badge.textContent=n; fab.classList.toggle("empty", n===0);
    titleEl.textContent = ct("Your cart") + (n? " ("+n+")":"");
    if(!cart.length){
      itemsEl.innerHTML = '<div class="sc-empty"><b>'+ct("Your cart is empty")+'</b><span>'+ct("Add candles from any collection.")+'</span></div>';
      footEl.innerHTML=""; return;
    }
    var html="", total=0, anyNull=false;
    cart.forEach(function(i,idx){
      var price = (typeof i.price==="number") ? i.price : null;
      if(price!=null) total += price*i.qty; else anyNull=true;
      html += '<div class="sc-it"><div class="sc-it-main">'
        + '<div class="cl">'+esc(i.coll||"")+'</div>'
        + '<div class="nm">'+esc(i.name||"")+'</div>'
        + (lineLabel(i)?'<div class="mt">'+esc(lineLabel(i))+'</div>':'')
        + '<button class="sc-rm" data-rm="'+idx+'">'+ct("Remove")+'</button>'
        + '</div><div class="sc-it-r">'
        + '<div class="sc-pr">'+(price!=null?('€ '+(price*i.qty)):'—')+'</div>'
        + '<div class="sc-qty"><button data-dec="'+idx+'">−</button><span>'+i.qty+'</span><button data-inc="'+idx+'">+</button></div>'
        + '</div></div>';
    });
    itemsEl.innerHTML=html;
    var foot = '<div class="sc-tot"><span>'+ct("Total")+'</span><b>€ '+total+(anyNull?'+':'')+'</b></div>';
    if(anyNull) foot += '<div class="sc-note">'+ct("Some items will be priced on WhatsApp.")+'</div>';
    foot += '<button class="sc-co"><svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2z"/></svg>'+ct("Checkout on WhatsApp")+'</button>';
    foot += '<button class="sc-clear">'+ct("Clear")+'</button>';
    footEl.innerHTML=foot;
    itemsEl.querySelectorAll("[data-inc]").forEach(function(b){ b.onclick=function(){ setQty(+b.dataset.inc, cart[+b.dataset.inc].qty+1); }; });
    itemsEl.querySelectorAll("[data-dec]").forEach(function(b){ b.onclick=function(){ setQty(+b.dataset.dec, cart[+b.dataset.dec].qty-1); }; });
    itemsEl.querySelectorAll("[data-rm]").forEach(function(b){ b.onclick=function(){ setQty(+b.dataset.rm, 0); }; });
    footEl.querySelector(".sc-co").onclick=checkout;
    footEl.querySelector(".sc-clear").onclick=function(){ cart=[]; save(cart); render(); };
  }
  function esc(s){ return (""+s).replace(/&/g,"&amp;").replace(/</g,"&lt;"); }

  function checkout(){
    if(!cart.length) return;
    var lines=["Hi! I'd like to order from Soffice Essenza.",""], total=0, anyNull=false;
    cart.forEach(function(i){
      var p=(typeof i.price==="number")?i.price:null; if(p!=null) total+=p*i.qty; else anyNull=true;
      var l="• "+i.qty+"× "+i.name+" ("+(i.coll||"")+")"; var opt=lineLabel(i); if(opt) l+=" — "+opt;
      if(p!=null) l+=" — €"+(p*i.qty);
      lines.push(l);
    });
    lines.push(""); lines.push("Total: €"+total+(anyNull?" + items to confirm":""));
    window.open("https://wa.me/"+WA+"?text="+encodeURIComponent(lines.join("\n")), "_blank", "noopener");
  }

  function open(){ ov.classList.add("open"); drawer.classList.add("open"); document.body.style.overflow="hidden"; render(); }
  function close(){ ov.classList.remove("open"); drawer.classList.remove("open"); document.body.style.overflow=""; }
  fab.onclick=open; ov.onclick=close; root.querySelector(".sc-x").onclick=close;
  document.addEventListener("keydown", function(e){ if(e.key==="Escape" && drawer.classList.contains("open")) close(); });

  /* ---- auto-wire product cards (.product) ---- */
  function num(s){ var m=(""+s).replace(",",".").match(/\d+(\.\d+)?/); return m? parseFloat(m[0]) : null; }
  function wire(){
    document.querySelectorAll(".product").forEach(function(card){
      var foot = card.querySelector(".product-foot"); if(!foot || foot.querySelector(".sc-add")) return;
      var name = (card.querySelector(".product-name")||{}).textContent || "";
      var coll = (card.querySelector(".product-coll")||{}).textContent || "";
      var price = num((card.querySelector(".product-price")||{}).textContent || "");
      var b=document.createElement("button"); b.className="sc-add"; b.type="button"; b.textContent=ct("Add");
      b.onclick=function(e){ e.preventDefault(); add({ coll:coll.trim(), name:name.trim(), price:price, qty:1 }); };
      var buy=foot.querySelector(".btn-buy");
      if(buy){ var wrap=document.createElement("span"); wrap.style.cssText="display:flex;gap:8px;align-items:center"; buy.parentNode.insertBefore(wrap,buy); wrap.appendChild(buy); wrap.appendChild(b); }
      else foot.appendChild(b);
    });
  }

  /* ---- public API (used by scents.html modal) ---- */
  window.SECart = { add:add, open:open };

  window.addEventListener("se-lang", function(){ wire2labels(); render(); });
  function wire2labels(){ root.querySelectorAll(".sc-add").forEach(function(b){ b.textContent=ct("Add"); }); }

  wire(); render();
})();
