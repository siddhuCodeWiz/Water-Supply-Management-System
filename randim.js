var randomNumber = Math.floor(Math.random() * 10);
var str = "";

while(str.length < 6){
    str = str+Math.floor(Math.random() * 10);
}
console.log(str);