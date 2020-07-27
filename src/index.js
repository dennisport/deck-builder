document.addEventListener("DOMContentLoaded", function() {

    let imgdiv = document.querySelector("#card-image-container")
    
    function fetchImgs() {
        fetch ("https://db.ygoprodeck.com/api/v7/cardinfo.php")
        .then(response => response.json())
        .then((resp => {
            // console.log(resp);
            let cards = resp.data;
            console.log(cards)
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
        // debugger
        cardstep2.forEach(card => displayimage(card))

        
        // debugger
        // cardimage.forEach(cardurl => fetchImg(cardurl))
    }

    function displayimage(card) {
        // debugger
        // let cardimage = cardstep2.map(cardelement => cardelement.image_url)
        // card.card_images.forEach(image => { 
        let img = document.createElement("img")
        img.src = card.image_url
        imgdiv.append(img)
        // })
        
        
        
        img.addEventListener("click", () => clearDOM(card))
    }
    
    function clearDOM (cardurl) {
        // imgdiv.parentNode.removeChild
        console.log(cardurl)
        debugger
        // debugger
        // let oneimg = document.createElement("img")
        // oneimg.src = cardurl
        // debugger
        // imgdiv.append(oneimg)
        // fetchImg() 
        
    }

    function fetchImg(cardurl) {
        console.log(cardurl)
        // debugger
    }



    

    fetchImgs()
    // loadbreeds()
})