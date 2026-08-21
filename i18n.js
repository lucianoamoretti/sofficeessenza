/* Soffice Essenza — lightweight i18n (EN default, IT, PT-BR) */
(function(){
  "use strict";
  var LANGS = ["en","it","pt"];
  var LANG = localStorage.getItem("se_lang");
  if(LANGS.indexOf(LANG) < 0) LANG = "en";

  /* ---- dictionary: English source -> {it, pt} (UI only; product/scent/colour names stay EN) ---- */
  var D = {
    /* nav / common */
    "Collections":{it:"Collezioni",pt:"Coleções"},
    "Details":{it:"Dettagli",pt:"Detalhes"},
    "Scented Candles":{it:"Candele Profumate",pt:"Velas Perfumadas"},
    "Soffice Essenza · Scented Candles":{it:"Soffice Essenza · Candele Profumate",pt:"Soffice Essenza · Velas Perfumadas"},
    "Order via WhatsApp":{it:"Ordina su WhatsApp",pt:"Peça pelo WhatsApp"},
    "Buy":{it:"Compra",pt:"Comprar"},
    "Order":{it:"Ordina",pt:"Pedir"},
    "Order →":{it:"Ordina →",pt:"Pedir →"},
    "Discover →":{it:"Scopri →",pt:"Descobrir →"},
    "Shop the collection →":{it:"Acquista la collezione →",pt:"Ver a coleção →"},
    "See the collection":{it:"Scopri la collezione",pt:"Ver a coleção"},
    "How we give back":{it:"Come restituiamo",pt:"Como retribuímos"},
    "scroll":{it:"scorri",pt:"role"},
    "Explore":{it:"Esplora",pt:"Explore"},
    "Our collections":{it:"Le nostre collezioni",pt:"Nossas coleções"},
    "Our other collections":{it:"Le nostre altre collezioni",pt:"Nossas outras coleções"},
    "The Collection":{it:"La Collezione",pt:"A Coleção"},
    "Handcrafted candles, made by hand in Dublin, Ireland. Displayed, gifted and cherished.":{it:"Candele artigianali, fatte a mano a Dublino, Irlanda. Da esporre, regalare e custodire.",pt:"Velas artesanais, feitas à mão em Dublin, Irlanda. Para exibir, presentear e guardar."},
    "Hand-poured scented candles, made in small batches. Soy wax, cotton wicks, considered scents.":{it:"Candele profumate colate a mano, in piccoli lotti. Cera di soia, stoppini di cotone, profumi ricercati.",pt:"Velas perfumadas feitas à mão, em pequenos lotes. Cera de soja, pavios de algodão, fragrâncias selecionadas."},
    /* specs */
    "Soy wax":{it:"100% Cera di soia",pt:"100% Cera de soja"},
    "Cotton wick":{it:"Stoppino di cotone",pt:"Pavio de algodão"},
    "20 h burn":{it:"20 h di durata",pt:"20 h de queima"},
    "Vegan & cruelty-free":{it:"Vegan & cruelty-free",pt:"Vegana & cruelty-free"},
    "Vegan Friendly":{it:"Vegan",pt:"Vegana"},
    "Natural Wax":{it:"Cera Naturale",pt:"Cera Natural"},
    "Handcrafted":{it:"Artigianale",pt:"Artesanal"},
    /* ===== Old Collections ===== */
    "Old Collections":{it:"Collezioni Passate",pt:"Coleções Antigas"},
    "Past seasons":{it:"Stagioni passate",pt:"Estações passadas"},
    "Seasons that have passed — candles that haven't.":{it:"Stagioni che sono passate — candele che no.",pt:"Estações que passaram — velas que não."},
    "Every collection we make comes back with its season. These two are resting for now, but each candle is still hand-poured to order in Dublin — just ask.":{it:"Ogni nostra collezione torna con la sua stagione. Queste due riposano per ora, ma ogni candela si cola ancora a mano su ordinazione a Dublino — basta chiedere.",pt:"Cada coleção nossa volta com a sua estação. Estas duas estão descansando por ora, mas cada vela continua sendo feita à mão sob encomenda em Dublin — é só pedir."},
    "Summer Edition":{it:"Edizione Estiva",pt:"Edição de Verão"},
    "Summer":{it:"Estate",pt:"Verão"},
    "Pride Collection":{it:"Collezione Pride",pt:"Coleção Pride"},
    "June · Pride Month":{it:"Giugno · Mese del Pride",pt:"Junho · Mês do Orgulho"},
    "Hand-poured scented candles inspired by the Mediterranean coast — salt, driftwood and warm sea air. Shell shapes, a sea-glass jar and a tin, in soy wax with cotton wicks.":{it:"Candele profumate colate a mano, ispirate alla costa mediterranea — sale, legni portati dal mare e aria calda di mare. Forme a conchiglia, un vasetto in vetro marino e una latta, in cera di soia con stoppini di cotone.",pt:"Velas perfumadas feitas à mão inspiradas na costa mediterrânea — sal, madeira trazida pelo mar e ar quente de praia. Formatos de concha, um pote de vidro marinho e uma lata, em cera de soja com pavios de algodão."},
    "Decorative, unscented soy-wax candles in the six colours of the rainbow flag — The Arc, The Trunk and The Pillar. 10% of every sale goes to Outhouse LGBTQ+ Centre, Dublin.":{it:"Candele decorative in cera di soia, senza profumo, nei sei colori della bandiera arcobaleno — The Arc, The Trunk e The Pillar. Il 10% di ogni vendita va all'Outhouse LGBTQ+ Centre di Dublino.",pt:"Velas decorativas em cera de soja, sem perfume, nas seis cores da bandeira do arco-íris — The Arc, The Trunk e The Pillar. 10% de cada venda vai para o Outhouse LGBTQ+ Centre, em Dublin."},
    "Scented":{it:"Profumata",pt:"Perfumada"},
    "See the collection →":{it:"Scopri la collezione →",pt:"Ver a coleção →"},
    "Still available":{it:"Ancora disponibili",pt:"Ainda disponíveis"},
    "Nothing here is really gone.":{it:"Qui non se n'è andato davvero niente.",pt:"Nada aqui foi embora de verdade."},
    "These collections are out of season, not out of stock. Everything is made by hand, in small batches, when you order — so if you'd like a Mare shell or a Pride candle in December, we'll pour it for you.":{it:"Queste collezioni sono fuori stagione, non esaurite. Tutto è fatto a mano, in piccoli lotti, quando ordini — quindi se vuoi una conchiglia Mare o una candela Pride a dicembre, la coliamo per te.",pt:"Estas coleções estão fora de estação, não fora de estoque. Tudo é feito à mão, em pequenos lotes, quando você pede — então se quiser uma concha Mare ou uma vela Pride em dezembro, a gente faz para você."},
    "Made to order · longer wait":{it:"Su ordinazione · attesa più lunga",pt:"Sob encomenda · prazo maior"},
    "Nothing here is kept on the shelf. Each piece is poured specially for you and, because it belongs to a past collection, it takes longer to make than what's in season — the moulds and the scents have to come back out. We'll confirm the timing with you when you order.":{it:"Qui non c'è nulla di pronto a magazzino. Ogni pezzo viene colato apposta per te e, appartenendo a una collezione passata, richiede più tempo di quella in corso — bisogna rimettere in campo stampi e profumi. Ti confermiamo i tempi al momento dell'ordine.",pt:"Aqui nada fica pronto em estoque. Cada peça é feita especialmente para você e, por ser de uma coleção passada, leva mais tempo do que a da estação — os moldes e os aromas precisam voltar para a bancada. A gente confirma o prazo com você na hora do pedido."},
    "Ask on WhatsApp →":{it:"Chiedi su WhatsApp →",pt:"Pergunte no WhatsApp →"},
    "Mare · Summer Edition":{it:"Mare · Edizione Estiva",pt:"Mare · Edição de Verão"},
    "Made to order, all year":{it:"Su ordinazione, tutto l'anno",pt:"Sob encomenda, o ano todo"},
    "Mare and Light Your Pride — still made to order.":{it:"Mare e Light Your Pride — sempre su ordinazione.",pt:"Mare e Light Your Pride — sempre sob encomenda."},
    "A past season — Mare is still made to order all year, with a longer wait than the collection in season.":{it:"Una stagione passata — Mare si fa ancora su ordinazione tutto l'anno, con un'attesa più lunga rispetto alla collezione in corso.",pt:"Uma estação passada — Mare continua sendo feita sob encomenda o ano todo, com um prazo maior que o da coleção da estação."},
    "A seasonal collection — Light Your Pride returns every June, and is still made to order all year, with a longer wait.":{it:"Una collezione stagionale — Light Your Pride torna ogni giugno e si fa ancora su ordinazione tutto l'anno, con un'attesa più lunga.",pt:"Uma coleção sazonal — Light Your Pride volta todo mês de junho e continua sendo feita sob encomenda o ano todo, com um prazo maior."},
    "See our Old Collections →":{it:"Scopri le Collezioni Passate →",pt:"Veja nossas Coleções Antigas →"},
    /* ===== Autumn (index) ===== */
    "The Autumn Collection":{it:"La Collezione Autumn",pt:"A Coleção Autumn"},
    "Handcrafted in Dublin":{it:"Fatta a mano a Dublino",pt:"Feita à mão em Dublin"},
    "Spiced · Smoky · Golden":{it:"Speziata · Affumicata · Dorata",pt:"Especiada · Esfumada · Dourada"},
    "Warm light for shorter days":{it:"Luce calda per giornate più corte",pt:"Luz quente para dias mais curtos"},
    "Warm light for shorter days.":{it:"Luce calda per giornate più corte.",pt:"Luz quente para dias mais curtos."},
    "Small batch":{it:"Piccoli lotti",pt:"Pequenos lotes"},
    "Autumn Collection · Handcrafted in Dublin":{it:"Collezione Autumn · Fatta a mano a Dublino",pt:"Coleção Autumn · Feita à mão em Dublin"},
    "Hand-poured candles for the season of blankets, long evenings and rain on the window. Spiced, smoky and golden scents, made in small batches here in Dublin.":{it:"Candele colate a mano per la stagione delle coperte, delle sere lunghe e della pioggia sui vetri. Profumi speziati, affumicati e dorati, in piccoli lotti qui a Dublino.",pt:"Velas feitas à mão para a estação das mantas, das noites longas e da chuva na janela. Aromas especiados, esfumados e dourados, em pequenos lotes aqui em Dublin."},
    "Dublin · Ireland · 🍂":{it:"Dublino · Irlanda · 🍂",pt:"Dublin · Irlanda · 🍂"},
    "Browse all scents":{it:"Vedi tutti i profumi",pt:"Ver todos os aromas"},
    "When the light goes,":{it:"Quando la luce se ne va,",pt:"Quando a luz vai embora,"},
    "we make our own":{it:"la creiamo noi",pt:"a gente faz a nossa"},
    "Autumn is our seasonal edit — the scents we come back to when the evenings draw in. Woodsmoke and cinnamon, caramel and warm woods, poured by hand into soy wax and lit slowly. Every candle is made to order in Dublin, in the format and colour you choose, so no two are exactly alike.":{it:"Autumn è la nostra selezione di stagione — i profumi a cui torniamo quando le sere si accorciano. Legna che brucia e cannella, caramello e legni caldi, colati a mano nella cera di soia. Ogni candela è fatta su ordinazione a Dublino, nel formato e nel colore che scegli: non ce ne sono due uguali.",pt:"Autumn é nossa seleção de estação — os aromas aos quais voltamos quando as noites encurtam. Lenha queimando e canela, caramelo e madeiras quentes, feitos à mão em cera de soja. Cada vela é feita sob encomenda em Dublin, no formato e na cor que você escolher: não há duas iguais."},
    "Seasonal edit":{it:"Selezione di stagione",pt:"Seleção de estação"},
    "Made to order":{it:"Su ordinazione",pt:"Sob encomenda"},
    "Vegan friendly":{it:"Vegan",pt:"Vegana"},
    "The Autumn Edit":{it:"La Selezione Autumn",pt:"A Seleção Autumn"},
    "Six scents for the season":{it:"Sei profumi per la stagione",pt:"Seis aromas para a estação"},
    "Choose a scent, then the shape and colour you'd like it poured in. Tap a scent to start your order — we'll confirm everything with you on WhatsApp.":{it:"Scegli un profumo, poi la forma e il colore in cui vuoi che sia colato. Tocca un profumo per iniziare l'ordine — confermiamo tutto insieme su WhatsApp.",pt:"Escolha um aroma e depois o formato e a cor em que quer a vela. Toque num aroma para começar o pedido — confirmamos tudo com você no WhatsApp."},
    "Roasted pumpkin, nutmeg and clove — October in a room.":{it:"Zucca arrostita, noce moscata e chiodi di garofano — ottobre in una stanza.",pt:"Abóbora assada, noz-moscada e cravo — outubro dentro de casa."},
    "Soft musk and amber — like pulling on a jumper straight off the radiator.":{it:"Muschio morbido e ambra — come infilarsi un maglione appena tolto dal calorifero.",pt:"Almíscar suave e âmbar — como vestir um suéter tirado direto do aquecedor."},
    "Fresh coffee, cocoa and a cold, sharp twist. For long evenings.":{it:"Caffè fresco, cacao e un twist freddo e deciso. Per le sere lunghe.",pt:"Café fresco, cacau e um toque gelado e marcante. Para as noites longas."},
    "Thick honey over dry tobacco leaf — sweet, smoky and grown-up.":{it:"Miele denso su foglia di tabacco secca — dolce, affumicato e adulto.",pt:"Mel denso sobre folha de tabaco seca — doce, esfumado e adulto."},
    "Woodsmoke, embers and dry timber — the whole fireplace, without the chimney.":{it:"Fumo di legna, braci e legno secco — tutto il camino, senza la canna fumaria.",pt:"Fumaça de lenha, brasas e madeira seca — a lareira inteira, sem a chaminé."},
    "Baked apple and warm cinnamon, straight out of the oven.":{it:"Mela cotta e cannella calda, appena sfornate.",pt:"Maçã assada e canela quente, recém-saídas do forno."},
    "Choose this scent →":{it:"Scegli questo profumo →",pt:"Escolher este aroma →"},
    "The autumn shapes come in these six scents only":{it:"Le forme d'autunno si fanno solo con questi sei profumi",pt:"Os formatos de outono saem só com estes seis aromas"},
    "Looking for something else?":{it:"Cerchi qualcos'altro?",pt:"Procurando outra coisa?"},
    "Our full scent menu":{it:"Il nostro menu completo dei profumi",pt:"Nosso menu completo de aromas"},
    "covers the other collections.":{it:"copre le altre collezioni.",pt:"cobre as outras coleções."},
    "The shapes":{it:"Le forme",pt:"Os formatos"},
    "Pumpkins, mushrooms and little ghosts":{it:"Zucche, funghi e piccoli fantasmi",pt:"Abóboras, cogumelos e fantasminhas"},
    "Seven shapes, moulded by hand. Pick your shape, then the scent and colour you'd like it in — we'll confirm the price with you on WhatsApp.":{it:"Sette forme, modellate a mano. Scegli la forma, poi il profumo e il colore che desideri — confermiamo il prezzo insieme su WhatsApp.",pt:"Sete formatos, moldados à mão. Escolha o formato e depois o aroma e a cor que quiser — confirmamos o preço com você no WhatsApp."},
    "Jesmonite":{it:"Jesmonite",pt:"Jesmonite"},
    "Solid wax":{it:"Tutta di cera",pt:"Toda de cera"},
    "Jesmonite · cap and stem · your scent":{it:"Jesmonite · cappello e gambo · il tuo profumo",pt:"Jesmonite · chapéu e caule · o seu aroma"},
    "Calm":{it:"Calma",pt:"Calma"},
    "Classic":{it:"Classico",pt:"Clássico"},
    "Good boy":{it:"Bravo cucciolo",pt:"Bom menino"},
    "Good girl":{it:"Brava micia",pt:"Boa menina"},
    "Jesmonite vessel with lid · wooden wick · 115 g / 4 oz":{it:"Contenitore in jesmonite con coperchio · stoppino in legno · 115 g / 4 oz",pt:"Recipiente de jesmonite com tampa · pavio de madeira · 115 g / 4 oz"},
    "All wax · moulded by hand · your scent":{it:"Tutta di cera · modellata a mano · il tuo profumo",pt:"Toda de cera · moldada à mão · o seu aroma"},
    "Moulded candle · eyes closed · your scent":{it:"Candela modellata · occhi chiusi · il tuo profumo",pt:"Vela moldada · de olhos fechados · o seu aroma"},
    "Moulded candle · the classic one · your scent":{it:"Candela modellata · quello classico · il tuo profumo",pt:"Vela moldada · o clássico · o seu aroma"},
    "Moulded candle · floppy ears · your scent":{it:"Candela modellata · orecchie a penzoloni · il tuo profumo",pt:"Vela moldada · orelhas caídas · o seu aroma"},
    "Moulded candle · pointed ears · your scent":{it:"Candela modellata · orecchie a punta · il tuo profumo",pt:"Vela moldada · orelhas pontudas · o seu aroma"},
    "Ask for a price":{it:"Chiedi il prezzo",pt:"Peça o preço"},
    "A pumpkin and a little ghost make a good pair — tell us and we'll wrap them together.":{it:"Una zucca e un piccolo fantasma stanno bene insieme — dicci e li confezioniamo in coppia.",pt:"Uma abóbora e um fantasminha combinam — é só dizer que embalamos juntinhos."},
    "Autumn palette":{it:"Palette d'autunno",pt:"Paleta de outono"},
    "The colours of the season":{it:"I colori della stagione",pt:"As cores da estação"},
    "Oat":{it:"Avena",pt:"Aveia"},
    "Dune":{it:"Duna",pt:"Duna"},
    "Harvest":{it:"Raccolto",pt:"Colheita"},
    "Ember":{it:"Brace",pt:"Brasa"},
    "Chestnut":{it:"Castagna",pt:"Castanha"},
    "Berry":{it:"Bacca",pt:"Fruta vermelha"},
    "Simple, personal, made for you":{it:"Semplice, personale, fatto per te",pt:"Simples, pessoal, feito para você"},
    "Send":{it:"Invia",pt:"Envie"},
    "Light":{it:"Accendi",pt:"Acenda"},
    "Pick your scent, format and colour — add as many as you like to the bag.":{it:"Scegli profumo, formato e colore — aggiungine quante vuoi al carrello.",pt:"Escolha aroma, formato e cor — adicione quantas quiser à sacola."},
    "Check out through WhatsApp or Instagram. We'll confirm the price and delivery with you.":{it:"Concludi l'ordine su WhatsApp o Instagram. Confermiamo insieme prezzo e consegna.",pt:"Finalize pelo WhatsApp ou Instagram. Confirmamos o preço e a entrega com você."},
    "Your candle is poured by hand, just for you — and arrives ready for the first cold evening.":{it:"La tua candela viene colata a mano, solo per te — e arriva pronta per la prima sera fredda.",pt:"Sua vela é feita à mão, só para você — e chega pronta para a primeira noite fria."},
    "Cotton Wicks":{it:"Stoppini di Cotone",pt:"Pavios de Algodão"},
    "In season":{it:"Di stagione",pt:"Da estação"},
    "Spiced, smoky and golden — warm light for shorter days.":{it:"Speziata, affumicata e dorata — luce calda per giornate più corte.",pt:"Especiada, esfumada e dourada — luz quente para dias mais curtos."},
    "Every June":{it:"Ogni giugno",pt:"Todo mês de junho"},
    "Our Pride collection — 10% to Outhouse LGBTQ+ Centre.":{it:"La nostra collezione Pride — 10% all'Outhouse LGBTQ+ Centre.",pt:"Nossa coleção Pride — 10% para o Outhouse LGBTQ+ Centre."},
    "Seasonal edit · six scents":{it:"Selezione di stagione · sei profumi",pt:"Seleção de estação · seis aromas"},
    "Pumpkins & ghosts, moulded by hand":{it:"Zucche & fantasmi, modellati a mano",pt:"Abóboras & fantasmas, moldados à mão"},
    "Made to order in Dublin":{it:"Fatta su ordinazione a Dublino",pt:"Feita sob encomenda em Dublin"},
    "Price confirmed on WhatsApp":{it:"Prezzo confermato su WhatsApp",pt:"Preço confirmado no WhatsApp"},
    "Autumn Collection":{it:"Collezione Autumn",pt:"Coleção Autumn"},
    "A seasonal collection — Light Your Pride returns every June.":{it:"Una collezione stagionale — Light Your Pride torna ogni giugno.",pt:"Uma coleção sazonal — Light Your Pride volta todo mês de junho."},
    "Discover the Autumn Collection →":{it:"Scopri la Collezione Autumn →",pt:"Conheça a Coleção Autumn →"},
    /* ===== Light Your Pride (index) ===== */
    "Pride Collection · Handcrafted in Dublin":{it:"Collezione Pride · Fatta a mano a Dublino",pt:"Coleção Pride · Feita à mão em Dublin"},
    "A candle for every colour of who you are.":{it:"Una candela per ogni colore di ciò che sei.",pt:"Uma vela para cada cor de quem você é."},
    "A collection of handcrafted decorative candles, each one a celebration of identity, love and community. Part of every sale goes directly to Outhouse LGBTQ+ Centre, Dublin.":{it:"Una collezione di candele decorative artigianali, ognuna una celebrazione di identità, amore e comunità. Parte di ogni vendita va direttamente all'Outhouse LGBTQ+ Centre di Dublino.",pt:"Uma coleção de velas decorativas artesanais, cada uma uma celebração de identidade, amor e comunidade. Parte de cada venda vai direto para o Outhouse LGBTQ+ Centre, Dublin."},
    "Dublin · Ireland · 🏳️‍🌈":{it:"Dublino · Irlanda · 🏳️‍🌈",pt:"Dublin · Irlanda · 🏳️‍🌈"},
    "About the collection":{it:"La collezione",pt:"Sobre a coleção"},
    "Born from colour,":{it:"Nata dal colore,",pt:"Nascida da cor,"},
    "shaped with intention":{it:"plasmata con intenzione",pt:"moldada com intenção"},
    "Light Your Pride is a collection of decorative soy wax candles, handcrafted in Dublin in the colours of the rainbow flag. Each piece is made by hand — no two are exactly alike. Designed to be displayed, gifted and cherished, they carry no fragrance — only colour, form and meaning. A quiet celebration of pride, every single day.":{it:"Light Your Pride è una collezione di candele decorative in cera di soia, fatte a mano a Dublino nei colori della bandiera arcobaleno. Ogni pezzo è realizzato a mano — non ce ne sono due uguali. Pensate per essere esposte, regalate e custodite, non hanno profumo — solo colore, forma e significato. Una silenziosa celebrazione dell'orgoglio, ogni giorno.",pt:"Light Your Pride é uma coleção de velas decorativas em cera de soja, feitas à mão em Dublin nas cores da bandeira do arco-íris. Cada peça é feita à mão — não há duas iguais. Criadas para exibir, presentear e guardar, não têm perfume — só cor, forma e significado. Uma celebração silenciosa do orgulho, todos os dias."},
    "Handmade in Dublin":{it:"Fatto a mano a Dublino",pt:"Feito à mão em Dublin"},
    "Decorative":{it:"Decorativa",pt:"Decorativa"},
    "Unscented":{it:"Senza profumo",pt:"Sem perfume"},
    "Soy wax":{it:"Cera di soia",pt:"Cera de soja"},
    "One of a kind":{it:"Pezzo unico",pt:"Peça única"},
    "Three shapes, six colours":{it:"Tre forme, sei colori",pt:"Três formatos, seis cores"},
    "Each candle is handcrafted in one of the six colours of the rainbow flag — available individually or as a complete set.":{it:"Ogni candela è realizzata a mano in uno dei sei colori della bandiera arcobaleno — disponibile singolarmente o come set completo.",pt:"Cada vela é feita à mão em uma das seis cores da bandeira do arco-íris — disponível individualmente ou como set completo."},
    "157 g · Decorative · Unscented":{it:"157 g · Decorativa · Senza profumo",pt:"157 g · Decorativa · Sem perfume"},
    "195 g · Decorative · Unscented":{it:"195 g · Decorativa · Senza profumo",pt:"195 g · Decorativa · Sem perfume"},
    "187 g · Decorative · Unscented":{it:"187 g · Decorativa · Senza profumo",pt:"187 g · Decorativa · Sem perfume"},
    "10% donated to Outhouse":{it:"10% donato a Outhouse",pt:"10% doado à Outhouse"},
    "Or take home the full rainbow — all six colours as a set.":{it:"Oppure porta a casa l'arcobaleno completo — tutti e sei i colori in set.",pt:"Ou leve o arco-íris completo — as seis cores em conjunto."},
    "Colour palette":{it:"Tavolozza dei colori",pt:"Paleta de cores"},
    "Every colour has a voice":{it:"Ogni colore ha una voce",pt:"Cada cor tem uma voz"},
    "Red":{it:"Rosso",pt:"Vermelho"},"Orange":{it:"Arancione",pt:"Laranja"},"Yellow":{it:"Giallo",pt:"Amarelo"},
    "Green":{it:"Verde",pt:"Verde"},"Blue":{it:"Blu",pt:"Azul"},"Purple":{it:"Viola",pt:"Roxo"},
    "Life":{it:"Vita",pt:"Vida"},"Healing":{it:"Guarigione",pt:"Cura"},"Sun":{it:"Sole",pt:"Sol"},
    "Nature":{it:"Natura",pt:"Natureza"},"Harmony":{it:"Armonia",pt:"Harmonia"},"Spirit":{it:"Spirito",pt:"Espírito"},
    "Giving back":{it:"Restituire",pt:"Retribuição"},
    "of every sale donated":{it:"di ogni vendita donato",pt:"de cada venda doado"},
    "A small flame for a bigger cause.":{it:"Una piccola fiamma per una grande causa.",pt:"Uma pequena chama por uma causa maior."},
    "For every Light Your Pride candle sold, 10% goes directly to Outhouse LGBTQ+ Centre in Dublin — a safe space for the community since 1997.":{it:"Per ogni candela Light Your Pride venduta, il 10% va direttamente all'Outhouse LGBTQ+ Centre di Dublino — uno spazio sicuro per la comunità dal 1997.",pt:"Para cada vela Light Your Pride vendida, 10% vai direto para o Outhouse LGBTQ+ Centre, em Dublin — um espaço seguro para a comunidade desde 1997."},
    "Outhouse LGBTQ+ Centre · Dublin →":{it:"Outhouse LGBTQ+ Centre · Dublino →",pt:"Outhouse LGBTQ+ Centre · Dublin →"},
    "How to order":{it:"Come ordinare",pt:"Como pedir"},
    "Simple, personal, handcrafted for you":{it:"Semplice, personale, fatto a mano per te",pt:"Simples, pessoal, feito à mão para você"},
    "Choose":{it:"Scegli",pt:"Escolha"},
    "Pick your shape and colour — or order the full rainbow set.":{it:"Scegli forma e colore — o ordina il set arcobaleno completo.",pt:"Escolha o formato e a cor — ou peça o set arco-íris completo."},
    "Send a DM on Instagram or WhatsApp — we'll confirm and arrange delivery.":{it:"Scrivici un DM su Instagram o WhatsApp — confermiamo e organizziamo la consegna.",pt:"Mande uma DM no Instagram ou WhatsApp — confirmamos e combinamos a entrega."},
    "Celebrate":{it:"Festeggia",pt:"Celebre"},
    "Your candle arrives handcrafted, unique and ready to light up your space.":{it:"La tua candela arriva artigianale, unica e pronta a illuminare il tuo spazio.",pt:"Sua vela chega artesanal, única e pronta para iluminar seu espaço."},
    "Choose your favourite scent":{it:"Scegli il tuo profumo preferito",pt:"Escolha sua fragrância favorita"},
    "Our scented candles come in over thirty fragrances, handcrafted in natural soy wax — pick your favourite for any collection or a custom order. (Light Your Pride is decorative and unscented.)":{it:"Le nostre candele profumate sono disponibili in oltre trenta fragranze, colate a mano in cera di soia — scegli la tua preferita per qualsiasi collezione o un ordine personalizzato. (Light Your Pride è decorativa e senza profumo.)",pt:"Nossas velas perfumadas têm mais de trinta fragrâncias, feitas à mão em cera de soja — escolha a sua favorita para qualquer coleção ou um pedido personalizado. (Light Your Pride é decorativa e sem perfume.)"},
    "Sweet & Gourmand":{it:"Dolci & Gourmand",pt:"Doces & Gourmand"},
    "Floral":{it:"Floreale",pt:"Floral"},
    "Citrus & Fresh":{it:"Agrumi & Freschezza",pt:"Cítricos & Frescor"},
    "Aromatic & Natural":{it:"Aromatico & Naturale",pt:"Aromático & Natural"},
    "Soft & Clean":{it:"Morbido & Pulito",pt:"Suave & Limpo"},
    "Warm & Woody":{it:"Caldo & Legnoso",pt:"Quente & Amadeirado"},
    "Signature":{it:"Signature",pt:"Assinatura"},
    "Custom orders available":{it:"Ordini personalizzati disponibili",pt:"Pedidos personalizados disponíveis"},
    "The sea":{it:"Il mare",pt:"O mar"},
    "Comfort & cause":{it:"Comfort & causa",pt:"Conforto & causa"},
    "Stillness":{it:"Quiete",pt:"Quietude"},
    "Salt, driftwood and warm sea air.":{it:"Sale, legni e aria calda di mare.",pt:"Sal, madeira e ar morno do mar."},
    "Soft comforts — supporting animals in need.":{it:"Piccoli comfort — a sostegno degli animali in difficoltà.",pt:"Confortos suaves — ajudando animais necessitados."},
    "Grounding, meditative scents for calm.":{it:"Profumi radicanti e meditativi per la calma.",pt:"Fragrâncias meditativas e acolhedoras para a calma."},
    /* ===== Mare ===== */
    "Collection · Summer Edition":{it:"Collezione · Edizione Estiva",pt:"Coleção · Edição de Verão"},
    "The sea, brought home.":{it:"Il mare, a casa tua.",pt:"O mar, dentro de casa."},
    "Hand-poured scented candles inspired by the Mediterranean coast — salt, driftwood and warm sea air. Soy wax, cotton wick, slow and clean to burn.":{it:"Candele profumate colate a mano, ispirate alla costa mediterranea — sale, legni e aria calda di mare. Cera di soia, stoppino di cotone, lente e pulite da bruciare.",pt:"Velas perfumadas feitas à mão, inspiradas na costa mediterrânea — sal, madeira e ar morno do mar. Cera de soja, pavio de algodão, queima lenta e limpa."},
    "Quiet luxury, poured by hand in small batches.":{it:"Lusso silenzioso, colato a mano in piccoli lotti.",pt:"Luxo silencioso, feito à mão em pequenos lotes."},
    "Each Mare candle is made with natural soy wax and a cotton wick for a clean, even burn and a soft, lingering scent — the kind that turns an ordinary evening into something you remember.":{it:"Ogni candela Mare è fatta con cera di soia naturale e stoppino di cotone per una combustione pulita e uniforme e un profumo morbido e persistente — di quelli che trasformano una sera qualunque in un ricordo.",pt:"Cada vela Mare é feita com cera de soja natural e pavio de algodão, para uma queima limpa e uniforme e uma fragrância suave e duradoura — daquelas que transformam uma noite comum em algo memorável."},
    "Three scents":{it:"Tre profumi",pt:"Três fragrâncias"},
    "Three scents from the seabed":{it:"Tre profumi dal fondale",pt:"Três fragrâncias do fundo do mar"},
    /* ===== Mini Pets ===== */
    "Collection":{it:"Collezione",pt:"Coleção"},
    "Soft comforts for home.":{it:"Piccoli comfort per la casa.",pt:"Confortos suaves para o lar."},
    "Warm, understated candles for slow days at home — and a way to give back. A part of every Mini Pets candle supports animals still waiting for a home.":{it:"Candele calde e discrete per le giornate lente a casa — e un modo per restituire. Parte di ogni candela Mini Pets sostiene gli animali che aspettano ancora una casa.",pt:"Velas quentes e discretas para dias tranquilos em casa — e um jeito de retribuir. Parte de cada vela Mini Pets ajuda animais que ainda esperam por um lar."},
    "Made with care — for your home, and for those without one.":{it:"Fatte con cura — per la tua casa, e per chi non ne ha una.",pt:"Feitas com carinho — para o seu lar, e para quem ainda não tem um."},
    "Soft, comforting scents poured by hand in natural soy wax. With every candle, a part of what you spend goes to shelters and animals in need. Quiet comfort, with a purpose.":{it:"Profumi morbidi e avvolgenti colati a mano in cera di soia. Con ogni candela, parte di ciò che spendi va a rifugi e animali in difficoltà. Comfort silenzioso, con uno scopo.",pt:"Fragrâncias suaves e acolhedoras feitas à mão em cera de soja. A cada vela, parte do que você gasta vai para abrigos e animais necessitados. Conforto silencioso, com propósito."},
    "Three cozy companions":{it:"Tre compagni accoglienti",pt:"Três companhias aconchegantes"},
    /* ===== Namaste ===== */
    "Stillness, by candlelight.":{it:"Quiete, a lume di candela.",pt:"Quietude, à luz de velas."},
    "Grounding, meditative scents for yoga, ritual and quiet evenings — sandalwood, white lotus, palo santo. Made to mark the moment you choose to slow down.":{it:"Profumi radicanti e meditativi per yoga, rituali e serate tranquille — sandalo, loto bianco, palo santo. Pensati per segnare il momento in cui scegli di rallentare.",pt:"Fragrâncias meditativas e acolhedoras para yoga, rituais e noites tranquilas — sândalo, lótus branco, palo santo. Feitas para marcar o momento em que você escolhe desacelerar."},
    "Light one. Take a breath. Let the day settle.":{it:"Accendine una. Respira. Lascia che il giorno si posi.",pt:"Acenda uma. Respire. Deixe o dia assentar."},
    "Warm, meditative fragrances poured by hand in natural soy wax, with a cotton wick for a clean, even burn. A small ritual to bring you back to yourself.":{it:"Fragranze calde e meditative colate a mano in cera di soia, con stoppino di cotone per una combustione pulita e uniforme. Un piccolo rituale per ritrovare te stesso.",pt:"Fragrâncias quentes e meditativas feitas à mão em cera de soja, com pavio de algodão para uma queima limpa e uniforme. Um pequeno ritual para você se reencontrar."},
    "Three rituals of calm":{it:"Tre rituali di calma",pt:"Três rituais de calma"},
    /* ===== scents.html ===== */
    "Thirty-one fragrances, seven families, one for every mood.":{it:"Trentun fragranze, sette famiglie, una per ogni stato d'animo.",pt:"Trinta e uma fragrâncias, sete famílias, uma para cada momento."},
    "Every scent is hand-poured in natural soy wax and can be made into any of our scented collections — or a custom order made just for you. Search, filter, and order yours on WhatsApp.":{it:"Ogni profumo è colato a mano in cera di soia naturale e può diventare una qualsiasi delle nostre collezioni profumate — o un ordine personalizzato solo per te. Cerca, filtra e ordina il tuo su WhatsApp.",pt:"Cada fragrância é feita à mão em cera de soja natural e pode virar qualquer uma das nossas coleções perfumadas — ou um pedido personalizado só para você. Busque, filtre e peça a sua pelo WhatsApp."},
    "Search a scent…":{it:"Cerca un profumo…",pt:"Buscar uma fragrância…"},
    "All":{it:"Tutti",pt:"Todos"},
    "No scent matches your search.":{it:"Nessun profumo corrisponde alla ricerca.",pt:"Nenhuma fragrância corresponde à busca."},
    "Order your candle":{it:"Ordina la tua candela",pt:"Peça sua vela"},
    "Model / candle name":{it:"Modello / nome della candela",pt:"Modelo / nome da vela"},
    "Type the candle name…":{it:"Scrivi il nome della candela…",pt:"Digite o nome da vela…"},
    "Choose a colour":{it:"Scegli un colore",pt:"Escolha uma cor"},
    "Or type another colour…":{it:"Oppure scrivi un altro colore…",pt:"Ou digite outra cor…"},
    "Send on WhatsApp":{it:"Invia su WhatsApp",pt:"Enviar no WhatsApp"},
    "Choose a model and colour to continue":{it:"Scegli modello e colore per continuare",pt:"Escolha modelo e cor para continuar"},
    "Add to cart":{it:"Aggiungi al carrello",pt:"Adicionar ao carrinho"},
    "Prefer to chat? Order with the assistant":{it:"Preferisci chattare? Ordina con l'assistente",pt:"Prefere conversar? Peça com o assistente"},
    /* ===== Carezza ===== */
    "Warmth you can feel.":{it:"Un calore che si sente.",pt:"Um calor que você sente."},
    "Wellness and massage candles, hand-poured in soy and shea butter. Light one to unwind — or let a massage candle melt into a warm, nourishing oil for the skin.":{it:"Candele wellness e da massaggio, colate a mano in cera di soia e burro di karité. Accendine una per rilassarti — o lascia che una candela da massaggio si sciolga in un olio caldo e nutriente per la pelle.",pt:"Velas de bem-estar e de massagem, feitas à mão em cera de soja e manteiga de karité. Acenda uma para relaxar — ou deixe uma vela de massagem derreter num óleo morno e nutritivo para a pele."},
    "A caress, in candle form.":{it:"Una carezza, in forma di candela.",pt:"Uma carícia em forma de vela."},
    "Carezza is made for slowing down and taking care of yourself. Our wellness candles fill the room with calm, while our massage candles burn at a low, gentle heat and melt into a warm oil of soy and shea — ready to pour and massage into the skin. Soft, soothing and kind to you.":{it:"Carezza è pensata per rallentare e prendersi cura di sé. Le candele wellness riempiono la stanza di calma, mentre quelle da massaggio bruciano a un calore basso e delicato e si sciolgono in un olio caldo di soia e karité — pronto da versare e massaggiare sulla pelle. Morbida, lenitiva e gentile con te.",pt:"Carezza é feita para desacelerar e cuidar de você. As velas de bem-estar enchem o ambiente de calma, enquanto as de massagem queimam num calor baixo e suave e derretem num óleo morno de soja e karité — pronto para aplicar e massagear na pele. Suave, relaxante e gentil com você."},
    "Three ways to unwind":{it:"Tre modi per rilassarsi",pt:"Três formas de relaxar"},
    "Soy & shea wax":{it:"Cera di soia & karité",pt:"Cera de soja & karité"},
    "Skin-safe":{it:"Sicura per la pelle",pt:"Segura para a pele"},
    "Massage & wellness":{it:"Massaggio & wellness",pt:"Massagem & bem-estar"},
    "Hand-poured":{it:"Colata a mano",pt:"Feita à mão"},
    "Wellness":{it:"Wellness",pt:"Bem-estar"},
    "Massage candle":{it:"Candela da massaggio",pt:"Vela de massagem"},
    "Wellness & massage":{it:"Wellness & massaggio",pt:"Bem-estar & massagem"},
    "Wellness and massage candles to soften the moment.":{it:"Candele wellness e da massaggio per addolcire il momento.",pt:"Velas de bem-estar e massagem para suavizar o momento."}
  };

  /* ---- engine ---- */
  var nodes = [], attrEls = [];
  function tr(s){ if(LANG==="en") return s; var k=(s||"").trim(); if(!k) return s; var e=D[k]; if(!e||!e[LANG]) return s; return s.replace(k, e[LANG]); }
  function t(s){ if(LANG==="en"||!s) return s; var e=D[(""+s).trim()]; return (e&&e[LANG])||s; }

  function collect(){
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, { acceptNode:function(n){
      if(!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      var p = n.parentNode, tag = p && p.nodeName;
      if(tag==="SCRIPT"||tag==="STYLE"||tag==="NOSCRIPT") return NodeFilter.FILTER_REJECT;
      if(p && p.closest && p.closest(".se-w")) return NodeFilter.FILTER_REJECT; /* widget handles itself */
      return NodeFilter.FILTER_ACCEPT;
    }});
    var n; while((n = w.nextNode())) nodes.push({ node:n, en:n.nodeValue });
    var list = document.querySelectorAll("[placeholder],[title],[aria-label]");
    for(var i=0;i<list.length;i++){
      var el=list[i];
      ["placeholder","title","aria-label"].forEach(function(a){ if(el.hasAttribute(a)) attrEls.push({el:el,attr:a,en:el.getAttribute(a)}); });
    }
  }
  function apply(){
    for(var i=0;i<nodes.length;i++) nodes[i].node.nodeValue = tr(nodes[i].en);
    for(var j=0;j<attrEls.length;j++) attrEls[j].el.setAttribute(attrEls[j].attr, t(attrEls[j].en));
    document.documentElement.lang = LANG==="pt" ? "pt-BR" : LANG;
    var btns = document.querySelectorAll(".se-lang-b");
    for(var k=0;k<btns.length;k++) btns[k].classList.toggle("on", btns[k].getAttribute("data-l")===LANG);
  }
  function setLang(l){ if(LANGS.indexOf(l)<0) return; LANG=l; localStorage.setItem("se_lang",l); apply(); window.dispatchEvent(new CustomEvent("se-lang",{detail:l})); }

  /* switcher injected into nav */
  function buildSwitcher(){
    var nav = document.querySelector(".header .nav") || document.querySelector(".nav");
    if(!nav) return;
    var box = document.createElement("span"); box.className = "se-lang";
    LANGS.forEach(function(l){
      var b = document.createElement("button");
      b.className = "se-lang-b"; b.type="button"; b.setAttribute("data-l", l); b.textContent = l.toUpperCase();
      b.onclick = function(){ setLang(l); };
      box.appendChild(b);
    });
    nav.appendChild(box);
  }
  var st = document.createElement("style");
  st.textContent = ".se-lang{display:inline-flex;align-items:center;gap:1px;margin-left:6px;flex:0 0 auto}"
    + ".se-lang-b{font:inherit;font-size:10.5px;letter-spacing:1px;font-weight:500;color:#b3aa9c;background:none;border:none;cursor:pointer;padding:4px 5px;border-radius:4px}"
    + ".se-lang-b:hover{color:#1b1916}.se-lang-b.on{color:#a8843f;font-weight:700}";
  document.head.appendChild(st);

  /* expose for the widget */
  window.I18N = { t:t, setLang:setLang, get lang(){ return LANG; }, dict:D };

  buildSwitcher();
  collect();
  apply();
})();
