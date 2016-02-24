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
 * Class WCWizard_scripts
 *
 * @class       WCWizard_scripts
 * @version     0.7a
 * @package     WooCommerce-Wizard/Class
 * @category    Class
 * @company     InStandart
 * @author      eugene.savchenko
 */
class WCWizard_styles {

    /**
     * WCWizard_scripts constructor.
     */
    public function __construct() {
        wp_register_style( 'wcwizard_style', plugins_url('css/style.css', __FILE__) );

        wp_enqueue_style( 'wcwizard_style' );
    }

}

// Init instance WCWizard_scripts
return new WCWizard_styles();
