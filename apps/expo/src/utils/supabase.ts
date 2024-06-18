// import "react-native-url-polyfill/auto";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtZXlsbG9ncnh4bmtkenpmY2p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc2NTgxMDMsImV4cCI6MjAzMzIzNDEwM30.an3n0X-WB9NZvGG1EIVHEjKuqDG7XogbFZMOjnNc_a8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
