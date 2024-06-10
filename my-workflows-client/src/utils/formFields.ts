
export const getPrefix = (setName: string, index: number) => `${setName}.${index}`;

export const getID = (prefix: string, fieldName: string ) => `${prefix}${fieldName}`;
