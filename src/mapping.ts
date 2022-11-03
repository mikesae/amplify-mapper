import location from "aws-sdk/clients/location";
import awsconfig from "./aws-exports";
import geocodedClients from "./data/geocoded-clients.json";
import { createMap } from "maplibre-gl-js-amplify";
import { drawPoints } from "maplibre-gl-js-amplify";
import maplibregl from "maplibre-gl";
import usersImage from './assets/users.png';

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

function getClientFeatures(): any {
    let features: any = [];
    geocodedClients.forEach((client) => {
        features.push({
            type: "Feature",
            geometry: { type: "Point", coordinates: [client.lon, client.lat] },
            properties: {
                "Users": client.Users,
                "LoggedIn": client.InAdmin + client.TakingCourses + client.TakingTests
            }
        });

    });
    return features;
}

function addCustomImages(map: maplibregl.Map) {
    const image = new Image(980, 736);
    image.src = usersImage;
    map.addImage('users', image);
}

function addPointsAndDataSources(map: maplibregl.Map) {
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
        addDataSources(map);
        //addGraduatedSymbolLayer(map, 'Users', 'Users', '#2D4460', 'City small scale/large other capital');
        //addGraduatedSymbolLayer(map, 'LoggedIn', 'LoggedIn', '#627388', 'City small scale/x large admin2 capital');
        addGraduatedCircleLayer(map, 'Users', 'Users', '#2D4460');
        addGraduatedCircleLayer(map, 'LoggedIn', 'LoggedIn', '#627388');
        //addCustomImages(map);
    })
}

const BOSTON = {
    latitude: 42.35866,
    longitude: -71.05674
};

function addDataSources(map: maplibregl.Map) {
    map.addSource('ClientDataSource', {
        type: 'geojson',
        data: {
            type: "FeatureCollection",
            features: getClientFeatures()
        }
    });
}

function addGraduatedCircleLayer(map: maplibregl.Map, id: string, property: string, color: string) {
    map.addLayer({
        'id': id,
        'type': 'circle',
        'source': 'ClientDataSource',
        'paint': {
            'circle-stroke-color': 'white',
            'circle-stroke-width': 1,
            'circle-radius': {
                property: property,
                type: 'exponential',
                stops: [
                    [0, 0],
                    [1024, 24]
                ]
            },
            'circle-color': color
        }
    });
    map.setLayoutProperty(id, 'visibility', 'none');
}

function addGraduatedSymbolLayer(map: maplibregl.Map, id: string, property: string, color: string, iconName: string) {
    map.addLayer({
        id: id,
        type: 'symbol',
        source: 'ClientDataSource',
        layout: {
            'icon-image': iconName,
            'icon-size': {
                type: 'exponential',
                property: property,
                stops: [
                    [0, 0],
                    [1024, 4]
                ]
            }
        },
        paint: {
            'icon-color': color
        }
    });
    map.setLayoutProperty(id, 'visibility', 'none');
}

export function showUsers(map: maplibregl.Map) {
    map.setLayoutProperty('Users', 'visibility', 'visible');
    map.setLayoutProperty('LoggedIn', 'visibility', 'none');
}

export function showLoggedInUsers(map: maplibregl.Map) {
    map.setLayoutProperty('Users', 'visibility', 'none');
    map.setLayoutProperty('LoggedIn', 'visibility', 'visible');
}

function addMapControls(map: maplibregl.Map) {
    map.addControl(new maplibregl.NavigationControl(), 'top-right');
    map.addControl(new maplibregl.ScaleControl({ unit: 'imperial' }), 'bottom-right');
}

async function makeMap(): Promise<maplibregl.Map> {
    const map:maplibregl.Map = await createMap({
        container: "map", // An HTML Element or HTML element ID to render the map in https://maplibre.org/maplibre-gl-js-docs/api/map/
        center: [BOSTON.longitude, BOSTON.latitude],
        zoom: 10
    });
    return map;
}

export async function initializeMap(): Promise<maplibregl.Map> {
    const map: maplibregl.Map = await makeMap();
    addMapControls(map);
    addPointsAndDataSources(map);
    return map;
}
