import "./App.css";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect } from "react";
import { initializeMap } from "./mapping";
import { View, Flex, Grid, Card, useTheme, Divider, Menu, MenuItem } from "@aws-amplify/ui-react";

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

    const { tokens } = useTheme();

    return (
        <Grid
            columnGap='0.5rem'
            rowGap='0.5rem'
            templateColumns='1fr 1fr 1fr'
            templateRows='1fr 3fr 1fr'
            gap={tokens.space.small}>
            <Card columnStart='1' columnEnd='-1'>
                <Flex
                    direction='row'
                    justifyContent='flex-start'
                    alignItems='stretch'
                    alignContent='flex-start'
                    wrap='nowrap'
                    gap='1rem'>
                    <Menu menuAlign='start' size='large'>
                        <MenuItem onClick={() => alert("Download")}>Download</MenuItem>
                        <MenuItem onClick={() => alert("Create a Copy")}>Create a Copy</MenuItem>
                        <MenuItem onClick={() => alert("Mark as Draft")}>Mark as Draft</MenuItem>
                        <Divider />
                        <MenuItem isDisabled onClick={() => alert("Delete")}>
                            Delete
                        </MenuItem>
                        <MenuItem onClick={() => alert("Attend a workshop")}>Attend a workshop</MenuItem>
                    </Menu>
                    <span>sLearning Clients</span>
                </Flex>
            </Card>
            <Card columnStart='2' columnEnd='-1'>
                <div id='map'></div>
            </Card>
            <Card columnStart='2' columnEnd='-1'>
                Footer
            </Card>
        </Grid>
    );
}

export default App;
