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

        /**
         * Dependence max count between type of box
         */
        (function () {
            var $selectTypeBox = $('.wc-wizard-count-box-type'),
                $selectCountBoxRight = $('.wc-wizard-count-box-right'),
                $selectCountBoxLeft = $('.wc-wizard-count-box-left'),
                $inputQuantity = $('form.cart').find('.qty'),
                max_count = -1;

            /**
             * Set value of zero
             *
             * Because option value containing not standard value (ex. '0_0'),
             * we get zero value by text, which zero
             *
             * @param _$select_
             */
            function resetSelectedOption(_$select_) {
                var zero_value = _$select_
                    .find('option')
                    .filter(function () {
                        return $(this).html() == '0'
                    })
                    .val(); // Get value of option by text

                _$select_.val(zero_value);
                changeQuantity();
            }

            /**
             * Show all options, which less that difference of _max_count_ and selected value
             *
             * @param _$select_
             * @param _$select_other_
             * @param _max_count_
             */
            function toggleShowOptionsByMaxCount(_$select_, _$select_other_, _max_count_) {
                var max_box_other = _max_count_ - _$select_.find('option:selected').text();

                if (parseInt(_$select_other_.find('option:selected').text()) > max_box_other) {
                    resetSelectedOption(_$select_other_);
                }

                if (_max_count_ > 0) {
                    _$select_other_.find('option').each(function () {
                        var $this = $(this);

                        $this.css('display', (parseInt($this.text()) > max_box_other) ? 'none' : 'block');
                    });
                } else {
                    _$select_.find('option').css('display', 'block');
                }
            }

            function changeQuantity() {
                var valueSelectBoxLeft = parseInt($selectCountBoxLeft.find('option:selected').text()),
                    valueSelectBoxRight = parseInt($selectCountBoxRight.find('option:selected').text());

                $inputQuantity.val(valueSelectBoxLeft + valueSelectBoxRight);
            }

            /**
             * If select box with current class found
             */
            if ($selectTypeBox.length) {

                // Hide quantity
                $inputQuantity.parents('.quantity.buttons_added').hide();

                // Transferring data with max-count from helper to data object of jQuery
                $selectTypeBox.find('option').each(function () {
                    var $this = $(this),
                        attr_tm_tooltip_html = $this.data('tm-tooltip-html');

                    $this.data('wcw-max-count', $(attr_tm_tooltip_html).data('max-count'));
                });

                $selectTypeBox.on('change', function () {

                    var $this = $(this),
                        value = $this.find('option:selected').data('wcw-max-count');

                    max_count = String(value).match(/\d+/) ? $this.find('option:selected').data('wcw-max-count') : -1;

                    resetSelectedOption($selectCountBoxRight);
                    resetSelectedOption($selectCountBoxLeft);

                    toggleShowOptionsByMaxCount($selectCountBoxRight, $selectCountBoxLeft, max_count);
                    toggleShowOptionsByMaxCount($selectCountBoxLeft, $selectCountBoxRight, max_count);

                    $inputQuantity.val('1').trigger('change');

                });

                $selectCountBoxRight.on('change', function () {
                    toggleShowOptionsByMaxCount(
                        $(this),
                        $selectCountBoxLeft,
                        max_count
                    );
                    changeQuantity();
                });

                $selectCountBoxLeft.on('change', function () {
                    toggleShowOptionsByMaxCount(
                        $(this),
                        $selectCountBoxRight,
                        max_count
                    );
                    changeQuantity();
                });
            }
        })();
    });
    //wc-wizard-count-box-right,wc-wizard-count-box-left,wc-wizard-count-box-type
})(jQuery);
