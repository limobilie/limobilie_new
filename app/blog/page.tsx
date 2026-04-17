import { supabase } from "@/lib/supabase";
import BlogClient from "./BlogClient";

export const revalidate = 0;

export default async function BlogPage() {
  const { data: dbContent } = await supabase.from('limobilie_content').select('key, value');
  const contentMap = dbContent?.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {} as Record<string, string>) || {};

  return <BlogClient content={contentMap} />;
}
