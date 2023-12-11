import { View } from "@aws-amplify/ui-react";
import React, { FunctionComponent } from "react";
import LayerLegendItem from "./LayerLegendItem";
import { toggleLayerVisibility } from "./mapping";
import clientImage from "./assets/hospital.svg";
import usersImage from "./assets/users-circle.svg";
import loggedInImage from "./assets/logged-in-circle.svg";

interface Props {
    map: maplibregl.Map | any;
}

const MapLegend: FunctionComponent<Props> = ({ map }) => {
    return (
        <View className='map-legend'>
            <LayerLegendItem label='sLearning Clients' imageSource={clientImage} checked disabled />
            <LayerLegendItem
                label='Users'
                imageSource={usersImage}
                onChange={(check) => toggleLayerVisibility(map, "Users", check)}></LayerLegendItem>
            <LayerLegendItem
                label='Logged In Users'
                imageSource={loggedInImage}
                onChange={(check) => toggleLayerVisibility(map, "LoggedIn", check)}
            />
        </View>
    );
};

export default MapLegend;
