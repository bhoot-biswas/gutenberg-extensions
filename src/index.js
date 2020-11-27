/**
 * WordPress dependencies
 */
import {__, _x} from "@wordpress/i18n";
import {PanelBody, ToggleControl} from "@wordpress/components";
import {InspectorControls} from "@wordpress/block-editor";
import {createHigherOrderComponent} from "@wordpress/compose";
import {addFilter} from "@wordpress/hooks";

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
			<>
				<BlockEdit {...props} />
				<InspectorControls>
					<PanelBody title={__("Display")}>
						<ToggleControl
							label={__("Hide on mobile")}
							checked={!!hideOnMobile}
							onChange={() =>
								props.setAttributes({
									hideOnMobile: !hideOnMobile
								})
							}
							help={
								hideOnMobile
									? __("This block is hidden on mobile.")
									: __("Toggle to hide this block on mobile.")
							}
						/>
					</PanelBody>
				</InspectorControls>
			</>
		);
	};
}, "withDisplayControl");

const addDisplayExtraProps = (props, blockType, attributes) => {
	if (!enableDisplayControlOnBlocks.includes(blockType.name)) {
		return props;
	}

	return {};
};

// Filters.
addFilter(
	"blocks.registerBlockType",
	"gutenberg-extensions/attribute/display",
	addDisplayControlAttribute
);

addFilter(
	"editor.BlockEdit",
	"gutenberg-extensions/with-display-control",
	withDisplayControl
);

addFilter(
	"blocks.getSaveContent.extraProps",
	"gutenberg-extensions/get-save-content/extra-props",
	addDisplayExtraProps
);
