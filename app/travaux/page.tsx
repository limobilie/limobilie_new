import { supabase } from "@/lib/supabase";
import TravauxClient from "./TravauxClient";

export const revalidate = 0;

export default async function TravauxPage() {
  const { data: dbContent } = await supabase.from('limobilie_content').select('key, value');
  const contentMap = dbContent?.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {} as Record<string, string>) || {};

  return <TravauxClient content={contentMap} />;
}
