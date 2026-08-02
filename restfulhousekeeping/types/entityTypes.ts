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
  cleaningChecklistItems: ChecklistItem[];
  isComplete: boolean;
}

// the default items associated with each property
// or before they are attached to a cleaning
export interface ChecklistItem {
  id: number;
  description: string;
  frequencyDays: number | null;
  lastCompleted: string | null;
  // Only present after the item has been attached to a cleaning.
  isComplete?: boolean;
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

export type CreateCleaningChecklistItem =
  | {
      checklistItem: {
        id: number;
      };
    }
  | {
      customDescription: string;
    };

export interface CreateCleaningPayload {
  manager: {
    id: number;
    role: Role.MANAGER;
  };
  cleaner: {
    id: number;
    role: Role.CLEANER;
  } | null;
  property: {
    id: number;
  };
  dateTimeStart: string;
  dateTimeEnd: string;
  notes: string | null;
  cleaningChecklistItems: CreateCleaningChecklistItem[];
}
