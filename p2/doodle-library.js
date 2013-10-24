/* Doodle Drawing Library
 * Library contains: line, text, rectangle, image, and container objects.
 * All objects know how to draw themselves.
 *
 * NOTE: see "//000" comment below for important information!
 */

/*
 * Root container for all drawable elements.
 */
function Doodle (context) {
    this.context = context;
    this.children = [];
}

Doodle.prototype.draw = function() {
    // draw code here
    for (var i = 0; i < this.children.length; i++){
        //console.log(this.children[i]);
        if (this.children[i].visible == true){
            this.children[i].draw(this.context); // each child draws itself
        }     
    }
    return;
};

/* Base class for all drawable objects.
 * --> I modified it to be more general, for loop 
 *     is where I made all things general
 */
function Drawable (attrs) {
    var dflt = { 
        left: 0,
        top: 0,
        visible: true,
        theta: 0
    };
    attrs = mergeWithDefault(attrs, dflt);
    
    // put all attributes in drawable object
    for (var attrname in attrs) {
        this[attrname] = attrs[attrname];
    }  
}

/*
 * Summary: Uses the passed in context object (passed in by a doodle object)
 * to draw itself.
 */
Drawable.prototype.draw = function(context) {
    console.log("ERROR: Calling unimplemented draw method on drawable object.");
};

/* Base class for objects that cannot contain child objects.
 */
function Primitive(attrs) {
    var dflt = {
        lineWidth: 1,
        color: "black"
    };
    attrs = mergeWithDefault(attrs, dflt);
    Drawable.call(this, attrs);
}
Primitive.inheritsFrom(Drawable);


function Text(attrs) {
    var dflt = {
        content: "",
        fill: "black",
        font: "12pt Helvetica",
        height: 12
    };
    attrs = mergeWithDefault(attrs, dflt);
    Drawable.call(this, attrs);
    return this;  
}
Text.inheritsFrom(Drawable);

Text.prototype.draw = function (context) {
    // get font stylings then draw making sure 
    //     to draw relative to its container
    context.fillStyle = this.fill;
    context.font = this.font;
    context.fillText(this.content, this.left, this.height + this.top);
};

function DoodleImage(attrs) {
    var dflt = {
        width: -1,
        height: -1,
        src: "",
        loaded: false
    };
    this.attrs = mergeWithDefault(attrs, dflt);

    Drawable.call(this, attrs);  
}
DoodleImage.inheritsFrom(Drawable);

DoodleImage.prototype.draw = function (context) {
    // draw code here
    //console.log(this);
    // since there is no way to draw a DoodleImage, set attributes to Image you can draw    
    var im = new Image();
    im.src = this.src;
    im.width = this.width;
    im.height = this.height;
    var top = this.top;
    var left = this.left;  
    
//000 found problem while about to turn in, context.clip() has to be uncommented for
//000 container-test to properly clip, but needs to be commented for imaged to be drawn in 
//000 primitives test !!! Ah!
    if (this.attrs.width == -1 && this.attrs.height == -1){
         im.onload = function() {console.log(context, im); //context.clip(); 
             context.drawImage(im, left, top);}
    }
    else{
        im.onload = function() {console.log(context, im); //context.clip(); 
            context.drawImage(im, left, top, im.width, im.height);}
    }  
};

function Line(attrs) {
    var dflt = {
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0
    };
    attrs = mergeWithDefault(attrs, dflt);
    Primitive.call(this, attrs);
    return this;
}
Line.inheritsFrom(Primitive);

Line.prototype.draw = function (context) {
    context.beginPath();
    context.moveTo(this.startX, this.startY);
    context.lineTo(this.endX, this.endY);
    context.lineWidth = this.lineWidth;
    context.strokeStyle = this.color;
    context.stroke();
};

function Rectangle(attrs) {
    var dflt = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    };
    attrs = mergeWithDefault(attrs, dflt);
    Primitive.call(this, attrs);
	return this;
}
Rectangle.inheritsFrom(Primitive);

Rectangle.prototype.draw = function (context) {
    // draw code here
    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);
    context.lineWidth = this.lineWidth;
    context.strokeStyle = this.color;
    context.stroke();
};

function Container(attrs) {
    var dflt = {
        width: 100,
        height: 100,
        fill: false,
        borderColor: "black",
        borderWidth: 0,
    };
    attrs = mergeWithDefault(attrs, dflt);
    Drawable.call(this, attrs);    
    this.children = [];
}

Container.inheritsFrom(Drawable);

Container.prototype.draw = function (context) {
    // draw code here
    context.beginPath();
    context.rect(this.left, this.top, this.width, this.height);
    
    if (this.fill != false){
        context.fillStyle = this.fill;
        context.fill();
    }
    if (this.borderWidth != 0){
        context.lineWidth = this.borderWidth;
        context.strokeStyle = this.borderColor;
        context.stroke();
    } 
    context.save();
    context.clip();
   
    for (var i = 0; i < this.children.length; i++){
        context.save();
        
        this.children[i].left += this.left;
        this.children[i].top += this.top;

/* I could not get any rotate code I tried to work
  here are some remnants of my efforts :(       
        if (this.children[i].theta != 0){
            context.save();
            context.translate(0, 0);
            context.translate((this.children[i].width) / 2.0, (this.children[i].height) / 2.0);
           // context.rotate(this.children[i].theta*Math.PI/180);
            this.children[i].draw(context);
            //context.rotate(-(this.children[i].theta*Math.PI/180));this.children[i].width+
            context.translate((this.children[i].width) / -2.0, (this.children[i].height) / -2.0);
            context.translate(0, 0);
            context.restore();
        }
        else{*/
            this.children[i].draw(context); // call to container's children to draw themselves
        //}

        context.restore();
    }
    context.restore();
};
