import { Customer } from './Customer';
import { Activity } from './Activity';
import { PlaceAttention } from './PlaceAttention';
import { Parameter } from './Parameter';
import * as Parameters from '@/definitions/parameterDefinition';

export class BakeTicket {

  public id: number
  public customer: Customer
  public activity: Activity
  public numberAttention: string
  public placeAttention: PlaceAttention
  public bakingStatus: Parameter

  constructor(
    id: number,
    customer: Customer,
    activity: Activity,
    numberAttention: string,
    placeAttention: PlaceAttention,
    bakingStatus: Parameter
  ) {
    this.id = id;
    this.customer = customer;
    this.activity = activity;
    this.numberAttention = numberAttention;
    this.placeAttention = placeAttention;
    this.bakingStatus = bakingStatus;
  }

  public hasPhone(): boolean {
    return this.customer.phone != '';
  }

  public getColorBakingStatus(): string {
    if (this.bakingStatus.id == Parameters.PARAMETER_FOR_BAKING) return 'error';
    if (this.bakingStatus.id == Parameters.PARAMETER_READY_TO_DELIVER) return 'warning';
    return 'success';
  }
}

export function toBakeTicketModel(data: any): BakeTicket {
  
  const bakeTicketModel = new BakeTicket(
    data['id'],
    data['customer'],
    data['activity'],
    data['numberAttention'],
    data['placeAttention'],
    data['bakingStatus']
  );
  return bakeTicketModel;
}
