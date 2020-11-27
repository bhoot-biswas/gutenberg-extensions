/**
 * WordPress dependencies
 */
import {__, _x} from "@wordpress/i18n";
import {PanelBody, ToggleControl} from "@wordpress/components";
import {InspectorControls} from "@wordpress/block-editor";
import {createHigherOrderComponent} from "@wordpress/compose";

const enableDisplayControlOnBlocks = ["core/paragraph", "core/image"];

/**
 * [addDisplayControlAttribute description]
 * @param {[type]} settings [description]
 * @param {[type]} name     [description]
 */
const addDisplayControlAttribute = (settings, name) => {
	// Do nothing if it's another block than our defined ones.
	if (!enableDisplayControlOnBlocks.includes(name)) {
		return settings;
	}

	return {
		...settings,
		hideOnMobile: {
			type: "boolean",
			default: false
		}
	};
};

/**
 * [withDisplayControl description]
 * @type {[type]}
 */
const withDisplayControl = createHigherOrderComponent(BlockEdit => {
	return props => {
		if (!enableDisplayControlOnBlocks.includes(props.name)) {
			return <BlockEdit {...props} />;
		}

		const {hideOnMobile} = props.attributes;

		return (
			<Fragment>
				<BlockEdit {...props} />
				<InspectorControls>
					<PanelBody title={__("Display")}>
						<ToggleControl
							label={__("Hide on mobile")}
							checked={!!hideOnMobile}
							onChange={() =>
								setAttributes({hideOnMobile: !hideOnMobile})
							}
							help={
								hideOnMobile
									? __("This block is hidden on mobile.")
									: __("Toggle to hide this block on mobile.")
							}
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	};
}, "withDisplayControl");

addFilter(
	"blocks.registerBlockType",
	"gutenberg-extensions/attribute/display",
	addDisplayControlAttribute
);
