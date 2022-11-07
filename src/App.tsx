import "./App.scss";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useState } from "react";
import { initializeMap } from "./mapping";
import { View, Flex, Heading } from "@aws-amplify/ui-react";
import MapLegend from "./MapLegend";
import maplibregl from "maplibre-gl";

function App() {
    const [map, setMap] = useState<maplibregl.Map | null>(null);

    useEffect(() => {
        async function initMap() {
            if (map === null) {
                setMap(await initializeMap());
            }
        }
        initMap();
        // Clean up on unmount
        return () => map?.remove();
    }, [map]);

    return (
        <>
            <Flex
                className='top-navbar'
                direction='row'
                justifyContent='flex-start'
                alignItems='stretch'
                alignContent='flex-start'
                wrap='nowrap'
                gap='1rem'>
                <Heading level={5}>MapHead v1</Heading>
            </Flex>
            <MapLegend map={map}></MapLegend>
            <View className='map' id='map'></View>
        </>
    );
}

export default App;
