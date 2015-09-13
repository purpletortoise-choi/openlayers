goog.provide('ol.render.Feature');


goog.require('goog.asserts');
goog.require('goog.functions');
goog.require('ol.extent');
goog.require('ol.geom.GeometryType');



/**
 * Lightweight, read-only, {@link ol.Feature} and {@link ol.geom.Geometry} like
 * structure, optimized for rendering and styling. Geometry acces through the
 * API is limited to getting the type and extent of the geometry.
 *
 * @constructor
 * @param {ol.geom.GeometryType} type Geometry type.
 * @param {Array.<number>} flatCoordinates Flat coordinates.
 * @param {Array.<number>|Array.<Array.<number>>} ends Ends or Endss.
 * @param {Object.<string, *>} properties Properties.
 */
ol.render.Feature = function(type, flatCoordinates, ends, properties) {

  /**
   * @private
   * @type {ol.Extent|undefined}
   */
  this.extent_;

  goog.asserts.assert(type === ol.geom.GeometryType.POINT ||
      type === ol.geom.GeometryType.MULTI_POINT ||
      type === ol.geom.GeometryType.LINE_STRING ||
      type === ol.geom.GeometryType.MULTI_LINE_STRING ||
      type === ol.geom.GeometryType.POLYGON,
      'Need a Point, MultiPoint, LineString, MultiLineString or Polygon type');

  /**
   * @private
   * @type {ol.geom.GeometryType}
   */
  this.type_ = type;

  /**
   * @private
   * @type {Array.<number>}
   */
  this.flatCoordinates_ = flatCoordinates;

  /**
   * @private
   * @type {Array.<number>|Array.<Array.<number>>}
   */
  this.ends_ = ends;

  /**
   * @private
   * @type {Object.<string, *>}
   */
  this.properties_ = properties;

};


/**
 * Get a feature property by its key.
 * @param {string} key Key
 * @return {*} Value for the requested key.
 * @api
 */
ol.render.Feature.prototype.get = function(key) {
  return this.properties_[key];
};


/**
 * @return {Array.<number>|Array.<Array.<number>>} Ends or endss.
 */
ol.render.Feature.prototype.getEnds = function() {
  return this.ends_;
};


/**
 * Get the extent of this feature's geometry.
 * @return {ol.Extent} Extent.
 * @api
 */
ol.render.Feature.prototype.getExtent = function() {
  if (!goog.isDef(this.extent_)) {
    this.extent_ = this.type_ === ol.geom.GeometryType.POINT ?
        ol.extent.createOrUpdateFromCoordinate(this.flatCoordinates_) :
        ol.extent.createOrUpdateFromFlatCoordinates(
            this.flatCoordinates_, 0, this.flatCoordinates_.length, 2);

  }
  return this.extent_;
};


/**
 * @return {Array.<number>} Flat coordinates.
 */
ol.render.Feature.prototype.getFlatCoordinates =
    ol.render.Feature.prototype.getOrientedFlatCoordinates = function() {
  return this.flatCoordinates_;
};


/**
 * Get the feature for working with its geometry.
 * @return {ol.render.Feature} Feature.
 * @api
 */
ol.render.Feature.prototype.getGeometry = function() {
  return this;
};


/**
 * Get the feature properties.
 * @return {Object.<string, *>} Feature properties.
 * @api
 */
ol.render.Feature.prototype.getProperties = function() {
  return this.properties_;
};


/**
 * Get the feature for working with its geometry.
 * @return {ol.render.Feature} Feature.
 */
ol.render.Feature.prototype.getSimplifiedGeometry =
    ol.render.Feature.prototype.getGeometry;


/**
 * @return {number} Stride.
 */
ol.render.Feature.prototype.getStride = goog.functions.constant(2);


/**
 * @return {undefined}
 */
ol.render.Feature.prototype.getStyleFunction = goog.nullFunction;


/**
 * Get the type of this feature's geometry.
 * @return {ol.geom.GeometryType} Geometry type.
 * @api
 */
ol.render.Feature.prototype.getType = function() {
  return this.type_;
};
