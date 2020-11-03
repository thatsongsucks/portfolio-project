//import * as Tone from "Tone";

// Musical info and initializing variables

const allNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A','A#', 'B'];
const majorScale = [0, 2, 4, 5, 7, 9, 11];
const minorScale = [0, 2, 3, 5, 7, 8, 10];
let noteArray;
Tone.Transport.bpm.value = 800;
let currentKey = 'C';
let currentScale = majorScale;
let haywire = false;
let loop = false;
let currentLoop;
let currentChord = [0, 2, 4];
let audioStarted = false;

// Start the audio context

const ACStart = async () => {
    await Tone.start();
    console.log('Audio is Ready');
    audioStarted = true;
};

document.querySelector('body').addEventListener('click', () => {
    if (!audioStarted) {
        ACStart();
    }
});

//Create synths.

const verb = new Tone.Reverb({'decay':2.5}).toDestination();
const synth1 = new Tone.PolySynth(Tone.FMSynth).connect(verb);
const synth2 = new Tone.PolySynth(Tone.FMSynth).connect(verb);
synth1.set({'envelope': {'release':1.2, 'sustain':0.3}});
synth2.set({'envelope': {'release':1.2, 'sustain':0.3}});




//Generate Chord Buttons

allNotes.forEach(n => {
    document.getElementById('major').insertAdjacentHTML('beforeend',
        `<div class="chordball">
        <div class="chord major" id='${n}'>${n}</div>
        </div>`    
    );
    document.getElementById('minor').insertAdjacentHTML('beforeend',
        `<div class="chordball">
        <div class="chord minor" id='${n}m'>${n}m</div>
        </div>`    
    );
});


//Add Events to Chord Play Buttons

document.querySelector('.container').addEventListener('click', e => {
    if (e.target.matches('.chord')) {
        let id = e.target.id;
        console.log(id);
        chordParse(id);
        changeNoteArray();
        if (loop) {
            looper();
        } else if (double) {
            upAndDown();
        } else {
            playChord();
        }
    }
});

const chordParse = (id) => {
    if (id.endsWith('m')) {
        let key = id.slice(0,-1);
        let scale = minorScale;
        setChord(key, scale);
    } else {
        let key = id;
        let scale = majorScale;
        setChord(key, scale);
    }
};

const setChord = (key, scale) => {
    currentKey = key;
    currentScale = scale;
};

//Event listeners

//Set up bpm slider

const speedSlider = document.getElementById('speedslider');
const speedNumber = document.getElementById('speed');
let stepper = 0.625 * 1/(speedSlider.value/7);
speedNumber.innerHTML = speedSlider.value+'%';
speedSlider.oninput = () => {
    speedNumber.innerHTML = speedSlider.value+'%';
    stepper = 0.625 * 1/(speedSlider.value/7);
};



// //Octave selector

const octSelector = document.getElementById('oct');
let currentOct = octSelector.value;
octSelector.addEventListener('change', () => {
    currentOct = octSelector.value;
});

// //Reverse selector

const revSelector = document.querySelector('.revselect');
let reverse = false;
revSelector.addEventListener('click', () => {
    if (reverse) {
        reverse = false;
        revSelector.textContent = "Ascending";
    } else {
        reverse = true;
        revSelector.textContent = "Descending";
    }
    revSelector.classList.toggle('reverse');
});

// Octave adder selector

let amountOfOctaves = 2;
const octDisplay = document.getElementById('octamount');
octDisplay.textContent = amountOfOctaves;
const addOctSelector = document.querySelector('.addoctave');
addOctSelector.addEventListener('click', e => {
    if (e.target.id === 'plus') {
        amountOfOctaves += 1;
        octDisplay.textContent = amountOfOctaves;
    } else if (e.target.id === 'minus') {
        if (amountOfOctaves > 1) {
            amountOfOctaves -= 1;
            octDisplay.textContent = amountOfOctaves;
        }
    }
});

//Double Stroke Selector

const doubleSelector = document.querySelector('.doubleselect');
let double = false;
doubleSelector.addEventListener('click', () => {
    if (double) {
        double = false;
        doubleSelector.textContent = "Single Stroke";
    } else {
        double = true;
        doubleSelector.textContent = "Double Stroke";
    }
    doubleSelector.classList.toggle('doubled');
});

//Loop Selector

const loopSelector = document.querySelector('.loopselect');
loopSelector.addEventListener('click', () => {
    if (loop) {
        loop = false;
        if (currentLoop) {
            currentLoop.stop();
        }
        loopSelector.textContent = "No Loop";
    } else {
        loop = true;
        loopSelector.textContent = "Looping";
    }
    loopSelector.classList.toggle('looped');
});


