import { useEffect, useState } from "react";
import {
  IPlayerApp,
  ParameterValue,
  Player,
  PlayerListener,
} from "textalive-app-api";

import { PlayerControl } from "./PlayerControl";

const defaultFontSize = 70;
const defaultColor = "#1f4391";

const sansSerif = `"Hiragino Kaku Gothic Pro", "游ゴシック体", "Yu Gothic", YuGothic, Meiryo, HelveticaNeue, "Helvetica Neue", Helvetica, Arial, sans-serif`;

export const Body = () => {
  const [player, setPlayer] = useState<Player | null>(null);
  const [app, setApp] = useState<IPlayerApp | null>(null);
  const [char, setChar] = useState("");
  const [fontFamily, _setFontFamily] = useState<ParameterValue>(sansSerif);
  const [fontSize, _setFontSize] = useState<ParameterValue>(defaultFontSize);
  const [color, _setColor] = useState(defaultColor);
  const [darkMode, _setDarkMode] = useState(false);
  const [mediaElement, setMediaElement] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !mediaElement) {
      return;
    }

    console.log("--- [app] create Player instance ---");
    const p = new Player({
      app: {
        token: import.meta.env.VITE_TEXTALIVE_TOKEN || "elLljAkPmCHHiGDP",
      },
      mediaElement,
    });

    const playerListener: PlayerListener = {
      onAppReady: (app) => {
        console.log("--- [app] initialized as TextAlive app ---");
        console.log("managed:", app.managed);
        console.log("host:", app.host);
        console.log("song url:", app.songUrl);
        if (!app.songUrl) {
          // マジカルミライ 2025 対象楽曲

          // ストリートライト by 加賀(ネギシャワーP)
          // https://songle.jp/songs/piapro.jp%2Ft%2FULcJ%2F20250205120202
          p.createFromSongUrl("https://piapro.jp/t/ULcJ/20250205120202");

          // アリフレーション by 雨良 Amala
          // https://songle.jp/songs/piapro.jp%2Ft%2FSuQO%2F20250127235813
          // p.createFromSongUrl("https://piapro.jp/t/SuQO/20250127235813")

          // インフォーマルダイブ by 99piano
          // https://songle.jp/songs/piapro.jp%2Ft%2FPpc9%2F20241224135843
          // p.createFromSongUrl("https://piapro.jp/t/Ppc9/20241224135843")

          // ハロー、フェルミ。 by ど～ぱみん
          // https://songle.jp/songs/piapro.jp%2Ft%2FoTaJ%2F20250204234235
          // p.createFromSongUrl("https://piapro.jp/t/oTaJ/20250204234235")

          // パレードレコード by きさら
          // https://songle.jp/songs/piapro.jp%2Ft%2FGCgy%2F20250202202635
          // p.createFromSongUrl("https://piapro.jp/t/GCgy/20250202202635")

          // ロンリーラン by 海風太陽
          // https://songle.jp/songs/piapro.jp%2Ft%2FCyPO%2F20250128183915
          // p.createFromSongUrl("https://piapro.jp/t/CyPO/20250128183915")
        }
        setApp(app);
      },
      onVideoReady: () => {
        console.log("--- [app] video is ready ---");
        console.log("player:", p);
        console.log("player.data.song:", p.data.song);
        console.log("player.data.song.name:", p.data.song.name);
        console.log("player.data.song.artist.name:", p.data.song.artist.name);
        console.log("player.data.songMap:", p.data.songMap);
        let c = p.video.firstChar;
        while (c && c.next) {
          c.animate = (now: number, u) => {
            if (u.startTime <= now && u.endTime > now) {
              setChar(u.text);
            }
          };
          c = c.next;
        }
      },
    };
    p.addListener(playerListener);

    setPlayer(p);
    return () => {
      console.log("--- [app] shutdown ---");
      p.removeListener(playerListener);
      p.dispose();
    };
  }, [mediaElement]);

  return (
    <>
      {player && app && (
        <div className="absolute top-2.5 left-2.5 right-2.5 bg-black/20 p-1.5 z-[100]">
          <PlayerControl disabled={app.managed} player={player} />
        </div>
      )}
      <div
        className="absolute inset-1.5 flex items-center justify-center z-10"
        style={{
          background: darkMode ? "#333" : "#fff",
        }}
      >
        <div
          className="font-bold"
          style={{
            // @ts-expect-error TS2322
            fontFamily,
            fontSize: `${fontSize}vh`,
            color,
          }}
        >
          {char}
        </div>
      </div>
      <div
        className="absolute right-2.5 bottom-2.5 z-20"
        ref={setMediaElement}
      />
    </>
  );
};
