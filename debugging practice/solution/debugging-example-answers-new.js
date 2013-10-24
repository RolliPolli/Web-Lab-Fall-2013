// Demos for lab 3: 9/15/2011
// HCI 05-433 D, Web Lab
// Author: Julia Schwarz
// Edited by Kerry Chang (9/12/13)

// Debugging example
// This code is supposed to make an expandable div which, when expanded displays
// different content (i.e. more content), as specified by expandedContent. However,
// currently the content doesn't change! We will be fixing this in class today
// Parameters:
// div: the div to make expandable
// compressedContent: div contents when div is compressed
// expandedContent: div contents when div is expanded
// cW: compressed width
// cH: compressed height
// eW: expanded width
// eH: expanded height
function makeDivExpandable(div, compressedContent, expandedContent, cW, cH, eW, eH) {
	div.isExpanded = false;
	div.style.width = cW + "px";
	div.style.height = cH + "px";
	
	div.updateContent = function() {
		if(!div.isExpanded) {
			div.innerHTML = compressedContent;
		} else {	
			div.innerHTML = expandedContent;
		}
	}
	
	div.updateDimensions = function() {
		
		var w = parseInt(div.style.width);
		var h = parseInt(div.style.height);
	
		var done = false;
		
		if(div.isExpanded){
			if(eW-w < 1 && eH-h < 1){
				done = true;					
			}
			else{
				w += Math.ceil((eW - w) / 2);
				h += Math.ceil((eH - h) / 2);				
			}
			
		} else {	
			if(w-cW < 1 && h-cH < 1){
				done = true;	
			}
			else{
				w -= Math.ceil((w - cW) / 2);
				h -= Math.ceil((h - cH) / 2);				
			}
		}
		
		
		
		if(done){
			div.updateContent();
		} else {
			div.style.width = w + "px";
			div.style.height = h + "px";
			
			setTimeout(div.updateDimensions, 30);
		}
	}
	
	div.onclick = function() {
		div.isExpanded = !div.isExpanded;
		if(!div.isExpanded){
			div.updateContent();
		}
		setTimeout(div.updateDimensions, 30);
	};
	
	div.updateContent();
	return div;
}

window.onload = function() {
	var expandable = document.createElement("div");
	expandable.style.background = "rgb(200, 200, 200)";
	var expandedText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel augue justo, nec faucibus sapien. Nulla consequat, erat sit amet porttitor rutrum, orci tortor faucibus elit, vitae dignissim elit justo ut mi.";
	
	makeDivExpandable(expandable, "see more...", expandedText, 100, 20, 200, 200);
	document.body.appendChild(expandable);
}