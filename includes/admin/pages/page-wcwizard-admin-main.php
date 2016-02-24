<div dir="ltr" class="wrap">
    <h2><strong>How to use WooCommerce Wizard Plugin:</strong></h2>
    <ul>
        <li>For creating WCWizard accordion block, you must do the following:
            <ol style="margin-left: 2em;">
                <li><p>Create main block <strong>[wcw_container]</strong></p></li>
                <li><p>Insert to <strong>[wcw_container]</strong> content the block <strong>[wcw_block]</strong> and add to attributes: <strong>title</strong> and <strong>slug-name</strong></p></li>
            </ol>
        </li>
    </ul>
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
        <h3>ATTENTION! Require placement in shortcode <code>[wcw_container]</code></h3>
        <h3>Example:</h3>
        <pre>
        [wcw_container]
            [wcw_extra_options]
        [/wcw_container]
        </pre>
    </div>
</div>
