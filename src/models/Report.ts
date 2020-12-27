export class Report {

  public description: string
  public quantity: number

  constructor(
    description: string,
    quantity: number
  ) {
    this.description = description;
    this.quantity = quantity;
  }

  public getIcon(index: number): string {
    if (index == 4) return 'fas fa-concierge-bell';
    return 'far fa-sticky-note';
  }

  public getColor(index: number): string {
    if (index == 0) return 'danger';
    if (index == 1) return 'warning';
    if (index == 2) return 'success';
    if (index == 3) return 'primary';
    return 'info';
  }
}

export function toReportModel(data: any): Report {
  
  const reportModel = new Report(
    data['description'],
    data['quantity']
  );
  return reportModel;
}