import * as Cesium from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import { useEffect, useRef } from "react";

// interface CesiumViewerProps {
//   roverLocation: any;
// }

interface RoverConfig {
  name: string;
  positionFile: string;
  waypointsFile: string;
  modelAssetId: number;
  modelScale?: number;
  labelColor?: Cesium.Color;
  waypointColor?: Cesium.Color;
}

const CesiumViewer = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewerRef = useRef<Cesium.Viewer | null>(null);

  const roverConfig = [
    {
      name: "Perseverance Rover",
      positionFile: '/data/roverPosition.geojson',
      waypointsFile: '/data/roverWaypoints.geojson',
      modelAssetId: 3928150,
      modelScale: 100.0,
      labelColor: Cesium.Color.WHITE,
      waypointColor: Cesium.Color.WHITE
    },
    // {
    //   name: "Curiosity Rover",
    //   positionFile: '/data/curiosityPosition.geojson',
    //   waypointsFile: '/data/curiosityWaypoints.geojson',
    //   modelAssetId: 3932344,
    //   modelScale: 50.0,
    //   labelColor: Cesium.Color.WHITE,
    //   waypointColor: Cesium.Color.WHITE
    // }
  ]

  const loadRoverData = async (viewer: Cesium.Viewer, rover: RoverConfig ) => {

    //Load rover postion data
    const roverData = await Cesium.GeoJsonDataSource.load(rover.positionFile, {
      clampToGround: true,
    });
    viewer.dataSources.add(roverData);

    roverData.entities.values.forEach((entity) => {
      entity.billboard = undefined;
      entity.label = new Cesium.LabelGraphics({
        text: rover.name,
        font: "14pt Helvetica",
      fillColor: Cesium.Color.WHITE,
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 2,
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      pixelOffset: new Cesium.Cartesian3(0, -40, 250),
      heightReference: Cesium.HeightReference.NONE
      });
    });

    // Bring in the 3D model
    const resource = await Cesium.IonResource.fromAssetId(rover.modelAssetId)
    const geoEntity = roverData.entities.values[0]
    const position = geoEntity.position?.getValue(Cesium.JulianDate.now())

    viewer.entities.add({
      position: position,
      model: { uri: resource, scale: 100.0 },
    });


    // Load the rover waypoints
    const waypoints = await Cesium.GeoJsonDataSource.load(rover.waypointsFile, {
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
  }
  

  useEffect(() => {
    const initMarsViewer = async () => {
      const container = containerRef.current;
      if (!container) return;

      // Set your Cesium Ion access token
      Cesium.Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_ION_ACCESS_TOKEN;
      

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

        await Promise.all([
          roverConfig.map(rover => loadRoverData(viewer, rover))
        ])

       
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
