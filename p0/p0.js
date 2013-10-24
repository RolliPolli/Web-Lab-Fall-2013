/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
Title : Project 0: JavaScript exercises
Author : Christi Hagen
Description : Exercises for Project 0
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/* addHeader adds a header to the document body at a given level */
function addHeader(content, level) {
    if(typeof(content) !== "string"){
		alert("We have a problem: param content is not a string");
		return;
	}
	if(typeof(level) !== "number" || (level > 5 || level < 1)){
		level = 3;
	}
	
	// Here we have to append the text to the tag first, 
	//  then the tag to the body
	var tag = document.createElement("h"+level);
	var text = document.createTextNode(content);
    tag.appendChild(text);
	document.body.appendChild(tag);
	return; 
} // end addHeader

/* fibonacci produces a string of the first n fibonacci numbers*/
function fibonacci(n) {
    var x1 = 0;
    var x2 = 1;
    var counter = 3;
    var sequence = "0,1";
    if(typeof(n) != "number" || n < 1){
		alert("input invalid, enter a number greater than 0");
		return;
	}
	if (n === 1){
        document.write(x1+"<br>");
	    return x1;
	}	    
	if (n === 2){
	    document.write(sequence+"<br>");
	    return sequence;
	}
	while (counter <= n)
	{
	    if (x1 < x2){
	        x1 += x2;
	        sequence = sequence+","+x1;
	    }
	    else{
	        x2 += x1;
	        sequence = sequence+","+x2;
	    }
        counter++;
	}
	document.write(sequence+"<br>");
	return sequence;	    
} // end fibonacci

/* findNumbersInStr parses out numbers from a string and stores them in an array */
function findNumbersInStr(strToParse) {
    if (typeof(strToParse) != "string"){
		alert("input invalid, enter a string of numbers");
		return;
	}
	var numArr = [];
	numArr = strToParse.split(" ");
	document.write(numArr + "<br>");
	return numArr;
} // end findNumbersInStr

/* map applies a function to each element in a given array */
function map(array, functionToApply) {
    if (!Array.isArray(array) || typeof(functionToApply) != "function"){
		alert("input invalid");
		return;
	}  
    for(var i = 0; i < array.length; i++){
       array[i] = functionToApply(array[i]); 
    }
    document.write(array.toString() + "<br>");
    return array;
} // end map

// function makeIterator() {} // end makeIterator

/* runTests has test cases for each of the functions in p0.js */
function runTests(){
    /*addHeader tests*/
    addHeader("hi", 0);
    addHeader("What's happening?", 1);
    addHeader("oh, nothing much, just coding", 5);
    addHeader("aw snap, code!", 'l');

    /*fibonacci tests*/
    fibonacci(0);
    fibonacci (1);
    fibonacci (2);
    fibonacci (7);
    fibonacci (20); 
    fibonacci("-1");
    
    /*findNumbersInStr tests */
    findNumbersInStr(2);
    findNumbersInStr("2");
    findNumbersInStr("2 4 87 76 23 1");
    
    /*map tests*/
    var oneTo5 = [1,2,3,4,5];
    map(oneTo5, function (x) { return x * 2 });
    var singles = ["bird","turtle","kitten", "snail"];
    map(singles, function (x) {return x+"s"});
    map("hello", "mr");
    map("hi", function (x) {return "yolo"});
    
} // end runTests

// To run your tests when the window loads, uncomment the code below:

window.onload = function () {
    runTests();
}
