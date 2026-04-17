import { supabase } from "@/lib/supabase";
import PartenaireClient from "./PartenaireClient";

export const revalidate = 0;

export default async function PartenairePage() {
  const { data: dbContent } = await supabase.from('limobilie_content').select('key, value');
  const contentMap = dbContent?.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {} as Record<string, string>) || {};

  return <PartenaireClient content={contentMap} />;
}
