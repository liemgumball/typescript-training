/**
 * parse data from interface to model
 * @param data interface of data
 * @param constructor constructor of the model parsed into
 * @returns new model instance
 */
export function parseData<IType, Type>(
  data: IType,
  constructor: new (data: IType) => Type
): Type {
  return new constructor(data)
}
