export class Activity {

  public id: number
  public description: string
  public date: string

  constructor(
    id: number,
    description: string,
    date: string
  ) {
    this.id = id;
    this.description = description;
    this.date = date;
  }
}

export function toActivityModel(data: any): Activity {

  const activityModel = new Activity(
    data['id'],
    data['description'],
    data['date']
  );
  return activityModel;
}
