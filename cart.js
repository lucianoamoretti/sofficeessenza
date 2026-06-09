/* Soffice Essenza — persistent shopping cart (localStorage, all pages) */
(function(){
  "use strict";
  var WA = "353834408449", KEY = "se_cart";

  /* ---- i18n (own, syncs with window.I18N.lang) ---- */
  var T = {
    it:{ "Add":"Aggiungi","Add to cart":"Aggiungi al carrello","Added to cart ✓":"Aggiunto al carrello ✓","Your cart":"Il tuo carrello","Your cart is empty":"Il tuo carrello è vuoto","Add candles from any collection.":"Aggiungi candele da qualsiasi collezione.","Total":"Totale","Checkout on WhatsApp":"Ordina su WhatsApp","Clear":"Svuota","Remove":"Rimuovi","Some items will be priced on WhatsApp.":"Alcuni articoli verranno quotati su WhatsApp.","Cart":"Carrello","Choose":"Scegli","Choose your scent":"Scegli il profumo","Suggested":"Consigliati","Show all scents":"Mostra tutti i profumi","Hide scents":"Nascondi profumi","Colour":"Colore","Quantity":"Quantità","Decorative · unscented":"Decorativa · senza profumo","Other colour…":"Altro colore…","Choose a scent and colour":"Scegli profumo e colore","Choose a colour":"Scegli un colore","Order on WhatsApp":"Ordina su WhatsApp" },
    pt:{ "Add":"Adicionar","Add to cart":"Adicionar ao carrinho","Added to cart ✓":"Adicionado ao carrinho ✓","Your cart":"Seu carrinho","Your cart is empty":"Seu carrinho está vazio","Add candles from any collection.":"Adicione velas de qualquer coleção.","Total":"Total","Checkout on WhatsApp":"Finalizar no WhatsApp","Clear":"Limpar","Remove":"Remover","Some items will be priced on WhatsApp.":"Alguns itens serão cotados no WhatsApp.","Cart":"Carrinho","Choose":"Escolher","Choose your scent":"Escolha o aroma","Suggested":"Sugeridos","Show all scents":"Ver todos os aromas","Hide scents":"Ocultar aromas","Colour":"Cor","Quantity":"Quantidade","Decorative · unscented":"Decorativa · sem perfume","Other colour…":"Outra cor…","Choose a scent and colour":"Escolha aroma e cor","Choose a colour":"Escolha uma cor","Order on WhatsApp":"Pedir no WhatsApp" }
  };
  function lang(){ return (window.I18N && window.I18N.lang) || "en"; }
  function ct(s){ var L=lang(); if(L==="en") return s; return (T[L]&&T[L][s])||s; }

  /* ---- state ---- */
  function load(){ try{ return JSON.parse(localStorage.getItem(KEY)) || []; }catch(e){ return []; } }
  function save(c){ try{ localStorage.setItem(KEY, JSON.stringify(c)); }catch(e){} }
  var cart = load();
  function count(){ var n=0; cart.forEach(function(i){ n+=i.qty; }); return n; }
  function keyOf(i){ return [i.coll||"",i.name||"",i.scent||"",i.model||"",i.colour||"",i.note||""].join("|").toLowerCase(); }
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

  function lineLabel(i){ var p=[]; if(i.scent) p.push(i.scent); if(i.model) p.push(i.model); if(i.colour) p.push(i.colour); return p.join(" · "); }
  function render(){
    var n=count();
    badge.textContent=n; fab.classList.toggle("empty", n===0);
    titleEl.textContent = ct("Your cart") + (n? " ("+n+")":"");
    try{ window.dispatchEvent(new CustomEvent("se-cart")); }catch(e){}
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
        + (i.note?'<div class="mt">“'+esc(i.note)+'”</div>':'')
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
    var nm=""; try{ nm=localStorage.getItem("se_name")||""; }catch(e){}
    if(nm){ lines.splice(1,0,"Name: "+nm); }
    cart.forEach(function(i){
      var p=(typeof i.price==="number")?i.price:null; if(p!=null) total+=p*i.qty; else anyNull=true;
      var l="• "+i.qty+"× "+i.name+" ("+(i.coll||"")+")"; var opt=lineLabel(i); if(opt) l+=" — "+opt;
      if(i.note) l+=" — “"+i.note+"”";
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

  /* ---- product configurator (scent + colour) ---- */
  function num(s){ var m=(""+s).replace(",",".").match(/\d+(\.\d+)?/); return m? parseFloat(m[0]) : null; }
  var SCENTS={
    "Sweet & Gourmand":["Vanilla","Salted Caramel","Strawberry & Rhubarb","Blueberry & Vanilla","Matcha & Coconut","Cinnamon","Christmas Spice","Vanilla Cream"],
    "Floral":["Rose & Champagne","Golden Mimosa & Amber","Lavender","BBW Japanese Cherry Blossom"],
    "Citrus & Fresh":["Lemon","Lemongrass","Sweet Lime","Passion Fruit & Mango","Watermelon Lemonade","Kyoto Matcha & Coconut"],
    "Aromatic & Natural":["Sandalwood"],
    "Soft & Clean":["Baby Powder","Cotton","Spring Unstoppables"],
    "Warm & Woody":["Crackling Log Fire","Mahogany Teakwood","Warming Cashmere"],
    "Signature":["French Vanilla","Lavender, Chamomile & Vanilla","Nag Champa","Dove","Euphoria Woman","Golden Mimosa"]
  };
  var ALLSC=[]; Object.keys(SCENTS).forEach(function(k){ ALLSC=ALLSC.concat(SCENTS[k]); });
  var COLP=[["White","#f4f1ea"],["Cream","#efe2c8"],["Sand","#e3cfa3"],["Gold","#c9a86a"],["Yellow","#ffd166"],["Orange","#f4a261"],["Coral","#ff7f6b"],["Red","#e63946"],["Pink","#ff8fab"],["Fuchsia","#d6336c"],["Purple","#8338ec"],["Lavender","#b8a4e3"],["Navy","#2b3a67"],["Blue","#3a86ff"],["Sky","#7ec8e3"],["Teal","#2a9d8f"],["Green","#4caf50"],["Sage","#9caf88"],["Brown","#8a5a44"],["Grey","#9aa0a6"],["Black","#2b2b2b"]];
  var PRIDE6=[["Red","#e63946"],["Orange","#f4a261"],["Yellow","#ffd166"],["Green","#2a9d8f"],["Blue","#3a86ff"],["Purple","#8338ec"]];
  function suggest(coll){ var c=(coll||"").toLowerCase();
    if(c.indexOf("mare")>=0) return ["Sweet Lime","Lemongrass","Passion Fruit & Mango","Watermelon Lemonade","Sandalwood"];
    if(c.indexOf("mini")>=0) return ["Vanilla","Baby Powder","Cotton","Vanilla Cream","Spring Unstoppables"];
    if(c.indexOf("namast")>=0) return ["Sandalwood","Lavender","Nag Champa","Lavender, Chamomile & Vanilla","French Vanilla"];
    if(c.indexOf("carezza")>=0) return ["Lavender","Lavender, Chamomile & Vanilla","Sandalwood","Vanilla","Rose & Champagne"];
    return ["Vanilla","Lavender","Sandalwood","Lemon","Rose & Champagne"];
  }

  var ccss=".sc-cfg-ov{position:fixed;inset:0;z-index:10003;background:rgba(27,25,22,.5);backdrop-filter:blur(4px);opacity:0;pointer-events:none;transition:opacity .25s}"
  + ".sc-cfg-ov.open{opacity:1;pointer-events:auto}"
  + ".sc-cfg{position:fixed;z-index:10004;left:50%;top:50%;transform:translate(-50%,-46%);opacity:0;pointer-events:none;width:460px;max-width:calc(100vw - 28px);max-height:calc(100vh - 40px);overflow:auto;background:#f7f4ef;border-radius:16px;box-shadow:0 30px 80px rgba(0,0,0,.3);transition:opacity .25s,transform .25s;font-family:Inter,system-ui,sans-serif}"
  + ".sc-cfg.open{opacity:1;pointer-events:auto;transform:translate(-50%,-50%)}"
  + ".sc-cfg-x{position:absolute;right:14px;top:14px;border:none;background:#fff;width:34px;height:34px;border-radius:50%;font-size:18px;color:#6b6358;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.08);z-index:2}"
  + ".sc-cfg-head{display:flex;gap:14px;align-items:center;padding:22px 22px 4px}"
  + ".sc-cfg-thumb{width:62px;height:78px;border-radius:8px;background:#ece3d7;background-size:cover;background-position:center;flex-shrink:0}"
  + ".sc-cfg-head .cl{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#a8843f;font-weight:600}"
  + ".sc-cfg-head .nm{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:600;color:#1b1916;line-height:1.1}"
  + ".sc-cfg-head .pr{font-size:15px;color:#1b1916;margin-top:2px}"
  + ".sc-cfg-body{padding:8px 22px 4px}"
  + ".sc-cfg .lbl{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#6b6358;font-weight:600;margin:18px 0 10px}"
  + ".sc-cfg .lbl .sg{color:#a8843f;text-transform:none;letter-spacing:0;font-weight:500;font-style:italic}"
  + ".sc-cfg-chips{display:flex;flex-wrap:wrap;gap:7px}"
  + ".sc-cfg-chip{font-size:12.5px;color:#1b1916;background:#fff;border:1px solid #d8cdbb;border-radius:30px;padding:8px 13px;cursor:pointer;transition:all .15s}"
  + ".sc-cfg-chip:hover{border-color:#a8843f}.sc-cfg-chip.sugg{border-color:#caa14d;background:#fbf3e4}.sc-cfg-chip.sel{background:#1b1916;color:#fff;border-color:#1b1916}"
  + ".sc-allbtn{margin-top:12px;border:none;background:none;color:#a8843f;font-size:12px;cursor:pointer;text-decoration:underline;font-family:inherit}"
  + ".sc-allwrap{margin-top:10px;max-height:168px;overflow:auto}"
  + ".sc-cfg-cols{display:flex;flex-wrap:wrap;gap:9px}"
  + ".sc-cfg-col{width:32px;height:32px;border-radius:50%;cursor:pointer;border:2px solid transparent;outline:1px solid #d8cdbb;outline-offset:-1px;transition:transform .15s}"
  + ".sc-cfg-col:hover{transform:scale(1.1)}.sc-cfg-col.sel{border-color:#fff;box-shadow:0 0 0 2px #1b1916}"
  + ".sc-cfg-other{width:100%;margin-top:10px;border:1px solid #d8cdbb;border-radius:8px;padding:10px 13px;font-family:inherit;font-size:14px;outline:none}.sc-cfg-other:focus{border-color:#a8843f}"
  + ".sc-cfg-qty{display:inline-flex;align-items:center;border:1px solid #d8cdbb;border-radius:30px;overflow:hidden}"
  + ".sc-cfg-qty button{border:none;background:#fff;width:34px;height:34px;cursor:pointer;font-size:16px}.sc-cfg-qty span{min-width:30px;text-align:center}"
  + ".sc-cfg-foot{padding:14px 22px 22px;position:sticky;bottom:0;background:#f7f4ef}"
  + ".sc-cfg-add{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;border:none;cursor:pointer;background:#1b1916;color:#fff;font:600 12px Inter,sans-serif;letter-spacing:1.5px;text-transform:uppercase;padding:15px;border-radius:40px;transition:background .2s,opacity .2s}"
  + ".sc-cfg-add:hover{background:#a8843f}.sc-cfg-add[disabled]{opacity:.4;cursor:not-allowed;background:#9c9488}"
  + ".sc-cfg-hint{text-align:center;font-size:11px;color:#9c9488;margin-top:8px}"
  + "@media(max-width:520px){.sc-cfg{top:auto;bottom:0;transform:translate(-50%,110%);width:100%;max-width:100%;border-radius:18px 18px 0 0;max-height:92vh}.sc-cfg.open{transform:translateX(-50%)}}";
  var cst=document.createElement("style"); cst.textContent=ccss; document.head.appendChild(cst);

  var cfgRoot=document.createElement("div"); cfgRoot.className="sc";
  cfgRoot.innerHTML='<div class="sc-cfg-ov"></div><div class="sc-cfg" role="dialog" aria-modal="true">'
    +'<button class="sc-cfg-x" aria-label="Close">&times;</button>'
    +'<div class="sc-cfg-head"><div class="sc-cfg-thumb"></div><div><div class="cl"></div><div class="nm"></div><div class="pr"></div></div></div>'
    +'<div class="sc-cfg-body">'
    +'<div class="sc-scent"><p class="lbl sc-scentlbl"></p><div class="sc-cfg-chips sc-sugg"></div><button class="sc-allbtn" type="button"></button><div class="sc-allwrap sc-cfg-chips" hidden></div></div>'
    +'<p class="lbl sc-collbl"></p><div class="sc-cfg-cols"></div><input class="sc-cfg-other" type="text" autocomplete="off">'
    +'<p class="lbl sc-qtylbl"></p><div class="sc-cfg-qty"><button type="button" data-d>&minus;</button><span class="sc-qn">1</span><button type="button" data-u>+</button></div>'
    +'</div><div class="sc-cfg-foot"><button class="sc-cfg-add"></button><p class="sc-cfg-hint"></p></div></div>';
  document.body.appendChild(cfgRoot);
  var cOv=cfgRoot.querySelector(".sc-cfg-ov"), cBox=cfgRoot.querySelector(".sc-cfg"),
      cThumb=cfgRoot.querySelector(".sc-cfg-thumb"), cCl=cfgRoot.querySelector(".cl"), cNm=cfgRoot.querySelector(".nm"), cPr=cfgRoot.querySelector(".pr"),
      cScent=cfgRoot.querySelector(".sc-scent"), cScentLbl=cfgRoot.querySelector(".sc-scentlbl"), cSugg=cfgRoot.querySelector(".sc-sugg"),
      cAllBtn=cfgRoot.querySelector(".sc-allbtn"), cAll=cfgRoot.querySelector(".sc-allwrap"),
      cCollbl=cfgRoot.querySelector(".sc-collbl"), cCols=cfgRoot.querySelector(".sc-cfg-cols"), cOther=cfgRoot.querySelector(".sc-cfg-other"),
      cQtyLbl=cfgRoot.querySelector(".sc-qtylbl"), cQn=cfgRoot.querySelector(".sc-qn"), cAdd=cfgRoot.querySelector(".sc-cfg-add"), cHint=cfgRoot.querySelector(".sc-cfg-hint");
  var cfg={};
  function cClose(){ cOv.classList.remove("open"); cBox.classList.remove("open"); document.body.style.overflow=""; }
  function cUpd(){
    var ok = cfg.colour && (cfg.isPride || cfg.scent);
    cAdd.disabled=!ok; cHint.style.display=ok?"none":"block";
  }
  function selScent(v){ cfg.scent=v; cfgRoot.querySelectorAll(".sc-scent .sc-cfg-chip").forEach(function(x){ x.classList.toggle("sel", x.getAttribute("data-s")===v); }); cUpd(); }
  function chip(v,sugg){ var b=document.createElement("button"); b.type="button"; b.className="sc-cfg-chip"+(sugg?" sugg":""); b.setAttribute("data-s",v); b.textContent=v; b.onclick=function(){ selScent(v); }; return b; }
  function openConfig(prod){
    cfg={ prod:prod, scent:null, colour:null, qty:1, isPride:/pride/i.test(prod.coll) };
    cCl.textContent=prod.coll; cNm.textContent=prod.name; cPr.textContent=(typeof prod.price==="number")?("€ "+prod.price):"";
    if(prod.img){ cThumb.style.display=""; cThumb.style.backgroundImage="url('"+prod.img+"')"; } else { cThumb.style.display="none"; }
    cOther.placeholder=ct("Other colour…"); cOther.value="";
    cQtyLbl.textContent=ct("Quantity"); cQn.textContent="1";
    /* scent */
    if(cfg.isPride){ cScent.style.display="none"; }
    else {
      cScent.style.display="";
      cScentLbl.innerHTML=ct("Choose your scent")+' <span class="sg">· '+ct("Suggested")+'</span>';
      cSugg.innerHTML=""; suggest(prod.coll).forEach(function(s){ cSugg.appendChild(chip(s,true)); });
      cAll.innerHTML=""; ALLSC.forEach(function(s){ cAll.appendChild(chip(s,false)); });
      cAll.hidden=true; cAllBtn.textContent=ct("Show all scents");
      cAllBtn.onclick=function(){ cAll.hidden=!cAll.hidden; cAllBtn.textContent=cAll.hidden?ct("Show all scents"):ct("Hide scents"); };
    }
    /* colour */
    cCollbl.textContent=ct("Colour");
    var pal=cfg.isPride?PRIDE6:COLP;
    cCols.innerHTML="";
    pal.forEach(function(c){ var b=document.createElement("button"); b.type="button"; b.className="sc-cfg-col"; b.title=c[0]; b.style.background=c[1];
      b.onclick=function(){ cfgRoot.querySelectorAll(".sc-cfg-col").forEach(function(x){ x.classList.remove("sel"); }); b.classList.add("sel"); cOther.value=""; cfg.colour=c[0]; cUpd(); }; cCols.appendChild(b); });
    cAdd.textContent=ct("Add to cart"); cHint.textContent=cfg.isPride?ct("Choose a colour"):ct("Choose a scent and colour");
    cUpd();
    cOv.classList.add("open"); cBox.classList.add("open"); document.body.style.overflow="hidden"; cBox.scrollTop=0;
  }
  cOther.addEventListener("input",function(){ var v=cOther.value.trim(); if(v){ cfgRoot.querySelectorAll(".sc-cfg-col").forEach(function(x){ x.classList.remove("sel"); }); cfg.colour=v; } else cfg.colour=null; cUpd(); });
  cfgRoot.querySelector(".sc-cfg-qty [data-u]").onclick=function(){ cfg.qty++; cQn.textContent=cfg.qty; };
  cfgRoot.querySelector(".sc-cfg-qty [data-d]").onclick=function(){ if(cfg.qty>1){ cfg.qty--; cQn.textContent=cfg.qty; } };
  cAdd.onclick=function(){ if(cAdd.disabled) return; add({ coll:cfg.prod.coll, name:cfg.prod.name, scent:cfg.isPride?null:cfg.scent, colour:cfg.colour, price:(typeof cfg.prod.price==="number"?cfg.prod.price:null), qty:cfg.qty }); cClose(); };
  cOv.onclick=cClose; cfgRoot.querySelector(".sc-cfg-x").onclick=cClose;
  document.addEventListener("keydown",function(e){ if(e.key==="Escape" && cBox.classList.contains("open")) cClose(); });

  /* ---- auto-wire product cards: clicking opens the configurator ---- */
  function wire(){
    document.querySelectorAll(".product").forEach(function(card){
      if(card.getAttribute("data-sc")) return; card.setAttribute("data-sc","1");
      var name=(card.querySelector(".product-name")||{}).textContent||"";
      var coll=(card.querySelector(".product-coll")||{}).textContent||"";
      var price=num((card.querySelector(".product-price")||{}).textContent||"");
      var imgEl=card.querySelector(".product-media img");
      var prod={ coll:coll.trim(), name:name.trim(), price:price, img:imgEl?imgEl.getAttribute("src"):null };
      var media=card.querySelector(".product-media");
      if(media) media.addEventListener("click",function(e){ e.preventDefault(); openConfig(prod); });
      var buy=card.querySelector(".btn-buy");
      if(buy){ buy.textContent=ct("Choose"); buy.addEventListener("click",function(e){ e.preventDefault(); openConfig(prod); }); }
    });
  }

  /* ---- public API (used by scents.html modal) ---- */
  window.SECart = { add:add, open:open, items:function(){ return cart.slice(); }, count:count, remove:function(i){ setQty(i,0); }, setName:function(n){ try{ localStorage.setItem("se_name", n); }catch(e){} } };

  window.addEventListener("se-lang", function(){ wire2labels(); render(); });
  function wire2labels(){ document.querySelectorAll(".product .btn-buy").forEach(function(b){ b.textContent=ct("Choose"); }); }

  wire(); render();
})();
