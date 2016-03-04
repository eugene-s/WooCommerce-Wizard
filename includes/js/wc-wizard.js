/**
 * Run validation, manipulation of steps
 */
(function ($) {

    /**
     * On ready of HTML document
     */
    $(document).on('ready', function () {

        var selected_type_lens_option = '';

        if (!$('wc-wizard-step-1').length) {
            var $step2 = $('.wc-wizard-step-2');

            switch (true) {

                case $step2.is('.wc-wizard-step-1-selected-clear_lens'):
                    selected_type_lens_option = '1';

                    break;

                case $step2.is('.wc-wizard-step-1-selected-photochromic_lens'):
                    selected_type_lens_option = '2';

                    break;

                case $step2.is('.wc-wizard-step-1-selected-sunglasses_lens'):
                    selected_type_lens_option = '3';

                    break;

            }
        }

        /**
         * Validation Step 2
         */
        function validateStep2() {
            if (!$('.wc-wizard-step-2-option-confirm').is(':checked')) {
                return {
                    'success': false,
                    'text': 'You do not confirm the recipe! You can find it in Step 2'
                };
            }

            var data_to_validate = {
                // Collect all needed data for validation
                'sph_left': parseFloat($('.wc-wizard-step-2-option-sph-left option:selected').text()),
                'sph_right': parseFloat($('.wc-wizard-step-2-option-sph-right option:selected').text()),
                'cyl_left': parseFloat($('.wc-wizard-step-2-option-cyl-left option:selected').text()),
                'cyl_right': parseFloat($('.wc-wizard-step-2-option-cyl-right option:selected').text()),
                'axis_left': parseFloat($('.wc-wizard-step-2-option-axis-left option:selected').text()),
                'axis_right': parseFloat($('.wc-wizard-step-2-option-axis-right option:selected').text()),
                'pd': parseFloat($('.wc-wizard-step-2-option-pd-div option:selected').text()),
                'pd2': parseFloat($('.wc-wizard-step-2-option-pd2 option:selected').text()),
                'new_pd': $('.wc-wizard-step-2-option-pd2-check').is(':checked'),
                'type': $('.wc-wizard-step-1-option-type')
                    .find('input[type="radio"]:checked')
                    .parents('.tmcp-field-wrap')
                    .find('.wc-wizard-step-1-option-value')
                    .data('type')
            };

            if (selected_type_lens_option) {
                data_to_validate.type = selected_type_lens_option;
            }

            var validation_result = ValidationStep2(data_to_validate).valid(); // Run validation

            var validation_data = validation_result.data;

            // Hide all options in Step 3
            $('.wc-wizard-step-3-wrap-options-div li.tmcp-field-wrap').hide();
            $('.wc-wizard-step-3-wrap-options-div .tm-label .wc-wizard-step-3-wrap-option').each(function () {
                var $this = $(this);

                for (var item in validation_data) {
                    if ($this.data('index') == item &&
                        validation_data.hasOwnProperty(item)) {
                        // Show only validated options
                        $this.parents('li.tmcp-field-wrap').show();

                        // Translate price from hidden options
                        var $hidden_option_step_3 = $('.wc-wizard-step-3-options-div')
                            .find(
                                '.wc-wizard-step-2-option-hidden-value' +
                                '[data-index="' + item + '"]' +
                                '[data-cyl="' + validation_data[item] + '"]' +
                                '[data-type="' + data_to_validate.type + '"]'
                            );
                        var price = $hidden_option_step_3.parents('.tmcp-field-wrap').find('span.price').text();

                        var $parent = $this.parent(),
                            $span_price = $parent.find('span.price');

                        if (!$span_price.length) {
                            $parent
                                .append(
                                    $('<br />')
                                )
                                .append(
                                    $('<span />', {
                                        'class': 'price wc-wizard-options-price',
                                        'html': price
                                    })
                                );
                        } else {
                            $parent.find('span.price').html(price);
                        }

                        $this.data('relashionship', $hidden_option_step_3);
                    }
                }
            });

            return validation_result;
        }

        /**
         * CSS Class '.wc-wizard-on-click-go-to-step-2' create event on click
         */
        $('.wc-wizard-on-click-go-to-step-2').on('click', function () {
            if ($(this).find('input').is(':checked')) {
                $('.wc-wizard-step-2').find('.tm-toggle').trigger('openwrap.tmtoggle');
            } else {
                $('.wc-wizard-step-2').find('.tm-toggle').trigger('openwrap.tmtoggle');
            }
        });

        /**
         * CSS Class '.wc-wizard-on-click-go-to-step-3' create event on click
         */
        $('.wc-wizard-on-click-go-to-step-3').on('click', function () {
            if ($(this).find('input').is(':checked')) {
                $('.wc-wizard-step-3').find('.tm-toggle').trigger('openwrap.tmtoggle');
            } else {
                $('.wc-wizard-step-3').find('.tm-toggle').trigger('openwrap.tmtoggle');
            }
        });

        /**
         * CSS Class '.wc-wizard-on-click-go-to-step-4' create event on click
         */
        $('.wc-wizard-on-click-go-to-step-4').on('click', function () {
            if ($(this).find('input').is(':checked')) {
                $('.wc-wizard-step-4').find('.tm-toggle').trigger('openwrap.tmtoggle');
            } else {
                $('.wc-wizard-step-4').find('.tm-toggle').trigger('openwrap.tmtoggle');
            }
        });

        /**
         * On click for open step 3, do validation. If not valid, prevent the open
         */
        $('.wc-wizard-step-3').find('.tm-toggle').on('openwrap.tmtoggle', function (event) {
            var validation_result = validateStep2();

            if (!validation_result.success) {
                event.preventDefault();
                $('.wc-wizard-step-3').find('.tm-toggle').trigger('closewrap.tmtoggle');

                alert(validation_result.text);
            }

            return validation_result.success;
        });

        /**
         *
         */
        $('.wc-wizard-step-3-wrap-options-div input[type="radio"]').on('click', function () {
            var $this = $(this);

            var relashionship =
                $this.parents('.tmcp-field-wrap').find('.wc-wizard-step-3-wrap-option').data('relashionship');

            relashionship.parents('.tmcp-field-wrap').find('input').trigger('click');
        });

        /**
         * Change click on submit button action
         */
        $('*:not([id="buttonSingleCartClone"]) > form.cart button[type="submit"]').on('click', function () {
            if (!$('.wc-wizard-step-2').length) {
                return;
            }

            var $form = $(this).parents('form.cart'),
                $items = $('#containerWCWizard').find('[name]');

            var additionalFormElements = {};

            $items.each(function () {
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

            return validateStep2();
        });

    });

})(jQuery);