import config from "@/config";
import { AppMetaData } from "@/types/AppMetaData";
import { loadCache, saveCache } from "@/utils/cache";
import axios from "axios";
import { useEffect, useState } from "react";

export const useAppsData = () => {
  const [apps, setApps] = useState<AppMetaData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApps = async () => {
    setLoading(true);

    const cached = await loadCache<AppMetaData[]>("APPS_CACHE", []);
    if (cached.length > 0) setApps(cached);

    try {
      const res = await axios.get(config.JSON_REPO_URL);
      if (res?.data) {
        setApps(res.data);
        await saveCache("APPS_CACHE", res.data);
      }
    } catch (err) {
      console.log("Failed to fetch apps:", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchApps();
  }, []);

  return { apps, loading, refetch: fetchApps };
};
