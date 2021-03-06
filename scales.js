scales = [
  {
    elementId: "c-lydian",
    tonic: "C",
    mode: "Lydian",
    notes: ["C/4", "D/4", "E/4", "F#/4", "G/4", "A/4", "B/4", "C/5"],
    tags: [],
    visible: true
  },
  {
    elementId: "c-ionian",
    tonic: "C",
    mode: "Ionian",
    notes: ["C/4", "D/4", "E/4", "F/4", "G/4", "A/4", "B/4", "C/5"],
    tags: [],
    visible: true
  },
  {
    elementId: "c-mixolydian",
    tonic: "C",
    mode: "Mixolydian",
    notes: ["C/4", "D/4", "E/4", "F/4", "G/4", "A/4", "Bb/4", "C/5"],
    tags: [],
    visible: true
  },
  {
    elementId: "c-dorian",
    tonic: "C",
    mode: "Dorian",
    notes: ["C/4", "D/4", "Eb/4", "F/4", "G/4", "A/4", "Bb/4", "C/5"],
    tags: [],
    visible: true
  },
  {
    elementId: "c-aeolian",
    tonic: "C",
    mode: "Aeolian",
    notes: ["C/4", "D/4", "Eb/4", "F/4", "G/4", "Ab/4", "Bb/4", "C/5"],
    tags: [],
    visible: true
  },
  {
    elementId: "c-phrygian",
    tonic: "C",
    mode: "Phrygian",
    notes: ["C/4", "Db/4", "Eb/4", "F/4", "G/4", "Ab/4", "Bb/4", "C/5"],
    tags: [],
    visible: true
  },
  {
    elementId: "c-locrian",
    tonic: "C",
    mode: "Locrian",
    notes: ["C/4", "Db/4", "Eb/4", "F/4", "Gb/4", "Ab/4", "Bb/4", "C/5"],
    tags: [],
    visible: true
  },
  {
    elementId: "g-lydian",
    tonic: "G",
    mode: "Lydian",
    notes: ["G/4", "A/4", "B/4", "C#/5", "D/5", "E/5", "F#/5", "G/5"],
    tags: [],
    visible: true
  },
]

VF = Vex.Flow;

var scale = new Vue({
  el: "#main",
  data: {
    originalScales: scales,
    scales: scales,
    filterInput: ""
  },

  methods: {
    drawStaves() {
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
    },

    generateTags() {
      // Auto tags are: tonic, mode
      for (let index = 0; index < this.scales.length; index++) {
        const scale = this.scales[index];
        scale.tags = [];
        scale.tags.push(scale.tonic);
        if (scale.mode == "Aeolian") {
          scale.tags.push("Minor");
        } else if (scale.mode == "Ionian") {
          scale.tags.push("Major");
        }
        scale.tags.push(scale.mode);
      }
    },

    addFilter(tag) {
      if (this.filterInput.includes(tag)) {
        return false;
      }
      this.filterInput = this.filterInput.trim();
      this.filterInput += " " + tag.trim();
    },

    scaleHasAllTags(scale, givenTags) {
      givenTags.forEach(tag => {
        // if (if the given tag is not in the scale tags) {
        if (!scale.tags.includes(tag)) {
          return false;
        }
      });
      return true;
    },

    clear() {
      this.filterInput = '';
      this.scales = this.originalScales.slice();
    },

    // Why?
    filter() {
      this.scales = [];

      givenTags = this.filterInput.split(' ');

      givenTags.forEach(givenTag => {
        for (let index = 0; index < this.originalScales.length; index++) {
          const scale = this.originalScales[index];
          if (scale.tags.includes(givenTag)) {
            if (!this.scales.includes(scale)) {
              this.scales.push(scale);
            }
          }
        }
      });
    }
  },

  mounted() {
    this.generateTags();
    this.drawStaves();
  }
})
