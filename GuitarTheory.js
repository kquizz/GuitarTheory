var sel;
var canvas;
var notes;

var notes_sharp = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#" , "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#" , "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#" , "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#" , "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#" , "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#" , "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
var notes_flat = ["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb" , "G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb" , "G", "Ab", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb" , "G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb" , "G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb" , "G", "Ab", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb" , "G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb" , "G", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb" , "G", "Ab", "Ab", "A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb" , "G", "Ab"];


var scales = [["Major(Ionian)", [1, 3, 5, 6, 8, 10, 12]],
["Dorian", [1,3,4,6,8,10,11]],
["Phyrigian", [1,2,4,6,8,9,11]],
["Lydian", [1,3,5,7,8,10,12]],
["Mixolydian", [1,3,5,6,8,10,11]],
["Minor (Aeolian)", [1,3,4,6,8,9,11]],
["Locrian", [1,2,4,6,7,9,11]]]
;

var numberOfNotes = 12;
var numberOfLinesInStaff = 5;




var currentMode = "Scales"; 
var createkeyword = "setup";
var destroykeyword = "remove";


var menuItems = [["Scales", ["NoteSelect", "ScaleSelect", "ShowScaleButton"]],
				 ["Notes", ["showAllNotesButton"]],
				 ["Chords", []]];
				

				


var settings = {
	FretBoardYOffset  : 50,
	FretBoardXOffset  : 25,
	MusicStaffYOffset : 15,
	MusicStaffXOffset : 15,
	FretLength		  : 40,
	FretHeight 		  : 20,
	StaffLength		  : 20,
	StaffHeight	  	  : 20,
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
	MenuSelectX		  : 0,
	MenuSelectY		  : 0,
	ToggleButtonX	  : 400,
	ToggleButtonY	  : 0,
	ClearButtonX	  : 480,
	ClearButtonY	  : 0, 
	SecondRowY	      : 30, 
	NoteSelectX	  	  : 0,
	ScaleSelectX	  : 60,
	ShowScaleButtonx  : 160,
	ShowAllNotesButtonx: 0};

var	FretboardHeight	 = settings.FretBoardYOffset + settings.NumberOfStrings * settings.FretHeight + settings.DiamondYOffset + 2 * Math.sqrt(2) * settings.DiamondLength;
var	FretboardWidth	 = settings.FretBoardXOffset + (settings.NumberOfFrets -1) * settings.FretLength;

var MusicStaffY =  FretboardHeight + settings.MusicStaffYOffset;
var	MusicStaffHeight  = settings.MusicStaffYOffset + numberOfLinesInStaff * settings.StaffHeight + settings.StaffHeight * 10;
var	MusicStaffWidth	 = FretboardWidth;


function setup() {
	createCanvas(FretboardWidth + MusicStaffWidth, FretboardHeight + MusicStaffHeight);
	
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
	menuSelect.position(settings.MenuSelectX, settings.MenuSelectY);
	
	menuSelect.option("Scales");	
	menuSelect.option("Notes");
	menuSelect.option("Chords");
	menuSelect.changed(MenuOnChangeEvent);
}
    
  function MenuOnChangeEvent(){
	  var menuValue = menuSelect.value();
	  redraw();

	  var menuArray = menuItems.find(x => x[0] == currentMode);
		  
	  menuArray[1].forEach( function(itemsToRemove){
		  var tmpFunc = new Function(destroykeyword + itemsToRemove+ '()');
		  tmpFunc();
	  });
	  	  
	  currentMode = menuValue;
		  
	  var menuArray = menuItems.find(x => x[0] == currentMode);
	  
	  menuArray[1].forEach( function(itemsToAdd){
		  var tmpFunc = new Function(createkeyword + itemsToAdd+ '()');
		  tmpFunc();
	  });
	}
  
  
function setupNoteSelect(){
	noteSelect = createSelect();
	noteSelect.position(settings.NoteSelectX, settings.SecondRowY);
	
	for (i=0; i < numberOfNotes;i++){
		noteSelect.option(notes[i]);
	}	
}

function removeNoteSelect(){
	noteSelect.remove();
}

function setupScaleSelect(){
	scaleSelect = createSelect();
	scaleSelect.position(settings.ScaleSelectX, settings.SecondRowY);
	noteSelect.position(settings.NoteSelectX, settings.SecondRowY);
	scales.forEach(item => scaleSelect.option(item[0]));
}  

function removeScaleSelect(){
	scaleSelect.remove();
}  


function setupShowScaleButton(){
	showScaleButton = createButton("Show Scale");
	showScaleButton.position(settings.ShowScaleButtonx, settings.SecondRowY);
	showScaleButton.mousePressed(showScale);
}

function removeShowScaleButton(){
	showScaleButton.remove();
}


function setupshowAllNotesButton(){
	showAllNotesButton = createButton("Show All Notes");
	showAllNotesButton.position(settings.ShowAllNotesButtonx, settings.SecondRowY);
	showAllNotesButton.mousePressed(showAllNotes);
}

function removeshowAllNotesButton(){
	showAllNotesButton.remove();
}


function setupToggleAccidentalButton(){
	toggleButton = createButton('Toggle #/b');
	toggleButton.position(settings.ToggleButtonX, settings.ToggleButtonY);
	toggleButton.mousePressed(toggleAccidentals);
}

function setupClearButton(){
	clearButton = createButton("Clear");
	clearButton.position(settings.ClearButtonX, settings.ClearButtonY);
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
   drawMusicStaff();
   }

function drawStringTunings(){
	
	for(i=0;i<settings.NumberOfStrings;i++){
		text(notes[settings.Strings[i]], settings.FretBoardXOffset -  settings.TuningNoteXOffset, settings.FretBoardYOffset + (settings.NumberOfStrings - 1 - i) * settings.FretHeight + settings.TuningNoteYOffset);
	}
}
	
	
	function drawMusicStaff(){
		for(drawStaffCount=0;drawStaffCount<numberOfLinesInStaff; drawStaffCount++){
			//Draw the Lines
			line(settings.MusicStaffXOffset, 
			MusicStaffY + settings.MusicStaffYOffset + drawStaffCount * settings.StaffHeight, 
			MusicStaffWidth, 
			MusicStaffY + settings.MusicStaffYOffset + drawStaffCount * settings.StaffHeight);
		}

	line(settings.MusicStaffXOffset, MusicStaffY + settings.MusicStaffYOffset,  
		settings.MusicStaffXOffset, MusicStaffY + settings.MusicStaffYOffset + (numberOfLinesInStaff - 1)  * settings.StaffHeight);
	line(MusicStaffWidth, MusicStaffY + settings.MusicStaffYOffset,  
		MusicStaffWidth, MusicStaffY + settings.MusicStaffYOffset + (numberOfLinesInStaff - 1)  * settings.StaffHeight);


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
