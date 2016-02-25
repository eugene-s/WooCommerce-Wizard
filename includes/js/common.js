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
        $('form.cart').on('submit', function(event) {
            var $form = $(this),
                $items = $('#containerWCWizard').find('[name]');

            var additionalFormElements = {};

            $items.each(function() {
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

            var $rs = validationStep2($items);

            if (!$rs['success']) {
                event.preventDefault();
                alert($rs['text']);
            }
        });

        /**
         * Validation
         */
        function validationStep2 ($items) {
            var items = [];

            $items.each(function() {
                var $this = $(this);

                var item = {
                    'label': '',
                    'value': ''
                };

                switch ($this.attr('type')) {

                    case 'checkbox':

                        item.label = $this.parents('.tm-extra-product-options-container').siblings('.tm-epo-field-label').text();
                        item.value = $this.prop('checked');

                        break;

                    case 'radio':

                        item.label = $this.val();
                        item.value = $this.prop('checked');

                        break;

                    default:

                        if ($this.is('select')) {
                            item.label = $this.parents('.tm-extra-product-options-container').siblings('.tm-epo-field-label').text();
                            item.value = parseInt($this.text());
                        }

                        break;

                }

                items.push(item);
            });

            var data = {
                'sph_left': '',
                'sph_right': '',
                'cyl_right': '',
                'cyl_left': '',
                'axis_right': '',
                'axis_left': '',
                'pd': '',
                'pd2': '',
                'new_pd': '',
                'type': ''
            };

            for (var item in items) {
                if (items.hasOwnProperty(item) && items[item].label) {

                    var label = items[item].label;

                    if ( label.match(/SPH\/R/i) ) {
                        data['sph_right'] = items[item].value;
                    } else
                    if ( label.match(/SPH\/L/i) ) {
                        data['sph_left'] = items[item].value;
                    } else
                    if ( label.match(/CYL\/R/i) ) {
                        data['cyl_right'] = items[item].value;
                    } else
                    if ( label.match(/CYL\/L/i) ) {
                        data['cyl_left'] = items[item].value;
                    } else
                    if ( label.match(/AXIS\/R/i) ) {
                        data['axis_right'] = items[item].value;
                    } else
                    if ( label.match(/AXIS\/L/i) ) {
                        data['axis_left'] = items[item].value;
                    } else
                    if ( label.match(/PD/i) ) {
                        data['pd'] = items[item].value;
                    } else
                    if ( label.match(/PD2/i) ) {
                        data['pd2'] = items[item].value;
                    } else
                    if ( label.match(/Add PD2/i) ) {
                        data['new_pd'] = items[item].value;
                    } else
                    if ( label.match(/Clear Lens_0/i) ) {
                        if (items[item].value) {
                            data['type'] = 1;
                        }
                    } else
                    if ( label.match(/Photochromic lens_1/i) ) {
                        if (items[item].value) {
                            data['type'] = 2;
                        }
                    } else
                    if ( label.match(/Sunglasses lens_2/i) ) {
                        if (items[item].value) {
                            data['type'] = 3;
                        }
                    }

                }
            }

            return ValidationStep2(data).valid();
        }
    });
})(jQuery);
