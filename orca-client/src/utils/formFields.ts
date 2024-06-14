
export const getPrefix = (setName: string, index: number | string) => `${setName}.${index}.`;

export const getID = (prefix: string, fieldName: string ) => `${prefix}${fieldName}`;
