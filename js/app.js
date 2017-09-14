"use strict";
$(document).ready(function () {
  var original_src;

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
            $(".radiolucidas .radio").append('<div class="col"><img class="img-fluid" alt="" src="' + area.radiolucida[i].path + '" data-toggle="modal" data-target=".modal-acc"></img></div>');
        });
        $.each(area.radiopacas, function (i, acidente) {
            console.log(area.radiopacas[i].path);
            $(".radiopacas .radio").append('<div class="col"><img class="img-fluid" alt="" src="' + area.radiopacas[i].path + '" data-toggle="modal" data-target=".modal-acc"></img></div>');
        });
        $('html, body').animate({
            scrollTop: $(".content").offset().top
        }, 1000);

    });

    $('.content .img-fluid').on('click', function(){
      var src = $(this).attr('src');
      console.log(src);
      $('.modal-body .acidente img').attr('src', '2');
      $('.modal-body .acidente img').attr('src', src);
    });

    $('.modal-body .acidente img').on('mouseover', function(){
      original_src = $(this).attr('src');
      var split = $(this).attr('src').split(".");
      var dest = split[0]+'_h.'+split[1];
      $(this).attr('src', dest);
    });

    $('.modal-body .acidente img').on('mouseout', function(){
      var split = $(this).attr('src').split(".");
      var dest = split[0]+'_h.'+split[1];
      $(this).attr('src', original_src);
    });








});
