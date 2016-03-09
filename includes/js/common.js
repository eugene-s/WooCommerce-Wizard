(function ($) {
    $(document).on('ready', function () {
        /**
         * Scroll Down on click WCWizard Scroll Down button
         */
        $('#buttonWCWizardScrollDown').on('click touchstart', function (event) {
            event.preventDefault();

            var $containerTab = $('#containerWCWizard').parents('[aria-labelledby]');

            var nameTab = $containerTab.attr('aria-labelledby');

            $('li[aria-controls="' + nameTab + '"]').trigger('click');

            var scrollOffset = $containerTab.offset().top - 100;
            if (navigator.userAgent.match(/iPad|iPhone|iPod|Android|Windows Phone/i)) {

                function customScrollTo(to, duration) {
                    var start = 0,
                        change = to - start,
                        currentTime = 0,
                        increment = 20;

                    var animateScroll = function () {
                        currentTime += increment;
                        var val = Math.easeInOutQuad(currentTime, start, change, duration);
                        window.scrollTo(0, val);

                        if (currentTime < duration) {
                            setTimeout(animateScroll, increment);
                        }
                    };
                    animateScroll();
                }

                Math.easeInOutQuad = function (t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                };

                customScrollTo(scrollOffset, 1000);
            } else {
                $('html, body').animate({
                    scrollTop: scrollOffset
                }, 1000, function () {
                    $('html, body').clearQueue();
                });
            }
        });

        /**
         * Reassign event on secondary woocommerce cart button
         */
        $('#buttonSingleCartClone').find(' > form.cart').on('submit', function (event) {
            event.preventDefault();

            var $original_form = $('*:not([id="buttonSingleCartClone"]) > form.cart');

            $original_form.find('button[type="submit"]').trigger('click');
        });

    }); // END: $(document).on('ready', function () {
})(jQuery);
