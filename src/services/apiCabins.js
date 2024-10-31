import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  console.log(newCabin.image);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  /*
https://unuszbjpogoxsxzfeegl.supabase.co/storage/v1/object/public/cabin-images/cabin-002.jpg?t=2024-10-29T07%3A46%3A28.889Z
  */
  console.log(imageName);
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  // 1. Create/edit cabin
  let query = supabase.from("cabins");

  // A) create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) edit
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  //upload image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  if (storageError) {
    // Handle error
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  } else {
    // Handle success
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}
