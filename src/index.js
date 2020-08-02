document.addEventListener("DOMContentLoaded", function() {

    

    let imgdiv = document.querySelector("#card-image-container")
    let deckdiv = document.querySelector("#deck-image-container")

    let singleimgdiv = document.querySelector("#card-image")
    let cardinfodiv = document.querySelector(".fooinfo")
    let cardstats = document.querySelector(".fooinfo2")
    let cardtypes = document.querySelector(".fooinfo3")

    let cardheader = document.querySelector("h1")
    
    let cardlink = document.createElement("span");
        cardlink.innerText = "Show Cards"

    let decklink = document.createElement("span");
        decklink.innerText = " Show Deck"
    
    var btn = document.createElement("button");
        btn.className = "YourClass";
        btn.innerText = "Add Card to Deck"

    let evoclass1 = document.querySelector(".fooevo1")
    evoclass1.style.visibility = 'hidden'

    cardheader.appendChild(cardlink)
    cardheader.appendChild(decklink)

    let evoclass2 = document.querySelector(".fooevo2")
    evoclass2.style.visibility = 'hidden'

    let evoclass3 = document.querySelector(".fooevo3")
    evoclass3.style.visibility = 'hidden'

    let evoclass4 = document.querySelector(".fooevo4")
    evoclass4.style.visibility = 'hidden'

    let carddesc = document.querySelector(".fooinfo12")

    singleimgdiv.style.display = 'none'
    imgdiv.style.display = 'block'
    imgdiv.style.visibility = 'visible'

    deckdiv.style.display = 'none'
    deckdiv.style.visibility = 'hidden'
   
    decklink.addEventListener("click", () => ShowDeck())
    cardlink.addEventListener("click", () => ShowCards())
    
    function fetchImgs() {
        fetch ("https://db.ygoprodeck.com/api/v7/cardinfo.php")
        .then(response => response.json())
        .then((resp => {
            // console.log(resp);
            let cards = resp.data;
            // console.log(cards)
            showImages(cards);
            addCardListener(cards);
        }))
        // debugger
    }

    function showImages(cards) {
        // debugger
        let cardnames = cards.map(card => card.name)
        console.log(cards)
    
        let cardprices = cards.map(card => card.card_prices)
        let cardstep1 = cards.map(card => card.card_images[0])
        let cardstep2 = cardstep1.map(element => element)
        cardstep2.forEach(card => displayimage(card))
        // console.log(cardnames)
    }

    function displayimage(card) {
        // console.log(card)
        let img = document.createElement("img")
        img.src = card.image_url
        imgdiv.append(img)
        
        
        // if (imgdiv.style.display = 'none') {
        //     imgdiv.style.display = 'block'
        // }
        img.addEventListener("click", () => clearDOM(card))
    }
    
    function clearDOM (cardurl) {
        // imgdiv.parentNode.removeChild
        // console.log(cardurl)
        fetch (`http://[::1]:3000/api/v1/cards/${cardurl.id}`)
        .then(response => response.json())
        .then((resp => {
            let singlecard = resp;
            console.log(singlecard.id);
            console.log(cardurl.id);
            if (singlecard.id = cardurl.id) { 
                console.log(singlecard)
                cardshowinfo(cardurl, singlecard)
            }
        }))
    }

    function cardshowinfo (cardurl, singlecard) {
        imgdiv.style.display = 'none'
        singleimgdiv.style.display = 'block'

        evoclass1.style.visibility = 'visible'
        evoclass2.style.visibility = 'visible'
        evoclass3.style.visibility = 'visible'
        evoclass4.style.visibility = 'visible'
        
        // debugger
        let singleimg = document.createElement("img")
        singleimg.src = cardurl.image_url


        let cardname = document.createElement("p")
        cardname.style.color = "Black";
        cardname.innerText = singlecard.name

        let cardtypee = document.createElement("p")
        cardtypee.style.color = "Black";
        cardtypee.innerText = singlecard.cardtype

        let cardinfolist = document.createElement("ul")

        let cardstatattk = document.createElement("p")
        if (singlecard.atk != null) {
            cardstatattk.style.color = "Black";
            cardstatattk.innerText = "ATK/" + singlecard.atk

        }
        else {
            cardstatattk.innerText = ''
        }

        let cardstatdef = document.createElement("p")
        if (singlecard.def != null) {
            cardstatdef.style.color = "Black";
            cardstatdef.innerText = "DEF/" +singlecard.def
        }
        else {
            cardstatdef.innerText = ''
        }

        let cardstatlevel = document.createElement("p")
        if (singlecard.level != null) {
            cardstatlevel.style.color = "Black"
            cardstatlevel.innerText = "LV " + singlecard.level 
        }
        else {
            cardstatlevel.innerText = ''
        }
        if (singlecard.cardtype == "XYZ Monster") { 
            cardstatlevel.innerText = ''
            cardstatlevel.innerText = "RANK " + singlecard.level
        }

        let cardcontent = document.createElement("P")
        cardcontent.innerText = singlecard.desc

        singleimgdiv.append(singleimg)

        cardinfodiv.append(cardname)
        cardstats.append(cardstatlevel, cardstatattk, cardstatdef)

        cardtypes.append(cardtypee)

        carddesc.append(cardcontent)
        // cardinfolist.append(fooclass1)

        

        singleimgdiv.append(btn)
    
        singleimg.addEventListener("click", () => resetDOM())
        btn.addEventListener("click", () => AddCardToDeck(cardurl, singlecard))

        // debugger
    }

    function resetDOM() {
        singleimgdiv.innerHTML = ''
        cardinfodiv.innerHTML = ''
        cardstats.innerHTML = ''
        cardtypes.innerHTML = ''
        carddesc.innerHTML = ''
        imgdiv.style.display = 'block'

    }

    function AddCardToDeck(cardurl, singlecard) {
        let cardid = cardurl.id
        fetch('http://[::1]:3000/decks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cards: cardid
        })
      })
      .then(resp => resp)
      .then(resp => {
        console.log(resp)
      })
    }


    function ShowDeck() {
        console.log(deckdiv)
        deckdiv.style.visibility = 'visible'
        deckdiv.style.display = 'block'
        console.log("Hello")
        if (singleimgdiv.innerHTML !== '') {
            singleimgdiv.innerHTML = ''
            cardinfodiv.innerHTML = ''
            cardstats.innerHTML = ''
            cardtypes.innerHTML = ''
            carddesc.innerHTML = ''
            imgdiv.style.display = 'none'
        }
        if (imgdiv.style.display !== 'none') {
            imgdiv.style.display = 'none'
            imgdiv.style.display = 'hidden'
        }
        deckdiv.style.display = 'block'
    }

    function ShowCards() {
        console.log("Hello")
        deckdiv.style.display = 'none'
        if (singleimgdiv.innerHTML !== '') {
            singleimgdiv.innerHTML = ''
            cardinfodiv.innerHTML = ''
            cardstats.innerHTML = ''
            cardtypes.innerHTML = ''
            carddesc.innerHTML = ''
            imgdiv.style.visibility = 'block'
        }
        if (imgdiv.style.display !== 'block'){
            imgdiv.style.display = 'block'
        }
        console.log(imgdiv)
    }

    function addRespToDeck(resp) {
        console.log(resp.url),
        console.log("hell0")
        let deckcardimg = document.createElement("img")
        deckcardimg.src = resp.url
        deckdiv.append(deckcardimg)
        console.log(deckdiv)
    }

    function addCardListener(cards) {
        // console.log(cards)
        let cardDropdown = document.querySelector('#card-dropdown');
        cardDropdown.addEventListener('change', function (event) {
        // console.log(event.target.value)
            event.preventDefault();
            selectCardsStartingWith(event.target.value, cards);
  });
    }

    function selectCardsStartingWith(letter, cards) {

        imgdiv.innerHTML = ''
      showImages(cards.filter(cardname => cardname.name.includes(letter)));
        // console.log(startswithLetter)
        // displayCardsThatAreFiltered(cards, startswithLetter)
    }

    function displayCardsThatAreFiltered(cards, startswithLetter) {
        console.log(cards)
        console.log(startswithLetter)

        
    }
    

    fetchImgs()
    // loadbreeds()
})