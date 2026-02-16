import { fetchWakaTimeStats } from "../services/wakatimeService.js";

export const getWakaTimeStats = async (req, res) => {
  try {
    const data = await fetchWakaTimeStats();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch wakatime data" });
  }
};
