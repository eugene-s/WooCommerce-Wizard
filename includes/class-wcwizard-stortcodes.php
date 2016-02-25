<?php

/**
 * Copyright 2016  InStandart  (email: eugene.savchenko@instandart.com)
 *
 * WooCommerce Wizard is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * WooCommerce Wizard is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

/**
 * WCWizard_shortcodes class
 *
 * @class       WCWizard_shortcodes
 * @version     0.7a
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
            'wcw_container' => __CLASS__ . '::accordion_container_shortcode',
            'wcw_block' => __CLASS__ . '::accordion_block_shortcode',
            'wcw_extra_options' => __CLASS__ . '::extra_options_block_shortcode'
        );

        foreach ( $shortcodes as $shortcode => $function ) {
            add_shortcode( apply_filters( "{$shortcode}_shortcode_tag", $shortcode ), $function );
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
    public static function accordion_container_shortcode( $atts, $content ) {
        $output = "[vc_accordion]{$content}[/vc_accordion]";

        $output = do_shortcode( $output );

        return $output;
    }

    /**
     * Create accordion block
     *
     * @param array $atts of attributes
     * @param $content
     *
     * @return string
     */
    public static function accordion_block_shortcode( $atts, $content = null ) {
        $shortcode_atts = shortcode_atts( [
            'title' => 'Simple block title',
            'slug-name' => ''
        ], $atts );

        $output = '';

        $output .= "[vc_accordion_tab title=\"{$shortcode_atts['title']}\"]";
        $output .= "    [porto_block name=\"{$shortcode_atts['slug-name']}\"]";
        $output .= "[/vc_accordion_tab]";

        $output = do_shortcode( $output );

        return $output;
    }

    /**
     * Show TM Extra Product Options Block
     *
     * @param $atts
     * @param null $content
     *
     * @return string
     */
    public static function extra_options_block_shortcode( $atts, $content = null ) {
        $shortcode_atts = shortcode_atts( [
            'title' => 'TM Extra Product Options'
        ], $atts );

        $EPO_action = 'woocommerce_tm_epo';

        $output = '';

        $output .= "<div id=\"containerWCWizard\">[tc_epo_show action=\"{$EPO_action}\"]</div>";

        $output = do_shortcode( $output );

        $output = str_replace( $EPO_action, '', $output );

        return $output;
    }

}
