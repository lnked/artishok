(function($) {
    $(document).ready(function() {
        var $cart_remove = $('.cart-item .remove>div');
        if ($cart_remove.length > 0) {

            $cart_remove.click(function() {
                $(this).toggleClass('active');
            });
            $('.cart-item .remove .actions>div').click(function() {
                $(this).parent('.actions').parent('.confirm').parent('.remove-action').parent('div').removeClass('active');
            });
        }
        var $filter_sel = $('.filters select.vis-items');
        if ($filter_sel.length > 0) {
            console.log('select');
            $filter_sel.selectmenu();
        }
        $filter_sel.on( "selectmenuchange", function( event, ui ) {
            window.location.href = window.location.pathname + '?goods_per_page=' + $( ".vis-items option:selected" ).val();
        });
        var $sm = $('.orders .order .show-more a');
        if ($sm.length > 0) {
            $sm.click(function() {
                $(this).parent('.show-more').siblings('.more-info').slideToggle(500);
                return false;
            });
        }
        var $mmt = $('.mm-trigger');
        if ($mmt.length > 0) {
            $('#mobile-vis .dropdown-header').each(function() {
                $(this).addClass('dropdown');
                $(this).children('ul').addClass('submenu');
            });
            $('#mobile-vis .submenu').each(function() {
                $(this).prepend('<li class="menu-back"><a href="#back">назад</a></li>');
            });
            $('#mobile-vis .dropdown').each(function() {
                $(this).addClass('closed');
            });
            $mmt.click(function() {
                $('#mobile-vis .menu').toggleClass('mm-open');
            });

            $('#mobile-vis .dropdown').click(function() {
                if ($(this).children('.submenu').length > 0) {
                    next_level($(this));
                    if ($(this).children('a').length > 0) {
                        $(this).children('a').attr('href', '#sub-menu-open');

                    }
                }
            });
            function next_level($data) {
                $data.removeClass('open').addClass('closed');
                if ($data.hasClass('open')) {
                    $data.removeClass('open').addClass('closed');
                    return false;
                } else {
                    $data.removeClass('closed').addClass('open');
                    var $child = $data.children('.submenu');
                    if ($child.hasClass('sub-close')) {
                        $child.removeClass('sub-close');
                    } else {
                        $child.addClass('sub-open');
                    }
                }
            }
            $('.menu-back').click(function() {
                var $parent = $(this).parent('.submenu');
                $parent.addClass('sub-close').removeClass('sub-open');
                $parent.parent('.dropdown').removeClass('open');
                console.log('remove "sub-open" and add "sub-close"');
            });
        }
        var $popup_img = $('.more-images');
        if ($popup_img.length > 0) {
            $popup_img.each(function() {
                $(this).children('.big-images').children('img').eq(0).addClass('active');
                $(this).children('.thumbs').children('img').eq(0).addClass('active');
            });
            $('.more-images .thumbs img').click(function() {
                var $parent = $(this).parent('.thumbs').parent('.more-images');

                var $big_images = $parent.children('.big-images').children('img');
                $big_images.each(function() {
                    $(this).removeClass('active');
                });
                var $min_images = $parent.children('.thumbs').children('img');
                $min_images.each(function() {
                    $(this).removeClass('active');
                });
                $big_images.eq($(this).index()).addClass('active');
                $(this).addClass('active');
//                console.log(parent);
            });
        }

        var $tovar_img = $('.tovar-page .images');
        if ($tovar_img.length > 0) {
            $tovar_img.each(function() {
                $(this).children('.big-images').children('a').children('img').eq(0).addClass('active');
                $(this).children('.thumbs').children('img').eq(0).addClass('active');
            });
            $('.tovar-page .images .thumbs img').click(function() {
                var $parent = $(this).parent('.thumbs').parent('.images');
                var $big_images = $parent.children('.big-images').children('a').children('img');
                //var $new_big_href = $parent.children('.big-images').children('a').children('img').attr('href');
                //$parent.children('.labels').children('.fancybox').attr('href', $new_big_href);
                $big_images.each(function() {
                    $(this).removeClass('active');
                });
                var $min_images = $parent.children('.thumbs').children('img');
                $min_images.each(function() {
                    $(this).removeClass('active');
                });
                $big_images.eq($(this).index()).addClass('active');
                $(this).addClass('active');
//                console.log(parent);
            });
        }

        var $colors = $('.colors input');
        if ($colors.length > 0) {

            function hex2rgb(hexStr) {
                // note: hexStr should be #rrggbb
                var hex = parseInt(hexStr.substring(1), 16);
                var r = (hex & 0xff0000) >> 16;
                var g = (hex & 0x00ff00) >> 8;
                var b = hex & 0x0000ff;
                return [r, g, b];
            }
            $colors.each(function() {
                var $color = $(this).val();
                var $id = $(this).attr('id');
                var $label = $('label[for="' + $id + '"]');
                $label.css({
                    'background-color': $color
                });
//                console.log($rgb[0]);
            });

            $colors.eq(0).prop('checked', true);
            var $rgb = hex2rgb($colors.eq(0).val());
            $('label[for="' + $colors.eq(0).attr('id') + '"]').parent('.color').css({
                'border-color': 'rgba(' + $rgb[0] + ', ' + $rgb[1] + ', ' + $rgb[2] + ', 1)'
            });
            $colors.click(function() {
                $colors.each(function() {
                    $(this).prop('checked', false);
                    var $id = $(this).attr('id');
                    var $label = $('label[for="' + $id + '"]');
                    $label.parent('.color').css({
                        'border-color': 'rgba(0,0,0,0)'
                    });
                });
                $(this).prop('checked', true);
                var $color = $(this).val();
                var $rgb = hex2rgb($color);
                var $id = $(this).attr('id');
                var $label = $('label[for="' + $id + '"]');
                $label.parent('.color').css({
                    'border-color': 'rgba(' + $rgb[0] + ', ' + $rgb[1] + ', ' + $rgb[2] + ', 1)'
                });
            });
        }
        $(window).scroll(function() {
            var scroll = $(window).scrollTop();

            //>=, not <=
            if (scroll >= 105) {
                //clearHeader, not clearheader - caps H
                $(".header .menu").addClass("fixed");
            } else {
                $(".header .menu").removeClass('fixed');
            }
        });


        var $formas = $('.mega-menu .submenu .submenu');
//        if ($formas.length > 0) {
//            $formas.masonry({
//                // options
//                itemSelector: '.dropdown-header'
//            });
//        }
        var $slider = $('.slider');
        if ($slider.length > 0) {
            $('.slider .slider-items').carouFredSel({
                responsive: true,
                items: {
                    visible: 1,
//                    height: 330
                },
                scroll: {
                    duration: 350,
                    timeoutDuration: 15000,
                    fx: 'crossfade'
                },
                pagination: '.slider-pager'
            });
        }
        var $novinki = $('.novinki');

        if ($novinki.length > 0) {
            $('.novinki .row .items').carouFredSel({
                responsive: true,
                items: {
                    visible: {min: 1, max: 4},
                    height: {min: 445, max: 490}
                },
                scroll: {
                    items: 1,
                    duration: 350
//                    timeoutDuration: 5000
                },
                auto: false,
                pagination: '.novinki-pager',
                prev: '.novinki-prev',
                next: '.novinki-next'
            });
            var resizeCallback = function() {
                var showThatManyItems = 3; // determine the number of items to be shown depending on viewport size
                $novinki.trigger('configuration', [
                    'items', {
                        visible: showThatManyItems
                    }
                ], true);
            }
        }


        // dim4n
        $('body').on('click', '.button_add_in_cart', function(event){
            var $button = $(this);
            var $id = $(this).data('id_product');
            var $color = $('input[name=color]:checked').val() || '';
            $.post( "/cart/insert/" ,
                {
                    action: 'insert',
                    id: $id,
                    color: $color,
                },
                function( data ) {
                    $('#total_count').text( data );
                }
            );
            alert( "Товар добавлен в корзину" );
            event.preventDefault();
        });

        $('body').on('click', '.button-minus', function(e){
            var $key = $(this).data('key');
            var $id = $(this).data('id_product');
            var $val = $('#input' + $key).val();
            var $color = $(this).data('color_product') || '';
            $val = parseInt($val);
            if( $val > 0 )
                $val--;
            $('#input' + $key).val( $val );
            $.post( "/cart/update/" ,
                {
                    action: 'update',
                    id: $id,
                    quantity: $val,
                    color: $color
                },
                function( data ) {
                    var result = $.parseJSON(data);
                    $('#total_count').text( result['total_count'] );
                    $('#block_summa_' + $key).html( result['summa'] + ' ₽' );
                    $('#total_sum').html( result['total_sum'] + ' ₽' );
                    

                }
            );
            e.preventDefault();
        });

        $('body').on('click', '.button-plus', function(e){
            var $key = $(this).data('key');
            var $id = $(this).data('id_product');
            var $val = $('#input' + $key).val();
            var $color = $(this).data('color_product') || '';
            $val = parseInt($val);
            $('#input' + $key).val( ++$val );
            $.post( "/cart/update/" ,
                {
                    action: 'update',
                    id: $id,
                    quantity: $val,
                    color: $color
                },
                function( data ) {
                    var result = $.parseJSON(data);
                    $('#total_count').text( result['total_count'] );
                    $('#block_summa_' + $key).html( result['summa'] + ' ₽' );
                    $('#total_sum').html( result['total_sum'] + ' ₽' );
                }
            );
            e.preventDefault();
        });

        $('body').on('click', '.true', function(e){
            var $id = $(this).data('id_product');
            var $key = $(this).data('key');
            var $tr = $(this).closest("tr");
            var $color = $(this).data('color_product') || '';
            $.post( "/cart/delete/" ,
                {
                    action: 'delete',
                    id: $id,
                    color: $color,
                },
                function( data ) {
                    var result = $.parseJSON(data);
                    if( result['result'] == '1' ) {
                        $tr.remove();
                        $('#total_count').text( result['total_count'] );
                        $('#total_sum').html( result['total_sum'] + ' ₽' );
                    }
                }
            );
            e.preventDefault();
        });

        $('body').on('click', '.false', function(e){
            var $cart_remove = $('.cart-item .remove>div');
            if ($cart_remove.length > 0) {
                if( $cart_remove.hasClass('active') )
                    $cart_remove.removeClass('active')
                //$cart_remove.toggleClass('active');
            }
            e.preventDefault();
        });

        $('.fancybox').fancybox();

    });
    $(document).ajaxComplete(function() {

    });
})(jQuery);
 