<div class="wrap">
	<button id="buttonWCWizardScrollDown" class="wcwizard-button"
	        type="button"><?php _e( 'CHOOSE THE PRESCRIPTION', 'wcwizard' ) ?></button>
</div>
<?php
echo do_shortcode(
    array_shift(
        array_shift(
            TM_Extra_Product_Options::instance()->get_product_tm_epos(get_the_ID())['global']
        )
    )['description']
)
?>