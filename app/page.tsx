"use client";

import { useState } from "react";

type Theme = "Auto" | "Light" | "Dark";
type Accent = "coral" | "yellow" | "green" | "indigo" | "pink";

type Settings = {
  language: string;
  theme: Theme;
  accent: Accent;
  toggles: {
    reduceMotion: boolean;
    autoPlay: boolean;
    highQualityPhoto: boolean;
  };
};

function getDefaultSettings(): Settings {
  return {
    language: "English",
    theme: "Light",
    accent: "indigo",
    toggles: {
      reduceMotion: true,
      autoPlay: true,
      highQualityPhoto: false,
    },
  };
}

const themes: Theme[] = ["Auto", "Light", "Dark"];

const accentPalette: Record<Accent, { dot: string; ring: string; primary: string }> = {
  coral: { dot: "bg-[#E48779]", ring: "ring-[#E48779]/55", primary: "bg-[#E48779]" },
  yellow: { dot: "bg-[#E8DB6D]", ring: "ring-[#E8DB6D]/55", primary: "bg-[#D4BE2A]" },
  green: { dot: "bg-[#8EDD85]", ring: "ring-[#8EDD85]/55", primary: "bg-[#53B84A]" },
  indigo: { dot: "bg-[#6151D7]", ring: "ring-[#6151D7]/55", primary: "bg-[#6151D7]" },
  pink: { dot: "bg-[#CA74D2]", ring: "ring-[#CA74D2]/55", primary: "bg-[#B85BC2]" },
};

const accentOrder: Accent[] = ["coral", "yellow", "green", "indigo", "pink"];

