import supabase from "./supabase";

export async function getGuests() {
  const { data, error } = await supabase
    .from("guests")
    .select("id, fullName, email");
  if (error) throw new Error("Guests could not be loaded");
  return data;
}
