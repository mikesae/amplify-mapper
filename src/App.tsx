import "./App.css";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect } from "react";
import { initializeMap } from "./mapping";
import { Flex, Grid, Card, View, useTheme, Heading, Menu, MenuItem } from "@aws-amplify/ui-react";

function showUsers(map: maplibregl.Map) {
    alert("Showing Users");
}

function showLoggedInUsers(map: maplibregl.Map) {
    alert("Showing Logged In Users");
}

function App() {
    let map: maplibregl.Map;
    useEffect(() => {
        async function initMap() {
            map = await initializeMap();
        }
        initMap();
    }, []);

    const { tokens } = useTheme();

    return (
        <Grid columnGap='0.5rem' rowGap='0.5rem' templateColumns='1fr' templateRows='1fr 10fr' gap={tokens.space.small}>
            <Card columnStart='1' columnEnd='-1'>
                <Flex
                    direction='row'
                    justifyContent='flex-start'
                    alignItems='stretch'
                    alignContent='flex-start'
                    wrap='nowrap'
                    gap='1rem'>
                    <Menu menuAlign='start' size='small'>
                        <MenuItem onClick={() => showUsers(map)}>Show Users</MenuItem>
                        <MenuItem onClick={() => showLoggedInUsers(map)}>Logged In Users</MenuItem>
                    </Menu>
                    <Heading level={4}>sLearning Client Map</Heading>
                </Flex>
            </Card>
            <View columnStart='1' columnEnd='-1'>
                <div id='map'></div>
            </View>
        </Grid>
    );
}

export default App;
