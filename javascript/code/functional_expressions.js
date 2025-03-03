 function callAshu(){
    let ab = "a"+"b";
    console.log("ashu"+ab);
}

let ashu = callAshu;

console.log(callAshu); //totally valid, and prints [Function: callAshu]

ashu(); //prints ashuab