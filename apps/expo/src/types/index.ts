import type { Tables, TablesUpdate } from "./supabase.types";

export type Profile = Tables<"profiles">;
export type UpdateProfile = TablesUpdate<"profiles">;
