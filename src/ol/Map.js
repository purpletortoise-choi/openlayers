/**
 * @module ol/Map
 */
import {inherits} from './index.js';
import PluggableMap from './PluggableMap.js';
import PluginType from './PluginType.js';
import {defaults as defaultControls} from './control.js';
import {defaults as defaultInteractions} from './interaction.js';
import {assign} from './obj.js';
import {register, registerMultiple} from './plugins.js';
import CanvasImageLayerRenderer from './renderer/canvas/ImageLayer.js';
import CanvasMapRenderer from './renderer/canvas/Map.js';
import CanvasTileLayerRenderer from './renderer/canvas/TileLayer.js';
import CanvasVectorLayerRenderer from './renderer/canvas/VectorLayer.js';
import CanvasVectorTileLayerRenderer from './renderer/canvas/VectorTileLayer.js';
import WebGLImageLayerRenderer from './renderer/webgl/ImageLayer.js';
import WebGLMapRenderer from './renderer/webgl/Map.js';
import WebGLTileLayerRenderer from './renderer/webgl/TileLayer.js';
import WebGLVectorLayerRenderer from './renderer/webgl/VectorLayer.js';


register(PluginType.MAP_RENDERER, CanvasMapRenderer);
registerMultiple(PluginType.LAYER_RENDERER, [
  CanvasImageLayerRenderer,
  CanvasTileLayerRenderer,
  CanvasVectorLayerRenderer,
  CanvasVectorTileLayerRenderer
]);

// TODO: move these to new ol-webgl package
register(PluginType.MAP_RENDERER, WebGLMapRenderer);
registerMultiple(PluginType.LAYER_RENDERER, [
  WebGLImageLayerRenderer,
  WebGLTileLayerRenderer,
  WebGLVectorLayerRenderer
]);


/**
 * @classdesc
 * The map is the core component of OpenLayers. For a map to render, a view,
 * one or more layers, and a target container are needed:
 *
 *     import Map from 'ol/Map';
 *     import View from 'ol/View';
 *     import TileLayer from 'ol/layer/Tile';
 *     import OSM from 'ol/source/OSM';
 *
 *     var map = new Map({
 *       view: new View({
 *         center: [0, 0],
 *         zoom: 1
 *       }),
 *       layers: [
 *         new TileLayer({
 *           source: new OSM()
 *         })
 *       ],
 *       target: 'map'
 *     });
 *
 * The above snippet creates a map using a {@link module:ol/layer/Tile~Tile} to
 * display {@link module:ol/source/OSM~OSM} OSM data and render it to a DOM
 * element with the id `map`.
 *
 * The constructor places a viewport container (with CSS class name
 * `ol-viewport`) in the target element (see `getViewport()`), and then two
 * further elements within the viewport: one with CSS class name
 * `ol-overlaycontainer-stopevent` for controls and some overlays, and one with
 * CSS class name `ol-overlaycontainer` for other overlays (see the `stopEvent`
 * option of {@link module:ol/Overlay~Overlay} for the difference). The map
 * itself is placed in a further element within the viewport.
 *
 * Layers are stored as a {@link module:ol/Collection~Collection} in
 * layerGroups. A top-level group is provided by the library. This is what is
 * accessed by `getLayerGroup` and `setLayerGroup`. Layers entered in the
 * options are added to this group, and `addLayer` and `removeLayer` change the
 * layer collection in the group. `getLayers` is a convenience function for
 * `getLayerGroup().getLayers()`. Note that {@link module:ol/layer/Group~Group}
 * is a subclass of {@link module:ol/layer/Base~Base}, so layers entered in the
 * options or added with `addLayer` can be groups, which can contain further
 * groups, and so on.
 *
 * @constructor
 * @extends {module:ol/PluggableMap~PluggableMap}
 * @param {module:ol/PluggableMap~MapOptions} options Map options.
 * @fires module:ol/MapBrowserEvent~MapBrowserEvent
 * @fires module:ol/MapEvent~MapEvent
 * @fires module:ol/render/Event~Event#postcompose
 * @fires module:ol/render/Event~Event#precompose
 * @api
 */
const Map = function(options) {
  options = assign({}, options);
  if (!options.controls) {
    options.controls = defaultControls();
  }
  if (!options.interactions) {
    options.interactions = defaultInteractions();
  }

  PluggableMap.call(this, options);
};

inherits(Map, PluggableMap);

export default Map;