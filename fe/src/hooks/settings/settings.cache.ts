import { queryKey } from "@/configs";
import type { AppNameSpace } from "@/hooks/useAppNameSpace";
import type { Settings } from "@/types/api/productivity";

export type SettingsCacheContext = {
  previousData?: Settings;
};

export function readSettingsSnapshot(ns: AppNameSpace): Settings | undefined {
  return ns.queryClient.getQueryData<Settings>(queryKey.settings.detail());
}
