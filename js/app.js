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
    var src;
    var actual_pic;
    var acc_modal;
    var area;
    var actual_area, prev_area, next_area;

    if ($('.titulo').text() == '') {
        $('.content').addClass('d-none');
    }

    $(".grid-buttons button").click(function () {
        actual_area = $(this).attr("data-area");
        prev_area = $(this).attr("data-prev");
        next_area = $(this).attr("data-next");
        area = loadJson(actual_area + '.json');

        $(".radio .col").remove();
        $(".titulo").text(area.area);
        $.each(area.radiolucida, function (i, acidente) {
            $(".radiolucidas .radio").append('<div class="col"><img class="img-fluid" alt="" src="' + area.radiolucida[i].path + '" data-toggle="modal" data-target=".modal-acc"></img><h4>' + area.radiolucida[i].acidente + '</h4></div>');
        });
        $.each(area.radiopacas, function (i, acidente) {
            $(".radiopacas .radio").append('<div class="col"><img class="img-fluid" alt="" src="' + area.radiopacas[i].path + '" data-toggle="modal" data-target=".modal-acc"></img><h4>' + area.radiolucida[i].acidente + '</h4></div>');
        });
        $('.content').removeClass('d-none');
        $('html, body').animate({
            scrollTop: $(".content").offset().top
        }, 1000);
        $(".content .col img").css("max-width", "200px");

    });

    $('.content').on('click', '.img-fluid', function () {
        src = $(this).attr('src');
        acc_modal = jQuery.grep(area.radiopacas, function (n, i) {
            return (area.radiopacas[i].path == src);
        });
        if (typeof acc_modal[0] !== 'object') {
            acc_modal = jQuery.grep(area.radiolucida, function (n, i) {
                return (area.radiolucida[i].path == src);
            });
        }
        if(acc_modal[0].mult == false){
 
          $('.modal-body .acidente .btn-group').addClass('d-none');
 
        }else{
 
          $('.modal-body .acidente .btn-group').removeClass('d-none');
 
        }
 

        $('.modal-body .texto').text(acc_modal[0].description);
        $('.modal-title').text(acc_modal[0].acidente);
        $('.modal-body .acidente img').attr('src', src);
    });

    $('.modal-body .acidente img').on('mouseover', function () {
        original_src = $(this).attr('src');
        var split = $(this).attr('src').split(".");
        var dest = split[0] + '_h.' + split[1];

        $(this).attr('src', dest);
    });

    $('.modal-body .acidente img').on('mouseout', function () {
        var split = $(this).attr('src').split(".");
        var dest = split[0] + '_h.' + split[1];

        $(this).attr('src', original_src);
    });

    $('.prev-area').on('click', function () {
        prev_area = $("[data-area=" + actual_area + "]").attr("data-prev");
        next_area = $("[data-area=" + actual_area + "]").attr("data-next");
        area = loadJson(prev_area + '.json');

        $(".radio .col").remove();
        $(".titulo").text(area.area);
        $.each(area.radiolucida, function (i, acidente) {
            $(".radiolucidas .radio").append('<div class="col"><img class="img-fluid" alt="" src="' + area.radiolucida[i].path + '" data-toggle="modal" data-target=".modal-acc"></img><h4>' + area.radiolucida[i].acidente + '</h4></div>');
        });
        $.each(area.radiopacas, function (i, acidente) {
            $(".radiopacas .radio").append('<div class="col"><img class="img-fluid" alt="" src="' + area.radiopacas[i].path + '" data-toggle="modal" data-target=".modal-acc"></img><h4>' + area.radiolucida[i].acidente + '</h4></div>');
        });
        actual_area = prev_area;
        $(".content .col img").css("max-width", "200px");

    });

    $('.next-area').on('click', function () {
        prev_area = $("[data-area=" + actual_area + "]").attr("data-prev");
        next_area = $("[data-area=" + actual_area + "]").attr("data-next");
        area = loadJson(next_area + '.json');

        $(".radio .col").remove();
        $(".titulo").text(area.area);
        $.each(area.radiolucida, function (i, acidente) {
            $(".radiolucidas .radio").append('<div class="col"><img class="img-fluid" alt="" src="' + area.radiolucida[i].path + '" data-toggle="modal" data-target=".modal-acc"></img><h4>' + area.radiolucida[i].acidente + '</h4></div>');
        });
        $.each(area.radiopacas, function (i, acidente) {
            $(".radiopacas .radio").append('<div class="col"><img class="img-fluid" alt="" src="' + area.radiopacas[i].path + '" data-toggle="modal" data-target=".modal-acc"></img><h4>' + area.radiolucida[i].acidente + '</h4></div>');
        });
        actual_area = next_area;
        $(".content .col img").css("max-width", "200px");

    });

    $('.next').on('click', function () {
        $('.modal-body .acidente img').attr('src', acc_modal[0].next);

        src = acc_modal[0].next;
        acc_modal = jQuery.grep(area.radiopacas, function (n, i) {
            return (area.radiopacas[i].path == src);
        });
        if (typeof acc_modal[0] !== 'object') {
            acc_modal = jQuery.grep(area.radiolucida, function (n, i) {
                return (area.radiolucida[i].path == src);
            });
        }
        if(acc_modal[0].mult == false){
 
          $('.modal-body .acidente .btn-group').addClass('d-none');
 
        }else{
 
          $('.modal-body .acidente .btn-group').removeClass('d-none');
 
        }
 

        $('.modal-body .texto').text(acc_modal[0].description);
        $('.modal-title').text(acc_modal[0].acidente);
    });
    $('.prev').on('click', function () {
        $('.modal-body .acidente img').attr('src', acc_modal[0].prev);

        src = acc_modal[0].prev;
        acc_modal = jQuery.grep(area.radiopacas, function (n, i) {
            return (area.radiopacas[i].path == src);
        });
        if (typeof acc_modal[0] !== 'object') {
            acc_modal = jQuery.grep(area.radiolucida, function (n, i) {
                return (area.radiolucida[i].path == src);
            });
        }
        if(acc_modal[0].mult == false){
 
          $('.modal-body .acidente .btn-group').addClass('d-none');
 
        }else{
 
          $('.modal-body .acidente .btn-group').removeClass('d-none');
 
        }
 

        $('.modal-body .texto').text(acc_modal[0].description);
        $('.modal-title').text(acc_modal[0].acidente);
    });


    $('.pic-2').on('click', function () {
        actual_pic = $('.acidente img').attr('src');

        if (actual_pic.charAt(actual_pic.length - 6) != '_') {
            var split = $('.acidente img').attr('src').split(".");
            var dest = split[0] + '_2.' + split[1];

            $('.acidente img').attr('src', dest);

            actual_pic = dest;
        }
    });

    $('.pic-1').on('click', function () {
        actual_pic = $('.acidente img').attr('src');

        if (actual_pic.charAt(actual_pic.length - 6) == '_') {

            var split = $('.acidente img').attr('src').split("_2");
            var dest = split[0] + split[1];

            $('.acidente img').attr('src', dest);
        }
    });

});


