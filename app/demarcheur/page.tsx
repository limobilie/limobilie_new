import { supabase } from "@/lib/supabase";
import DemarcheurClient from "./DemarcheurClient";

export const revalidate = 0;

export default async function DemarcheurPage() {
  const { data: dbContent } = await supabase.from('limobilie_content').select('key, value');
  const contentMap = dbContent?.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {} as Record<string, string>) || {};

  return <DemarcheurClient content={contentMap} />;
}
