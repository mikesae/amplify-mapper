import location from "aws-sdk/clients/location";
import awsconfig from "./aws-exports";
import geocodedClients from "./data/geocoded-clients.json";
import { createMap } from "maplibre-gl-js-amplify";
import { drawPoints } from "maplibre-gl-js-amplify";
import maplibregl from "maplibre-gl";

function getLocationService(credentials: any) {
    return new location({
        credentials: credentials,
        region: awsconfig.aws_project_region,
    });
}

export function geocode(credentials:any, address:string, callback:any) {
    const service = getLocationService(credentials);
    service.searchPlaceIndexForText({
        IndexName: "TBD",
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

function getLocations():any {
    let locations: { title: string; address: string; coordinates: number[]; }[] = [];
    geocodedClients.forEach((client) => {
        const address = `${client.City}, ${client.State}<br/><br/>`;
        let display = address;
        let loggedIn = client.InAdmin + client.TakingCourses + client.TakingTests;
        display += `Users: ${client.Users}<br/>`;
        display += `Logged In: ${loggedIn}<br/>`;
        display += `In Admin: ${client.InAdmin}<br/>`;
        display += `Taking Courses: ${client.TakingCourses}<br/>`;
        display += `Taking Tests: ${client.TakingTests}<br/>`;
        display += `S3 Enabled: ${client.S3On === "True" ? "Y" : "N"}<br/>`;
        display += `IUX Enabled : ${client.ITSOn === "True" ? "Y" : "N"}<br/>`;

        locations.push({
            title: client.Name,
            address: display,
            coordinates: [client.lon, client.lat]
        });
    });
    return locations;
}

function addLocations(map: maplibregl.Map) {
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

export async function initializeMap(): Promise<maplibregl.Map> {
    const map:maplibregl.Map = await createMap({
        container: "map", // An HTML Element or HTML element ID to render the map in https://maplibre.org/maplibre-gl-js-docs/api/map/
        center: [BOSTON.longitude, BOSTON.latitude],
        zoom: 10
    });
    //const credentials = await Auth.currentCredentials();
    addLocations(map);
    map.addControl(new maplibregl.NavigationControl());
    map.addControl(new maplibregl.ScaleControl({unit: 'imperial'}));
    return map;
}
