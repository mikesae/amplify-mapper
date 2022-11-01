import location from "aws-sdk/clients/location";
import awsconfig from "./aws-exports";
import geocodedClients from "./data/geocoded-clients.json";
import { createMap } from "maplibre-gl-js-amplify";
import { drawPoints } from "maplibre-gl-js-amplify";

const devLocations = [
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

function getLocationService(credentials) {
    return new location({
        credentials: credentials,
        region: awsconfig.aws_project_region,
    });
}

export function geocode(credentials, address, callback) {
    const service = getLocationService(credentials);
    service.searchPlaceIndexForText({
        FilterCountries: ["USA"],
        Text: address,
        Language: "en"
    }, (err, response) => {
        if (err) {
            console.error(err)
        } else if (response && response.Results.length > 0) {
            let locations = [];
            for (let i = 0; i < response.Results.length; i += 1) {
                locations.push(response.Results[i].Place.Geometry.Point)
            }
            callback(locations);
        }
    });
}

function getLocations() {
    let locations = [];
    geocodedClients.forEach((client) => {
        const address = `${client.City}, ${client.State}`;
        locations.push({ title: client.Name, address: address, coordinates: [client.lon, client.lat] });
    });
    return locations;
}

function addLocations(map) {
    map.on("load", function () {
        drawPoints(
            "mySourceName", // Arbitrary source name
            getLocations(),
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

export async function initializeMap() {
    const map = await createMap({
        container: "map", // An HTML Element or HTML element ID to render the map in https://maplibre.org/maplibre-gl-js-docs/api/map/
        center: [BOSTON.longitude, BOSTON.latitude],
        zoom: 10
    });
    //const credentials = await Auth.currentCredentials();
    addLocations(map);
    return map;
}
