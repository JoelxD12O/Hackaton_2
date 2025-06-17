import { useEffect, useState } from "react";
import { getSummary } from "../services/api";

export function useSummary(token: string) {
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSummary(token)
      .then((data) => setSummary(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [token]);

  return { summary, loading };
}
