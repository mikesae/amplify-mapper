import React from "react";
import "./App.css";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect } from "react";
import { initializeMap } from "./mapping";
import { Auth } from "aws-amplify";

function App() {
    useEffect(() => {
        async function initMap() {
            return await initializeMap();
        }

        initMap();
        //const map = initMap();
        // return function cleanup() {
        //   map.remove();
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
