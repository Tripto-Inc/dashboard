import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(process.env.NEXT_PUBLIC_PROJECT_URL!, process.env.NEXT_PUBLIC_API_KEY!)