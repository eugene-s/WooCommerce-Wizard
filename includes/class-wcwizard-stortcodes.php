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

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/**
 * WCWizard_shortcodes class
 *
 * @class       WCWizard_shortcodes
 * @version     0.7a
 * @package     WooCommerce-Wizard/Class
 * @category    Class
 * @author      InStandart
 */
class WCWizard_shortcodes
{

    /**
     * Init shortcodes
     *
     * @method init
     * @access public
     * @static
     */
    public static function init()
    {
        $shortcodes = array(
            'wcw_container' => __CLASS__ . '::accordion_container_shortcode',
            'wcw_block' => __CLASS__ . '::accordion_block_shortcode',
            'wcw_extra_options' => __CLASS__ . '::extra_options_block_shortcode',
            'wcw_button_title' => __CLASS__ . '::scrolldown_button_title_shortcode',
            'wcw_hide_main_btn_single_add_to_cart' => __CLASS__ . '::hide_btn_single_add_to_cart'
        );

        foreach ($shortcodes as $shortcode => $function) {
            add_shortcode(apply_filters("{$shortcode}_shortcode_tag", $shortcode), $function);
        }
    }

    /**
     * Packing accordion blocks to container
     *
     * @method accordion_container_shortcode
     * @access public
     * @static
     *
     * @param array $atts of attributes
     * @param string $content of inside block
     *
     * @return string
     */
    public static function accordion_container_shortcode($atts, $content)
    {
        $output = "[vc_accordion]{$content}[/vc_accordion]";

        $output = do_shortcode($output);

        return $output;
    }

    /**
     * Create accordion block
     *
     * @method accordion_block_shortcode
     * @access public
     * @static
     *
     * @param array $atts of attributes
     * @param $content
     *
     * @return string
     */
    public static function accordion_block_shortcode($atts, $content = null)
    {
        $shortcode_atts = shortcode_atts([
            'title' => 'Simple block title',
            'slug-name' => ''
        ], $atts);

        $output = '';

        $output .= "[vc_accordion_tab title=\"{$shortcode_atts['title']}\"]";
        $output .= "    [porto_block name=\"{$shortcode_atts['slug-name']}\"]";
        $output .= "[/vc_accordion_tab]";

        $output = do_shortcode($output);

        return $output;
    }

    /**
     * Show TM Extra Product Options Block
     *
     * @method extra_options_block_shortcode
     * @access public
     * @static
     *
     * @param $atts
     * @param null $content
     *
     * @return string
     */
    public static function extra_options_block_shortcode($atts = null, $content = null)
    {
        $EPO_action = 'woocommerce_tm_epo';

        $output = '';

        $output .= "<div id=\"containerWCWizard\">[tc_epo_show action=\"{$EPO_action}\"]</div>";

        $output = do_shortcode($output);

        $output = str_replace($EPO_action, '', $output);


        ob_start();

        echo '<div id="buttonSingleCartClone">';
        woocommerce_simple_add_to_cart();
        echo '</div>';

        $output .= preg_replace("'<button id=\"buttonWCWizardScrollDown\"[^>]*?>.*?</button>'si", ' ', ob_get_clean());

        return $output;
    }

    /**
     * Change title of button "Scroll Down"
     *
     * @method scrolldown_button_title_shortcode
     * @access public
     * @static
     *
     * @param $atts
     * @param null $content
     *
     * @return string
     */
    public static function scrolldown_button_title_shortcode($atts = null, $content = null)
    {
        $shortcode_atts = shortcode_atts([
            'title' => 'Simple block title'
        ], $atts);

        ob_start();

        {
            $btn_title = $shortcode_atts['title'];

            include('pages/page-wcwizard-button-shortcode.php');
        }

        $output = ob_get_clean();

        return $output;
    }

    /**
     * Change title of button "Scroll Down"
     *
     * @method hide_btn_single_add_to_cart
     * @access public
     * @static
     *
     * @param null $atts
     * @param null $content
     *
     * @return string
     */
    public static function hide_btn_single_add_to_cart($atts = null, $content = null)
    {
        ob_start();

        include('pages/page-wcwizard-script-hide-cart-btn.php');

        $output = ob_get_clean();

        return $output;
    }

}
