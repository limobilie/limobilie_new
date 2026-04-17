import { supabase } from "@/lib/supabase";
import AcheterClient from "./AcheterClient";
import React from "react";

export const revalidate = 0;

export default async function AcheterPage() {
  const [contentRes, propertiesRes] = await Promise.all([
    supabase.from('limobilie_content').select('key, value'),
    supabase.from('limobilie_properties').select('*').order('created_at', { ascending: false })
  ]);

  const contentMap = contentRes.data?.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {} as Record<string, string>) || {};
  const dbProperties = propertiesRes.data || [];

  return <AcheterClient content={contentMap} dbProperties={dbProperties} />;
}
