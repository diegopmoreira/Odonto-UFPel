"use strict";
$(document).ready(function () {

    function loadJson(file) {

        var response = null;
        $.ajax({
            url: 'json/' + file,
            dataType: 'application/json',
            async: false,
            complete: function (data) {
                response = JSON.parse(data.responseText);
            }
        });
        return response;
    }   

    var area;

    $(".grid-buttons button").click(function () {
        area = loadJson($(this).attr("data-area") + '.json');
        console.log((area.area));
        $(".radio .col").remove();
        $(".titulo").text(area.area);
        $.each(area.radiolucida, function (i, acidente) {
            console.log(area.radiolucida[i].path);
            $(".radiolucidas .radio").append('<div class="col"><img class="img-fluid" alt="" src="' + area.radiolucida[i].path + '"></img></div>');
        });
        $.each(area.radiopacas, function (i, acidente) {
            console.log(area.radiopacas[i].path);
            $(".radiopacas .radio").append('<div class="col"><img class="img-fluid" alt="" src="' + area.radiopacas[i].path + '"></img></div>');
        });
        $('html, body').animate({
            scrollTop: $(".content").offset().top
        }, 1000);
        
    });
  









});