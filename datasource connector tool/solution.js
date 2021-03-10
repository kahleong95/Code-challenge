
class Price{
    constructor(buy,sell,pair){
    this.buy=buy;
    this.sell =sell;
    this.pair =pair;
    }
    
mid(){
return (this.buy+this.sell)/2.0;
}

quote(){
return this.pair.slice(-3);
}
   
    }
class Datasource{
constructor(){

}

async getPrices(){

  var xhttp = new XMLHttpRequest();
  var t=[]
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     var myObj = JSON.parse(this.responseText)["data"]["prices"]
     
       for(let i=0;i<myObj.length;i++){
        t.push(new Price(myObj[i]["buy"],myObj[i]["sell"],myObj[i]["pair"]));
    
       }
    }
  };
  xhttp.open("GET", "https://static.ngnrs.io/test/prices", false);
  xhttp.send();
  this.tt =t;
return this.tt;
}
}
let ds = new Datasource();
ds.getPrices()
    .then(prices => {
        prices.forEach(price => {
          console.log(`Mid price for ${ price.pair } is ${ price.mid() } ${ price.quote() }.`);
        });
    }).catch(error => {
        console.err(error);
    });
