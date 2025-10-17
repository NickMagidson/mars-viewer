import * as Cesium from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import { useEffect, useState } from 'react';
import './App.css';
import CesiumViewer from './CesiumView';

function App() {
  const [roverLocation, setRoverLocation] = useState<any>(null);

  // This fetches on mount. Import would be different wiht direct cesium
  useEffect(() => {
    
    const roverData = Cesium.GeoJsonDataSource.load('../public/data/roverPosition.geojson');
    setRoverLocation(roverData);

  }, []);

  console.log('Rover Location on mount:', roverLocation);


  return (
    <CesiumViewer roverLocation={roverLocation} />
  )
}

export default App