export default function Home() {
  const [settings, setSettings] = useState<Settings>(getDefaultSettings);
  const [savedSettings, setSavedSettings] = useState<Settings>(getDefaultSettings);
  const [status, setStatus] = useState("");

  const selectedAccent = accentPalette[settings.accent];

  const switches = [
    { key: "reduceMotion" as const, label: "Reduce motion", icon: "☼" },
    { key: "autoPlay" as const, label: "Auto play", icon: "▷" },
    { key: "highQualityPhoto" as const, label: "High quality photo", icon: "◉" },
  ];

  const onToggleSwitch = (key: keyof Settings["toggles"]) => {
    setSettings((prev) => ({
      ...prev,
      toggles: {
        ...prev.toggles,
        [key]: !prev.toggles[key],
      },
    }));
  };

  const onResetDefaults = () => {
    const defaults = getDefaultSettings();
    setSettings(defaults);
    setSavedSettings(defaults);
    setStatus("Preferences reset to default");
  };

  const onCancel = () => {
    setSettings({
      ...savedSettings,
      toggles: { ...savedSettings.toggles },
    });
    setStatus("Changes canceled");
  };

  const onSave = () => {
    setSavedSettings({
      ...settings,
      toggles: { ...settings.toggles },
    });
    setStatus("Preferences saved");
  };

  return (
    <div className="flex min-h-screen items-start justify-center bg-[#ececf0] text-zinc-800 sm:items-center sm:px-4 sm:py-8">
      <main className="flex min-h-screen w-full flex-col bg-white px-4 py-5 sm:min-h-0 sm:max-w-[720px] sm:rounded-[26px] sm:border sm:border-zinc-200 sm:px-8 sm:py-7 sm:shadow-[0_2px_10px_rgba(15,23,42,0.08)]">
        <section className="flex flex-col gap-1 border-b border-zinc-200 pb-6">
          <h1 className="text-[26px] leading-tight font-semibold text-zinc-800 sm:text-[40px]">Appearance</h1>
          <p className="text-[16px] leading-tight text-zinc-400 sm:text-[28px]">
            Set or customize your preferences for the system
          </p>
        </section>

        <section className="flex flex-col gap-6 border-b border-zinc-200 py-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-[20px] leading-tight font-semibold text-zinc-700 sm:text-[34px]">Language</h2>
              <p className="text-[14px] leading-tight text-zinc-400 sm:text-[28px]">Select the language of the platform</p>
            </div>
            <div className="relative">
              <select
                value={settings.language}
                onChange={(event) => setSettings((prev) => ({ ...prev, language: event.target.value }))}
                className="h-12 min-w-[170px] appearance-none rounded-2xl border border-zinc-300 bg-white px-4 pr-10 text-[16px] leading-none text-zinc-600 outline-none sm:h-[74px] sm:min-w-[190px] sm:px-6 sm:pr-12 sm:text-[34px]"
              >
                <option>English</option>
                <option>Español</option>
                <option>Português</option>
              </select>
              <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-zinc-500 sm:right-5">⌄</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-[20px] leading-tight font-semibold text-zinc-700 sm:text-[34px]">Interface theme</h2>
              <p className="text-[14px] leading-tight text-zinc-400 sm:text-[28px]">Customize your application appereance</p>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1 sm:gap-6">
              {themes.map((theme, index) => (
                <button
                  type="button"
                  key={theme}
                  onClick={() => setSettings((prev) => ({ ...prev, theme }))}
                  className="flex flex-col items-center gap-2 sm:gap-3"
                >
                  <div
                    className={`flex h-[74px] w-full max-w-[180px] items-end overflow-hidden rounded-2xl border p-2 sm:h-[110px] sm:p-3 ${
                      settings.theme === theme
                        ? "border-[#6d5ce6] ring-2 ring-[#6d5ce6]/40"
                        : "border-zinc-200"
                    } ${index === 2 ? "bg-gradient-to-b from-[#5243c8] to-[#2e2c8f]" : "bg-[#f3f3f8]"}`}
                  >
                    <div className="grid w-full grid-rows-3 gap-2 opacity-90">
                      <div className={`rounded-full ${index === 2 ? "bg-white/40" : "bg-zinc-300"}`} />
                      <div className={`h-2 rounded-full ${index === 2 ? "bg-white/35" : "bg-zinc-300"}`} />
                      <div className={`h-2 w-2/3 rounded-full ${index === 2 ? "bg-white/35" : "bg-zinc-300"}`} />
                    </div>
                    {settings.theme === theme && (
                      <span className="ml-[-6px] mb-[-6px] flex h-6 w-6 items-center justify-center rounded-full bg-[#6d5ce6] text-[14px] text-white">
                        ✓
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-[34px] leading-tight ${
                      settings.theme === theme ? "font-semibold text-[#6d5ce6]" : "text-zinc-600"
                    } text-[14px] sm:text-[34px]`}
                  >
                    {theme}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="flex flex-col items-start gap-4 border-b border-zinc-200 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="text-[20px] leading-tight font-semibold text-zinc-700 sm:text-[34px]">Accent color</h2>
            <p className="text-[14px] leading-tight text-zinc-400 sm:text-[28px]">Pick your platform&apos;s main color</p>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            {accentOrder.map((accent) => (
              <button
                type="button"
                key={accent}
                onClick={() => setSettings((prev) => ({ ...prev, accent }))}
                className={`h-8 w-8 rounded-full sm:h-10 sm:w-10 ${accentPalette[accent].dot} ${
                  settings.accent === accent ? `ring-4 ${accentPalette[accent].ring}` : ""
                }`}
                aria-label={`Select ${accent} accent`}
              />
            ))}
          </div>
        </section>

        <section className="flex flex-col border-b border-zinc-200 py-4">
          {switches.map((item, idx) => (
            <div
              key={item.label}
              className={`flex items-center justify-between py-4 ${idx !== switches.length - 1 ? "border-b border-zinc-100" : ""}`}
            >
              <div className="flex items-center gap-4 text-zinc-600">
                <span className="text-lg text-zinc-400 sm:text-2xl">{item.icon}</span>
                <span className="text-[20px] leading-none font-medium sm:text-[36px]">{item.label}</span>
              </div>

              <button
                type="button"
                onClick={() => onToggleSwitch(item.key)}
                className={`flex h-8 w-[58px] items-center rounded-full p-1 sm:h-10 sm:w-[72px] ${
                  settings.toggles[item.key]
                    ? `justify-end ${selectedAccent.primary}`
                    : "justify-start bg-[#dcd8f1]"
                }`}
              >
                <span className="h-6 w-6 rounded-full bg-white shadow-sm sm:h-8 sm:w-8" />
              </button>
            </div>
          ))}
        </section>

        <section className="flex flex-col items-start gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={onResetDefaults}
            className="text-[18px] leading-none font-medium text-zinc-400 sm:text-[22px]"
          >
            Reset to default
          </button>
          <div className="flex w-full items-center gap-3 sm:w-auto sm:gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="h-11 flex-1 rounded-2xl border border-zinc-300 bg-white px-4 text-[16px] leading-none font-medium text-zinc-600 sm:h-12 sm:flex-none sm:px-6 sm:text-[20px]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onSave}
              className={`h-11 flex-1 rounded-2xl px-4 text-[16px] leading-none font-semibold text-white shadow-[0_4px_10px_rgba(97,81,215,0.35)] sm:h-12 sm:flex-none sm:px-6 sm:text-[20px] ${selectedAccent.primary}`}
            >
              Save Preferences
            </button>
          </div>
        </section>

        {status && <p className="pt-3 text-left text-sm font-medium text-zinc-500 sm:text-right sm:text-base">{status}</p>}
      </main>
    </div>
  );
}
