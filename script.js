let eyeDropper = new EyeDropper();

let selectedColour ="";
let colourValueText =  $(".colour-value");
let colourValuePreview = $(".colour-preview");
let eyeDropperButton = $("#eyeDropper");
let copiedAlertDiv = $(".copiedAlert");

let colourHistoryArray = [];
let addingHTMLArray = [];

$(document).ready(function() {
  eyeDropperButton.on("click", function(e) {
    eyeDpper();
  });

  colourValuePreview.on("click", function(e) {
    copyValue();
  })
});

const eyeDpper = () => {
  eyeDropper.open()
  .then(colorSelectionResult => {
      // returns hex color value (#RRGGBB) of the selected pixel
      selectedColour = colorSelectionResult.sRGBHex;
      colourValuePreview.css("background", selectedColour)

      colourValueText.text(selectedColour)

      if(colourHistoryArray.length < 5) {
        colourHistoryArray.push(selectedColour);
        console.log(colourHistoryArray)
      } else {
        colourHistoryArray.shift()
        colourHistoryArray.push(selectedColour);
        console.log(colourHistoryArray);
      }
    })
    .catch(error => {
      // handle the user choosing to exit eyedropper mode without a selection
      console.log(error)
    });
}

const copyValue = () => {
  navigator.clipboard.writeText(colourValueText.text())
  .then(function() {
    copiedAlertDiv.css("background", colourValueText.text())
    copiedAlertDiv.show("slow").delay(500).hide("slow");
  })
  .catch(error => {
    console.error('Async: Could not copy text: ', error);
  });
}