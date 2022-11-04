import "./App.scss";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect } from "react";
import { initializeMap, toggleLayerVisibility as toggleLayerVisibility } from "./mapping";
import { Flex, Heading, View } from "@aws-amplify/ui-react";
import LayerLegendItem from "./LayerLegendItem";

function App() {
    let map: maplibregl.Map;
    useEffect(() => {
        async function initMap() {
            map = await initializeMap();
        }
        initMap();
    }, []);

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
                <Heading level={5}>sLearning Clients</Heading>
                <LayerLegendItem label='Users' onChange={(check) => toggleLayerVisibility(map, "Users", check)} />
                <LayerLegendItem label='Logged In Users' onChange={(check) => toggleLayerVisibility(map, "LoggedIn", check)} />
            </Flex>
            <div id='map'></div>
        </>
    );
}

export default App;
