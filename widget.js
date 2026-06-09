/* Soffice Essenza — floating WhatsApp + chatbot widget (vanilla, i18n, cart) */
(function(){
  "use strict";
  var WA = "353834408449";

  /* ---------- data (values stay English for the shop) ---------- */
  var SCENTS = {
    "Sweet & Gourmand": ["Vanilla","Salted Caramel","Strawberry & Rhubarb","Blueberry & Vanilla","Matcha & Coconut","Cinnamon","Christmas Spice","Vanilla Cream"],
    "Floral": ["Rose & Champagne","Golden Mimosa & Amber","Lavender","BBW Japanese Cherry Blossom"],
    "Citrus & Fresh": ["Lemon","Lemongrass","Sweet Lime","Passion Fruit & Mango","Watermelon Lemonade","Kyoto Matcha & Coconut"],
    "Aromatic & Natural": ["Sandalwood"],
    "Soft & Clean": ["Baby Powder","Cotton","Spring Unstoppables"],
    "Warm & Woody": ["Crackling Log Fire","Mahogany Teakwood","Warming Cashmere"],
    "Signature": ["French Vanilla","Lavender, Chamomile & Vanilla","Nag Champa","Dove","Euphoria Woman","Golden Mimosa"]
  };
  var ALL_SCENTS = []; Object.keys(SCENTS).forEach(function(k){ ALL_SCENTS = ALL_SCENTS.concat(SCENTS[k]); });
  var COLOURS = [["White","#f4f1ea"],["Cream","#efe2c8"],["Sand","#e3cfa3"],["Gold","#c9a86a"],["Yellow","#ffd166"],["Orange","#f4a261"],["Coral","#ff7f6b"],["Red","#e63946"],["Pink","#ff8fab"],["Fuchsia","#d6336c"],["Purple","#8338ec"],["Lavender","#b8a4e3"],["Navy","#2b3a67"],["Blue","#3a86ff"],["Sky","#7ec8e3"],["Teal","#2a9d8f"],["Green","#4caf50"],["Sage","#9caf88"],["Brown","#8a5a44"],["Grey","#9aa0a6"],["Black","#2b2b2b"]];
  var PRIDE = [["The Arc","8"],["The Trunk","10"],["The Pillar","9"]];
  var PRIDE_COLS = [["Red","#e63946"],["Orange","#f4a261"],["Yellow","#ffd166"],["Green","#2a9d8f"],["Blue","#3a86ff"],["Purple","#8338ec"]];

  /* ---------- widget translations (UI only) ---------- */
  var WT = {
    it:{
      "Assistant":"Assistente",
      "Hi there! I'm the Soffice Essenza assistant 🕯️":"Ciao! Sono l'assistente di Soffice Essenza 🕯️",
      "What's your name?":"Come ti chiami?",
      "No problem! What's your name?":"Nessun problema! Come ti chiami?",
      "Type your name…":"Scrivi il tuo nome…",
      "Please tell me your name to continue 🙂":"Dimmi il tuo nome per continuare 🙂",
      "Welcome back, {n}! 👋":"Bentornata, {n}! 👋",
      "Continue":"Continua",
      "I'm someone else":"Sono un'altra persona",
      "Lovely to meet you, {n}! What can I help you with?":"Piacere, {n}! Come posso aiutarti?",
      "🕯️ A scented candle":"🕯️ Una candela profumata",
      "🌈 Light Your Pride":"🌈 Light Your Pride",
      "✨ Custom order":"✨ Ordine personalizzato",
      "❓ Quick questions":"❓ Domande rapide",
      "💬 Talk on WhatsApp":"💬 Scrivi su WhatsApp",
      "🌊 A Mare candle":"🌊 Una candela Mare",
      "🐾 A Mini Pets candle":"🐾 Una candela Mini Pets",
      "🧘 A Namaste candle":"🧘 Una candela Namaste",
      "🤲 A Carezza candle":"🤲 Una candela Carezza",
      "Hi! I'm {n} and I'd like to chat about Soffice Essenza candles.":"Ciao! Sono {n} e vorrei informazioni sulle candele Soffice Essenza.",
      "Great choice! Which scent family?":"Ottima scelta! Quale famiglia olfattiva?",
      "🔎 Search by name":"🔎 Cerca per nome",
      "Type part of a scent name…":"Scrivi parte del nome di un profumo…",
      "Here's what I found:":"Ecco cosa ho trovato:",
      "No match — try another word.":"Nessun risultato — prova un'altra parola.",
      "Pick your scent:":"Scegli il tuo profumo:",
      "← Other family":"← Altra famiglia",
      "Which candle model would you like? Type the candle name (or tell me if you're not sure).":"Quale modello desideri? Scrivi il nome della candela (o dimmi se non sei sicura).",
      "Candle name…":"Nome della candela…",
      "Great — let's set up your {s} candle.":"Perfetto — configuriamo la tua candela {s}.",
      "And the colour?":"E il colore?",
      "Other colour…":"Altro colore…",
      "Tell me the colour you'd like:":"Dimmi il colore che desideri:",
      "Colour…":"Colore…",
      "How many would you like?":"Quante ne vuoi?",
      "How many?":"Quante?",
      "More…":"Di più…",
      "Anything else? (a note, delivery area, gift message…) — or skip.":"Altro? (una nota, zona di consegna, messaggio regalo…) — oppure salta.",
      "Add a note…":"Aggiungi una nota…",
      "Skip":"Salta",
      "The Light Your Pride candles are decorative and unscented 🌈 Which shape?":"Le candele Light Your Pride sono decorative e senza profumo 🌈 Quale forma?",
      "Which colour of the flag?":"Quale colore della bandiera?",
      "The full set (6)":"Il set completo (6)",
      "Tell me what you have in mind — scent, colour, size, occasion… anything:":"Dimmi cosa hai in mente — profumo, colore, dimensione, occasione… qualsiasi cosa:",
      "Describe your idea…":"Descrivi la tua idea…",
      "Added ✓  {s}":"Aggiunto ✓  {s}",
      "Would you like to add another candle to your order?":"Vuoi aggiungere un'altra candela all'ordine?",
      "➕ Add another":"➕ Aggiungi un'altra",
      "✓ That's all":"✓ È tutto",
      "What would you like to add?":"Cosa vuoi aggiungere?",
      "Is this order a gift? 🎁":"È un regalo? 🎁",
      "🎁 Yes, it's a gift":"🎁 Sì, è un regalo",
      "No":"No",
      "Add a gift message (optional):":"Aggiungi un messaggio regalo (facoltativo):",
      "Gift message…":"Messaggio regalo…",
      "Here's your order, {n}:":"Ecco il tuo ordine, {n}:",
      "Tap below to send it to us on WhatsApp and we'll confirm everything 💛":"Tocca qui sotto per inviarcelo su WhatsApp e confermiamo tutto 💛",
      "✓ Send on WhatsApp":"✓ Invia su WhatsApp",
      "↺ Start over":"↺ Ricomincia",
      "✎ Edit / remove":"✎ Modifica / rimuovi",
      "Which candle would you like to change?":"Quale candela vuoi modificare?",
      "← Back":"← Indietro",
      "“{s}” — what would you like to do?":"“{s}” — cosa vuoi fare?",
      "✎ Edit":"✎ Modifica",
      "🗑 Remove":"🗑 Rimuovi",
      "No problem — let's set it up again.":"Nessun problema — la rifacciamo.",
      "Your order is empty now — let's add a candle.":"Il tuo ordine è vuoto — aggiungiamo una candela.",
      "Done ✓ Item removed.":"Fatto ✓ Articolo rimosso.",
      "Sure — what would you like to know?":"Certo — cosa vuoi sapere?",
      "🚚 Delivery":"🚚 Consegna","💳 Payment":"💳 Pagamento","🎨 Customisation":"🎨 Personalizzazione","💛 The donation":"💛 La donazione","← Back to start":"← Torna all'inizio","Anything else?":"Altro?",
      "We arrange delivery after you order — send your details on WhatsApp and we'll confirm timing for your area. Local pickup in Dublin is also possible.":"Organizziamo la consegna dopo l'ordine — inviaci i tuoi dati su WhatsApp e confermiamo i tempi per la tua zona. È possibile anche il ritiro a Dublino.",
      "Payment is arranged directly with us on WhatsApp when we confirm your order.":"Il pagamento si concorda direttamente con noi su WhatsApp alla conferma dell'ordine.",
      "Yes! Custom orders are available — pick a scent, colour and model, or tell us your idea and we'll make it for you.":"Sì! Gli ordini personalizzati sono disponibili — scegli profumo, colore e modello, o raccontaci la tua idea e la realizziamo.",
      "For the Light Your Pride collection, 10% of every sale goes to Outhouse LGBTQ+ Centre, Dublin.":"Per la collezione Light Your Pride, il 10% di ogni vendita va all'Outhouse LGBTQ+ Centre di Dublino.",
      "Your order":"Il tuo ordine","Remove":"Rimuovi"
    },
    pt:{
      "Assistant":"Assistente",
      "Hi there! I'm the Soffice Essenza assistant 🕯️":"Oi! Eu sou o assistente da Soffice Essenza 🕯️",
      "What's your name?":"Qual é o seu nome?",
      "No problem! What's your name?":"Sem problema! Qual é o seu nome?",
      "Type your name…":"Digite seu nome…",
      "Please tell me your name to continue 🙂":"Me diga seu nome para continuar 🙂",
      "Welcome back, {n}! 👋":"Bem-vinda de volta, {n}! 👋",
      "Continue":"Continuar",
      "I'm someone else":"Sou outra pessoa",
      "Lovely to meet you, {n}! What can I help you with?":"Prazer, {n}! Como posso ajudar?",
      "🕯️ A scented candle":"🕯️ Uma vela perfumada",
      "🌈 Light Your Pride":"🌈 Light Your Pride",
      "✨ Custom order":"✨ Pedido personalizado",
      "❓ Quick questions":"❓ Perguntas rápidas",
      "💬 Talk on WhatsApp":"💬 Falar no WhatsApp",
      "🌊 A Mare candle":"🌊 Uma vela Mare",
      "🐾 A Mini Pets candle":"🐾 Uma vela Mini Pets",
      "🧘 A Namaste candle":"🧘 Uma vela Namaste",
      "🤲 A Carezza candle":"🤲 Uma vela Carezza",
      "Hi! I'm {n} and I'd like to chat about Soffice Essenza candles.":"Oi! Sou {n} e gostaria de saber sobre as velas da Soffice Essenza.",
      "Great choice! Which scent family?":"Ótima escolha! Qual família de aroma?",
      "🔎 Search by name":"🔎 Buscar por nome",
      "Type part of a scent name…":"Digite parte do nome de um aroma…",
      "Here's what I found:":"Encontrei isto:",
      "No match — try another word.":"Nada encontrado — tente outra palavra.",
      "Pick your scent:":"Escolha seu aroma:",
      "← Other family":"← Outra família",
      "Which candle model would you like? Type the candle name (or tell me if you're not sure).":"Qual modelo de vela você quer? Digite o nome da vela (ou me diga se estiver em dúvida).",
      "Candle name…":"Nome da vela…",
      "Great — let's set up your {s} candle.":"Ótimo — vamos montar sua vela {s}.",
      "And the colour?":"E a cor?",
      "Other colour…":"Outra cor…",
      "Tell me the colour you'd like:":"Me diga a cor que você quer:",
      "Colour…":"Cor…",
      "How many would you like?":"Quantas você quer?",
      "How many?":"Quantas?",
      "More…":"Mais…",
      "Anything else? (a note, delivery area, gift message…) — or skip.":"Mais alguma coisa? (uma observação, área de entrega, mensagem de presente…) — ou pule.",
      "Add a note…":"Adicione uma observação…",
      "Skip":"Pular",
      "The Light Your Pride candles are decorative and unscented 🌈 Which shape?":"As velas Light Your Pride são decorativas e sem perfume 🌈 Qual formato?",
      "Which colour of the flag?":"Qual cor da bandeira?",
      "The full set (6)":"O set completo (6)",
      "Tell me what you have in mind — scent, colour, size, occasion… anything:":"Me conte o que você tem em mente — aroma, cor, tamanho, ocasião… qualquer coisa:",
      "Describe your idea…":"Descreva sua ideia…",
      "Added ✓  {s}":"Adicionado ✓  {s}",
      "Would you like to add another candle to your order?":"Quer adicionar outra vela ao pedido?",
      "➕ Add another":"➕ Adicionar outra",
      "✓ That's all":"✓ É só isso",
      "What would you like to add?":"O que você quer adicionar?",
      "Is this order a gift? 🎁":"Este pedido é um presente? 🎁",
      "🎁 Yes, it's a gift":"🎁 Sim, é presente",
      "No":"Não",
      "Add a gift message (optional):":"Adicione uma mensagem de presente (opcional):",
      "Gift message…":"Mensagem de presente…",
      "Here's your order, {n}:":"Aqui está seu pedido, {n}:",
      "Tap below to send it to us on WhatsApp and we'll confirm everything 💛":"Toque abaixo para enviar pelo WhatsApp e confirmamos tudo 💛",
      "✓ Send on WhatsApp":"✓ Enviar no WhatsApp",
      "↺ Start over":"↺ Recomeçar",
      "✎ Edit / remove":"✎ Editar / remover",
      "Which candle would you like to change?":"Qual vela você quer alterar?",
      "← Back":"← Voltar",
      "“{s}” — what would you like to do?":"“{s}” — o que você quer fazer?",
      "✎ Edit":"✎ Editar",
      "🗑 Remove":"🗑 Remover",
      "No problem — let's set it up again.":"Sem problema — vamos montar de novo.",
      "Your order is empty now — let's add a candle.":"Seu pedido está vazio — vamos adicionar uma vela.",
      "Done ✓ Item removed.":"Pronto ✓ Item removido.",
      "Sure — what would you like to know?":"Claro — o que você quer saber?",
      "🚚 Delivery":"🚚 Entrega","💳 Payment":"💳 Pagamento","🎨 Customisation":"🎨 Personalização","💛 The donation":"💛 A doação","← Back to start":"← Voltar ao início","Anything else?":"Mais alguma coisa?",
      "We arrange delivery after you order — send your details on WhatsApp and we'll confirm timing for your area. Local pickup in Dublin is also possible.":"Combinamos a entrega depois do pedido — envie seus dados no WhatsApp e confirmamos o prazo para a sua região. Também é possível retirar em Dublin.",
      "Payment is arranged directly with us on WhatsApp when we confirm your order.":"O pagamento é combinado direto com a gente no WhatsApp na confirmação do pedido.",
      "Yes! Custom orders are available — pick a scent, colour and model, or tell us your idea and we'll make it for you.":"Sim! Fazemos pedidos personalizados — escolha aroma, cor e modelo, ou conte sua ideia que a gente faz.",
      "For the Light Your Pride collection, 10% of every sale goes to Outhouse LGBTQ+ Centre, Dublin.":"Na coleção Light Your Pride, 10% de cada venda vai para o Outhouse LGBTQ+ Centre, em Dublin.",
      "Your order":"Seu pedido","Remove":"Remover"
    }
  };
  function lang(){ return (window.I18N && window.I18N.lang) || "en"; }
  function w(s){ var L = lang(); if(L==="en") return s; return (WT[L] && WT[L][s]) || s; }
  function tcat(c){ return (window.I18N && window.I18N.t) ? window.I18N.t(c) : c; } /* category names via page dict */

  /* ---------- styles ---------- */
  var css = ""
  + ".se-w *{box-sizing:border-box}"
  + ".se-w{position:fixed;right:22px;bottom:22px;z-index:9999;font-family:'Inter',system-ui,sans-serif}"
  + ".se-fab{width:60px;height:60px;border:none;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#fff;background:#25D366;box-shadow:0 10px 30px rgba(37,211,102,.45);transition:transform .25s;position:relative}"
  + ".se-fab:hover{transform:scale(1.06)}"
  + ".se-fab svg{width:30px;height:30px;fill:#fff;position:absolute;transition:opacity .2s,transform .2s}"
  + ".se-fab .ic-x{opacity:0;transform:rotate(-45deg) scale(.6)}"
  + ".se-w.open .se-fab{background:#1b1916}"
  + ".se-w.open .se-fab .ic-chat{opacity:0;transform:rotate(45deg) scale(.6)}"
  + ".se-w.open .se-fab .ic-x{opacity:1;transform:none}"
  + ".se-badge{position:absolute;top:-3px;right:-3px;min-width:18px;height:18px;padding:0 4px;border-radius:9px;background:#e63946;color:#fff;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;border:2px solid #fff}"
  + ".se-w.open .se-badge{display:none}"
  + ".se-panel{position:absolute;right:0;bottom:74px;width:368px;max-width:calc(100vw - 32px);height:560px;max-height:calc(100vh - 120px);background:#f7f4ef;border-radius:18px;box-shadow:0 24px 70px rgba(0,0,0,.3);display:flex;flex-direction:column;overflow:hidden;opacity:0;transform:translateY(16px) scale(.98);pointer-events:none;transition:opacity .28s,transform .28s}"
  + ".se-w.open .se-panel{opacity:1;transform:none;pointer-events:auto}"
  + ".se-head{display:flex;align-items:center;gap:12px;padding:14px;background:#1b1916;color:#fff}"
  + ".se-head img{width:34px;height:34px;border-radius:50%;background:#fff;padding:5px}"
  + ".se-head-t{flex:1;line-height:1.2;min-width:0}.se-head-t b{font-size:14px;font-weight:600;display:block}"
  + ".se-head-t span{font-size:11px;color:rgba(255,255,255,.6);display:flex;align-items:center;gap:6px}"
  + ".se-head-t span::before{content:'';width:7px;height:7px;border-radius:50%;background:#25D366}"
  + ".se-wa,.se-x{width:34px;height:34px;border-radius:50%;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.1);color:#fff;transition:background .2s}"
  + ".se-wa:hover{background:#25D366}.se-x:hover{background:rgba(255,255,255,.22)}.se-wa svg{width:18px;height:18px;fill:#fff}.se-x{font-size:20px;line-height:1}"
  + ".se-cart{display:none;padding:9px 12px;background:#f1ece4;border-bottom:1px solid #e6ded3;font-size:12px}"
  + ".se-cart.show{display:block}"
  + ".se-cart .ct-h{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#9c9488;font-weight:600;margin-bottom:6px}"
  + ".se-cart ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:4px;max-height:84px;overflow-y:auto}"
  + ".se-cart li{display:flex;align-items:center;gap:8px;color:#1b1916}"
  + ".se-cart li span{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}"
  + ".se-cart li button{border:none;background:none;color:#c08; color:#bd3b3b;cursor:pointer;font-size:14px;line-height:1;padding:0 2px}"
  + ".se-body{flex:1;overflow-y:auto;padding:18px 16px;display:flex;flex-direction:column;gap:10px;background:linear-gradient(180deg,#f1ece4,#f7f4ef)}"
  + ".se-body::-webkit-scrollbar{width:6px}.se-body::-webkit-scrollbar-thumb{background:#dcd3c6;border-radius:3px}"
  + ".se-msg{max-width:84%;padding:11px 14px;font-size:13.5px;line-height:1.5;border-radius:14px;white-space:pre-wrap;word-wrap:break-word;animation:se-in .25s ease}"
  + "@keyframes se-in{from{opacity:0;transform:translateY(6px)}}"
  + ".se-bot{align-self:flex-start;background:#fff;color:#1b1916;border:1px solid #e6ded3;border-bottom-left-radius:4px}"
  + ".se-user{align-self:flex-end;background:#1b1916;color:#fff;border-bottom-right-radius:4px}"
  + ".se-typing{align-self:flex-start;background:#fff;border:1px solid #e6ded3;border-radius:14px;border-bottom-left-radius:4px;padding:13px 16px;display:flex;gap:4px}"
  + ".se-typing i{width:6px;height:6px;border-radius:50%;background:#b9b0a2;animation:se-blink 1.2s infinite}"
  + ".se-typing i:nth-child(2){animation-delay:.2s}.se-typing i:nth-child(3){animation-delay:.4s}"
  + "@keyframes se-blink{0%,60%,100%{opacity:.25}30%{opacity:1}}"
  + ".se-foot{padding:12px;border-top:1px solid #e6ded3;background:#f7f4ef}"
  + ".se-chips{display:flex;flex-wrap:wrap;gap:7px;max-height:172px;overflow-y:auto}"
  + ".se-chip{font-size:12.5px;font-family:inherit;color:#1b1916;background:#fff;border:1px solid #d8cdbb;border-radius:30px;padding:9px 14px;cursor:pointer;transition:all .18s;display:inline-flex;align-items:center;gap:7px}"
  + ".se-chip:hover{border-color:#a8843f;background:#fbf7ef;transform:translateY(-1px)}"
  + ".se-chip.go{background:#25D366;color:#fff;border-color:#25D366;font-weight:600}.se-chip.alt{background:#1b1916;color:#fff;border-color:#1b1916}"
  + ".se-dot{width:13px;height:13px;border-radius:50%;outline:1px solid rgba(0,0,0,.12);flex-shrink:0}"
  + ".se-form{display:flex;gap:8px}.se-form input{flex:1;font-family:inherit;font-size:14px;color:#1b1916;background:#fff;border:1px solid #d8cdbb;border-radius:30px;padding:11px 15px;outline:none}"
  + ".se-form input:focus{border-color:#a8843f}.se-form button{border:none;cursor:pointer;width:42px;height:42px;border-radius:50%;background:#1b1916;color:#fff;font-size:16px;flex-shrink:0;display:flex;align-items:center;justify-content:center}"
  + ".se-credit{text-align:center;font-size:9px;letter-spacing:1px;text-transform:uppercase;color:#b9b0a2;padding:8px}"
  + "@media(max-width:480px){.se-w{right:14px;bottom:14px}.se-panel{bottom:70px}}";
  var style = document.createElement("style"); style.textContent = css; document.head.appendChild(style);

  /* ---------- dom ---------- */
  var root = document.createElement("div"); root.className = "se-w";
  root.innerHTML = ''
    + '<div class="se-panel" role="dialog" aria-label="Soffice Essenza assistant">'
    +   '<div class="se-head"><img src="favicon.svg" alt="">'
    +     '<div class="se-head-t"><b>Soffice Essenza</b><span class="se-sub">Assistant</span></div>'
    +     '<a class="se-wa" href="https://wa.me/' + WA + '" target="_blank" rel="noopener" title="WhatsApp"><svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2s-1.2.3-3.9-.8a9.3 9.3 0 0 1-3.9-3.4c-.3-.4-.9-1.3-.9-2.4s.6-1.7.8-1.9.4-.3.6-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2 0 .4 0 .5l-.4.5c-.2.2-.3.3-.1.6s.7 1.2 1.5 1.9c1 .9 1.8 1.1 2.1 1.3s.4.1.6-.1l.7-.9c.2-.3.4-.2.6-.1l1.8.9c.2.1.4.2.4.3s0 .7-.3 1.3z"/></svg></a>'
    +     '<button class="se-x" aria-label="Close">&times;</button></div>'
    +   '<div class="se-cart" id="seCart"></div>'
    +   '<div class="se-body" id="seBody"></div>'
    +   '<div class="se-foot" id="seFoot"></div>'
    +   '<div class="se-credit">Soffice Essenza by Paola · Dublin</div>'
    + '</div>'
    + '<button class="se-fab" aria-label="Chat"><span class="se-badge">1</span>'
    +   '<svg class="ic-chat" viewBox="0 0 24 24"><path d="M12 3C6.5 3 2 6.6 2 11c0 2.2 1.1 4.2 3 5.6V21l3.6-2a11 11 0 0 0 3.4.5c5.5 0 10-3.6 10-8.5S17.5 3 12 3z"/></svg>'
    +   '<svg class="ic-x" viewBox="0 0 24 24"><path d="M18.3 5.7 12 12l6.3 6.3-1.4 1.4L12 14.8l-6.3 6.3-1.4-1.4L10.6 12 4.3 5.7l1.4-1.4L12 10.6l6.3-6.3z"/></svg></button>';
  document.body.appendChild(root);

  var panel = root.querySelector(".se-panel"), fab = root.querySelector(".se-fab"),
      body = root.querySelector("#seBody"), foot = root.querySelector("#seFoot"),
      cartEl = root.querySelector("#seCart"), subEl = root.querySelector(".se-sub");

  /* ---------- helpers ---------- */
  var state = { items: [] }, lastScreen = null, audioCtx;
  function blip(){ try{ audioCtx = audioCtx || new (window.AudioContext||window.webkitAudioContext)(); var o=audioCtx.createOscillator(), g=audioCtx.createGain(); o.type="sine"; o.frequency.value=680; g.gain.value=.04; o.connect(g); g.connect(audioCtx.destination); o.start(); g.gain.exponentialRampToValueAtTime(.0001, audioCtx.currentTime+.18); o.stop(audioCtx.currentTime+.2);}catch(e){} }
  function scrollDown(){ body.scrollTop = body.scrollHeight; }
  function bubble(cls, text){ var d=document.createElement("div"); d.className="se-msg "+cls; d.textContent=text; body.appendChild(d); scrollDown(); return d; }
  function user(t){ bubble("se-user", t); }
  function clearFoot(){ foot.innerHTML=""; }
  function bot(text, cb){
    var ty=document.createElement("div"); ty.className="se-typing"; ty.innerHTML="<i></i><i></i><i></i>"; body.appendChild(ty); scrollDown();
    setTimeout(function(){ body.removeChild(ty); bubble("se-bot", text); blip(); if(cb) cb(); }, 430);
  }
  function chips(opts){
    clearFoot(); var wrap=document.createElement("div"); wrap.className="se-chips";
    opts.forEach(function(o){ if(!o) return; var b=document.createElement("button"); b.className="se-chip"+(o.cls?" "+o.cls:"");
      if(o.dot){ var s=document.createElement("span"); s.className="se-dot"; s.style.background=o.dot; b.appendChild(s); }
      b.appendChild(document.createTextNode(o.label)); b.onclick=o.on; wrap.appendChild(b); });
    foot.appendChild(wrap);
  }
  function input(placeholder, onSend, skip){
    clearFoot(); var f=document.createElement("form"); f.className="se-form";
    var i=document.createElement("input"); i.type="text"; i.placeholder=placeholder; i.autocomplete="off";
    var b=document.createElement("button"); b.type="submit"; b.innerHTML="&#10148;";
    f.appendChild(i); f.appendChild(b);
    f.onsubmit=function(e){ e.preventDefault(); var v=i.value.trim(); if(!v) return; onSend(v); };
    foot.appendChild(f);
    if(skip){ var s=document.createElement("button"); s.className="se-chip"; s.style.marginTop="8px"; s.textContent=w("Skip"); s.onclick=function(){ onSend(""); }; foot.appendChild(s); }
    setTimeout(function(){ i.focus(); }, 50);
  }
  function send(text){ window.open("https://wa.me/"+WA+"?text="+encodeURIComponent(text), "_blank", "noopener"); }

  /* ---------- cart ---------- */
  function itemShort(it){
    if(it.intent==="pride") return it.model+" · "+it.colour+" ×"+it.qty;
    if(it.intent==="custom") return "Custom — "+it.custom;
    return it.scent+" · "+(it.model||"?")+" · "+it.colour+" ×"+it.qty;
  }
  function renderCart(){
    if(!state.items.length){ cartEl.className="se-cart"; cartEl.innerHTML=""; return; }
    cartEl.className="se-cart show";
    var html='<div class="ct-h">🛒 '+w("Your order")+' ('+state.items.length+')</div><ul>';
    state.items.forEach(function(it,i){ html+='<li><span>'+itemShort(it).replace(/</g,"&lt;")+'</span><button data-i="'+i+'" title="'+w("Remove")+'">&times;</button></li>'; });
    html+='</ul>'; cartEl.innerHTML=html;
    cartEl.querySelectorAll("button[data-i]").forEach(function(b){ b.onclick=function(){ state.items.splice(+b.getAttribute("data-i"),1); renderCart(); if(lastScreen==="final") finalize(); }; });
  }

  /* ---------- conversation ---------- */
  var PAGE = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  function ctxChip(){
    if(PAGE==="mare.html") return { label:w("🌊 A Mare candle"), on:function(){ user(w("🌊 A Mare candle")); state.cur={intent:"scented"}; askCategory(); } };
    if(PAGE==="minipets.html") return { label:w("🐾 A Mini Pets candle"), on:function(){ user(w("🐾 A Mini Pets candle")); state.cur={intent:"scented"}; askCategory(); } };
    if(PAGE==="namaste.html") return { label:w("🧘 A Namaste candle"), on:function(){ user(w("🧘 A Namaste candle")); state.cur={intent:"scented"}; askCategory(); } };
    if(PAGE==="carezza.html") return { label:w("🤲 A Carezza candle"), on:function(){ user(w("🤲 A Carezza candle")); state.cur={intent:"scented"}; askCategory(); } };
    return null;
  }
  function nameInput(next){
    input(w("Type your name…"), function(v){
      if(v.length<2 || v.length>40){ bot(w("Please tell me your name to continue 🙂"), function(){ nameInput(next); }); return; }
      state.name=v; try{ localStorage.setItem("se_name", v); }catch(e){}
      user(v); next();
    });
  }
  function start(){
    body.innerHTML=""; clearFoot(); state={ items:[] }; renderCart(); lastScreen="start";
    var saved=null; try{ saved=localStorage.getItem("se_name"); }catch(e){}
    bot(w("Hi there! I'm the Soffice Essenza assistant 🕯️"), function(){
      if(saved){ state.name=saved;
        bot(w("Welcome back, {n}! 👋").replace("{n}",saved), function(){
          chips([ {label:w("Continue"),cls:"go",on:function(){ askIntent(); }},
                  {label:w("I'm someone else"),on:function(){ try{localStorage.removeItem("se_name");}catch(e){} state.name=null; bot(w("No problem! What's your name?"),function(){ nameInput(askIntent); }); }} ]);
        });
      } else { bot(w("What's your name?"), function(){ nameInput(askIntent); }); }
    });
  }
  function askIntent(){
    lastScreen="intent";
    bot(w("Lovely to meet you, {n}! What can I help you with?").replace("{n}",state.name||""), function(){
      chips([
        ctxChip(),
        { label:w("🕯️ A scented candle"), on:function(){ user(w("🕯️ A scented candle")); state.cur={intent:"scented"}; askCategory(); } },
        { label:w("🌈 Light Your Pride"), on:function(){ user(w("🌈 Light Your Pride")); state.cur={intent:"pride"}; pShape(); } },
        { label:w("✨ Custom order"), on:function(){ user(w("✨ Custom order")); state.cur={intent:"custom"}; custom(); } },
        { label:w("❓ Quick questions"), on:function(){ user(w("❓ Quick questions")); faq(); } },
        { label:w("💬 Talk on WhatsApp"), cls:"go", on:function(){ send(w("Hi! I'm {n} and I'd like to chat about Soffice Essenza candles.").replace("{n}",state.name||"")); } }
      ]);
    });
  }
  /* scented */
  function askCategory(){
    bot(w("Great choice! Which scent family?"), function(){
      var opts = Object.keys(SCENTS).map(function(c){ return { label:tcat(c), on:function(){ user(tcat(c)); askScent(c); } }; });
      opts.push({ label:w("🔎 Search by name"), cls:"alt", on:function(){ searchScent(); } });
      chips(opts);
    });
  }
  function searchScent(){
    bot(w("Type part of a scent name…"), function(){
      input(w("Type part of a scent name…"), function(v){
        user(v);
        var q=v.toLowerCase().replace(/&amp;/g,"&");
        var hits=ALL_SCENTS.filter(function(s){ return s.toLowerCase().indexOf(q)>=0; });
        if(!hits.length){ bot(w("No match — try another word."), function(){ searchScent(); }); return; }
        bot(w("Here's what I found:"), function(){
          var opts=hits.slice(0,12).map(function(s){ return { label:s, on:function(){ user(s); state.cur.scent=s; askModel(); } }; });
          opts.push({ label:w("← Back"), cls:"alt", on:function(){ askCategory(); } });
          chips(opts);
        });
      });
    });
  }
  function askScent(cat){
    bot(w("Pick your scent:"), function(){
      var opts = SCENTS[cat].map(function(s){ return { label:s, on:function(){ user(s); state.cur.scent=s; askModel(); } }; });
      opts.push({ label:w("← Other family"), cls:"alt", on:function(){ askCategory(); } });
      chips(opts);
    });
  }
  function askModel(){
    bot(w("Which candle model would you like? Type the candle name (or tell me if you're not sure)."), function(){
      input(w("Candle name…"), function(v){ state.cur.model=v; user(v); askColour(); });
    });
  }
  function askColour(){
    bot(w("And the colour?"), function(){
      var opts = COLOURS.map(function(c){ return { label:c[0], dot:c[1], on:function(){ user(c[0]); state.cur.colour=c[0]; askQty(); } }; });
      opts.push({ label:w("Other colour…"), cls:"alt", on:function(){ bot(w("Tell me the colour you'd like:"), function(){ input(w("Colour…"), function(v){ state.cur.colour=v; user(v); askQty(); }); }); } });
      chips(opts);
    });
  }
  function askQty(){
    bot(w("How many would you like?"), function(){ qtyChips(askNote); });
  }
  function qtyChips(next){
    chips([1,2,3,4,5].map(function(n){ return { label:String(n), on:function(){ user(String(n)); state.cur.qty=n; next(); } }; })
      .concat([{ label:w("More…"), cls:"alt", on:function(){ input(w("How many?"), function(v){ state.cur.qty=v; user(v); next(); }); } }]));
  }
  function askNote(){
    bot(w("Anything else? (a note, delivery area, gift message…) — or skip."), function(){
      input(w("Add a note…"), function(v){ state.cur.note=v; if(v) user(v); finishItem(); }, true);
    });
  }
  /* pride */
  function pShape(){
    bot(w("The Light Your Pride candles are decorative and unscented 🌈 Which shape?"), function(){
      chips(PRIDE.map(function(p){ return { label:p[0]+" · €"+p[1], on:function(){ user(p[0]); state.cur.model=p[0]; state.cur.price=p[1]; pColour(); } }; }));
    });
  }
  function pColour(){
    bot(w("Which colour of the flag?"), function(){
      var opts=PRIDE_COLS.map(function(c){ return { label:c[0], dot:c[1], on:function(){ user(c[0]); state.cur.colour=c[0]; bot(w("How many?"),function(){ qtyChips(finishItem); }); } }; });
      opts.push({ label:w("The full set (6)"), cls:"alt", on:function(){ user(w("The full set (6)")); state.cur.colour="Full rainbow set"; bot(w("How many?"),function(){ qtyChips(finishItem); }); } });
      chips(opts);
    });
  }
  /* custom */
  function custom(){
    bot(w("Tell me what you have in mind — scent, colour, size, occasion… anything:"), function(){
      input(w("Describe your idea…"), function(v){ state.cur.custom=v; user(v); finishItem(); });
    });
  }
  /* faq */
  function faq(){
    lastScreen="faq";
    bot(w("Sure — what would you like to know?"), function(){
      chips([
        { label:w("🚚 Delivery"), on:function(){ user(w("🚚 Delivery")); faqAns("We arrange delivery after you order — send your details on WhatsApp and we'll confirm timing for your area. Local pickup in Dublin is also possible."); } },
        { label:w("💳 Payment"), on:function(){ user(w("💳 Payment")); faqAns("Payment is arranged directly with us on WhatsApp when we confirm your order."); } },
        { label:w("🎨 Customisation"), on:function(){ user(w("🎨 Customisation")); faqAns("Yes! Custom orders are available — pick a scent, colour and model, or tell us your idea and we'll make it for you."); } },
        { label:w("💛 The donation"), on:function(){ user(w("💛 The donation")); faqAns("For the Light Your Pride collection, 10% of every sale goes to Outhouse LGBTQ+ Centre, Dublin."); } },
        { label:w("← Back to start"), cls:"alt", on:function(){ askIntent(); } }
      ]);
    });
  }
  function faqAns(key){ bot(w(key), function(){ bot(w("Anything else?"), function(){ faq(); }); }); }

  /* finish / multi-item */
  function finishItem(){
    state.items.push({ intent:state.cur.intent, scent:state.cur.scent, model:state.cur.model, colour:state.cur.colour, qty:state.cur.qty, note:state.cur.note, price:state.cur.price, custom:state.cur.custom });
    renderCart();
    var it=state.items[state.items.length-1];
    bot(w("Added ✓  {s}").replace("{s}", itemShort(it)), function(){
      bot(w("Would you like to add another candle to your order?"), function(){
        chips([ { label:w("➕ Add another"), on:function(){ user(w("➕ Add another")); newItem(); } },
                { label:w("✓ That's all"), cls:"go", on:function(){ user(w("✓ That's all")); askGift(); } } ]);
      });
    });
  }
  function newItem(){
    state.cur={};
    bot(w("What would you like to add?"), function(){
      chips([
        { label:w("🕯️ A scented candle"), on:function(){ user(w("🕯️ A scented candle")); state.cur={intent:"scented"}; askCategory(); } },
        { label:w("🌈 Light Your Pride"), on:function(){ user(w("🌈 Light Your Pride")); state.cur={intent:"pride"}; pShape(); } },
        { label:w("✨ Custom order"), on:function(){ user(w("✨ Custom order")); state.cur={intent:"custom"}; custom(); } }
      ]);
    });
  }
  function askGift(){
    bot(w("Is this order a gift? 🎁"), function(){
      chips([ { label:w("🎁 Yes, it's a gift"), on:function(){ user(w("🎁 Yes, it's a gift")); state.gift=true; bot(w("Add a gift message (optional):"), function(){ input(w("Gift message…"), function(v){ state.giftMsg=v; if(v) user(v); finalize(); }, true); }); } },
              { label:w("No"), cls:"alt", on:function(){ user(w("No")); state.gift=false; finalize(); } } ]);
    });
  }
  function itemLines(it){
    if(it.intent==="pride") return ["Light Your Pride — "+it.model+" (€"+it.price+")","Colour: "+it.colour,"Quantity: "+it.qty];
    if(it.intent==="custom") return ["Custom order","Details: "+it.custom];
    var l=["Scent: "+it.scent,"Model: "+(it.model||"-"),"Colour: "+it.colour,"Quantity: "+it.qty];
    if(it.note) l.push("Note: "+it.note);
    return l;
  }
  function finalize(){
    lastScreen="final"; renderCart();
    if(!state.items.length){ bot(w("Your order is empty now — let's add a candle."), function(){ newItem(); }); return; }
    var multi=state.items.length>1, total=0, parts=["Hi! I'd like to order from Soffice Essenza.","Name: "+state.name,""], disp=[];
    state.items.forEach(function(it,i){ var q=parseInt(it.qty,10); if(isNaN(q)) q=1; total+=q;
      parts.push(multi?("Candle "+(i+1)+":"):"Order:"); itemLines(it).forEach(function(l){ parts.push("  "+l); }); parts.push("");
      disp.push((multi?"• ":"")+itemShort(it)); });
    var totalLine="Total: "+total+(total===1?" candle":" candles"); parts.push(totalLine); disp.push(totalLine);
    if(state.gift){ parts.push(""); parts.push("Gift: yes"); if(state.giftMsg) parts.push("Gift message: "+state.giftMsg); disp.push("🎁 Gift"); }
    var msg=parts.join("\n").replace(/\n{3,}/g,"\n\n").replace(/\n+$/,"");
    bot(w("Here's your order, {n}:").replace("{n}",state.name)+"\n\n"+disp.join("\n"), function(){
      bot(w("Tap below to send it to us on WhatsApp and we'll confirm everything 💛"), function(){
        var acts=[ { label:w("✓ Send on WhatsApp"), cls:"go", on:function(){ send(msg); } },
                   { label:w("➕ Add another"), on:function(){ user(w("➕ Add another")); newItem(); } } ];
        if(state.items.length) acts.push({ label:w("✎ Edit / remove"), on:function(){ manageItems(); } });
        acts.push({ label:w("↺ Start over"), cls:"alt", on:function(){ start(); } });
        chips(acts);
      });
    });
  }
  function manageItems(){
    bot(w("Which candle would you like to change?"), function(){
      var opts=state.items.map(function(it,i){ return { label:(i+1)+". "+itemShort(it), on:function(){ itemActions(i); } }; });
      opts.push({ label:w("← Back"), cls:"alt", on:function(){ finalize(); } });
      chips(opts);
    });
  }
  function itemActions(i){
    bot(w("“{s}” — what would you like to do?").replace("{s}", itemShort(state.items[i])), function(){
      chips([ { label:w("✎ Edit"), on:function(){ user(w("✎ Edit")); state.items.splice(i,1); renderCart(); bot(w("No problem — let's set it up again."), function(){ newItem(); }); } },
              { label:w("🗑 Remove"), on:function(){ user(w("🗑 Remove")); state.items.splice(i,1); renderCart(); afterRemove(); } },
              { label:w("← Back"), cls:"alt", on:function(){ manageItems(); } } ]);
    });
  }
  function afterRemove(){ if(!state.items.length){ bot(w("Your order is empty now — let's add a candle."), function(){ newItem(); }); } else { bot(w("Done ✓ Item removed."), function(){ finalize(); }); } }

  /* ---------- open/close + API ---------- */
  var started=false;
  function refreshSub(){ subEl.textContent = w("Assistant"); }
  function open(){ root.classList.add("open"); refreshSub(); if(!started){ started=true; start(); } }
  function close(){ root.classList.remove("open"); }
  fab.onclick=function(){ root.classList.contains("open")?close():open(); };
  root.querySelector(".se-x").onclick=close;
  document.addEventListener("keydown", function(e){ if(e.key==="Escape" && root.classList.contains("open")) close(); });

  window.SoffChat = {
    open: open,
    prefillScent: function(name){
      root.classList.add("open"); refreshSub(); started=true; body.innerHTML=""; clearFoot(); state={ items:[] }; renderCart();
      var saved=null; try{ saved=localStorage.getItem("se_name"); }catch(e){}
      var go=function(){ state.cur={ intent:"scented", scent:name }; bot(w("Great — let's set up your {s} candle.").replace("{s}",name), function(){ askModel(); }); };
      bot(w("Hi there! I'm the Soffice Essenza assistant 🕯️"), function(){ if(saved){ state.name=saved; go(); } else { bot(w("What's your name?"), function(){ nameInput(go); }); } });
    }
  };

  /* restart on language change if open */
  window.addEventListener("se-lang", function(){ refreshSub(); renderCart(); if(root.classList.contains("open")) start(); });
})();
