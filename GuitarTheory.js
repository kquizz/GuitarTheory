var sel;
var canvas;
var notes;

var notes_sharp = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#" , "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#" , "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#" , "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#" , "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#" , "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#" , "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
var notes_flat = ["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb" , "G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb" , "G", "Ab", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb" , "G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb" , "G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb" , "G", "Ab", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb" , "G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb" , "G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb" , "G", "Ab", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb" , "G", "Ab"];


var scales = [["Major Scale", [1, 3, 5, 6, 8, 10, 12]]];

var numberOfNotes = 12;
var currentMode = "Scales";


var settings = {
	FretBoardYOffset  : 50,
	FretBoardXOffset  : 25,
	FretLength		  : 40,
	FretHeight 		  : 20,
	NumberOfFrets 	  : 17,
	Strings			  : [7, 12, 17, 22, 26, 31],
	NumberOfStrings   : 6,
	DiamondYOffset	  : 10,
	DiamondLength	  : 5,
	DiamondPosition   : [[3, 1],[5,1], [7, 1], [9, 1], [12, 2], [15,1]],
	TuningNoteYOffset : 5,
	TuningNoteXOffset : 20,
	OctiveLineXOffset : 3,
	OctiveLineFretNo  : 12,
};

var	FretboardHeight	 = settings.FretBoardYOffset + settings.NumberOfStrings * settings.FretHeight + settings.DiamondYOffset + 2 * Math.sqrt(2) * settings.DiamondLength;
var	FretboardWidth	 = 2000;


function setup() {
	createCanvas(FretboardWidth, FretboardHeight);
 	noLoop();

	notes = notes_sharp;
	
	setupMenuSelect();
	setupToggleAccidentalButton();
	setupNoteSelect();
	setupScaleSelect();
	setupShowScaleButton();	
	setupClearButton();
  }
  
  
  function setupMenuSelect(){
	menuSelect = createSelect();

	menuSelect.option("Scales");	
	menuSelect.option("Notes");
	menuSelect.option("Chords");
	menuSelect.changed(MenuOnChangeEvent);
	//menuSelect.option("Arpeggios");
	//menuSelect.option("Metronome");
	//menuSelect.option("Arpeggios");
}
  
  function MenuOnChangeEvent(){
	  var menuValue = menuSelect.value;
	  redraw();

	  switch (currentMode){
		  case "Scales":
			removeNoteSelect();
			removeScaleSelect();
			removeShowScaleButton();	
			break;
		  case "Notes":
			removeShowAllNotesButton();
			break;
		  case "Chords":
			break;			
	  }
	  
	  switch (menuValue){
		  case "Scales":
			setupNoteSelect();
			setupScaleSelect();
			setupShowScaleButton();	
			currentMode = "Scales";
			break;
		  case "Notes":
			setupshowAllNotessButton();
			currentMode = "Notes";
			break;
		  case "Chords":
		  currentMode = "Chords";
			break;			
	  }
	}
  
  
function setupNoteSelect(){
	noteSelect = createSelect();

	for (i=0; i < numberOfNotes;i++){
		noteSelect.option(notes[i]);
	}	
}

function removeNoteSelect(){
	noteSelect.remove();
}

function setupScaleSelect(){
	scaleSelect = createSelect();
	scales.forEach(function(item){scaleSelect.option(item[0])});
}  

function removeScaleSelect(){
	scaleSelect.remove();
}  


function setupShowScaleButton(){
	showAllNotess = createButton("Show Scale");
	showAllNotess.mousePressed(showScale);
}

function removeShowScaleButton(){
	showAllNotess.remove();
}


function setupshowAllNotessButton(){
	showAllNotess = createButton("Show All Notes");
	showAllNotess.mousePressed(showAllNotes);
}

function removeshowAllNotessButton(){
	showAllNotess.remove();
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
	for (i=0; i < settings.NumberOfStrings;i++){
		for (j=0; j < settings.NumberOfFrets; j++){
			if (notes[settings.Strings[i] + j] == note){
				noteOffset = 3;
				noteDiameter = 17;
				
				if (note.length == 2){
					noteOffset = 6;
				}
				if (color == '#E94B3C'){
					noteDiameter = 25;
				}
				
				
				fill(color);
				ellipse(settings.FretBoardXOffset + j * settings.FretLength, settings.FretBoardYOffset + i * settings.FretHeight, noteDiameter);
					
				fill("white");
				text(note, settings.FretBoardXOffset + j * settings.FretLength - noteOffset, settings.FretBoardYOffset + i * settings.FretHeight + 4);
			}
		}
	}	
 }
 
 
function draw(){
   drawFretboard();
   drawStringTunings();
   }

function drawStringTunings(){
	
	for(i=0;i<settings.NumberOfStrings;i++){
		text(notes[settings.Strings[i]], settings.FretBoardXOffset -  settings.TuningNoteXOffset, settings.FretBoardYOffset + (settings.NumberOfStrings - 1 - i) * settings.FretHeight + settings.TuningNoteYOffset);
	}
}
	
   
function drawFretboard() {
	
	//Draw the Strings
	for(i = 0; i < settings.NumberOfStrings; i++)
	{
		line(settings.FretBoardXOffset, settings.FretBoardYOffset + i * settings.FretHeight, settings.FretBoardXOffset + settings.FretLength * (settings.NumberOfFrets -1), settings.FretBoardYOffset + i * settings.FretHeight);
	}
	
	//Draw the FretPost (is that what it's called?)
	strokeWeight(5);
	line(settings.FretBoardXOffset, settings.FretBoardYOffset,  settings.FretBoardXOffset, settings.FretBoardYOffset + (settings.NumberOfStrings - 1)  * settings.FretHeight)
	
	//Draw the Frets
	for (i = 0; i < settings.NumberOfFrets; i++){
		strokeWeight(1);
		line(settings.FretBoardXOffset + i * settings.FretLength, settings.FretBoardYOffset,  settings.FretBoardXOffset + i * settings.FretLength, settings.FretBoardYOffset + (settings.NumberOfStrings - 1) * settings.FretHeight)
	}
	
	//Draw the Octive Double Line
	line(settings.FretBoardXOffset + settings.OctiveLineFretNo* settings.FretLength - settings.OctiveLineXOffset, settings.FretBoardYOffset, settings.FretBoardXOffset + settings.OctiveLineFretNo* settings.FretLength - settings.OctiveLineXOffset, settings.FretBoardYOffset + (settings.NumberOfStrings - 1) * settings.FretHeight)
	
	for (i = 0; i < settings.NumberOfFrets + 1; i++){
		for (j=0; j < settings.DiamondPosition.length;j++){
			diamondPosition = settings.DiamondPosition[j];

			if (i == diamondPosition[0] - 1){
				diamondX = settings.FretBoardXOffset + (settings.FretLength/2) + settings.FretLength * i;
				diamondY = settings.FretBoardYOffset + (settings.NumberOfStrings - 1) * settings.FretHeight + settings.DiamondYOffset;
				diamondLength = settings.DiamondLength;
			
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