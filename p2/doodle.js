/* Doodle
 *
 * WebLab P3 By: Christi Hagen 
 *  
 * This file takes a text of my name and draws it incrementally 
 * moving up in different colors, and then moving down in different
 * colors until the middle is met, which is where the text is 
 * drawn one last time and in black.
 */
 
 
// these are used for shifting limits of where to draw text
var HeightValT = 108; 
var HeightValB = 568;

// these are used for ensuring text toggles appropriately
var lastFillT = "Yellow";
var lastFillB = "DodgerBlue";

// time for setTimeout calls, this will be made shorter and shorter
var timerTime = 36;

window.onload = function () {
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    var doodle = new Doodle(context);
    context.save();
    // Write my name and do things with it
    var text = new Text({ left: 120, height: 568, content: "Christi Hagen", font: "100pt dg", fill: "Yellow"});
    doodle.children.push(text);
    doodle.draw();
    slideIn(text, doodle); // kicks off jazzy up and down drawing sequence
};

// handles drawing and toggling of orange and yellow while moving upward
function slideIn(name, doodle){
     if (name.height > HeightValT){
         console.log(name.height);
         name.height -= 20;
         if (name.fill == "Yellow"){
            name.fill = "Orange"; 
         }   
         else{
             name.fill = "Yellow";
         }
         // time out to let drawing be slow enough for people to see 
         setTimeout(function() {doodle.draw();}, timerTime);
         setTimeout(function() {slideIn(name, doodle);}, timerTime);
     }
     else{
         if (HeightValT != HeightValB){
             lastFillT = name.fill;
             HeightValT += 20;
             checkLastFillB(name);
             slideOut(name, doodle); // start drawing downwards
             timerTime -= 3;
         }
         else
            lastDraw(name, doodle);
     }   
}
// handles drawing and toggling of different shades of blue while moving downward
function slideOut(name, doodle){
     if (name.height < HeightValB){
         console.log(name.height);
         name.height += 20;
         if (name.fill == "DodgerBlue"){
            name.fill = "LightSkyBlue"; 
         }   
         else{
             name.fill = "DodgerBlue";
         }
         // time out to let drawing be slow enough for people to see 
         setTimeout(function() {doodle.draw();}, timerTime);
         setTimeout(function() {slideOut(name, doodle);}, timerTime);
     }
     else{
         if (HeightValT != HeightValB){
             lastFillB = name.fill;
             HeightValB -= 20;
             checkLastFillT(name);
             slideIn(name, doodle); // start drawing upwards again
             timerTime -= 1;
         }
         else{
             lastDraw(name, doodle);
         } 
     }  
}
//ensures the colors toggle
function checkLastFillT(name){
        if (lastFillT == "Orange")
        name.fill = "Yellow";
        else
            name.fill = "Orange";
}
function checkLastFillB(name){
        name.fill = lastFillB;
}
// draws last name in black
function lastDraw(name, doodle){
    name.fill = "Black";
    doodle.draw();
}
