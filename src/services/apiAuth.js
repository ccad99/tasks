import supabase, { supabaseUrl } from "./supabase";

/*
 *  FUNCTION - SIGNUP
 */

export async function signup({ fullName, email, password }) {
   const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
         data: {
            fullName,
            avatar: "",
         },
      },
   });
}

/*
 *     FUNCTION - LOGIN
 */

export async function login({ email, password }) {
   let { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
   });

   if (error) throw new Error(error.message);

   // Fetch the user from your `users` table to get `custom_id`
   const { data: userRecord, error: userError } = await supabase
      .from("users")
      .select("custom_id, email, role")
      .eq("email", email)
      .single();

   if (userError || !userRecord) throw new Error("User record not found.");

   // Attach custom_id to the returned user object
   return {
      ...data,
      custom_id: userRecord.custom_id,
      role: userRecord.role,
   };
}

/*
 *  FUNCTION - GET CURENT USER
 */

export async function getCurrentUser() {
   const { data: session } = await supabase.auth.getSession();
   if (!session.session) return null;

   // Fetch the user from the `users` table
   const { data: userRecord, error: userError } = await supabase
      .from("users")
      .select("custom_id, email, role")
      .eq("email", session.session.user.email)
      .single();

   if (userError || !userRecord) throw new Error("User record not found.");

   return {
      custom_id: userRecord.custom_id,
      email: session.session.user.email,
      role: userRecord.role,
   };
}

/*
 *  ****  OLD   OLD   OLD   OLD  ****
 */

/*
 *   FUNCTION - LOGIN
 */

// export async function login({ email, password }) {
//    let { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//    });

//    if (error) throw new Error(error.message);

//    return data;
// }

/*
 *  FUNCTION - GET CURENT USER
 */

// export async function getCurrentUser() {
//    const { data: session } = await supabase.auth.getSession();
//    if (!session.session) return null;

//    const { data, error } = await supabase.auth.getUser();
//    if (error) throw new Error(error.message);

//    return data?.user;
// }

/*
 *  FUNCTION - LOGOUT
 */

export async function logout() {
   const { error } = await supabase.auth.signOut();

   if (error) throw new Error(error.message);
}

/*
 *  FUNCTION - UPDATE CURRENT USER
 */

export async function updateCurrentUser({ password, fullName, avatar }) {
   //1. update the password OR the full name

   let updateData;
   if (password) updateData = { password };
   if (fullName)
      updateData = {
         data: { fullName },
      };

   const { data, error } = await supabase.auth.updateUser({ updateData });

   if (error) throw new Error(error.message);
   if (!avatar) return data;

   //2. Upload the avatar image

   const fileName = `avatar-${data.user.id}-${Math.random()}`;

   const { error: storageError } = await supabase.storage
      .from("avatars")
      .upload(fileName, avatar);

   if (storageError) throw new Error(storageError.message);

   //3. Update the avatar in the user record

   const { data: updatedUser, error: linkError } =
      await supabase.auth.updateUser({
         data: {
            avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
         },
      });

   if (linkError) throw new Error(linkError.message);
   return updatedUser;
}
