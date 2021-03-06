/**
 * @prettier
 * ∞
 *  boords_Animatic.jsx
 *  Copyright (c) 2017 Animade with Code. All rights reserved.
 *  www.Boords.com
 *
 *  Name:  boords_Animatic
 *  Version: 1
 * */

// JSON PARSER
if (typeof JSON !== 'object') {
  JSON = {};
}
(function() {
  'use strict';
  function f(e) {
    return e < 10 ? '0' + e : e;
  }
  function quote(e) {
    escapable.lastIndex = 0;
    return escapable.test(e)
      ? '"' +
          e.replace(escapable, function(e) {
            var t = meta[e];
            return typeof t === 'string'
              ? t
              : '\\u' + ('0000' + e.charCodeAt(0).toString(16)).slice(-4);
          }) +
          '"'
      : '"' + e + '"';
  }
  function str(e, t) {
    var n,
      r,
      i,
      s,
      o = gap,
      u,
      a = t[e];
    if (a && typeof a === 'object' && typeof a.toJSON === 'function') {
      a = a.toJSON(e);
    }
    if (typeof rep === 'function') {
      a = rep.call(t, e, a);
    }
    switch (typeof a) {
      case 'string':
        return quote(a);
      case 'number':
        return isFinite(a) ? String(a) : 'null';
      case 'boolean':
      case 'null':
        return String(a);
      case 'object':
        if (!a) {
          return 'null';
        }
        gap += indent;
        u = [];
        if (Object.prototype.toString.apply(a) === '[object Array]') {
          s = a.length;
          for (n = 0; n < s; n += 1) {
            u[n] = str(n, a) || 'null';
          }
          i =
            u.length === 0
              ? '[]'
              : gap
                ? '[\n' + gap + u.join(',\n' + gap) + '\n' + o + ']'
                : '[' + u.join(',') + ']';
          gap = o;
          return i;
        }
        if (rep && typeof rep === 'object') {
          s = rep.length;
          for (n = 0; n < s; n += 1) {
            if (typeof rep[n] === 'string') {
              r = rep[n];
              i = str(r, a);
              if (i) {
                u.push(quote(r) + (gap ? ': ' : ':') + i);
              }
            }
          }
        } else {
          for (r in a) {
            if (Object.prototype.hasOwnProperty.call(a, r)) {
              i = str(r, a);
              if (i) {
                u.push(quote(r) + (gap ? ': ' : ':') + i);
              }
            }
          }
        }
        i =
          u.length === 0
            ? '{}'
            : gap
              ? '{\n' + gap + u.join(',\n' + gap) + '\n' + o + '}'
              : '{' + u.join(',') + '}';
        gap = o;
        return i;
    }
  }
  if (typeof Date.prototype.toJSON !== 'function') {
    Date.prototype.toJSON = function() {
      return isFinite(this.valueOf())
        ? this.getUTCFullYear() +
            '-' +
            f(this.getUTCMonth() + 1) +
            '-' +
            f(this.getUTCDate()) +
            'T' +
            f(this.getUTCHours()) +
            ':' +
            f(this.getUTCMinutes()) +
            ':' +
            f(this.getUTCSeconds()) +
            'Z'
        : null;
    };
    String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
      return this.valueOf();
    };
  }
  var cx, escapable, gap, indent, meta, rep;
  if (typeof JSON.stringify !== 'function') {
    escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    meta = {
      '\b': '\\b',
      '	': '\\t',
      '\n': '\\n',
      '\f': '\\f',
      '\r': '\\r',
      '"': '\\"',
      '\\': '\\\\',
    };
    JSON.stringify = function(e, t, n) {
      var r;
      gap = '';
      indent = '';
      if (typeof n === 'number') {
        for (r = 0; r < n; r += 1) {
          indent += ' ';
        }
      } else if (typeof n === 'string') {
        indent = n;
      }
      rep = t;
      if (
        t &&
        typeof t !== 'function' &&
        (typeof t !== 'object' || typeof t.length !== 'number')
      ) {
        throw new Error('JSON.stringify');
      }
      return str('', { '': e });
    };
  }
  if (typeof JSON.parse !== 'function') {
    cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    JSON.parse = function(text, reviver) {
      function walk(e, t) {
        var n,
          r,
          i = e[t];
        if (i && typeof i === 'object') {
          for (n in i) {
            if (Object.prototype.hasOwnProperty.call(i, n)) {
              r = walk(i, n);
              if (r !== undefined) {
                i[n] = r;
              } else {
                delete i[n];
              }
            }
          }
        }
        return reviver.call(e, t, i);
      }
      var j;
      text = String(text);
      cx.lastIndex = 0;
      if (cx.test(text)) {
        text = text.replace(cx, function(e) {
          return '\\u' + ('0000' + e.charCodeAt(0).toString(16)).slice(-4);
        });
      }
      if (
        /^[\],:{}\s]*$/.test(
          text
            .replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
            .replace(
              /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
              ']',
            )
            .replace(/(?:^|:|,)(?:\s*\[)+/g, ''),
        )
      ) {
        j = eval('(' + text + ')');
        return typeof reviver === 'function' ? walk({ '': j }, '') : j;
      }
      throw new SyntaxError('JSON.parse');
    };
  }
})();

