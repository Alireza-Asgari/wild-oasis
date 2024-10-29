import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://unuszbjpogoxsxzfeegl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVudXN6Ympwb2dveHN4emZlZWdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk5MzA5MDcsImV4cCI6MjA0NTUwNjkwN30.TP22gjwAYTBjarAXKjlM3JRF_TftFdGMINwPaANh_-c";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
