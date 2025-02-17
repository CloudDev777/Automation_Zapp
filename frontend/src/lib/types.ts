export type Type = {
  id: String;
  name: String;
  image: String;
};

export type ZapAction = {
  id: string; // UUID
  zapId: string; // UUID
  actionId: string; // UUID
  app: any;
  metadata: string; // Could use specific type if structure known
  sortingOrder: number; // Order of the action
  type: Type;
};

type ZapTrigger = {
  id: string; // UUID
  zapId: string; // UUID
  triggerId: string; // UUID
  app: any;
  metadata: Record<string, unknown>; // Adjust type based on actual metadata structure
  type: Type;
};

type ZapRun = {
  id: String;
  zapId: String;
  metadata: any;
};

export enum ZapStatus {
  DRAFT = "DRAFT",
  ACTIVE = "ACTIVE",
  PAUSED = "PAUSED",
  ERROR = "ERROR",
  PUBLISHED = "PUBLISHED",
}
export type Zap = {
  id: string; // UUID
  zapName: string;
  status: ZapStatus;
  availableTriggerId: string; // UUID
  userId: number;
  actions: ZapAction[];
  isActive: Boolean;
  trigger: ZapTrigger;
  createdAt: Date;
  zapRuns: ZapRun[]; // Define type or keep empty if unknown
};
