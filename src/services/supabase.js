import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://fvsylvffsbtrroqiwfcl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2c3lsdmZmc2J0cnJvcWl3ZmNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2MzgxNzcsImV4cCI6MjA2MzIxNDE3N30.RAjjKObYEQvQB5T0Ojd1twA2lDW60mg-uBq3VaXchVQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
