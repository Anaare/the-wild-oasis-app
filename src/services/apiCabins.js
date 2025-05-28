import supabase, { supabaseUrl } from "./supabase";

export default async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could NOT be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  // Determine if it's an image that's already in Supabase storage
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl); // Use supabaseUrl here

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  // Construct the image path
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/Edit cabin
  let query;

  // A. Create cabin
  if (!id) {
    query = supabase.from("cabins").insert([{ ...newCabin, image: imagePath }]);
  }

  // B. Edit cabin
  if (id) {
    // For editing, we don't necessarily update 'other_column'
    // Update all relevant fields including the image path
    query = supabase
      .from("cabins")
      .update({ ...newCabin, image: imagePath })
      .eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error(`Cabin could NOT be ${id ? "edited" : "created"}`);
  }

  // 2. Upload image (only if it's a new image being uploaded)
  if (hasImagePath) return data;
  if (!hasImagePath) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    // 3. Delete the cabin if there was an error with image upload
    if (storageError) {
      await supabase.from("cabins").delete().eq("id", data.id); // Assuming data.id is available from the cabin creation
      console.error(storageError);
      throw new Error(
        "Cabin image could not be uploaded and the cabin was not created"
      );
    }
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    throw new Error("Cabin could NOT be deleted");
  }
}
