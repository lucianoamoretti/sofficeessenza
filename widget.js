/* Soffice Essenza — floating WhatsApp + chatbot widget (vanilla, no deps) */
(function(){
  "use strict";
  var WA = "353834408449";

  /* ---------- data ---------- */
  var SCENTS = {
    "Sweet & Gourmand": ["Vanilla","Salted Caramel","Strawberry & Rhubarb","Blueberry & Vanilla","Matcha & Coconut","Cinnamon","Christmas Spice","Vanilla Cream"],
    "Floral": ["Rose & Champagne","Golden Mimosa & Amber","Lavender","BBW Japanese Cherry Blossom"],
    "Citrus & Fresh": ["Lemon","Lemongrass","Sweet Lime","Passion Fruit & Mango","Watermelon Lemonade","Kyoto Matcha & Coconut"],
    "Aromatic & Natural": ["Sandalwood"],
    "Soft & Clean": ["Baby Powder","Cotton","Spring Unstoppables"],
    "Warm & Woody": ["Crackling Log Fire","Mahogany Teakwood","Warming Cashmere"],
    "Signature": ["French Vanilla","Lavender, Chamomile & Vanilla","Nag Champa","Dove","Euphoria Woman","Golden Mimosa"]
  };
  var COLOURS = [
    ["White","#f4f1ea"],["Cream","#efe2c8"],["Sand","#e3cfa3"],["Gold","#c9a86a"],["Yellow","#ffd166"],
    ["Orange","#f4a261"],["Coral","#ff7f6b"],["Red","#e63946"],["Pink","#ff8fab"],["Fuchsia","#d6336c"],
    ["Purple","#8338ec"],["Lavender","#b8a4e3"],["Navy","#2b3a67"],["Blue","#3a86ff"],["Sky","#7ec8e3"],
    ["Teal","#2a9d8f"],["Green","#4caf50"],["Sage","#9caf88"],["Brown","#8a5a44"],["Grey","#9aa0a6"],["Black","#2b2b2b"]
  ];
  var PRIDE = [["The Arc","8"],["The Trunk","10"],["The Pillar","9"]];

  /* ---------- styles ---------- */
  var css = ""
  + ".se-w *{box-sizing:border-box}"
  + ".se-w{position:fixed;right:22px;bottom:22px;z-index:9999;font-family:'Inter',system-ui,sans-serif}"
  + ".se-fab{width:60px;height:60px;border:none;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#fff;background:#25D366;box-shadow:0 10px 30px rgba(37,211,102,.45);transition:transform .25s,box-shadow .25s;position:relative}"
  + ".se-fab:hover{transform:scale(1.06)}"
  + ".se-fab svg{width:30px;height:30px;fill:#fff;position:absolute;transition:opacity .2s,transform .2s}"
  + ".se-fab .ic-x{opacity:0;transform:rotate(-45deg) scale(.6)}"
  + ".se-w.open .se-fab{background:#1b1916;box-shadow:0 10px 30px rgba(0,0,0,.3)}"
  + ".se-w.open .se-fab .ic-chat{opacity:0;transform:rotate(45deg) scale(.6)}"
  + ".se-w.open .se-fab .ic-x{opacity:1;transform:none}"
  + ".se-badge{position:absolute;top:-3px;right:-3px;width:18px;height:18px;border-radius:50%;background:#e63946;color:#fff;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;border:2px solid #fff}"
  + ".se-w.open .se-badge{display:none}"
  + ".se-panel{position:absolute;right:0;bottom:74px;width:360px;max-width:calc(100vw - 32px);height:540px;max-height:calc(100vh - 120px);background:#f7f4ef;border-radius:18px;box-shadow:0 24px 70px rgba(0,0,0,.3);display:flex;flex-direction:column;overflow:hidden;opacity:0;transform:translateY(16px) scale(.98);pointer-events:none;transition:opacity .28s,transform .28s}"
  + ".se-w.open .se-panel{opacity:1;transform:none;pointer-events:auto}"
  + ".se-head{display:flex;align-items:center;gap:12px;padding:14px 14px;background:#1b1916;color:#fff}"
  + ".se-head img{width:34px;height:34px;border-radius:50%;background:#fff;padding:5px}"
  + ".se-head-t{flex:1;line-height:1.2;min-width:0}"
  + ".se-head-t b{font-size:14px;font-weight:600;display:block}"
  + ".se-head-t span{font-size:11px;color:rgba(255,255,255,.6);display:flex;align-items:center;gap:6px}"
  + ".se-head-t span::before{content:'';width:7px;height:7px;border-radius:50%;background:#25D366}"
  + ".se-wa,.se-x{width:34px;height:34px;border-radius:50%;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.1);color:#fff;transition:background .2s}"
  + ".se-wa:hover{background:#25D366}.se-x:hover{background:rgba(255,255,255,.22)}"
  + ".se-wa svg{width:18px;height:18px;fill:#fff}.se-x{font-size:20px;line-height:1}"
  + ".se-body{flex:1;overflow-y:auto;padding:18px 16px;display:flex;flex-direction:column;gap:10px;background:linear-gradient(180deg,#f1ece4,#f7f4ef)}"
  + ".se-body::-webkit-scrollbar{width:6px}.se-body::-webkit-scrollbar-thumb{background:#dcd3c6;border-radius:3px}"
  + ".se-msg{max-width:82%;padding:11px 14px;font-size:13.5px;line-height:1.5;border-radius:14px;white-space:pre-wrap;word-wrap:break-word;animation:se-in .25s ease}"
  + "@keyframes se-in{from{opacity:0;transform:translateY(6px)}}"
  + ".se-bot{align-self:flex-start;background:#fff;color:#1b1916;border:1px solid #e6ded3;border-bottom-left-radius:4px}"
  + ".se-user{align-self:flex-end;background:#1b1916;color:#fff;border-bottom-right-radius:4px}"
  + ".se-typing{align-self:flex-start;background:#fff;border:1px solid #e6ded3;border-radius:14px;border-bottom-left-radius:4px;padding:13px 16px;display:flex;gap:4px}"
  + ".se-typing i{width:6px;height:6px;border-radius:50%;background:#b9b0a2;animation:se-blink 1.2s infinite}"
  + ".se-typing i:nth-child(2){animation-delay:.2s}.se-typing i:nth-child(3){animation-delay:.4s}"
  + "@keyframes se-blink{0%,60%,100%{opacity:.25}30%{opacity:1}}"
  + ".se-foot{padding:12px;border-top:1px solid #e6ded3;background:#f7f4ef}"
  + ".se-chips{display:flex;flex-wrap:wrap;gap:7px;max-height:148px;overflow-y:auto}"
  + ".se-chip{font-size:12.5px;font-family:inherit;color:#1b1916;background:#fff;border:1px solid #d8cdbb;border-radius:30px;padding:9px 14px;cursor:pointer;transition:all .18s;display:inline-flex;align-items:center;gap:7px}"
  + ".se-chip:hover{border-color:#a8843f;background:#fbf7ef;transform:translateY(-1px)}"
  + ".se-chip.go{background:#25D366;color:#fff;border-color:#25D366;font-weight:600}"
  + ".se-chip.alt{background:#1b1916;color:#fff;border-color:#1b1916}"
  + ".se-dot{width:13px;height:13px;border-radius:50%;outline:1px solid rgba(0,0,0,.12);flex-shrink:0}"
  + ".se-form{display:flex;gap:8px}"
  + ".se-form input{flex:1;font-family:inherit;font-size:14px;color:#1b1916;background:#fff;border:1px solid #d8cdbb;border-radius:30px;padding:11px 15px;outline:none}"
  + ".se-form input:focus{border-color:#a8843f}"
  + ".se-form button{border:none;cursor:pointer;width:42px;height:42px;border-radius:50%;background:#1b1916;color:#fff;font-size:16px;flex-shrink:0;display:flex;align-items:center;justify-content:center}"
  + ".se-credit{text-align:center;font-size:9px;letter-spacing:1px;text-transform:uppercase;color:#b9b0a2;padding:8px}"
  + "@media(max-width:480px){.se-w{right:14px;bottom:14px}.se-panel{bottom:70px}}";

  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  /* ---------- dom ---------- */
  var root = document.createElement("div");
  root.className = "se-w";
  root.innerHTML = ''
    + '<div class="se-panel" role="dialog" aria-label="Soffice Essenza assistant">'
    +   '<div class="se-head">'
    +     '<img src="favicon.svg" alt="">'
    +     '<div class="se-head-t"><b>Soffice Essenza</b><span>Assistant</span></div>'
    +     '<a class="se-wa" href="https://wa.me/' + WA + '" target="_blank" rel="noopener" title="Open WhatsApp"><svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2s-1.2.3-3.9-.8a9.3 9.3 0 0 1-3.9-3.4c-.3-.4-.9-1.3-.9-2.4s.6-1.7.8-1.9.4-.3.6-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2 0 .4 0 .5l-.4.5c-.2.2-.3.3-.1.6s.7 1.2 1.5 1.9c1 .9 1.8 1.1 2.1 1.3s.4.1.6-.1l.7-.9c.2-.3.4-.2.6-.1l1.8.9c.2.1.4.2.4.3s0 .7-.3 1.3z"/></svg></a>'
    +     '<button class="se-x" aria-label="Close">&times;</button>'
    +   '</div>'
    +   '<div class="se-body" id="seBody"></div>'
    +   '<div class="se-foot" id="seFoot"></div>'
    +   '<div class="se-credit">Soffice Essenza by Paola · Dublin</div>'
    + '</div>'
    + '<button class="se-fab" aria-label="Chat with us">'
    +   '<span class="se-badge">1</span>'
    +   '<svg class="ic-chat" viewBox="0 0 24 24"><path d="M12 3C6.5 3 2 6.6 2 11c0 2.2 1.1 4.2 3 5.6V21l3.6-2a11 11 0 0 0 3.4.5c5.5 0 10-3.6 10-8.5S17.5 3 12 3z"/></svg>'
    +   '<svg class="ic-x" viewBox="0 0 24 24"><path d="M18.3 5.7 12 12l6.3 6.3-1.4 1.4L12 14.8l-6.3 6.3-1.4-1.4L10.6 12 4.3 5.7l1.4-1.4L12 10.6l6.3-6.3z"/></svg>'
    + '</button>';
  document.body.appendChild(root);

  var panel = root.querySelector(".se-panel");
  var fab = root.querySelector(".se-fab");
  var body = root.querySelector("#seBody");
  var foot = root.querySelector("#seFoot");
  var closeBtn = root.querySelector(".se-x");

  /* ---------- helpers ---------- */
  var state = {};
  function scrollDown(){ body.scrollTop = body.scrollHeight; }
  function bubble(cls, text){
    var d = document.createElement("div");
    d.className = "se-msg " + cls;
    d.textContent = text;
    body.appendChild(d); scrollDown(); return d;
  }
  function user(t){ bubble("se-user", t); }
  function clearFoot(){ foot.innerHTML = ""; }
  function bot(text, cb){
    var t = document.createElement("div");
    t.className = "se-typing"; t.innerHTML = "<i></i><i></i><i></i>";
    body.appendChild(t); scrollDown();
    setTimeout(function(){ body.removeChild(t); bubble("se-bot", text); if(cb) cb(); }, 420);
  }
  function chips(opts){
    clearFoot();
    var wrap = document.createElement("div"); wrap.className = "se-chips";
    opts.forEach(function(o){
      var b = document.createElement("button");
      b.className = "se-chip" + (o.cls ? " " + o.cls : "");
      if(o.dot){ var s=document.createElement("span"); s.className="se-dot"; s.style.background=o.dot; b.appendChild(s); }
      b.appendChild(document.createTextNode(o.label));
      b.onclick = function(){ o.on(); };
      wrap.appendChild(b);
    });
    foot.appendChild(wrap);
  }
  function input(placeholder, onSend, skip){
    clearFoot();
    var f = document.createElement("form"); f.className = "se-form";
    var i = document.createElement("input"); i.type = "text"; i.placeholder = placeholder; i.autocomplete = "off";
    var bt = document.createElement("button"); bt.type = "submit"; bt.innerHTML = "&#10148;";
    f.appendChild(i); f.appendChild(bt);
    f.onsubmit = function(e){ e.preventDefault(); var v=i.value.trim(); if(!v) return; onSend(v); };
    foot.appendChild(f);
    if(skip){ var sk=document.createElement("button"); sk.className="se-chip"; sk.style.marginTop="8px"; sk.textContent="Skip"; sk.onclick=function(){ onSend(""); }; foot.appendChild(sk); }
    setTimeout(function(){ i.focus(); }, 50);
  }
  function send(text){ window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(text), "_blank", "noopener"); }

  /* ---------- conversation ---------- */
  function start(){
    body.innerHTML = ""; clearFoot(); state = { items: [] };
    bot("Hi there! I'm the Soffice Essenza assistant 🕯️", function(){
      bot("What's your name?", function(){
        input("Type your name…", function(v){ state.name=v; user(v); askIntent(); });
      });
    });
  }
  function askIntent(){
    bot("Lovely to meet you, " + state.name + "! What can I help you with?", function(){
      chips([
        { label:"🕯️ A scented candle", on:function(){ user("A scented candle"); state.intent="scented"; askCategory(); } },
        { label:"🌈 Light Your Pride", on:function(){ user("Light Your Pride"); state.intent="pride"; pShape(); } },
        { label:"✨ Custom order", on:function(){ user("Custom order"); state.intent="custom"; custom(); } },
        { label:"💬 Talk on WhatsApp", cls:"go", on:function(){ send("Hi! I'm " + state.name + " and I'd like to chat about Soffice Essenza candles."); } }
      ]);
    });
  }
  /* scented branch */
  function askCategory(){
    bot("Great choice! Which scent family?", function(){
      var opts = Object.keys(SCENTS).map(function(c){ return { label:c, on:function(){ user(c); askScent(c); } }; });
      chips(opts);
    });
  }
  function askScent(cat){
    bot("Pick your scent:", function(){
      var opts = SCENTS[cat].map(function(s){ return { label:s, on:function(){ user(s); state.scent=s; askModel(); } }; });
      opts.push({ label:"← Other family", cls:"alt", on:function(){ askCategory(); } });
      chips(opts);
    });
  }
  function askModel(){
    bot("Which candle model would you like? Type the candle name (or tell me if you're not sure).", function(){
      input("Candle name…", function(v){ state.model=v; user(v); askColour(); });
    });
  }
  function askColour(){
    bot("And the colour?", function(){
      var opts = COLOURS.map(function(c){ return { label:c[0], dot:c[1], on:function(){ user(c[0]); state.colour=c[0]; askQty(); } }; });
      opts.push({ label:"Other colour…", cls:"alt", on:function(){ bot("Tell me the colour you'd like:", function(){ input("Colour…", function(v){ state.colour=v; user(v); askQty(); }); }); } });
      chips(opts);
    });
  }
  function askQty(){
    bot("How many would you like?", function(){
      chips([1,2,3,4,5].map(function(n){ return { label:String(n), on:function(){ user(String(n)); state.qty=n; askNote(); } }; })
        .concat([{ label:"More…", cls:"alt", on:function(){ input("How many?", function(v){ state.qty=v; user(v); askNote(); }); } }]));
    });
  }
  function askNote(){
    bot("Anything else? (a note, delivery area, gift message…) — or skip.", function(){
      input("Add a note…", function(v){ state.note=v; if(v) user(v); finishItem(); }, true);
    });
  }
  /* pride branch */
  function pShape(){
    bot("The Light Your Pride candles are decorative and unscented 🌈 Which shape?", function(){
      var opts = PRIDE.map(function(p){ return { label:p[0] + " · €" + p[1], on:function(){ user(p[0]); state.model=p[0]; state.price=p[1]; pColour(); } }; });
      chips(opts);
    });
  }
  function pColour(){
    bot("Which colour of the flag?", function(){
      var six = [["Red","#e63946"],["Orange","#f4a261"],["Yellow","#ffd166"],["Green","#2a9d8f"],["Blue","#3a86ff"],["Purple","#8338ec"]];
      var opts = six.map(function(c){ return { label:c[0], dot:c[1], on:function(){ user(c[0]); state.colour=c[0]; pQty(); } }; });
      opts.push({ label:"The full set (6)", cls:"alt", on:function(){ user("Full rainbow set"); state.colour="Full rainbow set"; pQty(); } });
      chips(opts);
    });
  }
  function pQty(){
    bot("How many?", function(){
      chips([1,2,3,4,5].map(function(n){ return { label:String(n), on:function(){ user(String(n)); state.qty=n; finishItem(); } }; })
        .concat([{ label:"More…", cls:"alt", on:function(){ input("How many?", function(v){ state.qty=v; user(v); finishItem(); }); } }]));
    });
  }
  /* custom branch */
  function custom(){
    bot("Tell me what you have in mind — scent, colour, size, occasion… anything:", function(){
      input("Describe your idea…", function(v){ state.custom=v; user(v); finishItem(); });
    });
  }
  /* finish one item, then offer to add more */
  function clearItem(){ state.intent=state.scent=state.model=state.colour=state.qty=state.note=state.price=state.custom=undefined; }
  function itemShort(it){
    if(it.intent==="pride") return it.model + " · " + it.colour + " ×" + it.qty;
    if(it.intent==="custom") return "Custom — " + it.custom;
    return it.scent + " · " + it.model + " · " + it.colour + " ×" + it.qty;
  }
  function itemLines(it){
    if(it.intent==="pride") return ["Light Your Pride — " + it.model + " (€" + it.price + ")", "Colour: " + it.colour, "Quantity: " + it.qty];
    if(it.intent==="custom") return ["Custom order", "Details: " + it.custom];
    var l = ["Scent: " + it.scent, "Model: " + it.model, "Colour: " + it.colour, "Quantity: " + it.qty];
    if(it.note) l.push("Note: " + it.note);
    return l;
  }
  function finishItem(){
    state.items.push({ intent:state.intent, scent:state.scent, model:state.model, colour:state.colour, qty:state.qty, note:state.note, price:state.price, custom:state.custom });
    var it = state.items[state.items.length - 1];
    bot("Added ✓  " + itemShort(it), function(){
      bot("Would you like to add another candle to your order?", function(){
        chips([
          { label:"➕ Add another", on:function(){ user("Add another"); newItem(); } },
          { label:"✓ That's all", cls:"go", on:function(){ user("That's all"); finalize(); } }
        ]);
      });
    });
  }
  function newItem(){
    clearItem();
    bot("What would you like to add?", function(){
      chips([
        { label:"🕯️ A scented candle", on:function(){ user("A scented candle"); state.intent="scented"; askCategory(); } },
        { label:"🌈 Light Your Pride", on:function(){ user("Light Your Pride"); state.intent="pride"; pShape(); } },
        { label:"✨ Custom order", on:function(){ user("Custom order"); state.intent="custom"; custom(); } }
      ]);
    });
  }
  function finalize(){
    var multi = state.items.length > 1;
    var total = 0;
    var parts = ["Hi! I'd like to order from Soffice Essenza.", "Name: " + state.name, ""];
    var disp = [];
    state.items.forEach(function(it, i){
      var q = parseInt(it.qty, 10); if(isNaN(q)) q = 1;
      total += q;
      parts.push(multi ? ("Candle " + (i + 1) + ":") : "Order:");
      itemLines(it).forEach(function(l){ parts.push("  " + l); });
      parts.push("");
      disp.push((multi ? "• " : "") + itemShort(it));
    });
    var totalLine = "Total: " + total + (total === 1 ? " candle" : " candles");
    parts.push(totalLine);
    disp.push(totalLine);
    var msg = parts.join("\n").replace(/\n{3,}/g, "\n\n").replace(/\n+$/, "");
    bot("Here's your order, " + state.name + ":\n\n" + disp.join("\n"), function(){
      bot("Tap below to send it to us on WhatsApp and we'll confirm everything 💛", function(){
        chips([
          { label:"✓ Send on WhatsApp", cls:"go", on:function(){ send(msg); } },
          { label:"↺ Start over", cls:"alt", on:function(){ start(); } }
        ]);
      });
    });
  }

  /* ---------- open/close ---------- */
  var started = false;
  function open(){ root.classList.add("open"); if(!started){ started = true; start(); } }
  function close(){ root.classList.remove("open"); }
  fab.onclick = function(){ root.classList.contains("open") ? close() : open(); };
  closeBtn.onclick = close;
  document.addEventListener("keydown", function(e){ if(e.key==="Escape" && root.classList.contains("open")) close(); });
})();
