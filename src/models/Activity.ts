export class Activity {

  public id: number
  public description: string
  public date: string
  public finished: boolean

  constructor(
    id: number,
    description: string,
    date: string,
    finished: boolean
  ) {
    this.id = id;
    this.description = description;
    this.date = date;
    this.finished = finished
  }

  public getFinished(): string {
    return this.finished == true ? 'Actividad finalizada': 'Actividad en curso';
  }

  public getColorFinished(): string {
    return this.finished == true ? 'success': 'danger';
  }
}

export function toActivityModel(data: any): Activity {

  const activityModel = new Activity(
    data['id'],
    data['description'],
    data['date'],
    data['finished']
  );
  return activityModel;
}
