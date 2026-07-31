// types/entityTypes.ts

export enum Role {
  MANAGER = 'MANAGER',
  CLEANER = 'CLEANER',
}

export enum DaysOfTheWeek {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

export interface Organization {
  id: number;
  name: string;
  description: string | null;
}

export interface User {
  id: number;
  organization: Organization | null;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  role: Role;
}

export interface Cleaning {
  id: number;
  managerId: number;
  cleanerId: number | null;
  propertyId: number;
  dateTimeStart: string;
  dateTimeEnd: string;
  dateTimeStarted: string | null;
  dateTimeCompleted: string | null;
  notes: string | null;
  cleaningChecklistItems: CleaningChecklistItem[];
  isComplete: boolean;
}

export interface CleaningChecklistItem {
  id: number;
  description: string;
  frequencyDays: number;
  lastCompleted: string | null;
  isComplete: boolean;
}

export interface Property {
  id: number;
  managerId: number;
  name: string;
  street: string | null;
  unit: string | null;
  city: string | null;
  province: string | null;
  postalCode: string | null;
  country: string | null;
  accessInstructions: string | null;
}
