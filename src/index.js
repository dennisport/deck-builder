document.addEventListener("DOMContentLoaded", function() {

    let imgdiv = document.querySelector("#card-image-container")
    let singleimgdiv = document.querySelector("#card-image")
    let cardinfodiv = document.querySelector(".fooinfo")
    let cardstats = document.querySelector(".fooinfo2")
    
    function fetchImgs() {
        fetch ("https://db.ygoprodeck.com/api/v7/cardinfo.php")
        .then(response => response.json())
        .then((resp => {
            // console.log(resp);
            let cards = resp.data;
            // console.log(cards)
            showImages(cards);
        }))
        // debugger
    }

    function showImages(cards) {
        // debugger
        let cardnames = cards.map(card => card.name)
    
        let cardprices = cards.map(card => card.card_prices)
        let cardstep1 = cards.map(card => card.card_images[0])
        let cardstep2 = cardstep1.map(element => element)
        cardstep2.forEach(card => displayimage(card))

    }

    function displayimage(card) {
        
        let img = document.createElement("img")
        img.src = card.image_url
        imgdiv.append(img)
        
        
        if (imgdiv.style.display = 'none') {
            imgdiv.style.display = 'block'
        }
        img.addEventListener("click", () => clearDOM(card))
    }
    
    function clearDOM (cardurl) {
        // imgdiv.parentNode.removeChild
        console.log(cardurl)
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
        // debugger
        let singleimg = document.createElement("img")
        singleimg.src = cardurl.image_url


        let cardname = document.createElement("p")
        cardname.style.background = "red";
        cardname.style.color = "white";
        cardname.innerText = singlecard.name

        let cardinfolist = document.createElement("ul")

        let cardstatattk = document.createElement("p")
        if (singlecard.atk != null) {
            cardstatattk.style.background = "red";
            cardstatattk.style.color = "white";
            cardstatattk.innerText = singlecard.atk + "atk"

        }
        else {
            cardstatattk.innerText = ''
        }

        let cardstatdef = document.createElement("p")
        if (singlecard.def != null) {
            cardstatdef.style.background = "red";
            cardstatdef.style.color = "white";
            cardstatdef.innerText = singlecard.def + "def"
        }
        else {
            cardstatdef.innerText = ''
        }

        let cardstatlevel = document.createElement("p")
        if (singlecard.level != null) {
            cardstatlevel.style.background = "red";
            cardstatlevel.style.color = "white";
            cardstatlevel.innerText = "Lev" + singlecard.level 
        }
        else {
            cardstatdef.innerText = ''
        }

        singleimgdiv.append(singleimg)
        cardinfodiv.append(cardname)
        cardinfolist.append(cardstatlevel, cardstatattk, cardstatdef)
        cardstats.append(cardinfolist)
    
        singleimg.addEventListener("click", () => resetDOM())
        // debugger
    }

    function resetDOM() {
        singleimgdiv.innerHTML = ''
        cardinfodiv.innerHTML = ''
        cardstats.innerHTML = ''
        imgdiv.style.display = 'block'

    }




    

    fetchImgs()
    // loadbreeds()
})