import React from "react";
import "./App.css";
import { createMap } from "maplibre-gl-js-amplify";
import { drawPoints } from "maplibre-gl-js-amplify";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect } from "react";
import { geocode } from "./mapping";
import { Auth } from "aws-amplify";

function geoCodeThenAddLocations(map, credentials) {
    map.on("load", function () {
        geocode(credentials,
            "725 9th Ave, New York, NY 10019",
            function (locations) {
                drawPoints(
                    "mySourceName", // Arbitrary source name
                    locations,
                    // [
                    //     {
                    //         coordinates: [-73.98709247500821, 40.718839863699905],
                    //         title: "My Restaurant - Lower East Side",
                    //         address: "102 Norfolk St, New York, NY 10002"
                    //     },
                    //     {
                    //         coordinates: [-73.9893305444102, 40.76329636720047],
                    //         title: "My Restaurant - Hell's Kitchen",
                    //         address: "725 9th Ave, New York, NY 10019"
                    //     },
                    //     {
                    //         coordinates: [-73.95621342276895, 40.77225519589616],
                    //         title: "My Restaurant - Upper East Side",
                    //         address: "300 E 77th St, New York, NY 10075"
                    //     }
                    // ], // An array of coordinate data, an array of Feature data, or an array of [NamedLocations](https://github.com/aws-amplify/maplibre-gl-js-amplify/blob/main/src/types.ts#L8)
                    map,
                    {
                        showCluster: false,
                        unclusteredOptions: {
                            showMarkerPopup: true
                        },
                        clusterOptions: {
                            showCount: true
                        }
                    }
                )
            }
        );
    });
}

const locations = [
    {
        coordinates: [-73.7897094, 42.8635594],
        title: "HCS Clifton Park",
        address: "3828, 300 Clifton Corporate Pkwy suite 385, Clifton Park, NY 12065"
    },
    {
        coordinates: [-71.1611733, 42.4996642],
        title: "HCS Woburn",
        address: "100 Sylvan Rd Suite 100, Woburn, MA 01801"
    },
    {
        coordinates: [-85.16122718367347, 35.04238510204082],
        title: "HCS Chattanooga",
        address: "2255 Center St #107, Chattanooga, TN 37421"
    },
]

function addLocations(map) {
    map.on("load", function () {
        drawPoints(
            "mySourceName", // Arbitrary source name
            locations,
            map,
            {
                showCluster: false,
                unclusteredOptions: {
                    showMarkerPopup: true
                },
                clusterOptions: {
                    showCount: true
                }
            }
        );
    })
}

const BOSTON = {
    latitude: 42.35866,
    longitude: -71.05674
};

async function initializeMap() {
    const map = await createMap({
        container: "map", // An HTML Element or HTML element ID to render the map in https://maplibre.org/maplibre-gl-js-docs/api/map/
        center: [BOSTON.longitude, BOSTON.latitude],
        zoom: 10
    });
    //const credentials = await Auth.currentCredentials();
    addLocations(map);
    return map;
}

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
            <h1>HCS Locations</h1>
            <ul id='locations'>
                <li>
                    <b>Clifton Park</b> <br />3828, 300 Clifton Corporate Pkwy Suite 385, Clifton Park, NY 12065
                </li>
                <li>
                    <b>Woburn</b> <br />100 Sylvan Rd Suite 100, Woburn, MA 01801
                </li>
                <li>
                    <b>Chattanooga</b> <br />2255 Center St #107, Chattanooga, TN 37421
                </li>
            </ul>
            <div id='map'></div>
        </div>
    );
}

export default App;
