import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.log("URL:", supabaseUrl);
  console.log("KEY:", !!supabaseServiceRoleKey);

  throw new Error("Missing Supabase environment variables");
}

export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceRoleKey
);