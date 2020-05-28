let pos = 0;
let totalSlides = $('#sliderWrap ul li').length;
let sliderWidth = $('#sliderWrap').width();
$(document).ready(function () {
    $('#sliderWrap ul#slider').width(sliderWidth * totalSlides);
    $('#next').click(function () {
        slideRight();
    });
    $('#previous').click(function () {
        slideLeft();
    });
    let autoSlider = setInterval(slideRight, 3000);
    $.each($('#sliderWrap ul li'), function () {
        let li = document.createElement('li');
        $('#paginationWrap ul').append(li);
    });
    pagination();
    $('#sliderWrap').hover(
            function () {
                $(this).addClass('active');
                clearInterval(autoSlider);
            },
            function () {
                $(this).removeClass('active');
                autoSlider = setInterval(slideRight, 3000);
            }
    );
});

function slideLeft() {
    pos--;
    if (pos === -1) {
        pos = totalSlides - 1;
    }
    $('#sliderWrap ul#slider').css('left', -(sliderWidth * pos));
    pagination();
}

function slideRight() {
    pos++;
    if (pos === totalSlides) {
        pos = 0;
    }
    $('#sliderWrap ul#slider').css('left', -(sliderWidth * pos));
    pagination();
}

function pagination() {
    $('#paginationWrap ul li').removeClass('active');
    $('#paginationWrap ul li:eq(' + pos + ')').addClass('active');
}
