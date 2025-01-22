import { D } from "node_modules/@tanstack/react-query-devtools/build/modern/ReactQueryDevtools-Cn7cKi7o";

type Type = {
  id: String;
  name: String;
  image: String;
};
type ZapAction = {
  id: string; // UUID
  zapId: string; // UUID
  actionId: string; // UUID
  metadata: string; // Could use specific type if structure known
  sortingOrder: number; // Order of the action
  type: Type;
};

type ZapTrigger = {
  id: string; // UUID
  zapId: string; // UUID
  triggerId: string; // UUID
  metadata: Record<string, unknown>; // Adjust type based on actual metadata structure
  type: Type;
};

type ZapRun = {
  id: String;
  zapId: String;
  metadata: any;
};

export type Zap = {
  id: string; // UUID
  zapName: string;
  availableTriggerId: string; // UUID
  userId: number;
  actions: ZapAction[];
  isActive: Boolean;
  trigger: ZapTrigger;
  createdAt: Date;
  zapRuns: ZapRun[]; // Define type or keep empty if unknown
};