// Clear info log
clearOutput(); // Clears the info screen each time the script is run

// Global store
var boords_Animatic_Data = new Object(); // Store globals in an object

// Set the version
boords_Animatic_Data.scriptName = 'Boords Tools - Animatic Setup';
boords_Animatic_Data.version = 'V 1.4';
writeLn(boords_Animatic_Data.scriptName + ' - ' + boords_Animatic_Data.version);

// Script variables
boords_Animatic_Data.frameRate = 25;
boords_Animatic_Data.ratio = 0;

boords_Animatic_Data.sizes = [[1920, 1080], [1080, 1080], [1080, 1920]];

boords_Animatic_Data.boordsFolderPath = '';
boords_Animatic_Data.soundFile = '';
boords_Animatic_Data.soundLayer = null;
boords_Animatic_Data.boordsJsonName = '/ae.json';
boords_Animatic_Data.frames = null;
boords_Animatic_Data.animaticLength = 20;
boords_Animatic_Data.comp = app.project.activeItem;
boords_Animatic_Data.frameFiles = [];
boords_Animatic_Data.topDown = true;
boords_Animatic_Data.isBoordsDownload = false;
boords_Animatic_Data.soundFile = null;

// Promps
boords_Animatic_Data.prompt_1 =
  'Select the storyboard folder that contains your JPG or PNG sequence';
boords_Animatic_Data.prompt_2 =
  'How long in seconds would you like your animatic to be?';
boords_Animatic_Data.prompt_3 =
  'Select a sound file if you have one. Cancel if not.';
boords_Animatic_Data.prompt_4 =
  'Create a storyboard notes reference layer? This will take a few minutes for longer storyboards so please be patient :)';

// Errors
boords_Animatic_Data.err1 = 'Select a master null and master particle.';
boords_Animatic_Data.err2 =
  'You have selected 2 layers however one must be the null and one the particle.';
boords_Animatic_Data.err4 = 'All trackers updated';

// Naming
boords_Animatic_Data.nameOfComp = 'Animatic';
boords_Animatic_Data.storyboardName = 'Boords Import';

// Expressions
boords_Animatic_Data.textExpressionPart1 =
  "if(time < comp('" + boords_Animatic_Data.nameOfComp + "').layer('frame-";
boords_Animatic_Data.textExpressionPart2 =
  "').inPoint && time >= comp('" +
  boords_Animatic_Data.nameOfComp +
  "').layer('frame-";
boords_Animatic_Data.textExpressionPart3 = "').inPoint){100}else{0};";
boords_Animatic_Data.textExpressionPart4 =
  "if(time >= comp('" + boords_Animatic_Data.nameOfComp + "').layer('frame-";

// Start undo group
app.beginUndoGroup('Boords Animatic');

// Set Boords Folder
var folder = Folder.selectDialog(boords_Animatic_Data.prompt_1);
if (folder !== null) {
  boords_Animatic_Data.boordsFolderPath = folder.fsName;
  // Find out whether this is a Boords download folder.
  // If so grab the durations from the frames
  // Pull JSON data

  var jsonFile =
    boords_Animatic_Data.boordsFolderPath + boords_Animatic_Data.boordsJsonName;
  var myFile = new File(jsonFile);

  if (myFile.open('r')) {
    myFile.encoding = 'UTF-8';
    var myJson = myFile.read();

    var myObject = JSON.parse(myJson);

    boords_Animatic_Data.frames = myObject.frames;
    boords_Animatic_Data.storyboardName = myObject.name;
    if (myObject.ratio != null) {
      boords_Animatic_Data.ratio = myObject.ratio;
    }

    // set isBoordsDownload to true
    boords_Animatic_Data.isBoordsDownload = true;

    myFile.close();
  }
} else {
  //app.cancelTask("Boords Animatic");
}

