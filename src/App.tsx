import { Flex, Heading, View } from '@aws-amplify/ui-react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import React, { useEffect, useState } from 'react';
import './App.scss';
import MapLegend from './MapLegend';
import { initializeMap } from './mapping';

function App() {
  const [map, setMap] = useState<maplibregl.Map | null | any>(null);

  useEffect(() => {
    async function initMap() {
      setMap(await initializeMap());
    }
    if (map === null) {
      initMap();
    }
    // Clean up on unmount
    return () => map?.remove();
  }, [map]);

  return (
    <>
      <Flex
        placeholder='top'
        className='top-navbar'
        direction='row'
        justifyContent='flex-start'
        alignItems='stretch'
        alignContent='flex-start'
        wrap='nowrap'
      >
        <Heading placeholder='heading' level={5}>
          MapHead v2
        </Heading>
      </Flex>
      <View className='map' id='map'></View>
      {map && <MapLegend map={map}></MapLegend>}
    </>
  );
}

export default App;
