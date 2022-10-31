import { isUndefined } from "lodash";






export const extractObjectFromAllowedFields = (allowedFields: string[], originalObj: Record<string, any>) => {
    return allowedFields.reduce(
        (objToBuild: Record<string, any>, allowedKey: string) => {
            const isKeyActiveInOriginalObject = !isUndefined(originalObj[allowedKey])
            if (isKeyActiveInOriginalObject) {
                objToBuild[allowedKey] = originalObj[allowedKey];
            }
            return objToBuild;
        },
        {}
    );
}