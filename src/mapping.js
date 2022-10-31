import location from "aws-sdk/clients/location";
import awsconfig from "./aws-exports";

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