// Note array creation functions



//Order the Notes of the generic note array

const orderNotes = () => {
    noteArray = allNotes;
    const keyIndex = noteArray.findIndex((i) => i === currentKey);
    if (keyIndex !== 0) {
        const lastNotes = noteArray.slice(keyIndex);
        const firstNotes = noteArray.slice(0, keyIndex);
        noteArray = lastNotes.concat(firstNotes);
    }
};

//Join the notes with the octave

const addOctave = () => {
    let oct = currentOct;
    noteArray = noteArray.map((e, i) => {      
        if (i !== 0 && e === 'C') {
            oct = (parseInt(oct) + 1).toString();
            return e + oct;
        } else {
            return e + oct;
        }
    });
};

//Take out notes not in the current scale and add octave of root

const getChord = () => {
    let chord = currentChord.map(c => {
        return currentScale[c];
    });
    noteArray = chord.map(n => {
        return noteArray[n];
    });
    let nextOct = (parseInt(currentOct) + 1).toString();
    noteArray.push(currentKey+nextOct);
};

const addAnother = () => {
    let lastThree = noteArray.slice(-3);
    let anotherArray = lastThree.map(e => {
        let oct = e.slice(-1);
        oct = (parseInt(oct) + 1).toString();
        return e.slice(0,-1) + oct;
    });
    noteArray = noteArray.concat(anotherArray);

};

// Call all the note array creation functions

const changeNoteArray = () => {
    orderNotes();
    addOctave();
    getChord();
    for (let o = 1; o < amountOfOctaves; o++) {
        addAnother();
    }
    if (reverse === true) {
        noteArray.reverse();
    }
};

// Create part using the note array

const playChord = (startTime = 0) => {
    let rightNow;
    if (!startTime) {
        rightNow = Tone.immediate();
    } else {
        rightNow = startTime;
    }
    let half1;
    let half2;
    [half1, half2] = arraySplitter();
    //console.log(half1, half2);
    for (let i = 0; i < half1.length; i++)  {
        Tone.Transport.schedule((time) => {
            try {
                synth1.triggerAttackRelease(half1[i], '4n');  
                console.log(`synth 1 plays ${half1[i]}`);    
            } catch (err) {
                console.log('Going Haywire!');                
                if (!haywire) {
                    wentHaywire(err);
                }
            }            
        }, rightNow);
        rightNow += stepper;
        if (half2[i]) {
            Tone.Transport.schedule((time) => {
                try {
                    synth2.triggerAttackRelease(half2[i], '4n');  
                    console.log(`synth 2 plays ${half2[i]}`);      
                } catch (err) {
                    console.log('Going Haywire!');                
                    if (!haywire) {
                        wentHaywire(err);
                    }
                }            
            }, rightNow);
        }
        rightNow += stepper;
    };

    return rightNow;
};


const arraySplitter = () => {
    let halfArr1 = [];
    let halfArr2 = [];
    for (let i = 0; i < noteArray.length; i += 2) {
    //    console.log(noteArray[i]);
        halfArr1.push(noteArray[i]);
        if (noteArray[i+1]) {
            halfArr2.push(noteArray[i+1]);
        }
    }
    return [halfArr1, halfArr2];
};

// Display Error

const wentHaywire = (error) => {
    synth.disconnect();
    haywire = true;
    document.querySelector('.error').classList.toggle('error-message');
    document.querySelector('.error').insertAdjacentHTML('beforeend',
    `<h1>The Harpist Became Confused.  Please Reload the Page.</h1>
    <p>${error}</p>`
    );
    document.querySelector('.logo').insertAdjacentHTML('beforeend',
    '<img src="images/deku.png" width="350px">'
    );
}

// Play a double stroke chord

const upAndDown = () => {
    let now = playChord() + stepper;
    noteArray.reverse();
    return playChord(now) + stepper;
};

// Create a loop with the chord

const looper = () => {
    if (currentLoop) {
        currentLoop.stop();
    }
    let start = Tone.immediate();
    let end;
    if (double) {
        end = upAndDown() + (stepper*7);
        noteArray.reverse();
    } else {
        end = playChord() + (stepper*7);
    }
    let duration = end - start;
    currentLoop = new Tone.Loop((time) => {
        if (double) {
            changeNoteArray();
            upAndDown();
            noteArray.reverse();
        } else {
            changeNoteArray();
            playChord();
        }
    }, duration).start(end);
};



// Create initial note array and start the transport

changeNoteArray();
Tone.Transport.start();


// Log the passing of audio context time

// const log = new Tone.Loop((time) => {
// 	console.log(time);
// }, "1n").start(0);
