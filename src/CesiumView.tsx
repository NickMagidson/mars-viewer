import * as Cesium from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import { useEffect, useRef } from "react";

interface CesiumViewerProps {
  roverLocation: any;
}

const CesiumViewer = ({ roverLocation }: CesiumViewerProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewerRef = useRef<Cesium.Viewer | null>(null);

  useEffect(() => {
    const initMarsViewer = async () => {
      const container = containerRef.current;
      if (!container) return;

      // Set your Cesium Ion access token
      Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzYWUzNzU4NC1iODhmLTRkNTAtOTA4Ni03M2RhNjQzMWU4YTUiLCJpZCI6MjQ3MDA3LCJpYXQiOjE3NjA3MzQ0NTV9.oMBm05CPCqpeAR-n7XTG7S7ErypoRA0aVA8Eiv4JWfE'

      // Set Mars as the default ellipsoid
      Cesium.Ellipsoid.default = Cesium.Ellipsoid.MARS;

      // Create the viewer with Mars settings
      const viewer = new Cesium.Viewer(container, {
        globe: false, // disable Earth globe
        sceneModePicker: false, // 3D only
        baseLayerPicker: false, // no Earth imagery
        geocoder: false, // no Earth search
        homeButton: true,
        timeline: false,
        animation: false,
        navigationHelpButton: false,
        fullscreenButton: false,
        skyBox: Cesium.SkyBox.createEarthSkyBox(),
        // skyAtmosphere: new Cesium.SkyAtmosphere(Cesium.Ellipsoid.MARS),
      });

      viewerRef.current = viewer;

      try {
        // Load Mars 3D Tileset (from Cesium Ion)
        const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(3644333);
        viewer.scene.primitives.add(tileset);


        // Perseverance Rover Location
        const perseveranceLocation = await Cesium.GeoJsonDataSource.load('../public/data/roverPosition.geojson', {
          clampToGround: true,
        });
        viewer.dataSources.add(perseveranceLocation);

        perseveranceLocation.entities.values.forEach((entity) => {
          entity.billboard = undefined;
          entity.label = new Cesium.LabelGraphics({
            text: "Perseverance Rover",
            font: "14pt monospace",
            fillColor: Cesium.Color.WHITE,
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 2,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset: new Cesium.Cartesian3(0, -40, 250),
            heightReference: Cesium.HeightReference.NONE
          });
        });
        const resource = await Cesium.IonResource.fromAssetId(3928150);
        const geoEntity = perseveranceLocation.entities.values[0];
        const position = geoEntity.position.getValue(Cesium.JulianDate.now());

        const entity = viewer.entities.add({
          position: position,
          model: { uri: resource, scale: 100.0 },
        });

        // viewer.trackedEntity = entity;


        // Perseverance Waypoints
        const waypoints = await Cesium.GeoJsonDataSource.load('../public/data/roverWaypoints.geojson', {
          clampToGround: true
        });
        viewer.dataSources.add(waypoints);

        const waypointEntities = waypoints.entities.values

        waypointEntities.forEach((entity) => {
          entity.point = new Cesium.PointGraphics({
            pixelSize: 8,
            color: Cesium.Color.WHITE,
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 2,
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          })
        });


        const roverWaypoints = waypoints.entities.values.forEach((entity) => {
          if (entity.point) {
            console.log('Waypoint entity found:', entity);
          }
        })




        // const roverEntity = dataSource.entities.add({
        //   name: "Mars Rover",
        //   position: Cesium.Cartesian3.fromDegrees(longitude, latitude, height),
        //   point: {
        //     pixelSize: 10,
        //     color: Cesium.Color.YELLOW,
        //     outlineColor: Cesium.Color.BLACK,
        //     outlineWidth: 2,
        //     heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        //   },
        //   label: {
        //     text: "Mars Rover Location",
        //     font: "14pt monospace",
        //     fillColor: Cesium.Color.WHITE,
        //     outlineColor: Cesium.Color.BLACK,
        //     outlineWidth: 2,
        //     style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        //     pixelOffset: new Cesium.Cartesian2(0, -40),
        //   },
        // });


        // viewer.flyTo(roverEntity, {
        //   duration: 3.0,
        //   offset: new Cesium.HeadingPitchRange(0.0, -0.5, 5000.0)
        // });
       
      } catch (error) {
        console.error("Failed to load Mars tileset:", error);
      }
    };

    initMarsViewer();


    return () => {
      if (viewerRef.current && !viewerRef.current.isDestroyed()) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: "100vw", 
        height: "100vh", 
        position: "absolute",
        top: 0,
        left: 0,
        margin: 0,
        padding: 0
      }} 
    />
  );
};

export default CesiumViewer;