// CHECK FOR SOUND FILE
var tempFolder1 = new Folder(boords_Animatic_Data.boordsFolderPath);
var tempFiles1 = tempFolder1.getFiles();

for (var i = 0; i < tempFiles1.length; i++) {
  var fileName = tempFiles1[i].name;
  // The period belongs here, so that we don't match any other files when the
  // storyboard title contains the word sound
  var results = fileName.indexOf('sound.');
  if (results > -1) {
    boords_Animatic_Data.soundFile = tempFiles1[i].name;

    var tempName = boords_Animatic_Data.soundFile;
    var tempSound = boords_Animatic_Data.boordsFolderPath + '/' + tempName;
    var io = new ImportOptions(File(tempSound));
    io.importAs = ImportAsType.FOOTAGE;
    var soundFile = app.project.importFile(io);
    boords_Animatic_Data.animaticLength = soundFile.duration;
  }
}
// Set the sound file
if (boords_Animatic_Data.soundFile == null) {
  boords_Animatic_popup_setFile();
}

function boords_Animatic_popup_setFile() {
  var tempFile = File.openDialog(
    boords_Animatic_Data.prompt_3,
    undefined,
    true,
  );

  if (tempFile !== null) {
    boords_Animatic_Data.soundFile = tempFile;

    var io = new ImportOptions(File(boords_Animatic_Data.soundFile));

    io.importAs = ImportAsType.FOOTAGE;
    boords_Animatic_Data.soundLayer = app.project.importFile(io);
    //frame.parentFolder = frameFold;
    boords_Animatic_Data.animaticLength =
      boords_Animatic_Data.soundLayer.duration;
  } else if (boords_Animatic_Data.isBoordsDownload == false) {
    // POP UP SET LENGTH IF NOT DOWNLOADED FROM BOORDS
    boords_Animatic_Data.animaticLength = prompt(
      boords_Animatic_Data.prompt_2,
      '60',
    );
  } else {
    // SET LENGTH BASSED ON SUM OF DURATIONS
    boords_Animatic_Data.animaticLength = boords_Animatic_calculateDuration();
  }
}

function boords_Animatic_calculateDuration() {
  var duration = 0;

  //calcualte duration based on frames duration
  for (var i = 0; i < boords_Animatic_Data.frames.length; i++) {
    duration += boords_Animatic_Data.frames[i].duration;
  }

  return duration / 1000;
}

//

// CREATE THE COMPS AND PROJECT FOLDERS

// Get the ratio
var r = boords_Animatic_Data.ratio;

var fold = app.project.items.addFolder('Boords Animatic');
var boordsComp = fold.items.addComp(
  'Animatic',
  boords_Animatic_Data.sizes[r][0],
  boords_Animatic_Data.sizes[r][1],
  1,
  boords_Animatic_Data.animaticLength,
  boords_Animatic_Data.frameRate,
);
boordsComp.label = 9;
boordsComp.openInViewer();
var frameFold = fold.items.addFolder('Frames');

if (boords_Animatic_Data.isBoordsDownload) {
  for (var i = 0; i < boords_Animatic_Data.frames.length; i++) {
    boords_Animatic_Data.frameFiles.push(
      boords_Animatic_Data.frames[i].file_name,
    );
  }
} else {
  var tempFolder = new Folder(boords_Animatic_Data.boordsFolderPath);
  var tempFiles = tempFolder.getFiles();

  // IMPORT THE FRAMES
  for (var i = 0; i < tempFiles.length; i++) {
    var fileName = tempFiles[i].name;
    var results = fileName.indexOf('.jpg');
    if (results > -1) {
      boords_Animatic_Data.frameFiles.push(tempFiles[i].name);
    }
    var results2 = fileName.indexOf('.png');
    if (results2 > -1) {
      boords_Animatic_Data.frameFiles.push(tempFiles[i].name);
    }
  }

  boords_Animatic_Data.frameFiles = boords_Animatic_Data.frameFiles.sort();
}

