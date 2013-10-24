/* Doodle Drawing Library
 *
 * Drawable and Primitive are base classes and have been implemented for you.
 * Do not modify them! 
 *
 * Stubs have been added to indicate where you need to complete the
 * implementation.
 * Please email me if you find any errors!
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
    // for (var i = 0; i < this.children.length; i++) {
    //     if(typeOf this.children[i] == DoodleImage){
    //         if(this.children[i].isLoaded == true)
    //             continue;
    //     }   
    // }
    
    
    for (var i = 0; i < this.children.length; i++){
        console.log(this.children[i]);
        if (this.children[i].visible == true)
            this.children[i].draw(this.context);
    }
    return;
};


/* Base class for all drawable objects.
 * Do not modify this class! --> I modified it to be more general
 */
function Drawable (attrs) {
    var dflt = { 
        left: 0,
        top: 0,
        visible: true,
    };
    attrs = mergeWithDefault(attrs, dflt);
    // constructor code here
    
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
 * Do not modify this class!
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
    // add constructor code here
    return this;
    
}
Text.inheritsFrom(Drawable);

Text.prototype.draw = function (context) {
    // your draw code here
    context.font = this.font;
    context.fillText(this.content, this.left, this.height);
};

function DoodleImage(attrs) {
    var dflt = {
        width: -1,
        height: -1,
        src: "",
        isLoaded: false
    };
    this.attrs = mergeWithDefault(attrs, dflt);
    Drawable.call(this, attrs);  
	// rest of constructor code here
	this.onload = function() {this.isLoaded = true;}
	
	return this;
}
DoodleImage.inheritsFrom(Drawable);

DoodleImage.prototype.draw = function (context) {
    // draw code here
    var im = new Image();
    im.src = this.src;
    im.width = this.width;
    im.height = this.height;
    context.drawImage(im, this.left, this.top, this.width, this.height);
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
    
    // your draw code here
    //this.draw(this.context);
    
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
    
    // rest of constructor code here.
    // this.width = attrs.width;
    // this.height = attrs.height;
    // this.left = attrs.left;
    // this.top = attrs.top;
    // this.fill = attrs.fill;
    // this.borderColor = attrs.borderColor;
    // this.borderWidth = attrs.borderWidth;

}
Container.inheritsFrom(Drawable);

Container.prototype.draw = function (context) {
    // draw code here
};
