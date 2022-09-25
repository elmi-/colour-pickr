let eyeDropper = new EyeDropper();

let selectedColour ="";
let colourValueText =  $(".colour-value");
let colourValuePreview = $(".colour-preview");
let eyeDropperButton = $("#eyeDropper");
let copiedAlertDiv = $(".copiedAlert");

let colourHistoryArray = [];
let addingHTMLArray = [];

$(document).ready(function() {
  // copiedAlertDiv.css("height", 0);
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
      // console.log(colorSelectionResult.sRGBHex);
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
  navigator.clipboard.writeText(colourValueText.text()).then(function() {
    console.log('Async: Copying to clipboard was successful!');
    copiedAlertDiv.css("background", colourValueText.text())
    copiedAlertDiv.show("slow").delay(500).hide("slow");
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
}