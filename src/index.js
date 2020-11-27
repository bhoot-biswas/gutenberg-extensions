const enableDisplayControlOnBlocks = ["core/paragraph", "core/image"];

/**
 * [addDisplayControlAttribute description]
 * @param {[type]} settings [description]
 * @param {[type]} name     [description]
 */
function addDisplayControlAttribute(settings, name) {
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
}

addFilter(
	"blocks.registerBlockType",
	"gutenberg-extensions/attribute/display",
	addDisplayControlAttribute
);