var frameInPoint = 0;

for (var i = 0; i < boords_Animatic_Data.frameFiles.length; i++) {
  var tempName = boords_Animatic_Data.frameFiles[i];
  var tempImg = boords_Animatic_Data.boordsFolderPath + '/' + tempName;

  var io = new ImportOptions(File(tempImg));

  io.importAs = ImportAsType.FOOTAGE;

  var frame = app.project.importFile(io);

  frame.parentFolder = frameFold;

  // Add Frames to comp
  l = boordsComp.layers.add(frame);

  // Scale the frames to the comp
  var scaleAmount = (boordsComp.width / l.width) * 100;
  l.scale.setValue([scaleAmount, scaleAmount]);

  if (boords_Animatic_Data.isBoordsDownload) {
    l.name = 'frame-' + boords_Animatic_Data.frames[i].frame_number;
  } else {
    l.name = 'frame-' + i;
  }

  // Order frames depending on topDown booleon
  if (boords_Animatic_Data.isBoordsDownload == true) {
    l.inPoint = frameInPoint / 1000;
    l.moveToBeginning();
  } else {
    l.inPoint =
      (boords_Animatic_Data.animaticLength /
        boords_Animatic_Data.frameFiles.length) *
      i;
    l.moveToBeginning();
  }

  if (boords_Animatic_Data.isBoordsDownload == true) {
    frameInPoint += boords_Animatic_Data.frames[i].duration;
  }
}

// IF Boords Downloaded  sound file
if (boords_Animatic_Data.soundFile) {
  var soundFold = fold.items.addFolder('Sound');

  var tempName = boords_Animatic_Data.soundFile;
  var tempSound = boords_Animatic_Data.boordsFolderPath + '/' + tempName;
  var io = new ImportOptions(File(tempSound));
  io.importAs = ImportAsType.FOOTAGE;
  var soundFile = app.project.importFile(io);
  soundFile.parentFolder = soundFold;

  // Add Frames to comp
  l = boordsComp.layers.add(soundFile);
  l.moveToBeginning();
}

// IF user specified sound file
if (boords_Animatic_Data.soundLayer !== null) {
  var soundFold = fold.items.addFolder('Sound');
  boords_Animatic_Data.soundLayer.parentFolder = soundFold;
  var soundLayer = boordsComp.layers.add(boords_Animatic_Data.soundLayer);
  soundLayer.moveToBeginning();
}

// IF Boords JSON file
if (boords_Animatic_Data.frames != null) {
  if (confirm(boords_Animatic_Data.prompt_4)) {
    // Get the ratio
    var r = boords_Animatic_Data.ratio;

    var notesFold = fold.items.addFolder('Notes');
    var notesComp = notesFold.items.addComp(
      'Notes Reference',
      boords_Animatic_Data.sizes[r][0],
      boords_Animatic_Data.sizes[r][1],
      1,
      boords_Animatic_Data.animaticLength,
      boords_Animatic_Data.frameRate,
    );

    // SETUP NOTES COMP AND MOVE TO BEGINNING
    setupNotesComp(notesComp);
    boordsComp.layers.add(notesComp);
    notesComp.moveToBeginning();
  }
}

// FUNCTIONS

