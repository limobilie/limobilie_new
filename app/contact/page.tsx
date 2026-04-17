import { supabase } from "@/lib/supabase";
import ContactClient from "./ContactClient";

export const revalidate = 0;

export default async function ContactPage() {
  const { data: dbContent } = await supabase.from('limobilie_content').select('key, value');
  const contentMap = dbContent?.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {} as Record<string, string>) || {};

  return <ContactClient content={contentMap} />;
}
