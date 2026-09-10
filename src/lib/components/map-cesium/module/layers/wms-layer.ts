import type { LayerConfig } from "$lib/components/map-core/layer-config";
import * as Cesium from "cesium";
import type { Map } from "../map";
import { CesiumImageryLayer } from "./imagery-layer";

// Cesium vult deze parameters zelf in (in kleine letters). Staan ze ook in de url
// van de laag, dan komen ze twee keer in de request terecht - servers reageren daar
// verschillend op, GeoServer geeft een ClassCastException. Ze worden hier daarom uit
// de querystring gehaald; de waarden die we wél kunnen overnemen (layers, styles,
// format, version) geven we in kleine letters door aan Cesium.
const cesiumParameters = [
	"service", "request", "layers", "bbox", "width", "height", "crs", "srs",
	"styles", "format", "version", "transparent",
	// GetFeatureInfo, gebruikt dezelfde url:
	"query_layers", "info_format", "i", "j", "x", "y"
];

interface ParsedUrl {
	url: string;
	parameters: Record<string, string>;
}

function parseUrl(url: string): ParsedUrl {
	const separator = url.indexOf("?");
	if (separator === -1) {
		return { url, parameters: {} };
	}

	const parameters: Record<string, string> = {};
	const query = new URLSearchParams(url.substring(separator + 1));
	for (const [key, value] of query) {
		parameters[key.toLowerCase()] = value;
	}

	return { url: url.substring(0, separator), parameters };
}

export class WmsLayer extends CesiumImageryLayer {

	constructor(map: Map, config: LayerConfig) {
		super(map, config);
	}

	createLayer(dropDownStyleName?: string): void {
		const { url, parameters: urlParameters } = parseUrl(this.config.settings["url"]);
		const layers = this.config.settings["featureName"] || urlParameters["layers"];
		const styles = dropDownStyleName || this.config.settings["styles"] || urlParameters["styles"] || "";
		const format = this.config.settings["contentType"] || urlParameters["format"] || "image/png";
		const version = this.config.settings["version"] || urlParameters["version"];

		// Overige parameters uit de url (token, cql_filter, ...) blijven behouden.
		const parameters: Record<string, string | boolean> = {};
		for (const [key, value] of Object.entries(urlParameters)) {
			if (!cesiumParameters.includes(key)) {
				parameters[key] = value;
			}
		}

		if (version) {
			parameters["version"] = version;
		}
		parameters["transparent"] = true;
		parameters["format"] = format;
		parameters["styles"] = styles;

		const provider = new Cesium.WebMapServiceImageryProvider({
			url: url,
			layers: layers,
			parameters: parameters,
		});
		this.source = new Cesium.ImageryLayer(provider, {
			alpha: this.getOpacity(this.config.opacity)
		});
	}

	switchLayer(dropDownStyleName?: string): void {
		this.removeFromMap();
		this.createLayer(dropDownStyleName);
	}
}
