import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
   const { data, error } = await supabase.from("cabins").select("*");

   if (error) {
      console.log(error);
      throw new Error("Cabins could not be loaded");
   }
   return data;
}

export async function deleteCabin(id) {
   const { data, error } = await supabase.from("cabins").delete().eq("id", id);

   if (error) {
      console.log(error);
      throw new Error("Cabin could not be deleted");
   }

   return data;
}

export async function createEditCabin(newCabin, id) {
   // Check the image to see if you are getting a new image (add cabin or edit w/ changed image) OR you are getting the path to the existing image on edit
   // if you are using the same inmage, the field will start with the supabase URL; otherwise, it will have an image object.
   const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

   // create the imageName and replace any slashes in the image name with hypens. Otherwise Supabase will treat slashes as new folders
   //
   const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
      "/",
      "-"
   );

   //  create the image path
   //

   const imagePath = hasImagePath
      ? newCabin.image
      : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

   // sample file path:
   //https://hoqcaqshssqvlqsdmccd.supabase.co/storage/v1/object/public/cabin-images/cabin_002.jpg

   //1. create cabin

   let query = supabase.from("cabins");

   // A) CREATE
   if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

   // B) EDIT
   //  -- Notice that you don't have to place the data into an array like you did in the CREATE statement above
   if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

   const { data, error } = await query.select().single();

   if (error) {
      console.log(error);
      throw new Error("Cabin could not be created");
   }

   //2. upload image

   // Not sure about return data here, but following Jonas
   if (hasImagePath) return data;

   const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image, {});

   //3. Delete Cabin if there was error when uploading image

   if (storageError) {
      const { data, storageError } = await supabase
         .from("cabins")
         .delete()
         .eq("id", data.id);
      throw new Error("Error uploading cabin image. Cabin not created");
   }

   return data;
}
