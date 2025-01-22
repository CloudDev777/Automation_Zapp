import customFetch from "@/utils/fetch";

// Server state query
export const userQuery = {
  queryKey: ["user"],
  queryFn: async () => {
    const { data } = await customFetch.get("/users/current-user");
    return data;
  },
};

export const zapsQuery = {
  queryKey: ["zaps"],
  queryFn: async () => {
    const { data } = await customFetch.get("/zaps");
    return data;
  },
};

export const singleZapQuery = (id: string) => {
  return {
    queryKey: ["zaps", id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/zaps/${id}`);
      return data;
    },
  };
};

export const availableTriggersQuery = {
  queryKey: ["availableTriggers"],
  queryFn: async () => {
    const { data } = await customFetch.get("/triggers");
    return data;
  },
};

export const availableActionsQuery = {
  queryKey: ["availableActions"],
  queryFn: async () => {
    const { data } = await customFetch.get("/actions");
    return data;
  },
};
