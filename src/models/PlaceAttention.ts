export class PlaceAttention {

  public id: number
  public name: string

  constructor(
    id: number,
    name: string,
    abbreviation: string
  ) {
    this.id = id;
    this.name = name;
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

