VF = Vex.Flow;

var scales = new Vue({
  el: "#main",
  data: {
    scales: [
      {
        elementId: "c-lydian",
        tonic: "C",
        mode: "Lydian",
        notes: ["C/4", "D/4", "E/4", "F#/4", "G/4", "A/4", "B/4", "C/5"]
      },
      {
        elementId: "c-ionian",
        tonic: "C",
        mode: "Ionian",
        notes: ["C/4", "D/4", "E/4", "F/4", "G/4", "A/4", "B/4", "C/5"]
      },
      {
        elementId: "c-mixolydian",
        tonic: "C",
        mode: "Mixolydian",
        notes: ["C/4", "D/4", "E/4", "F/4", "G/4", "A/4", "Bb/4", "C/5"]
      },
      {
        elementId: "c-dorian",
        tonic: "C",
        mode: "Dorian",
        notes: ["C/4", "D/4", "Eb/4", "F/4", "G/4", "A/4", "Bb/4", "C/5"]
      },
      {
        elementId: "c-aeolian",
        tonic: "C",
        mode: "Aeolian",
        notes: ["C/4", "D/4", "Eb/4", "F/4", "G/4", "Ab/4", "Bb/4", "C/5"]
      },
      {
        elementId: "c-phrygian",
        tonic: "C",
        mode: "Phrygian",
        notes: ["C/4", "Db/4", "Eb/4", "F/4", "G/4", "Ab/4", "Bb/4", "C/5"]
      },
      {
        elementId: "c-locrian",
        tonic: "C",
        mode: "Locrian",
        notes: ["C/4", "Db/4", "Eb/4", "F/4", "Gb/4", "Ab/4", "Bb/4", "C/5"]
      },
    ]
  },

  methods: {
    drawStaves: function() {
      this.scales.forEach(scale => {
        var div = document.getElementById(scale.elementId);
        var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

        renderer.resize(800, 100);

        var context = renderer.getContext();
        var stave = new VF.Stave(0, 0, 450);

        stave.addClef("treble");

        var notes = [];
        scale.notes.forEach(note => {
          accidental = note[1];
          if (accidental == '/') {
            accidental = false;
          }
          console.log(note)
          newNote = new VF.StaveNote({ clef: "treble", keys: [note], duration: "q" });
          if (accidental) {
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
