(function($) {
    'use strict';
    $(document).on('ready', function() {

        /**
         * Dependence max count between type of box
         */
        (function () {
            /**
             * @name $selectTypeBox
             *
             * @type {jQuery}
             */
            var $selectTypeBox = $('.wc-wizard-count-box-type');

            /**
             * @name $selectCountBoxRight
             *
             * @type {jQuery}
             */
            var $selectCountBoxRight = $('.wc-wizard-count-box-right');

            /**
             * @name $selectCountBoxLeft
             *
             * @type {jQuery}
             */
            var $selectCountBoxLeft = $('.wc-wizard-count-box-left');

            /**
             * @name $inputQuantity
             *
             * @type {jQuery}
             */
            var $inputQuantity = $('form.cart').find('.qty');

            /**
             * @name max_count
             *
             * @type {int}
             */
            var max_count = -1;

            /**
             * @name fixed_count
             *
             * @type {boolean}
             */
            var fixed_count = false;

            /**
             * $getSelectedOptionByElement
             *
             * @function $getSelectedOptionByElement
             *
             * @param {jQuery} _$element_
             *
             * @return {jQuery}
             */
            function $getSelectedOptionByElement(_$element_) {
                var $result = $();

                $getOptionsByElement(_$element_).each(function() {
                    var $this = $(this);

                    switch ($this[0].tagName) {

                        case 'INPUT':
                            if ($this.is(':radio:checked')) {
                                $result = $.merge($result, $this);
                            }

                            break;

                        case 'OPTION':
                            if ($this.is(':selected')) {
                                $result = $.merge($result, $this);
                            }

                            break;

                    }
                });

                return $result;
            }

            /**
             * $getSelectedOptionByElement
             *
             * @function $getSelectedOptionByElement
             *
             * @param {jQuery} _$element_
             *
             * @return {jQuery}
             */
            function $getOptionsByElement(_$element_) {
                var $result = $();

                _$element_.each(function() {
                    var $this = $(this);

                    switch ($this[0].tagName) {

                        case 'INPUT':
                            if ($this.is(':radio')) {
                                $result = $.merge($result, $this);
                            }

                            break;

                        case 'SELECT':
                            $result = $.merge($result, $this.find('option'));

                            break;

                    }
                });

                return $result;
            }

            /**
             * getInitDataFromElement
             *
             * @function getInitDataFromElement
             *
             * @param {jQuery} _$element_
             * @param {string} _data_name_
             *
             * @return {string|int}
             */
            function getInitDataFromElement(_$element_, _data_name_) {
                var attr_tm_tooltip_html;

                switch (_$element_[0].tagName) {

                    case 'INPUT':
                        if (_$element_.is(':radio')) {
                            attr_tm_tooltip_html =
                                _$element_
                                    .parents('.tmcp-field-wrap')
                                    .find('.tm-tooltip')
                                    .data('tm-tooltip-html');
                        }

                        break;

                    case 'OPTION':
                        attr_tm_tooltip_html = _$element_.data('tm-tooltip-html');

                        break;

                }

                return $(attr_tm_tooltip_html).data(_data_name_);
            }

            /**
             * Set value of zero by default
             *
             * Because option value containing not standard value (ex. '0_0'),
             * we get zero value by text, which zero
             *
             * @function setSelectedOption
             *
             * @param {jQuery} _$select_
             * @param {int|string} _value_
             */
            function setSelectedOption(_$select_, _value_) {
                if (!_value_) {
                    _value_ = '0';
                }

                var value_option = _$select_
                    .find('option')
                    .filter(function () {
                        return $(this).html() === _value_;
                    })
                    .val(); // Get value of option by text

                _$select_.val(value_option);
                changeQuantity();
            }

            /**
             * Show all options, which less that difference of _max_count_ and selected value
             *
             * @function toggleShowOptionsByMaxCount
             *
             * @param {jQuery} _$select_
             * @param {jQuery} _$select_other_
             * @param {jQuery} _max_count_
             */
            function toggleShowOptionsByMaxCount(_$select_, _$select_other_, _max_count_) {
                var max_box_other = _max_count_ - parseInt(_$select_.find('option:selected').text());

                if (parseInt(_$select_other_.find('option:selected').text()) > max_box_other && _max_count_ !== -1) {
                    setSelectedOption(_$select_other_);
                }

                if (_max_count_ > 0) {
                    _$select_other_.find('option').each(function () {
                        var $this = $(this);

                        $this.css('display', (parseInt($this.text()) > max_box_other) ? 'none' : 'block');
                    });
                } else {
                    _$select_other_.find('option').css('display', 'block');
                }
            }

            /**
             * changeQuantity
             *
             * @function changeQuantity
             */
            function changeQuantity() {
                var valueSelectBoxLeft = parseInt($selectCountBoxLeft.find('option:selected').text()),
                    valueSelectBoxRight = parseInt($selectCountBoxRight.find('option:selected').text());

                var sum = valueSelectBoxLeft + valueSelectBoxRight;

                sum = sum ? sum : 1;

                $inputQuantity.val(sum).trigger('change');
            }

            /**
             * Change other select (_$select_other_) by current select (_$select_) by selected value
             *
             * If _fixed_count_ is true, then other select will be changed value to difference between
             * selected value and max_count
             *
             * @function changeOtherCountBoxByFixCount
             *
             * @param {jQuery} _$select_
             * @param {jQuery} _$select_other_
             * @param {int} _max_count_
             * @param {boolean} _fixed_count_
             */
            function changeOtherCountBoxByFixCount(_$select_, _$select_other_, _max_count_, _fixed_count_) {
                if (_fixed_count_) {

                    var value_select = _max_count_ - parseInt(_$select_.find('option:selected').text());
                    setSelectedOption(_$select_other_, value_select);

                }
            }

            /**
             * If select box with current class found
             */
            if ($selectTypeBox.length) {

                // Hide quantity
                $inputQuantity.parents('.quantity.buttons_added').hide();

                // Transferring data with max-count from helper to data object of jQuery
                $getOptionsByElement($selectTypeBox).each(function () {
                    var $this = $(this);

                    $this.data('wcw-max-count', getInitDataFromElement($this, 'max-count'));
                    $this.data('wcw-fix-count', getInitDataFromElement($this, 'fix-count'));
                });

                $selectTypeBox.on('change', function () {

                    var $this = $(this),
                        value_max_count = $getSelectedOptionByElement($this).data('wcw-max-count'),
                        value_fix_count = $getSelectedOptionByElement($this).data('wcw-fix-count');

                    if (value_fix_count) {

                        max_count = String(value_fix_count).match(/\d+/) ? value_fix_count : -1;
                        fixed_count = true;

                        setSelectedOption($selectCountBoxRight, Math.round(max_count / 2));
                        changeOtherCountBoxByFixCount(
                            $selectCountBoxRight,
                            $selectCountBoxLeft,
                            max_count,
                            fixed_count
                        );

                    } else {

                        max_count = String(value_max_count).match(/\d+/) ? value_max_count : -1;
                        fixed_count = false;

                        setSelectedOption($selectCountBoxRight);
                        setSelectedOption($selectCountBoxLeft);

                    }

                    toggleShowOptionsByMaxCount($selectCountBoxRight, $selectCountBoxLeft, max_count);
                    toggleShowOptionsByMaxCount($selectCountBoxLeft, $selectCountBoxRight, max_count);

                    changeQuantity();
                });

                $selectCountBoxRight.on('change', function () {
                    toggleShowOptionsByMaxCount(
                        $(this),
                        $selectCountBoxLeft,
                        max_count
                    );

                    changeQuantity();

                    changeOtherCountBoxByFixCount(
                        $(this),
                        $selectCountBoxLeft,
                        max_count,
                        fixed_count
                    );
                });

                $selectCountBoxLeft.on('change', function () {
                    toggleShowOptionsByMaxCount(
                        $(this),
                        $selectCountBoxRight,
                        max_count
                    );

                    changeQuantity();

                    changeOtherCountBoxByFixCount(
                        $(this),
                        $selectCountBoxRight,
                        max_count,
                        fixed_count
                    );
                });
            }
        })();

    }); // END: $(document).on('ready', function() {
})(jQuery);