// Setup Notes compostion
function setupNotesComp(comp) {
  var tempComp = comp;
  // Get the ratio
  var r = boords_Animatic_Data.ratio;

  // Add the BG
  var tempLayer = tempComp.layers.addShape();
  var tempContents = tempLayer.property('ADBE Root Vectors Group');
  // create the pupil
  var bgGroup = tempContents.addProperty('ADBE Vector Group');
  bgGroup.name = 'BG Group';

  var bgShape = bgGroup
    .property('ADBE Vectors Group')
    .addProperty('ADBE Vector Shape - Rect');
  bgShape.name = 'BG Shape';

  bgShape
    .property('ADBE Vector Rect Size')
    .setValue([
      boords_Animatic_Data.sizes[r][0],
      boords_Animatic_Data.sizes[r][1],
    ]);
  tempLayer
    .property('ADBE Transform Group')
    .property('ADBE Opacity')
    .setValue(65);
  tempLayer
    .property('ADBE Transform Group')
    .property('ADBE Position')
    .setValue([
      boords_Animatic_Data.sizes[r][0] / 2,
      boords_Animatic_Data.sizes[r][1] / 2,
    ]);

  bgGroup
    .property('ADBE Vectors Group')
    .addProperty('ADBE Vector Graphic - Fill');
  var bgFillColour = bgGroup
    .property('ADBE Vectors Group')
    .property('ADBE Vector Graphic - Fill')
    .property('ADBE Vector Fill Color');
  bgFillColour.setValue([0, 0, 0, 1]);

  var c = [100, 240, 180, 380, 660, 130, 350, 630];

  function addText(string, fontSize, position, textbox, anchorPoint) {
    var tempTextLayer;
    if (textbox) {
      tempTextLayer = tempComp.layers.addBoxText(textBoxSize);
    } else {
      tempTextLayer = tempComp.layers.addText();
    }

    tempTextLayer.property('Source Text').setValue(string || '');

    tempTextLayer
      .property('ADBE Transform Group')
      .property('ADBE Position')
      .setValue(position);

    if (anchorPoint) {
      tempTextLayer.property('Anchor Point').setValue(anchorPoint);
    }

    var textProp = tempTextLayer.property('Source Text');
    var textDocument = textProp.value;
    textDocument.resetCharStyle();
    textDocument.justification = ParagraphJustification.LEFT_JUSTIFY;
    textDocument.font = 'Verdana';
    textDocument.fontSize = fontSize;
    textDocument.fillColor = [1, 1, 1];
    textProp.setValue(textDocument);

    // Bit hacky, but it works. If we have a textExpression defined,
    // we add it here
    if (textExpression) {
      var textOpacity = tempTextLayer
        .property('ADBE Transform Group')
        .property('ADBE Opacity');

      textOpacity.setValue(0);
      textOpacity.expression = textExpression;
    }

    return tempTextLayer;
  }

  addText(boords_Animatic_Data.storyboardName, 50, [c[0], c[5]]);
  addText('SOUND NOTES', 20, [c[0], c[6]])
    .property('ADBE Transform Group')
    .property('ADBE Opacity')
    .setValue(50);

  addText('DIRECTIONAL NOTES', 20, [c[0], c[7]])
    .property('ADBE Transform Group')
    .property('ADBE Opacity')
    .setValue(50);

  for (var i = 0; i < boords_Animatic_Data.frames.length; i++) {
    writeLn(i + ' of ' + boords_Animatic_Data.frames.length);
    var frame = boords_Animatic_Data.frames[i];
    var frameNumber = frame.frame_number || i + 1;

    var nextFrameNumber = boords_Animatic_Data.frames[i + 1]
      ? boords_Animatic_Data.frames[i + 1].frame_number
      : i + 1;

    var textBoxSize = [860, 200];
    var textExpression =
      boords_Animatic_Data.textExpressionPart1 +
      nextFrameNumber +
      boords_Animatic_Data.textExpressionPart2 +
      frameNumber +
      boords_Animatic_Data.textExpressionPart3;

    if (i == boords_Animatic_Data.frames.length - 1) {
      textExpression =
        boords_Animatic_Data.textExpressionPart4 +
        frameNumber +
        boords_Animatic_Data.textExpressionPart3;
    }

    addText('Frame ' + frameNumber, 30, [c[0], c[1]]);
    addText(frame.label, 20, [c[0], c[2]]);

    addText(frame.voiceover, 30, [c[0], c[3]], 'textbox', [
      -(textBoxSize[0] / 2),
      -(textBoxSize[1] / 2),
    ]);

    addText(frame.direction, 30, [c[0], c[4]], 'textbox', [
      -(textBoxSize[0] / 2),
      -(textBoxSize[1] / 2),
    ]);
  }
}

// Throw Error
function throwErr(err) {
  var title = $.fileName.substring(
    $.fileName.lastIndexOf('/') + 1,
    $.fileName.lastIndexOf('.'),
  );
  alert(err, title, true);
}

// String contains
function stringContains(haystack, needle) {
  var results = haystack.indexOf(needle);

  if (results > -1) {
    return true;
  } else {
    return false;
  }
}
