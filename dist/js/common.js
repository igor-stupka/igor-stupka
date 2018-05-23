$(document).ready(function() {

    //ASIDE-SHOW/HIDE
    function toggleMenu() {
        $('.mnu-btn').toggleClass('opened-btn');
        $('.page-aside').toggleClass('open');
        $('.page-swiper').toggleClass('blur');
    };

    $('.mnu-btn').click(function() {
        toggleMenu();
    });

    //ASIDE-HIDE
    function closeMenu() {
        $('.mnu-btn').removeClass('opened-btn');
        $('.page-aside').removeClass('open');
        $('.page-swiper').removeClass('blur');
    };

    $('nav a, .page-swiper, .contact-btn').click(function() {
        closeMenu();
    });

    $('html').keydown(function(e) {
        if (e.keyCode == 27) {
            closeMenu();
        }
    });

    //Responsive
    if (window.matchMedia('(max-width:1024px)').matches) {

        //Додавання .go-to до лінків для плавного скролу
        $('nav a, .contact-btn, .services li a').addClass('go-to');

        //Scroll to 
        $('.go-to').click(function() { // ловим клик по ссылке с классом go_to
            var scroll_el = $(this).attr('href'); // возьмем содержимое атрибута href, должен быть селектором, т.е. например начинаться с # или .
            if ($(scroll_el).length != 0) { // проверим существование элемента чтобы избежать ошибки
                $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500); // анимируем скроолинг к элементу scroll_el
            }
            return false; // выключаем стандартное действие
        });

        //Заміна data-hash на id
        $.each($("section.swiper-slide"), function() {
            dh = $(this).attr('data-hash'); //копіюємо значення атрибуту data-hash
            $(this).attr("id", dh); //створюємо id і вставляємо в нього скопійоване значення
            $(this).removeAttr('data-hash'); //видаляємо data-hash
        });

        //SKILLS-HOVER
        $('.skills ul li').click(function() {
            $('.skills ul li img').removeClass('scaler');
            $(this).children('img').addClass('scaler');
        });
        //Прибрати свайпер-паралакси
        $('*').removeAttr('data-swiper-parallax').removeAttr('data-swiper-parallax-duration');

    } else {

        //PAGE-SWIPER
        var pageSwiper = new Swiper('.page-swiper', {
            direction: 'vertical',
            mousewheel: true,
            speed: 600,
            simulateTouch: false,
            parallax: true,
            keyboard: {
                enabled: true,
            },
            pagination: {
                el: '.page-pagination',
                clickable: true,
            },
            hashNavigation: {
                watchState: true,
            },
        });

        //SKILLS-HOVER
        $('.skills li').tilt({
            scale: 1.05,
            maxTilt: 20,
            speed: 400,
        });

    }

    //PORTFOLIO SWIPER
    var portfolioSwiper = new Swiper('.portfolio-swiper', {
        direction: 'horizontal',
        speed: 600,
        slidesPerView: 1,
        loop: true,
        parallax: true,
        keyboard: {
            enabled: true,
        },
        pagination: {
            el: '.portfolio-pagination',
            clickable: true,
        },
    });

    //MAIL-VALIDATOR
    var jVal = {
        'name': function() {
            var nameInfo = $('#nameInfo');
            var ele = $('#name');
            var pos = ele.offset();
            nameInfo.css('z-index', '4');
            if (ele.val().length < 3) {
                jVal.errors = true;
                nameInfo.show();
            } else {
                nameInfo.hide();
            }
        },
        'email': function() {
            var emailInfo = $('#emailInfo');
            var invalid = $('#invalidEmailInfo');
            var ele = $('#email');
            var pos = ele.offset();
            var patt = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
            emailInfo.css('z-index', '3');
            invalid.css('z-index', '2');

            if (ele.val().length < 1) {
                emailInfo.show();
            } else {
                emailInfo.hide();
                if (!patt.test(ele.val())) {
                    jVal.errors = true;
                    invalid.show();

                } else {
                    emailInfo.hide();
                    invalid.hide();
                }
            }


        },
        'message': function() {
            var aboutInfo = $('#aboutInfo');
            var ele = $('#message');
            var pos = ele.offset();
            aboutInfo.css('z-index', '1');

            if (ele.val().length < 2) {
                jVal.errors = true;

                aboutInfo.show();
            } else {
                aboutInfo.hide();
            }
        },

        'sendIt': function() {
            if (!jVal.errors) {
                //FORM SENDING
                $.ajax({
                    type: "GET",
                    url: "mail.php",
                    data: $('.contact-form').serialize()
                }).done(function() {
                    $('.contact-form fieldset').fadeOut();
                    var clientName = $('#name').val();
                    $('#client-name').html(clientName);
                    setTimeout(function() {
                        $('.ty').fadeIn();
                        $(".input-field").val('');
                        setTimeout(function() {
                            $('.ty').fadeOut();
                            setTimeout(function() {
                                $('.contact-form fieldset').fadeIn();
                            }, 800);
                        }, 2000);
                    }, 800);
                    
                });
                return false;
            }
        }
    };
    // ====================================================== //
    $('.send-btn').click(function() {
        jVal.errors = false;
        jVal.name();
        jVal.email();
        jVal.message();
        jVal.sendIt();
        return false;
    });

    $('#name').change(jVal.name);
    $('#email').change(jVal.email);
    $('#message').change(jVal.message);



});