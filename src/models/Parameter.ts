import * as ParameterDefinition from '@/definitions/parameterDefinition';

export class Parameter {

  public id: number
  public description: string

  constructor(
    id: number,
    description: string
  ) {
    this.id = id;
    this.description = description;
  }

  public getColorBakingStatus(): string {
    if (this.id == ParameterDefinition.PARAMETER_FOR_BAKING) return 'error';
    if (this.id == ParameterDefinition.PARAMETER_READY_TO_DELIVER) return 'warning';
    return 'success';
  }
}

export function toParameterModel(data: any): Parameter {
  
  const parameterModel = new Parameter(
    data['id'],
    data['description']
  );
  return parameterModel;
}