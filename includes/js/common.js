(function($) {
    $(document).on('ready', function() {
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
         * Change submit action
         */
        $('form.cart').on('submit', function() {
            var $form = $(this);

            var additionalFormElements = {};

            $('#containerWCWizard').find('[name]').each(function() {
                 var $this = $(this);

                additionalFormElements[$this.attr('name')] = $this.val();
            });

            for (var field in additionalFormElements) {
                if (additionalFormElements.hasOwnProperty(field)) {
                    $form.append(
                        $('<input />', {
                            'type': 'hidden',
                            'name': field,
                            'value': additionalFormElements[field]
                        })
                    );
                }
            }
        });
    });
})(jQuery);
