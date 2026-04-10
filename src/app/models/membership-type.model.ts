export class MemberShipType {
  public id: number = 0;
  public name: string = '';
  public durationInMonths: string = '';
  public price: number = 0;
  public description: string = '';
  public imageUrl?: string;
  // Navigation Property (One plan can have many subscriptions)
  public subscriptions?: any[];
}