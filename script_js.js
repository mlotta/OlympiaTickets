const concertDate = '21 septembre 2024'; // 21 septembre 2024 / 3 décembre 2024
const addToCartText = 'Ajouter au panier';

//TODO: 
// - Fix reloding page stopping the bot
// - Login tunnel (necessary ? )

//Copy-paste on the browser console of this url : https://resell.seetickets.com/olympiahall/event/716/zaho-de-sagazan
(function() {
    function performActions() {
        // Find the label with the text concertDate
        let dateLabel = Array.from(document.getElementsByClassName('ribbon-end')).find(el => el.textContent.trim() === concertDate);
        if (dateLabel) {
            //If tickets are available click
            let areTicketsAvailable = !Array.from(document.getElementsByClassName('mb-1 fs-5 ')).find(el => el.textContent.trim() === 'Aucun billet disponibleCréer une alerte');
            if(!areTicketsAvailable) {
                console.log(`No tickets available for the date ${concertDate}`);
                return;
            }
            dateLabel.click();
            setTimeout(function() {
    
            //Ajouter tous les billets disponibles au panier
            let addToCartCtaList = Array.from(document.getElementsByClassName('btn btn-primary rounded-pill float-end py-3 px-4 fs-5')).filter(el => el.textContent.trim() === "Ajouter au panier");
            if (addToCartCtaList) {
                cta.map(el => el.click());
                console.log("Clicked on 'Ajouter au panier' label");
            } else {
                console.log("Label 'Ajouter au panier' not found");
            }
            //Cliquer sur Acheter
            let Buycta = Array.from(document.getElementsByClassName('btn btn-primary shadow fw-bold')).find(el => el.textContent.includes("Acheter"));
            if (Buycta) {
                Buycta.click();
                console.log("Clicked on 'Ajouter au panier' label");
            } else {
                console.log("Label 'Ajouter au panier' not found");
            }
        }, 2000); // Adjust the delay if needed
        } else {
            console.log(`No tickets available for the date ${concertDate}`);
            return;
        }
        // Find the label with the text 'Ajouter au panier'
    }
    setInterval(performActions, 5000); // 5000 milliseconds = 5 seconds
})();



//find 'Ajouter au panier' only based on a partial className
function findDivsByPartialClass(partialClassName) {
    // Get all div elements on the page
    const divs = document.querySelectorAll('div');
    const matchingDivs = [];

    // Iterate through all div elements
    for (const div of divs) {
        // Check if any of the div's class names contains the partial class name
        if (Array.from(div.classList).some(className => className.includes(partialClassName))) {
            matchingDivs.push(div); // Add the matching div to the array
        }
    }

    return matchingDivs; // Return the array of matching divs
}
