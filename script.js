const eyeDropper = new EyeDropper();

let selectedColour ="#9b59b6";
const colourValueText =  $(".colour-value");
const colourValuePreview = $(".colour-preview");
const eyeDropperButton = $("#eyeDropper");
const copiedAlertDiv = $(".copiedAlert");
const optionButtons = $(".options button");
const infoButton = $(".info-button");

let colourHistoryArray = [];
let addingHTMLArray = [];

$(document).ready(function() {
  optionButtons.on("click", function(e) {
    let selectedButton = e.currentTarget;
    optionButtons.removeClass("selected");
    $(selectedButton).addClass("selected");
    if(selectedButton.textContent == "RGB (rgb(1, 2, 3)") {
      $("body").removeClass("HEX");
      $("body").addClass("RGB");
      selectedColour = convertHEX(selectedColour);
      colourValueText.text("rgb(" + selectedColour + ")");
    } else {
      $("body").removeClass("RGB");
      $("body").addClass("HEX");
      selectedColour = convertRGB(selectedColour);
      colourValueText.text("#" + selectedColour);
    }
  })

  eyeDropperButton.on("click", function(e) {
    eyeDpper();
  });

  colourValuePreview.on("click", function(e) {
    copyValue();
  });

  infoButton.on("click", function(e) {
    $(".info-content, .info-overlay").addClass("active");
  });

  $(".close, .info-overlay").on("click", function(e) {
    $(".info-content, .info-overlay").removeClass("active");
  })
});

const eyeDpper = () => {
  eyeDropper.open()
  .then(colorSelectionResult => {
      // returns hex color value (#RRGGBB) of the selected pixel
      debugger;

      if($("body").hasClass("RGB")) {
        debugger;
        selectedColour = "rgb(" + convertHEX(colorSelectionResult.sRGBHex) + ")";
      } else {
        selectedColour = colorSelectionResult.sRGBHex;
      }
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

const convertHEX = (hexValue) => {
  var r = parseInt(hexValue.slice(1, 3), 16),
      g = parseInt(hexValue.slice(3, 5), 16),
      b = parseInt(hexValue.slice(5, 7), 16);
  
      return [r,g, b];
}

function convertRGB(rgbValue){
  return ((1 << 24) + (rgbValue[0] << 16) + (rgbValue[1] << 8) + rgbValue[2]).toString(16).slice(1);
 }