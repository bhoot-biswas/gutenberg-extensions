<?php
/**
 * Plugin Name:     Extensions for Gutenberg
 * Plugin URI:      PLUGIN SITE HERE
 * Description:     PLUGIN DESCRIPTION HERE
 * Author:          YOUR NAME HERE
 * Author URI:      YOUR SITE HERE
 * Text Domain:     gutenberg-extensions
 * Domain Path:     /languages
 * Version:         0.1.0
 *
 * @package         Gutenberg_Extensions
 */

namespace ExpressTech;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// Define constants.
define( 'GUTENBERG_EXTENSIONS_VERSION', '0.1.0' );
define( 'GUTENBERG_EXTENSIONS_PLUGIN_DIR', untrailingslashit( plugin_dir_path( __FILE__ ) ) );
define( 'GUTENBERG_EXTENSIONS_PLUGIN_URL', untrailingslashit( plugins_url( basename( plugin_dir_path( __FILE__ ) ), basename( __FILE__ ) ) ) );
define( 'GUTENBERG_EXTENSIONS_PLUGIN_BASENAME', plugin_basename( __FILE__ ) );

// Require the main Gutenberg_Extensions class.
require_once dirname( __FILE__ ) . '/includes/class-gutenberg-extensions.php';

// Main instance of Gutenberg Extensions.
function gutenberg_extensions() {
	return Gutenberg_Extensions::instance();
}

// Start the plugin.
gutenberg_extensions();
