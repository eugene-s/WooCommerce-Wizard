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
		<h2><strong>Using</strong></h2>
		<p>For using, you need add class to</p>
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
				<p><b>Please confirm that entered...</b>(checkbox) - use css class <code>wc-wizard-step-2-option-confirm</code></p>
			</li>
			<li>
				<p><b>Type of lens</b>(radiobox) - use css class <code>wc-wizard-step-1-option-type</code></p>
				<p>This do not require, you can add one from this class to class <code>wc-wizard-step-2</code></p>
				<p>Example: <code>wc-wizard-step-2 wc-wizard-step-1-selected-clear_lens</code></p>
				<p>And classes: <code>wc-wizard-step-1-selected-clear_lens, wc-wizard-step-1-selected-photochromic_lens, wc-wizard-step-1-selected-sunglasses_lens</code></p>
				<p>Wherein, you can add step 1 with class <code>wc-wizard-step-1</code></p>
			</li>
		</ul>
		<p>Need add to steps block next classes:</p>
		<ul style="margin-left: 15px">
			<li>
				<p>Add to first step: <code>wc-wizard-step-1</code></p>
				<p>Add to second step: <code>wc-wizard-step-2</code></p>
				<p>Add to third step: <code>wc-wizard-step-3</code></p>
				<p>Add to third step: <code>wc-wizard-step-4</code></p>
			</li>
		</ul>
		<p>You can use classes for fast go to one from all steps on click.<br>
		However, this can be div-block, which contains input. And plugin will be react to changing this inputs</p>
		<ul style="margin-left: 15px">
			<li>
				<p>Go to step 2 on click: <code>wc-wizard-on-click-go-to-step-2</code></p>
				<p>Go to step 3 on click: <code>wc-wizard-on-click-go-to-step-3</code></p>
				<p>Go to step 4 on click: <code>wc-wizard-on-click-go-to-step-4</code></p>
			</li>
		</ul>
		<h3>Step 3</h3>
		<p>This step must be have class <code>wc-wizard-step-3</code> and<br>
		two radio buttons block (created in TM Extra Options).</p>
		<p>one of them, must be have class <code>wc-wizard-step-3-options</code></p>
		<p>And second - <code>wc-wizard-step-3-wrap-options</code></p>
		<ul style="margin-left: 15px">
			<li>
				Block with class <code>wc-wizard-step-3-wrap-options</code> is visible, for more details look at xls-file
			</li>
			<li>
				Block with class <code>wc-wizard-step-3-options</code> is hidden, for more details look at xls-file
			</li>
		</ul>
	</div>
</div>
