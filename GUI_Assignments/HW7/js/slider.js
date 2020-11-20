
// jQuery Slider functions
// xStart
$(document).ready(function(){
    $(function() {
        $("#xStartSlider").slider({
            min: -50,
            max: 50,
            slide: function( event, ui ) {
                $( "#xStart" ).val( ui.value );
                
            }
        });
    });
    // xEnd
    $(function() {
        $("#xEndSlider" ).slider({
            min: -50,
            max: 50,
            slide: function( event, ui ) {
                $( "#xEnd" ).val( ui.value );
            }
        });
    });
    // yStart
    $(function() {
        $( "#yStartSlider" ).slider({
            min: -50,
            max: 50,
            slide: function( event, ui ) {
                $( "#yStart" ).val( ui.value );
            }
        });
    });
    // yEnd
    $(function() {
        $( "#yEndSlider" ).slider({
            min: -50,
            max: 50,
            slide: function( event, ui ) {
                $( "#yEnd" ).val( ui.value );
            }
        });
    });
});

// jQuery when text input is changed slider updates.
// xStartingNum
$("#xStart").change(function() {
    $("#xStartSlider").slider("value", $(this).val());
});
// xEndingNum
$("#xEnd").change(function() {
    $("#xEndSlider").slider("value", $(this).val());
});
// yStartingNum
$("#yStart").change(function() {
    $("#yStartSlider").slider("value", $(this).val());
});
// yEndingNum
$("#yEnd").change(function() {
    $("#yEndSlider").slider("value", $(this).val());
});

