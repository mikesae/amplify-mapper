import { View } from "@aws-amplify/ui-react";
import { FunctionComponent } from "react";
import LayerLegendItem from "./LayerLegendItem";
import { toggleLayerVisibility } from "./mapping";

interface Props {
    map: maplibregl.Map | null;
}

const MapLegend: FunctionComponent<Props> = ({ map }) => {
    return (
        <View className='map-legend'>
            <LayerLegendItem label='sLearning Clients' />
            <LayerLegendItem label='Users' onChange={(check) => toggleLayerVisibility(map, "Users", check)} />
            <LayerLegendItem label='Logged In Users' onChange={(check) => toggleLayerVisibility(map, "LoggedIn", check)} />
        </View>
    );
};

export default MapLegend;
