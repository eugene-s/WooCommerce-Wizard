<?php

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

/**
 * WCWizard_shortcodes class
 *
 * @class       WCWizard_shortcodes
 * @version     0.1a
 * @package     WooCommerce-Wizard/Class
 * @category    Class
 * @company     InStandart
 * @author      eugene.savchenko
 */
class WCWizard_shortcodes {

    /**
     * Init shortcodes
     */
    public static function init() {
        $shortcodes = array(
            'wcw_container' => __CLASS__ . '::accordion_container',
            'wcw_block' => __CLASS__ . '::accordion_block',
            'test_block' => __CLASS__ . '::block'
        );

        foreach ( $shortcodes as $shortcode => $function ) {
            add_shortcode( apply_filters( "{$shortcode}_shortcode_tag", $shortcode ), $function );
            console_log( apply_filters( "{$shortcode}_shortcode_tag", $shortcode ) . ' registered.' );
        }
    }

    /**
     * Packing accordion blocks to container
     *
     * @param array $atts of attributes
     * @param string $content of inside block
     *
     * @return string
     */
    public static function accordion_container( $atts, $content ) {
        $rs = "[vc_accordion]{$content}[/vc_accordion]";

        return do_shortcode( $rs );
    }

    /**
     * Create accordion block
     *
     * @param array $atts of attributes
     *
     * @return string
     */
    public static function accordion_block( $atts ) {
        $shortcode_atts = shortcode_atts( [
            'title' => 'Simple block title',
            'slug-name' => ''
        ], $atts );

        $rs  = "[vc_accordion_tab title=\"{$shortcode_atts['title']}\"]";
        $rs .= "    [porto_block name=\"{$shortcode_atts['slug-name']}\"]";
        $rs .= "[/vc_accordion_tab]";

        return do_shortcode( $rs );
    }

}
