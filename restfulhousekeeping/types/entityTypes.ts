// types/entityTypes.ts

export enum Role {
  MANAGER = 'Manager',
  CLEANER = 'Cleaner',
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

export interface CleaningRecord {
  id: number;
  manager: User;
  cleaner: User | null;
  property: Property;
  dateTimeStart: Date;
  dateTimeEnd: Date;
  dateTimeStarted: Date | null;
  dateTimeCompleted: Date | null;
  notes: String | null;
  checklistItems: ChecklistItem[] | null;
  isComplete: boolean;
}

export interface ChecklistItem {
  id: number;
  propertyId: number;
  cleaningId: number;
  description: string;
  isCompleted: boolean;
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
