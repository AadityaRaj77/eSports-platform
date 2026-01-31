import { useEffect, useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

type GameGenre =
  | "BATTLE_ROYAL"
  | "CLASH_ROYALE"
  | "SHOOTER"
  | "PLATFORMER"
  | "SPORTS"
  | "FIGHTING"
  | "RACING"
  | "STRATEGY"
  | "ARCADE"
  | "OTHER";

type GameName = "BGMI" | "FREEFIRE" | "COD" | "OTHERS";

interface PlayerGameProfileInput {
  game: GameName;
  otherGameName?: string;
  gameProfileId?: string;
}

interface AchievementInput {
  title: string;
  description?: string;
}

interface ProfileResponse {
  gamertag: string;
  email: string;
  primaryGenre: GameGenre | null;
  activeStartTime: string | null;
  activeEndTime: string | null;
  role: string | null;
  location: string | null;
}

interface CompleteProfilePayload {
  primaryGenre: GameGenre;
  activeStartTime?: string;
  activeEndTime?: string;
  role?: string;
  location?: string;
  games: PlayerGameProfileInput[];
  achievements: AchievementInput[];
}

export default function Profile(): JSX.Element {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);

  const [gamertag, setGamertag] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [primaryGenre, setPrimaryGenre] = useState<GameGenre>("SHOOTER");
  const [activeStartTime, setActiveStartTime] = useState<string>("");
  const [activeEndTime, setActiveEndTime] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  const [games, setGames] = useState<PlayerGameProfileInput[]>([
    { game: "BGMI" },
  ]);

  const [achievements, setAchievements] = useState<AchievementInput[]>([
    { title: "" },
  ]);

  useEffect((): void => {
    const fetchProfile = async (): Promise<void> => {
      const res = await api.get<ProfileResponse>("/profile");

      setGamertag(res.data.gamertag);
      setEmail(res.data.email);

      if (res.data.primaryGenre) setPrimaryGenre(res.data.primaryGenre);
      if (res.data.activeStartTime)
        setActiveStartTime(res.data.activeStartTime);
      if (res.data.activeEndTime) setActiveEndTime(res.data.activeEndTime);
      if (res.data.role) setRole(res.data.role);
      if (res.data.location) setLocation(res.data.location);

      setLoading(false);
    };

    fetchProfile();
  }, []);

  const submit = async (): Promise<void> => {
    const payload: CompleteProfilePayload = {
      primaryGenre,
      activeStartTime: activeStartTime || undefined,
      activeEndTime: activeEndTime || undefined,
      role: role || undefined,
      location: location || undefined,
      games,
      achievements: achievements.filter((a) => a.title.trim() !== ""),
    };

    const res = await api.post<{ redirect: string }>(
      "/profile/complete",
      payload,
    );

    navigate(res.data.redirect);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
        Loading…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-4xl mx-auto bg-zinc-900 rounded-xl p-6 space-y-6">
        <h2 className="text-2xl font-bold">Complete Profile</h2>

        {/* Read-only */}
        <div className="text-sm text-zinc-400">
          <p>Gamertag: {gamertag}</p>
          <p>Email: {email}</p>
        </div>

        {/* Primary Genre */}
        <select
          className="w-full bg-zinc-800 p-2 rounded"
          value={primaryGenre}
          onChange={(e) => setPrimaryGenre(e.target.value as GameGenre)}
        >
          {[
            "BATTLE_ROYAL",
            "CLASH_ROYALE",
            "SHOOTER",
            "PLATFORMER",
            "SPORTS",
            "FIGHTING",
            "RACING",
            "STRATEGY",
            "ARCADE",
            "OTHER",
          ].map((g) => (
            <option key={g} value={g}>
              {g.replace("_", " ")}
            </option>
          ))}
        </select>

        {/* Role + Location */}
        <div className="grid grid-cols-2 gap-4">
          <input
            className="bg-zinc-800 p-2 rounded"
            placeholder="Role (IGL, Support)"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <input
            className="bg-zinc-800 p-2 rounded"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* Active Time */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="time"
            className="bg-zinc-800 p-2 rounded"
            value={activeStartTime}
            onChange={(e) => setActiveStartTime(e.target.value)}
          />
          <input
            type="time"
            className="bg-zinc-800 p-2 rounded"
            value={activeEndTime}
            onChange={(e) => setActiveEndTime(e.target.value)}
          />
        </div>

        {/* Games */}
        <div>
          <h3 className="font-semibold mb-2">Games</h3>
          {games.map((g, i) => (
            <div key={i} className="grid grid-cols-3 gap-2 mb-2">
              <select
                className="bg-zinc-800 p-2 rounded"
                value={g.game}
                onChange={(e) => {
                  const copy = [...games];
                  copy[i].game = e.target.value as GameName;
                  setGames(copy);
                }}
              >
                {["BGMI", "FREEFIRE", "COD", "OTHERS"].map((gm) => (
                  <option key={gm} value={gm}>
                    {gm}
                  </option>
                ))}
              </select>

              <input
                className="bg-zinc-800 p-2 rounded"
                placeholder="In-game ID"
                value={g.gameProfileId || ""}
                onChange={(e) => {
                  const copy = [...games];
                  copy[i].gameProfileId = e.target.value;
                  setGames(copy);
                }}
              />

              {g.game === "OTHERS" && (
                <input
                  className="bg-zinc-800 p-2 rounded"
                  placeholder="Game name"
                  value={g.otherGameName || ""}
                  onChange={(e) => {
                    const copy = [...games];
                    copy[i].otherGameName = e.target.value;
                    setGames(copy);
                  }}
                />
              )}
            </div>
          ))}

          <button
            className="text-indigo-400 text-sm"
            onClick={() => setGames([...games, { game: "BGMI" }])}
          >
            + Add game
          </button>
        </div>

        {/* Achievements */}
        <div>
          <h3 className="font-semibold mb-2">Achievements</h3>
          {achievements.map((a, i) => (
            <div key={i} className="grid grid-cols-2 gap-2 mb-2">
              <input
                className="bg-zinc-800 p-2 rounded"
                placeholder="Title"
                value={a.title}
                onChange={(e) => {
                  const copy = [...achievements];
                  copy[i].title = e.target.value;
                  setAchievements(copy);
                }}
              />
              <input
                className="bg-zinc-800 p-2 rounded"
                placeholder="Description"
                value={a.description || ""}
                onChange={(e) => {
                  const copy = [...achievements];
                  copy[i].description = e.target.value;
                  setAchievements(copy);
                }}
              />
            </div>
          ))}
          <button
            className="text-indigo-400 text-sm"
            onClick={() => setAchievements([...achievements, { title: "" }])}
          >
            + Add achievement
          </button>
        </div>

        <button
          onClick={submit}
          className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded font-semibold"
        >
          Save Profile
        </button>
      </div>
    </div>
  );
}
