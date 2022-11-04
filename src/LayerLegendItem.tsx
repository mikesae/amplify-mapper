import { CheckboxField } from "@aws-amplify/ui-react";
import { FunctionComponent } from "react";

interface Props {
    label: string;
    onChange?: (checked: boolean) => void;
}

const LayerLegendItem: FunctionComponent<Props> = ({ label, onChange }) => {
    return (
        <CheckboxField
            onChange={(e) => {
                if (onChange) {
                    onChange(e.target.checked);
                }
            }}
            label={label}
            name={""}
            value={""}></CheckboxField>
    );
};

export default LayerLegendItem;
