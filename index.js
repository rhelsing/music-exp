var scribble = require('scribbletune');
var pry = require('pryjs');

var key = ['d', 'major']

var notes = ["c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#", "b"]

function sharpen(note){
  var noteString = note.replace(/\d+/g, '');
  var noteInt = note.match(/\d+/)[0];
  if(notes.indexOf(noteString)+1 > 11){
    return "c"+(parseInt(noteInt)+1)
  }else{
    return notes[notes.indexOf(noteString)+1]+noteInt
  }
}

function flatten(note){
  var noteString = note.replace(/\d+/g, '');
  var noteInt = note.match(/\d+/)[0];
  if (notes.indexOf(noteString)-1 < 0){
    return "b"+(parseInt(noteInt)-1)
  }else{
    return notes[notes.indexOf(noteString)-1]+noteInt
  }
}

function deriveChord(in_root, key){
  if(in_root.includes("-")){
    var r = in_root.split("-")[0]
    var addition = in_root.split("-")[1]
    r = parseInt(r)-1
    if(addition == "aug"){
      return [key[r], key[r+2], sharpen(key[r+4])]
    }else if(addition == "min"){
      return [key[r], flatten(key[r+2]), key[r+4]]
    }else if(addition == "dim"){
      return [key[r], flatten(key[r+2]), flatten(key[r+4])]
    }else if(addition == "sus4"){
      return [key[r], sharpen(key[r+2]), key[r+4]]
    }else if(addition == "sus2"){
      return [key[r], flatten(key[r+2]), key[r+4]]
    }else if(addition == "maj7"){
      return [key[r], key[r+2], key[r+4], key[r+6]]
    }else if(addition == "min7"){
      return [key[r], flatten(key[r+2]), key[r+4], flatten(key[r+6])]
    }else if(addition == "7"){
      return [key[r], key[r+2], key[r+4], flatten(key[r+6])]
    }else{
      return [key[r], key[r+2], key[r+4]]
    }
  }else{
    var r = parseInt(in_root)-1
    return [key[r], key[r+2], key[r+4]]
  }
  //TODO: invert true/false
  //check if has an augmentation [m, M, 7, sus, dim, etc] for now, return triad
  //check if has -
  //sometimes go up instead of % - random
}

function convertProgression(prog, key){
  var tScale = scribble.scale(...key, 3, false).concat(scribble.scale(...key, 4, false)).concat(scribble.scale(...key, 5, false))
  var roots = prog.split(" ");
  var chords = roots.map(function(r) {
    return deriveChord(r, tScale);
  });
  console.log(chords)
  return chords
}

var clip1 = scribble.clip({notes: convertProgression('1 6 2 5', key), pattern: 'x___'.repeat(4)});
var clip2 = scribble.clip({notes: convertProgression('1 6 4 5', key), pattern: 'x___'.repeat(4)});
var clip3 = scribble.clip({notes: convertProgression('1 6 3 5', key), pattern: 'x___'.repeat(4)});
var clip4 = scribble.clip({notes: convertProgression('1 5 6 4', key), pattern: 'x___'.repeat(4)});
var clip5 = scribble.clip({notes: convertProgression('1 3 4 5', key), pattern: 'x___'.repeat(4)});
var clip6 = scribble.clip({notes: convertProgression('1 5 4 5', key), pattern: 'x___'.repeat(4)});
var clip7 = scribble.clip({notes: convertProgression('1 5 2 4', key), pattern: 'x___'.repeat(4)});
var clip8 = scribble.clip({notes: convertProgression('3 6 2 5', key), pattern: 'x___'.repeat(4)});
var clip9 = scribble.clip({notes: convertProgression('6 4 5 1', key), pattern: 'x___'.repeat(4)});
var clip10 = scribble.clip({notes: convertProgression('1 4 1 5', key), pattern: 'x___'.repeat(4)});
var clip11 = scribble.clip({notes: convertProgression('1-7 4-7 5-7 4-7', key), pattern: 'x___'.repeat(4)});
var clip12 = scribble.clip({notes: convertProgression('1-7 6-7 2-7 5-7', key), pattern: 'x___'.repeat(4)});
var clip13 = scribble.clip({notes: convertProgression('1 4 4-min 1', key), pattern: 'x___'.repeat(4)});
var clip14 = scribble.clip({notes: convertProgression('1 2 4-min 1', key), pattern: 'x___'.repeat(4)});
var clip15 = scribble.clip({notes: convertProgression('1 4 1-aug 5', key), pattern: 'x___'.repeat(4)});
var clip16 = scribble.clip({notes: convertProgression('1 5 1 7 3 5 1 1', key), pattern: 'x___'.repeat(8)});

// eval(pry.it)


scribble.midi(clip1, 'output/clip1.mid');
scribble.midi(clip2, 'output/clip2.mid');
scribble.midi(clip3, 'output/clip3.mid');
scribble.midi(clip4, 'output/clip4.mid');
scribble.midi(clip5, 'output/clip5.mid');
scribble.midi(clip6, 'output/clip6.mid');
scribble.midi(clip7, 'output/clip7.mid');
scribble.midi(clip8, 'output/clip8.mid');
scribble.midi(clip9, 'output/clip9.mid');
scribble.midi(clip10, 'output/clip10.mid');
scribble.midi(clip11, 'output/clip11.mid');
scribble.midi(clip12, 'output/clip12.mid');
scribble.midi(clip13, 'output/clip13.mid');
scribble.midi(clip14, 'output/clip14.mid');
scribble.midi(clip15, 'output/clip15.mid');
scribble.midi(clip16, 'output/reflek.mid');



