export class Setting {

  public id: number
  public name: string
  public description: string
  public value: number

  constructor(
    id: number,
    name: string,
    description: string,
    value: number
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.value = value;
  }
}

export function toSettingModel(data: any): Setting {
  
  const settingModel = new Setting(
    data['id'],
    data['name'],
    data['description'],
    data['value']
  );
  return settingModel;
}
