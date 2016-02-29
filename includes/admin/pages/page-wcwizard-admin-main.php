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
		<h2><strong>ATTENTION!</strong></h2>
		<h3><strong>Required Extra Options Names (Labels)</strong></h3>
		<h3>Input labels will be contain this names. Ex: <code>SPH/R *</code> - this can be permissible</h3>
		<ul style="margin-left: 15px">
			<li>
				<p><b>SPH/R</b>: selectbox</p>
			</li>
			<li>
				<p><b>SPH/L</b>: selectbox</p>
			</li>
			<li>
				<p><b>CYL/R</b>: selectbox</p>
			</li>
			<li>
				<p><b>CYL/L</b>: selectbox</p>
			</li>
			<li>
				<p><b>AXIS/R</b>: selectbox</p>
			</li>
			<li>
				<p><b>AXIS/L</b>: selectbox</p>
			</li>
			<li>
				<p><b>PD</b>: selectbox</p>
			</li>
			<li>
				<p><b>PD2</b>: selectbox</p>
			</li>
			<li>
				<p><b>Add PD2</b>: checkbox</p>
			</li>
			<li>
				<p><b>Clear Lens</b>: option of radiobox</p>
			</li>
			<li>
				<p><b>Photochromic lens</b>: option of radiobox</p>
			</li>
			<li>
				<p><b>Sunglasses lens</b>: option of radiobox</p>
			</li>
		</ul>
	</div>
</div>
