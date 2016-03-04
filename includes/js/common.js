(function ($) {
    $(document).on('ready', function () {
        /**
         * Scroll Down on click WCWizard Scroll Down button
         */
        $('#buttonWCWizardScrollDown').on('click', function (event) {
            event.preventDefault();

            var $containerTab = $('#containerWCWizard').parents('[aria-labelledby]');

            var nameTab = $containerTab.attr('aria-labelledby');

            $('li[aria-controls="' + nameTab + '"]').trigger('click');

            $('html, body').animate({
                scrollTop: $containerTab.offset().top - 100
            }, 2000);
        });

        /**
         * Reassign event on secondary woocommerce cart button
         */
        $('#buttonSingleCartClone').find(' > form.cart').on('submit', function (event) {
            event.preventDefault();

            var $this = $(this),
                $original_form = $('*:not([id="buttonSingleCartClone"]) > form.cart');

            var formElems = {};

            $this.find('[name]').each(function () {
                var $elem = $(this);

                formElems[$elem.attr('name')] = $elem.val();
            });

            $original_form.find('[name]').each(function () {
                var $elem = $(this);

                if ($elem.attr('name') in formElems) {
                    $elem.val(formElems[$elem.attr('name')]);
                }
            });

            $original_form.find('button[type="submit"]').trigger('click');
        });
    });
})(jQuery);
