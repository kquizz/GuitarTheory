var sel;
var notes_sharp = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#" , "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#" , "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#" , "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#" , "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#" , "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#" , "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
var notes_flat = ["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb" , "G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb" , "G", "Ab", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb" , "G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb" , "G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb" , "G", "Ab", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb" , "G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb" , "G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb" , "G", "Ab", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb" , "G", "Ab"];


var scales = [["Major Scale", [1, 3, 5, 6, 8, 10, 12]]];

var strings = [7, 12, 17, 22, 26, 31]; 
var numberOfNotes = 12;

var canvas;
var notes;

var fretboard = {
	offset 			: 25,
	length 			: 40,
	height 			: 20,
	numberOfFrets 	: 17,
	numberOfStrings : strings.length,
	diamondOfset	: 10,
	diamondLength	: 5,
	diamondPosition : [[3, 1],[5,1], [7, 1], [9, 1], [12, 2], [15,1]],
	stringXNoteOffset : 20,
	stringYNoteOffset : 5,
	doublelineOffset : 3,
	doubleLineFretNo : 12
	
};




function setup() {
	createCanvas(2000, fretboard.offset + fretboard.numberOfStrings * fretboard.height + fretboard.diamondOfset + 2 * sqrt(2) * fretboard.diamondLength);
 	noLoop();

	notes = notes_sharp;
	
	setupNoteSelect();
	setupScaleSelect();
	setupShowScaleButton();
	setupshowAllNotessButton();
	setupToggleAccidentalButton();
	setupClearButton();
  }
  
function setupNoteSelect(){
	noteSelect = createSelect();

	for (i=0; i < numberOfNotes;i++){
		noteSelect.option(notes[i]);
	}	
}

function setupScaleSelect(){
	scaleSelect = createSelect();
	scales.forEach(function(item){scaleSelect.option(item[0])});
}  

function setupShowScaleButton(){
	showAllNotess = createButton("Show Scale");
	showAllNotess.mousePressed(showScale);
}

function setupshowAllNotessButton(){
	showAllNotess = createButton("Show All Notes");
	showAllNotess.mousePressed(showAllNotes);
}

function setupToggleAccidentalButton(){
	toggleButton = createButton('Toggle #/b');
	toggleButton.mousePressed(toggleAccidentals);
}

function setupClearButton(){
	clearButton = createButton("Clear");
	clearButton.mousePressed(clearAll);
}

function toggleAccidentals(){
	if (notes == notes_sharp){
		notes = notes_flat;
	}else{
		notes = notes_sharp;
	}
}

function clearAll(){
	clear();
	redraw();
}


function showScale() {
	var noteValue = noteSelect.value();
	var scaleName = scaleSelect.value();
	var scaleValues;
	var noteNumber;
	var scaleArray = [];
	
	for (scaleCounter = 0; scaleCounter < scales.length; scaleCounter++){
		if (scales[scaleCounter][0] == scaleName){
			scaleValues = scales[scaleCounter][1];
		}
	}
	
	noteNumber = getNoteNumber(noteValue);
	
	scaleValues.forEach(function(item) {
		
		scaleArray.push(notes[noteNumber + item - 1])
	});

	for(scalecounter = 0; scalecounter < scaleArray.length; scalecounter++){
		displayNote(scaleArray[scalecounter],getColorByNumber(scalecounter));
	}

	
	
	
}

function getNote(number){
    return notes[number];
}

function getNoteNumber(noteChar){
    for (noteCounter = 0; noteCounter < numberOfNotes; noteCounter++){
		if (notes[noteCounter] == noteChar){
			 return noteCounter;
		}
	}
}


function getColorByNumber(number){
	var color;
	
	switch(number){
		case 0:
			color = '#E94B3C';
			break;
		case 1:
			color = '#ECDB54';
			break;
		case 2:
			color = '#6F9FD8';
			break;
		case 3:
			color = '#944743';
			break;
		case 4:
			color = '#DBB1CD';
			break;
		case 5:
			color = '#EC9787';
			break;
		case 6:
			color = '#00A591';
			break;
		case 7:
			color = '#6B5B95';
			break;
		case 8:
			color = '#6C4F3D';
			break;
		case 9:
			color = '#EADEDB';
			break;
		case 10:
			color = '#BC70A4';
			break;
		case 11:
			color = '#BFD641';
			break;
		}
	return color;
}

 function showAllNotes(){
	var noteNumber = getNoteNumber(noteSelect.value());
	 
	 
	for (noteCount=0; noteCount < numberOfNotes;noteCount++){
		displayNote(notes[noteCount + noteNumber], getColorByNumber(noteCount));
	}	
}

 
 function displayNote(note, color){
	for (i=0; i < fretboard.numberOfStrings;i++){
		for (j=0; j < fretboard.numberOfFrets; j++){
			if (notes[strings[i] + j] == note){
				noteOffset = 3;
				noteDiameter = 17;
				
				if (note.length == 2){
					noteOffset = 6;
				}
				if (color == '#E94B3C'){
					noteDiameter = 25;
				}
				
				
				fill(color);
				ellipse(fretboard.offset + j * fretboard.length, fretboard.offset + i * fretboard.height, noteDiameter);
					
				fill("white");
				text(note, fretboard.offset + j * fretboard.length - noteOffset, fretboard.offset + i * fretboard.height + 4);
			}
		}
	}	
 }
 
 
function draw(){
   drawFretBoard();
   drawStringTunings();
   }

function drawStringTunings(){
	
	for(i=0;i<fretboard.numberOfStrings;i++){
		text(notes[strings[i]], fretboard.offset -  fretboard.stringXNoteOffset, fretboard.offset + (fretboard.numberOfStrings - 1 - i) * fretboard.height + fretboard.stringYNoteOffset);
	}
}
	
   
function drawFretBoard() {
	for(i = 0; i < fretboard.numberOfStrings; i++)
	{
		line(fretboard.offset, fretboard.offset + i * fretboard.height, fretboard.offset + fretboard.length * (fretboard.numberOfFrets -1), fretboard.offset + i * fretboard.height);
	}
	
	strokeWeight(5);
	line(fretboard.offset, fretboard.offset,  fretboard.offset, fretboard.offset + (fretboard.numberOfStrings - 1)  * fretboard.height)
	
	for (i = 0; i < fretboard.numberOfFrets; i++){
		strokeWeight(1);
		line(fretboard.offset + i * fretboard.length, fretboard.offset,  fretboard.offset + i * fretboard.length, fretboard.offset + (fretboard.numberOfStrings - 1) * fretboard.height)
	}
	
	line(fretboard.offset - fretboard.doublelineOffset + fretboard.doubleLineFretNo* fretboard.length, fretboard.offset,  fretboard.offset - fretboard.doublelineOffset + fretboard.doubleLineFretNo* fretboard.length, fretboard.offset + (fretboard.numberOfStrings - 1) * fretboard.height)

	for (i = 0; i < fretboard.numberOfFrets + 1; i++){
		for (j=0; j < fretboard.diamondPosition.length;j++){
			diamondPosition = fretboard.diamondPosition[j];

			if (i == diamondPosition[0] - 1){
				diamondX = fretboard.offset + (fretboard.length/2) + fretboard.length * i;
				diamondY = fretboard.offset + (fretboard.numberOfStrings - 1) * fretboard.height + fretboard.diamondOfset;
				diamondLength = fretboard.diamondLength;
			
				fill(0);
				quad(diamondX, 				  diamondY, 
					diamondX - diamondLength, diamondY + diamondLength,
					diamondX , 				  diamondY + 2 * diamondLength,
					diamondX + diamondLength, diamondY + diamondLength);
						
				if (diamondPosition[1] == 2) {
					diamondY = diamondY + sqrt(2) * diamondLength;
					quad(diamondX, 				  diamondY, 
						diamondX - diamondLength, diamondY + diamondLength,
						diamondX , 				  diamondY + 2 * diamondLength,
						diamondX + diamondLength, diamondY + diamondLength);
				}
			}
		}	
	}
}