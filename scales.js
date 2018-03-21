VF = Vex.Flow;

var scales = new Vue({
  el: "#main",
  data: {
    scales: [
      {
        elementId: "c-lydian",
        tonic: "C",
        mode: "Lydian",
        notes: ["C", "D", "E", "F#", "G", "A", "B", "C"]
      },
      {
        elementId: "c-ionian",
        tonic: "C",
        mode: "Ionian",
        notes: ["C", "D", "E", "F", "G", "A", "B", "C"]
      },
      {
        elementId: "c-mixolydian",
        tonic: "C",
        mode: "Mixolydian",
        notes: ["C", "D", "E", "F", "G", "A", "Bb", "C"]
      },
      {
        elementId: "c-dorian",
        tonic: "C",
        mode: "Dorian",
        notes: ["C", "D", "Eb", "F", "G", "A", "Bb", "C"]
      },
      {
        elementId: "c-aeolian",
        tonic: "C",
        mode: "Aeolian",
        notes: ["C", "D", "Eb", "F", "G", "Ab", "Bb", "C"]
      },
      {
        elementId: "c-phrygian",
        tonic: "C",
        mode: "Phrygian",
        notes: ["C", "Db", "Eb", "F", "G", "Ab", "Bb", "C"]
      },
      {
        elementId: "c-locrian",
        tonic: "C",
        mode: "Locrian",
        notes: ["C", "Db", "Eb", "F", "Gb", "Ab", "Bb", "C"]
      },
    ]
  },

  methods: {
    drawStaves: function() {
      this.scales.forEach(scale => {
        var div = document.getElementById(scale.elementId);
        var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

        renderer.resize(800, 200);

        var context = renderer.getContext();
        var stave = new VF.Stave(0, 0, 600);

        stave.addClef("treble");

        var notes = [];
        scale.notes.forEach(note => {
          noteName = note + "/4";
          accidental = note[1];
          note = note[0];
          newNote = new VF.StaveNote({ clef: "treble", keys: [noteName], duration: "q" });
          if (accidental) {
            if (accidental == "♭") {
              accidental = "b";
            }
            newNote.addAccidental(0, new VF.Accidental(accidental));
          }
          notes.push(newNote);
        });

        // Create a voice in 4/4 and add above notes
        var voice = new VF.Voice({ num_beats: 8, beat_value: 4 });
        voice.addTickables(notes);

        // Format and justify the notes to 400 pixels.
        var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);

        // Render voice
        voice.draw(context, stave);

        stave.setContext(context).draw();
      });
    }
  },

  mounted() {
    this.drawStaves();
  }
})
