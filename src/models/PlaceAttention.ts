export class PlaceAttention {

  public id: number
  public name: string
  public abbreviation: string

  constructor(
    id: number,
    name: string,
    abbreviation: string
  ) {
    this.id = id;
    this.name = name;
    this.abbreviation = abbreviation;
  }

  public hasAbbreviation(): boolean {
    return this.abbreviation != '';
  }
}

export function toPlaceAttentionModel(data: any): PlaceAttention {
  
  const placeAttentionModel = new PlaceAttention(
    data['id'],
    data['name'],
    data['abbreviation']
  );
  return placeAttentionModel;
}

