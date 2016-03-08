<div dir="ltr" class="wrap">
    <div>
        <h2><strong>How to use WooCommerce Wizard Plugin:</strong></h2>
        <ul>
            <li>For creating WCWizard accordion block, you must do the following:
                <ol style="margin-left: 2em;">
                    <li><p>Create main block <strong>[wcw_container]</strong></p></li>
                    <li><p>Insert to <strong>[wcw_container]</strong> content the block <strong>[wcw_block]</strong> and
                            add to attributes: <strong>title</strong> and <strong>slug-name</strong></p></li>
                </ol>
            </li>
        </ul>
    </div>
    <div>
        <h3>Example:</h3>
        <pre>
        [wcw_container]
            [wcw_block title="Simple of title" slug-name="slug name of created block in <strong>Blocks</strong>"]
        [/wcw_container]
        </pre>
    </div>
    <div>
        <h2><strong>For show TM Extra Product Options on page</strong></h2>
        <p>You need use new shortcode: <code>[wcw_extra_options]</code></p>
        <h3>Example:</h3>
        <pre>
        [wcw_extra_options]
        </pre>
    </div>
    <div>
        <h2>Shortcode for rename button "DownScroll"</h2>
        <pre>
            [wcw_button_title title="Simple Title"]
        </pre>
    </div>
    <div>
        <h2>Shortcode for hide "single add to cart button"</h2>
        <pre>
            [wcw_hide_main_btn_single_add_to_cart]
        </pre>
    </div>
    <div>
        <h2><strong>Using</strong></h2>
        <div>
            <h3>For using, you need add class to</h3>
            <ul style="margin-left: 15px">
                <li>
                    <p><b>SPH/R</b>(selectbox) - use css class <code>wc-wizard-step-2-option-sph-right</code></p>
                </li>
                <li>
                    <p><b>SPH/L</b>(selectbox) - use css class <code>wc-wizard-step-2-option-sph-left</code></p>
                </li>
                <li>
                    <p><b>CYL/R</b>(selectbox) - use css class <code>wc-wizard-step-2-option-cyl-right</code></p>
                </li>
                <li>
                    <p><b>CYL/L</b>(selectbox) - use css class <code>wc-wizard-step-2-option-cyl-left</code></p>
                </li>
                <li>
                    <p><b>AXIS/R</b>(selectbox) - use css class <code>wc-wizard-step-2-option-axis-right</code></p>
                </li>
                <li>
                    <p><b>AXIS/L</b>(selectbox) - use css class <code>wc-wizard-step-2-option-axis-left</code></p>
                </li>
                <li>
                    <p><b>PD</b>(selectbox) - use css class <code>wc-wizard-step-2-option-pd-div</code></p>
                </li>
                <li>
                    <p><b>PD2</b>(selectbox) - use css class <code>wc-wizard-step-2-option-pd2</code></p>
                </li>
                <li>
                    <p><b>Add PD2</b>(checkbox) - use css class <code>wc-wizard-step-2-option-pd2-check</code></p>
                </li>
                <li>
                    <p><b>Please confirm that entered...</b>(checkbox) - use css class <code>wc-wizard-step-2-option-confirm</code>
                    </p>
                </li>
                <li>
                    <p><b>Type of lens</b>(radiobox) - use css class <code>wc-wizard-step-1-option-type</code></p>
                    <p>This do not require, you can add one from this class to class <code>wc-wizard-step-2</code></p>
                    <p>Example: <code>wc-wizard-step-2 wc-wizard-step-1-selected-clear_lens</code></p>
                    <p>And classes: <code>wc-wizard-step-1-selected-clear_lens,
                            wc-wizard-step-1-selected-photochromic_lens,
                            wc-wizard-step-1-selected-sunglasses_lens</code></p>
                    <p>Wherein, you can add step 1 with class <code>wc-wizard-step-1</code></p>
                </li>
            </ul>
        </div>
        <div>
            <h2>On each options need add text (it will be hidden)</h2>
            <ul style="margin-left: 15px">
                <li>
                    <h3>Step 1 - Types: </h3>
                    <ul style="margin-left: 15px">
                        <li>
                            Add to "Clear Lens" <code>&lt;span class="wc-wizard-step-1-option-value" data-type="1"&gt;&lt;/span&gt;</code>
                        </li>
                        <li>
                            Add to "Photochromic lens" <code>&lt;span class="wc-wizard-step-1-option-value"
                                data-type="2"&gt;&lt;/span&gt;</code>
                        </li>
                        <li>
                            Add to "Sunglasses lens" <code>&lt;span class="wc-wizard-step-1-option-value" data-type="3"&gt;&lt;/span&gt;</code>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div>
            <h2>For showing individual options by current type, you need add next classes</h2>
            <ul style="margin-left: 15px">
                <li>
                    If selected "Clear Lens" type, will be show elements with class <code>wc-wizard-step-4-options-by-type-clear_lens</code>
                </li>
                <li>
                    If selected "Photochromic lens" type, will be show elements with class <code>wc-wizard-step-4-options-by-type-photochromic_lens</code>
                </li>
                <li>
                    If selected "Sunglasses lens" type, will be show elements with class <code>wc-wizard-step-4-options-by-type-sunglasses_lens</code>
                </li>
            </ul>
        </div>
        <div>
            <h2>Need add to steps block next classes:</h2>
            <ul style="margin-left: 15px">
                <li>
                    <p>Add to first step: <code>wc-wizard-step-1</code></p>
                    <p>Add to second step: <code>wc-wizard-step-2</code></p>
                    <p>Add to third step: <code>wc-wizard-step-3</code></p>
                    <p>Add to third step: <code>wc-wizard-step-4</code></p>
                </li>
            </ul>
        </div>
        <div>
            <h3>You can use classes for fast go to one from all steps on click.<br>
                However, this can be div-block, which contains input. And plugin will be react to changing this inputs
            </h3>
            <ul style="margin-left: 15px">
                <li>
                    <p>Go to step 2 on click: <code>wc-wizard-on-click-go-to-step-2</code></p>
                    <p>Go to step 3 on click: <code>wc-wizard-on-click-go-to-step-3</code></p>
                    <p>Go to step 4 on click: <code>wc-wizard-on-click-go-to-step-4</code></p>
                </li>
            </ul>
        </div>
        <div>
            <h2>Step 3</h2>
            <p>This step must be have class <code>wc-wizard-step-3</code> and<br>
                two radio buttons block (created in TM Extra Options).</p>
            <p>one of them, must be have class <code>wc-wizard-step-3-options</code></p>
            <p>And second - <code>wc-wizard-step-3-wrap-options</code></p>
            <ul style="margin-left: 15px">
                <li>
                    Block with class <code>wc-wizard-step-3-wrap-options</code> is visible, for more details look at
                    xls-file
                </li>
                <li>
                    Block with class <code>wc-wizard-step-3-options</code> is hidden, for more details look at xls-file
                </li>
            </ul>
        </div>
        <div>
            <h2>Validation Lens Boxes</h2>
            <ul style="margin-left: 15px">
                <li>
                    <p>
                        Need add class <code>wc-wizard-count-box-type</code> to selectbox which contains types<br>
                        Need add description <code>&lt;span class="wc-wizard-box-hidden-options" data-max-count="infinite"&gt;&lt;/span&gt;</code> to options of this selectbox<br>
                        Where 'infinite' is max count of boxes and can be integer number.<br>
                        If 'infinite', then max count can be infinite, also
                    </p>
                </li>
                <li>
                    Need add to right boxes (selectbox) the class <code>wc-wizard-count-box-right</code>
                </li>
                <li>
                    Need add to left boxes (selectbox) the class <code>wc-wizard-count-box-left</code>
                </li>
            </ul>
            <p>If you do not add class <code>wc-wizard-count-box-type</code>, the validation will not work</p>
        </div>
    </div>
</div>
