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
