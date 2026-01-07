import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://atszyyuhbbiigqnbrzxn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0c3p5eXVoYmJpaWdxbmJyenhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExNzUyNTcsImV4cCI6MjA3Njc1MTI1N30.4aEYsoOjnvTvuy1moMO5ICDF-QfYmwfFqlHcta580sM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
