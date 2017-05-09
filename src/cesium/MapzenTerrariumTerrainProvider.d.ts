/**
 * A {@link TerrainProvider} that produces terrain geometry by tessellating height maps
 * retrieved from Mapzen (which are publicly hosted on S3).
 *
 * @alias MapzenTerrariumTerrainProvider
 * @constructor
 *
 * @param {Object} options Object with the following properties:
 * @param {String} options.url The base url, e.g.: https://s3.amazonaws.com/elevation-tiles-prod/terrarium/ .
 * @param {Object} [options.proxy] A proxy to use for requests. This object is expected to have a getURL function which returns the proxied URL, if needed.
 * @param {TilingScheme} [options.tilingScheme] The tiling scheme specifying how the terrain
 *                       is broken into tiles.  If this parameter is not provided, a {@link GeographicTilingScheme}
 *                       is used.
 * @param {Ellipsoid} [options.ellipsoid] The ellipsoid.  If the tilingScheme is specified,
 *                    this parameter is ignored and the tiling scheme's ellipsoid is used instead.
 *                    If neither parameter is specified, the WGS84 ellipsoid is used.
 * @param {Credit|String} [options.credit] The credit, which will is displayed on the canvas.
 *
 *
 * @example
 * var terrainProvider = new Cesium.MapzenTerrariumTerrainProvider({
 *   url : 'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/',
 * });
 * viewer.terrainProvider = terrainProvider;
 *
 *  @see TerrainProvider
 */
export declare function MapzenTerrariumTerrainProvider(options: any): void;
