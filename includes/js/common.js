(function ($) {
    $(document).on('ready', function () {
        /**
         * Scroll Down on click WCWizard Scroll Down button
         */
        $('#buttonWCWizardScrollDown').on('click touchstart', function (event) {
            event.preventDefault();

            var $containerTab = $('#containerWCWizard').parents('[aria-labelledby]');

            var scrollOffset = $containerTab.parents('.woocommerce-tabs').offset().top;

            $('html, body').animate({
                scrollTop: scrollOffset
            }, 1000, function () {
                $('html, body').clearQueue();
            });

            var nameTab = $containerTab.attr('aria-labelledby');
            $('li[aria-controls="' + nameTab + '"]').trigger('click');
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
