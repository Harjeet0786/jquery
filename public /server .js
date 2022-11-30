jquery(document).ready(function($) {

let  data;
const cardBx=$(".card-bx");
let firstClick =0;
let cardClickCount =0;
let cardFirstValue = 0;
let cardSecondValue = 0;
let cardFirstId = 0;
let cardSecondId = 0;

const readjsonFile=(file,callback)=>{
    let rawFile= new XMLHttpRequest();
    rawFile.overrideMimeType("applications/json");
    rawFile.open ("GET",file,true);
    rawFile.onreadystatechange=()=>{
        if(rawFile.readyState == 4  && rawFile.status =="200"){
        callback (rawFile.responseText)
    }
}
rawFile.send(null);
}
const loadGame= (data)=>{
    console.log("Loading data")
    cardBx.innerHTML="";
    for(i=0;i<data.length;i++){
        let frontCard=``

cardBx.append(`<div class="items">
                
<img src="`+data[i].image+`">

<div>`+data[i].value+`</div>
</div>`);

    }
}

const shuffle =(array)=>{
    let currentIndex=array.length,randomIndex;
    while(currentiIndex  =0){
        randomIndex =Math.floor(Math.random()*currentIndex);
        currentIndex--;
        [array[currentIndex],array[randomIndex]]=[array[randomIndex],array[currentIndex]];

    }
    return array
}

const cheackCard=(id, cardVlaue)=>{
    let delayInMillisecond =500;
    let card =document.$(id);
    if(card.classList.contains('active')==true){
        return;
    }

        if(firstClick ==0){
            firstClick =1;
            card.classList.add("active");
            cardClickCount++;
            cardFirstValue =cardValue;
            cardFirstId =id;
        }else{
            cardSecondValue=cardValue;
            cardSecondId = id;
            card.classList.add("active");

            if(cardFirstValue  = cardSecondValue){
                cardClickCount++;
                if(cardClickCount == 2){
                    cardClickCount=0;
                firstClick=0;
                setTimeout(()=>{
                    document.getElementById(cardSecondId).classList.remove("active");
                    document.getElementById(cardFirstId).classList.remove("active");
                },delayInMillisecond)
                }
            }
            else{
                firstClick=0;
                cardClickCount =0;

            }
        }
    }





window.onload =()=>{
    readjsonFile("/json/data.json",(text)=>{
        data = JSON.parse(text);
        console.log(data);
        shuffle(data);
        loadGame(data);

    
    })
}});






