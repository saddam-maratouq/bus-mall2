'use strict';
let attemptsEl = document.getElementById('attempts');
let containerEl = document.getElementById('container');
let leftImgEl = document.getElementById('leftImg');
let midelImgEl = document.getElementById('midelImg');
let rightImgEl = document.getElementById('rightImg');
let ulEl = document.getElementById('out');
 BusImg.malls = [];
let attempts = 1;
let maxAttempts = 25; 
let productNames =[];
let votess = [];
let viewss = [];

function BusImg(prouductName) {
    
    
    this.pName = prouductName.split('.')[0];
    this.img = 'imgs/' + prouductName;
    this.votes = 0;
    this.views = 0;
    productNames.push(this.pName);
    BusImg.malls.push(this);
    
    
}



let  malImgs = ["bag.jpg",
"banana.jpg",
"bathroom.jpg",
"boots.jpg",
"breakfast.jpg",
"bubblegum.jpg",
"chair.jpg",
"cthulhu.jpg",
"dogduck.jpg",
"dragon.jpg",
"pen.jpg",
"pet-sweep.jpg",
"scissors.jpg",
"shark.jpg",
"sweep.png",
"tauntaun.jpg",
"unicorn.jpg",
"water-can.jpg",
"wine-glass.jpg",
 ];

for (let i = 0; i <  malImgs.length; i++) {
    new BusImg( malImgs[i]);
}


function randomIndex() {
    
    
    return Math.floor(Math.random() * BusImg.malls.length);
}
let leftIndex;
let rightIndex;
let midelIndex;

let rand = [ -1,50,33]

function renderRandomImg() {
     do { 

    leftIndex = randomIndex();
    rightIndex = randomIndex();
    midelIndex =  randomIndex();
    }
    while (leftIndex === midelIndex ||  midelIndex === rightIndex || rightIndex===leftIndex 
        
        || leftIndex === rand[0 ]  || leftIndex === rand[1]  ||  leftIndex === rand[2]   
        || rightIndex === rand[0 ]  || rightIndex === rand[1]  ||  rightIndex === rand[2]   
        || midelIndex=== rand[0 ]  || midelIndex=== rand[1]  ||  midelIndex=== rand[2]   
           ) ;


           rand[0]= leftIndex;

           rand[1]= rightIndex;
       
          rand[2]= midelIndex;
    
        
    

    leftImgEl.setAttribute('src', BusImg.malls[leftIndex].img);
    rightImgEl.setAttribute('src', BusImg.malls[rightIndex].img);
    midelImgEl.setAttribute('src', BusImg.malls[midelIndex].img)

    leftImgEl.setAttribute('title', BusImg.malls[leftIndex].pName);
    midelImg.setAttribute('title', BusImg.malls[midelIndex].pName)
    rightImgEl.setAttribute('title', BusImg.malls[rightIndex].pName);
   
    BusImg.malls[leftIndex].views++;
    BusImg.malls[rightIndex].views++;
    BusImg.malls[midelIndex].views++
}

renderRandomImg();


leftImgEl.addEventListener('click', handelClicks);
rightImgEl.addEventListener('click', handelClicks);
midelImgEl.addEventListener('click', handelClicks);








    



 

function handelClicks(event) {



    if (attempts < maxAttempts) {
        let clickedImg = event.target.id;
       
        if (clickedImg === 'leftImg') {
            BusImg.malls[leftIndex].votes++;
        }
        else if (clickedImg === 'midelImg') {
            BusImg.malls[midelIndex].votes++;
        }

        else if( clickedImg === 'rightImg'){

            BusImg.malls[rightIndex].votes++
        }

    
        renderRandomImg();
        
        
    } else {   

        let btnEl = document.getElementById ('result') ;

 btnEl.addEventListener('click',fclick) ;
 
function fclick(event){   

           ulEl.textContent='';
                 if( maxAttempts <= attempts ) {
        let ulEl = document.getElementById('out');
        for (let i = 0; i < BusImg.malls.length; i++) {
            let liEl = document.createElement('li');
            liEl.textContent = `${BusImg.malls[i].pName} has ${BusImg.malls[i].votes} votes and ${BusImg.malls[i].views} views .`
            ulEl.appendChild(liEl);

            votess.push(BusImg.malls[i].votes);    
            viewss.push(BusImg.malls[i].views)
        }
        leftImgEl.removeEventListener('click', handelClicks);
        rightImgEl.removeEventListener('click', handelClicks);
        midelImgEl.removeEventListener('click', handelClicks);
        btnEl.removeEventListener('click',fclick)

        saveLocalsto();
          


        chartRender();

        
        
    }
    
    
}


}
attempts++; 

}





   




function chartRender() {
    let ctx = document.getElementById('myChart').getContext('2d');
let  myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: productNames  ,
        datasets: [{
            label: '# of Votes',
            data: votess , 
            backgroundColor: [
                'rgba(255, 99, 132,  1.0)',
               
            ],
            borderColor: [
                'rgba(255, 99, 132,  1.0)',
              
            ],
            borderWidth: 1
        } , 
        {
            label: '# of views',
            data:  viewss , 
            backgroundColor: [
                'rgba(130, 119, 30, 1.0)',
               
            ],
            borderColor: [
                'rgba(130, 119, 30, 1.0)',
            ],
            borderWidth: 1
        }]  
      
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
}  



     


//////////////////////////////////// Done ////////////////////////////////////////



function saveLocalsto() {

    let data = JSON.stringify (BusImg.malls);

    localStorage.setItem('mall',data)
    

}

function readLocalsto() {

    let strObj = localStorage.getItem('mall')

    let normalObj = JSON.parse(strObj)


 if( normalObj !== null){
   
     BusImg.malls = normalObj  


    
 }
}

    readLocalsto();


    















