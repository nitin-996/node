var z = 10; // variable z assigned to 10

var func = function (){ // outermost function
    var b = 20;
    console.log("z and b is accessible (outer):", z, b);
    var innerFunc= function (){ // innermost function
        var c = 30;
        console.log("z and b and c is accessible (innner):", z, b, c);
    }
    innerFunc();
    return;
}
func(); // invoke function func 
console.log("only a is accessible (global):", z);