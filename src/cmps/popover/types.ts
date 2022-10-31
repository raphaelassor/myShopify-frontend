import { ReactElement } from "react";
import { FormOption } from "../form/types";

export interface DropdownOption extends FormOption {
    onClick?: () => void;
    renderElement?: (value: string) => ReactElement;
}
