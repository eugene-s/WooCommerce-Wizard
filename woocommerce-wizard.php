<?php
/**
 * Plugin Name: WooCommerce Wizard
 * Plugin URI: http://github.com/eugene-s/WooCommerce-Wizard
 * Description: @TODO: description
 * Version: 0.5a
 * Company: InStandart
 * Author: eugene.savchenko
 * Author URI: http://instandart.com/
 *
 * @package WooCommerce-Wizard
 * @category Core
 * @company InStandart
 * @author eugene.savchenko
 */

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

function console_log( $log ) {
    if ( is_array( $log ) or is_object( $log ) ) {
        echo( "<script>console.log(\"PHP: " . json_encode( $log ) . "\");</script>" );
    } else {
        echo( "<script>console.log(\"PHP: " . $log . "\");</script>" );
    }
}

if ( ! class_exists( 'WooCommerce_Wizard' ) ):

/**
 * Main WooCommerce_Wizard class
 *
 * @class:      WooCommerce_Wizard
 * @version:    0.1a
 */
final class WooCommerce_Wizard {

    /**
     * WooCommerce Wizard version.
     *
     * @var string
     */
    public $version = '0.5a';

    /**
     * The single instance of the class.
     *
     * @var WooCommerce_Wizard
     */
    protected static $_instance = null;

    /**
     * Main WooCommerce Wizard Instance.
     *
     * Ensures only one instance of WooCommerce Wizard is loaded or can be loaded.
     *
     * @static
     * @see WCWizard()
     * @return WooCommerce_Wizard - Main instance.
     */
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    /**
     * Cloning is forbidden.
     */
    public function __clone() {
        _doing_it_wrong( __FUNCTION__, __( 'Cheatin&#8217; huh?', 'woocommerce_wizard' ), '0.5a' );
    }

    /**
     * Unserializing instances of this class is forbidden.
     */
    public function __wakeup() {
        _doing_it_wrong( __FUNCTION__, __( 'Cheatin&#8217; huh?', 'woocommerce_wizard' ), '0.5a' );
    }

    /**
     * WooCommerce_Wizard constructor.
     */
    public function __construct() {
        $this->includes();
        $this->init_hooks();

        do_action( 'woocommerce_wizard_loaded' );
    }

    /**
     * Hook into actions and filters
     */
    public function init_hooks() {
        add_action( 'init', array( 'WCWizard_shortcodes', 'init' ) );
    }

    /**
     * What type of request is this?
     * string $type ajax, frontend or admin.
     *
     * @param string $type admin, ajax or frontend
     *
     * @return bool
     */
    private function is_request( $type ) {
        switch ( $type ) {
            case 'admin' :
                return is_admin();
            case 'ajax' :
                return defined( 'DOING_AJAX' );
            case 'cron' :
                return defined( 'DOING_CRON' );
            case 'frontend' :
                return ( ! is_admin() || defined( 'DOING_AJAX' ) ) && ! defined( 'DOING_CRON' );
            default:
                return false;
        }
    }

    /**
     * Include require core files used in admin and frontend.
     */
    public function includes() {
        if ( $this->is_request( 'frontend' ) ) {
            $this->frontend_includes();
        }
    }

    /**
     * Include required frontend files.
     */
    public function frontend_includes() {
        include_once( 'includes/class-wcwizard-stortcodes.php' );
    }

}

endif;

/**
 * Main instance of WooCommerce Wizard
 *
 * Return the main instance of WCWizard to prevent the need to use globals
 *
 * @return WooCommerce_Wizard
 */
function WCWizard() {
    return WooCommerce_Wizard::instance();
}

// Global for backwards compatibility
$GLOBALS['woocommerce_wizard'] = WCWizard();
