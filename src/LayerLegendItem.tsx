import { CheckboxField, Flex } from "@aws-amplify/ui-react";
import { FunctionComponent } from "react";

interface Props {
    label: string;
    onChange?: (checked: boolean) => void;
    imageSource?: string;
}

const LayerLegendItem: FunctionComponent<Props> = ({ label, onChange, imageSource }) => {
    function makeLabel(text: string, imageSource?: string) {
        return (
            <>
                {imageSource && (
                    <img
                        style={{ position: "relative", top: "4px", marginRight: "0.5em" }}
                        src={imageSource}
                        height='24'
                        width='24'
                    />
                )}
                {text}
            </>
        );
    }

    return (
        <Flex
            direction='row'
            justifyContent='flex-start'
            alignItems='stretch'
            alignContent='flex-start'
            wrap='nowrap'
            gap='1rem'>
            <CheckboxField
                style={{ display: "inline-block" }}
                onChange={(e) => {
                    if (onChange) {
                        onChange(e.target.checked);
                    }
                }}
                label={makeLabel(label, imageSource)}
                name={""}
                value={""}></CheckboxField>
        </Flex>
    );
};

export default LayerLegendItem;
