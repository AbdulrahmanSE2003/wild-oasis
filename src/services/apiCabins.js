import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error(error);
  } else {
    return data;
  }
}

export async function createEditCabin(newCabinData, id) {
  const hasImagePath =
    typeof newCabinData.image === "string" &&
    newCabinData.image.startsWith(supabaseUrl);

  const imageName = `${Math.random()}-${
    typeof newCabinData.image === "object" ? newCabinData.image.name : "image"
  }`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? newCabinData.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  if (!id) query = query.insert([{ ...newCabinData, image: imagePath }]);
  else query = query.update({ ...newCabinData, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Couldn't save cabin");
  }

  if (hasImagePath) return data;

  // Upload image if it's new
  if (!hasImagePath) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabinData.image);

    if (storageError) {
      console.error(storageError);
      throw new Error("Couldn't upload image");
    }
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("cabin couldn't be deleted");
  } else {
    return data;
  }
}
