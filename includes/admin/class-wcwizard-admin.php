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
 * Class WCWizard_admin
 *
 * @class WCWizard_admin
 * @version 0.1a
 * @package WooCommerce-Wizard/Class
 * @company InStandart
 * @author eugene.savchenko
 */
class WCWizard_admin {

    /**
     * WCWizard_admin constructor.
     */
    public function __construct() {
        $this->init_hooks();
    }

    /**
     * Hook into actions and filters
     */
    public function init_hooks() {
        add_action( 'admin_menu', array( $this, 'init_admin_menu_item' ) );
        add_action( 'admin_init', array( $this, 'register_settings' ) );
    }

    /**
     * Init admin menu item and attach page
     */
    public function init_admin_menu_item() {
        add_menu_page(
            'WooCommerce Wizard',               // Page title
            'WC Wizard',                        // Name menu item
            'manage_options',                   // Attach to
            'woocommerce-wizard-admin-page',    // Slug name of page
            array( 'WCWizard_admin', 'wcwizard_page' ),
            null,
            6
        );
    }

    /**
     * WCWizard admin menu page
     */
    public static function wcwizard_page() {
        ob_start();

        include_once( 'pages/page-wcwizard-admin-main.php' );

        $output = ob_get_clean();

        echo $output;
    }

}

return new WCWizard_admin();
