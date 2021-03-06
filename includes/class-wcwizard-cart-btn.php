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
 * Class WCWizard_cart_btn
 *
 * @class       WCWizard_cart_btn
 * @version     0.7a
 * @package     WooCommerce-Wizard/Class
 * @category    Class
 * @author      InStandart
 */
class WCWizard_cart_btn {

	/**
	 * Init WCWizard_cart_btn
	 */
	public static function init() {
		include( 'pages/page-wcwizard-cart-btn.php' );
	}

}
