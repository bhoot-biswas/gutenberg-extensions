<?php
/**
 * Gutenberg_Extensions setup
 *
 * @package Gutenberg_Extensions
 */

namespace ExpressTech;

defined( 'ABSPATH' ) || exit;

/**
 * Main Gutenberg_Extensions Class.
 */
final class Gutenberg_Extensions {

	/**
	 * The single instance of the class.
	 *
	 * @var Gutenberg_Extensions
	 */
	protected static $_instance = null; // phpcs:ignore PSR2.Classes.PropertyDeclaration.Underscore

	/**
	 * Main Gutenberg_Extensions Instance.
	 * Ensures only one instance of Gutenberg_Extensions is loaded or can be loaded.
	 *
	 * @return Gutenberg_Extensions - Main instance.
	 */
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	/**
	 * Gutenberg_Extensions Constructor.
	 */
	public function __construct() {
		$this->includes();
		$this->init();
	}

	/**
	 * Include required core files used in admin and on the frontend.
	 * e.g. include_once GUTENBERG_EXTENSIONS_PLUGIN_DIR . 'includes/foo.php';
	 */
	private function includes() {
		include_once GUTENBERG_EXTENSIONS_PLUGIN_DIR . '/includes/util.php';
	}

	/**
	 * Init hooks.
	 * @return [type] [description]
	 */
	private  function init() {
		add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_block_editor_assets' ] );
		add_action( 'enqueue_block_assets', [ $this, 'enqueue_block_assets' ] );
	}

	/**
	 * Enqueue block editor assets.
	 * @return [type] [description]
	 */
	public function enqueue_block_editor_assets() {
		$asset_file = include( GUTENBERG_EXTENSIONS_PLUGIN_DIR . '/build/index.asset.php' );

		wp_enqueue_script(
			'gutenberg-extensions',
			GUTENBERG_EXTENSIONS_PLUGIN_URL . '/build/index.js',
			$asset_file['dependencies'],
			$asset_file['version']
		);
	}

	/**
	 * Enqueue block assets.
	 * @return [type] [description]
	 */
	public function enqueue_block_assets() {
		$asset_file = include( GUTENBERG_EXTENSIONS_PLUGIN_DIR . '/build/index.asset.php' );

		wp_enqueue_style(
			'gutenberg-extensions',
			GUTENBERG_EXTENSIONS_PLUGIN_URL . '/build/index.css',
			[],
			$asset_file['version']
		);
	}
}
