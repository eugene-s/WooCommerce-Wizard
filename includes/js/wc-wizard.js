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

            ApplySelectedTypeForStep4(selected_type_lens_option);
        }

        /**
         * Apply selected type of lens.
         *
         * Hiding/showing needed options in Step4
         *
         * @function ApplySelectedTypeForStep4
         *
         * @param _type_
         */
        function ApplySelectedTypeForStep4(_type_) {

            var selectors = {
                '1': '.wc-wizard-step-4-options-by-type-clear_lens-div',
                '2': '.wc-wizard-step-4-options-by-type-photochromic_lens-div',
                '3': '.wc-wizard-step-4-options-by-type-sunglasses_lens-div'
            };

            for (var selector_index in selectors) {
                if (selectors.hasOwnProperty(selector_index)) {
                    $(selectors[selector_index]).hide();
                }
            }

            $(selectors[_type_]).show();

        }

        /**
         * Validating Step 2
         *
         * @function Validation Step 2
         */
        function validateStep2() {
            var $checkboxConfirmStep2 = $('.wc-wizard-step-2-option-confirm');
            if ($checkboxConfirmStep2.length && !$checkboxConfirmStep2.is(':checked')) {
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
            } else {
                ApplySelectedTypeForStep4(data_to_validate.type);
            }

            var not_use_validation = true;
            for (var item in data_to_validate) {
                if (data_to_validate.hasOwnProperty(item)) {

                    not_use_validation = !data_to_validate[item] && not_use_validation;

                }
            }

            if (not_use_validation) {
                return true;
            }

            var validation_result = ValidationStep2(data_to_validate).valid(); // Run validation

            var validation_data = validation_result.data;

            // Hide all options in Step 3
            $('.wc-wizard-step-3-wrap-options').parents('li.tmcp-field-wrap').hide();
            $('.wc-wizard-step-3-wrap-option').each(function () {
                var $this = $(this);

                for (var item in validation_data) {
                    if ($this.data('index') == item &&
                        validation_data.hasOwnProperty(item)) {
                        // Show only validated options
                        $this.parents('li.tmcp-field-wrap').show();

                        // Translate price from hidden options
                        var $hidden_option_step_3 = $(
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
        $('.wc-wizard-on-click-go-to-step-2:not(input)').on('click touchstart', function () {
            if ($(this).find('input').is(':checked')) {
                $('.wc-wizard-step-2').find('.tm-toggle').trigger('openwrap.tmtoggle');
            } else {
                $('.wc-wizard-step-2').find('.tm-toggle').trigger('openwrap.tmtoggle');
            }
        });
        $('input.wc-wizard-on-click-go-to-step-2').on('change', function () {
            if ($(this).is(':checked')) {
                $('.wc-wizard-step-2').find('.tm-toggle').trigger('openwrap.tmtoggle');
            }
        });

        /**
         * CSS Class '.wc-wizard-on-click-go-to-step-3' create event on click
         */
        $('.wc-wizard-on-click-go-to-step-3:not(input)').on('click touchstart', function () {
            if ($(this).find('input').is(':checked')) {
                $('.wc-wizard-step-3').find('.tm-toggle').trigger('openwrap.tmtoggle');
            } else {
                $('.wc-wizard-step-3').find('.tm-toggle').trigger('openwrap.tmtoggle');
            }
        });
        $('input.wc-wizard-on-click-go-to-step-3').on('change', function () {
            if ($(this).is(':checked')) {
                $('.wc-wizard-step-3').find('.tm-toggle').trigger('openwrap.tmtoggle');
            }
        });

        /**
         * CSS Class '.wc-wizard-on-click-go-to-step-4' create event on click
         */
        $('.wc-wizard-on-click-go-to-step-4:not(input)').on('click touchstart', function () {
            if ($(this).find('input').is(':checked')) {
                $('.wc-wizard-step-4').find('.tm-toggle').trigger('openwrap.tmtoggle');
            } else {
                $('.wc-wizard-step-4').find('.tm-toggle').trigger('openwrap.tmtoggle');
            }
        });
        $('input.wc-wizard-on-click-go-to-step-4').on('change touchstart', function () {
            if ($(this).is(':checked')) {
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
         * Choose needed hidden option by wrapper on click
         *
         * Get this option from $(<this input>).data('relashionship')
         *
         * data 'relashionship' sets in function 'validateStep2'
         */
        $('input[type="radio"].wc-wizard-step-3-wrap-options').on('change', function () {
            var $this = $(this);

            var relashionship =
                $this.parents('.tmcp-field-wrap').find('.wc-wizard-step-3-wrap-option').data('relashionship');

            $('.wc-wizard-step-3-options').prop('checked', false);

            relashionship
                .parents('.tmcp-field-wrap')
                .find('input')
                .prop('checked', true).trigger('change');
        });

        /**
         * Click on submit secondary button 'single add to cart'
         */
        $('*:not([id="buttonSingleCartClone"]) > form.cart button[type="submit"].single_add_to_cart_button')
            .on('click touchstart', function () {
                var $form = $(this).parents('form.cart'),
                    $items = $('#containerWCWizard').find('[name]');

                var additionalFormElements = {};

                $items.each(function () {
                    var $this = $(this);

                    switch ($this.attr('type')) {
                        case 'checkbox':
                            additionalFormElements[$this.attr('name')] = $this.prop('checked');

                            break;

                        case 'radio':
                            additionalFormElements[$this.attr('name')] = {
                                'value': $this.val(),
                                'value_checked': $this.prop('checked')
                            };

                            break;

                        default:
                            additionalFormElements[$this.attr('name')] = $this.val();

                            break;
                    }
                });

                for (var field in additionalFormElements) {
                    if (additionalFormElements.hasOwnProperty(field)) {
                        if (additionalFormElements[field] !== 'object') {

                            $form.append(
                                $('<input />', {
                                    'type': 'hidden',
                                    'name': field,
                                    'value': additionalFormElements[field]
                                })
                            );

                        } else {

                            $form.append(
                                $('<input />', {
                                    'type': 'hidden',
                                    'name': field,
                                    'value': additionalFormElements[field]['value'],
                                    'checked': additionalFormElements[field]['value_checked']
                                })
                            );

                        }
                    }
                }

                return validateStep2();
            });

    });

})(jQuery);