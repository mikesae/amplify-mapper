import React from "react";
import "./App.css";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect } from "react";
import { initializeMap } from "./mapping";
import { Auth } from "aws-amplify";

function App() {
    useEffect(() => {
        async function initMap() {
            const map: any = await initializeMap();
        }

        initMap();
        // return function cleanup() {
        //     map.remove();
        // };
    }, []);

    return (
        <div className='App'>
            <h1>sLearning Clients</h1>
            <div id='map'></div>
        </div>
    );
}

export default App;
