export interface DateTrigger {
  hour: number;
  minute: number;
  timezone: string;
}

export interface User {
  shouldSendNotifications: boolean;
  dateTrigger: DateTrigger;
}