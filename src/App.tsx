import React from "react";
import "./App.css";
import "maplibre-gl/dist/maplibre-gl.css";
import { MapView, View, Flex, Heading } from "@aws-amplify/ui-react";

const BOSTON = {
    latitude: 42.35866,
    longitude: -71.05674
};

function App() {
    return (
        <View className='App'>
            <Flex>
                <Heading>sLearning Clients</Heading>
                <MapView
                    initialViewState={{ longitude: BOSTON.longitude, latitude: BOSTON.latitude, zoom: 11 }}
                    style={{ width: "600px", height: "600px" }}></MapView>
            </Flex>
        </View>
    );
}

export default App;
