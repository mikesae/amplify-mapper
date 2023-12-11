import { CheckboxField, Flex } from "@aws-amplify/ui-react";
import React, { FunctionComponent } from "react";

interface Props {
    label: string;
    onChange?: (checked: boolean) => void;
    imageSource?: string;
    checked?: boolean;
    disabled?: boolean;
}

const LayerLegendItem: FunctionComponent<Props> = ({ label, onChange, imageSource, checked, disabled }) => {
    function makeLabel(text: string, imageSource?: string) {
        return (
            <>
                {imageSource && (
                    <img
                        style={{ position: "relative", top: "4px", marginRight: "0.5em" }}
                        src={imageSource}
                        height='24'
                        width='24'
                        alt=''
                    />
                )}
                {text}
            </>
        );
    }

    return (
        <Flex
            placeholder='row'
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
                value={""}
                checked={checked}
                disabled={disabled}
                crossOrigin=''></CheckboxField>
        </Flex>
    );
};

export default LayerLegendItem;
