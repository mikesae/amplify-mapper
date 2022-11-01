import React from "react";
import "./App.css";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect } from "react";
import { initializeMap } from "./mapping";
import { Auth } from "aws-amplify";
import maplibregl from "maplibre-gl";

function App() {
    useEffect(() => {
        async function initMap() {
            await initializeMap();
        }

        initMap();
        // return function cleanup() {
        //     mapPromise.then((map) => map.remove());
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
