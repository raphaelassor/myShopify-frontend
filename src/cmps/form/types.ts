import { ChangeEvent } from "react";

export interface FormCmpProps {
    options: FormOption[];
    onChange: (ev: ChangeEvent<HTMLInputElement>) => void;
    onClearAll?: () => void;
    value: string;
    name: string;
}

export type FormInputType = 'dropdwonSingleSelect' | 'input'

export type FormOption = {
    value: string,
    label: string
}

export type FormData = {
    keyName: string,
    title: string
    options?: FormOption[]
    inputType: FormInputType
}[]