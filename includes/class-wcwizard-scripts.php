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
class WCWizard_scripts {

	/**
	 * WCWizard_scripts constructor.
	 */
	public function __construct() {
		add_action( 'wp_enqueue_scripts', array( $this, 'init_scripts' ) );
	}

	public function init_scripts() {
		wp_register_script( 'wcwizard_script', plugins_url( 'js/common.js', __FILE__ ), array( 'jquery' ) );
		wp_register_script( 'wcwizard_valid_script', plugins_url( 'js/validation.js', __FILE__ ) );

		wp_enqueue_script( 'wcwizard_script' );
		wp_enqueue_script( 'wcwizard_valid_script' );
	}

}

// Init instance WCWizard_scripts
return new WCWizard_scripts();
