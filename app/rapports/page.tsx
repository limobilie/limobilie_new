import { supabase } from "@/lib/supabase";
import RapportsClient from "./RapportsClient";

export const revalidate = 0;

export default async function RapportsPage() {
  const { data: dbContent } = await supabase.from('limobilie_content').select('key, value');
  const contentMap = dbContent?.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {} as Record<string, string>) || {};

  return <RapportsClient content={contentMap} />;
}
