// Create an EyeDropper object
let eyeDropper = new EyeDropper();
let colourValueText = document.getElementsByClassName("colour-value");
let selectedColour ="";
// todo: save to cookies for next time user returns
let colourHistory = [];

document.getElementById("eyedropper").addEventListener('click', e => {
    eyeDropper.open()
    .then(colorSelectionResult => {
        // returns hex color value (#RRGGBB) of the selected pixel
        console.log(colorSelectionResult.sRGBHex);
        selectedColour = colorSelectionResult.sRGBHex;
        $(".colour-preview").css("background", selectedColour)
        $(".colour-value").text(selectedColour)
        if(colourHistory.length < 5) {
          colourHistory.push(selectedColour);
          console.log(colourHistory)
        } else {
          colourHistory.shift()
          colourHistory.push(selectedColour);
          console.log(colourHistory);
        }
      })
      .catch(error => {
        // handle the user choosing to exit eyedropper mode without a selection
        console.log(error)
      });
    });