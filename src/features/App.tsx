import { useState } from "react";
import { ParameterValue } from "textalive-app-api";

import { PlayerProvider, usePlayer, usePlayerListener } from "./player";
import { PlayerControl } from "./PlayerControl";

const defaultFontSize = 70;
const defaultColor = "#1f4391";

const sansSerif = `"Hiragino Kaku Gothic Pro", "游ゴシック体", "Yu Gothic", YuGothic, Meiryo, HelveticaNeue, "Helvetica Neue", Helvetica, Arial, sans-serif`;

const AppContent = () => {
  const [char, setChar] = useState("");
  const [fontFamily, _setFontFamily] = useState<ParameterValue>(sansSerif);
  const [fontSize, _setFontSize] = useState<ParameterValue>(defaultFontSize);
  const [color, _setColor] = useState(defaultColor);
  const [darkMode, _setDarkMode] = useState(false);

  const { player, app } = usePlayer();

  // 文字アニメーション用のリスナー
  usePlayerListener(player, {
    onVideoReady: () => {
      if (!player) return;

      let c = player.video.firstChar;
      while (c && c.next) {
        c.animate = (now: number, u) => {
          if (u.startTime <= now && u.endTime > now) {
            setChar(u.text);
          }
        };
        c = c.next;
      }
    },
  });

  return (
    <>
      {player && app && (
        <div className="absolute top-2.5 left-2.5 right-2.5 bg-black/20 p-1.5 z-[100]">
          <PlayerControl disabled={app.managed} />
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
    </>
  );
};

export const App = () => {
  const [mediaElement, setMediaElement] = useState<HTMLDivElement | null>(null);

  return (
    <PlayerProvider mediaElement={mediaElement}>
      <AppContent />
      <div
        className="absolute right-2.5 bottom-2.5 z-20"
        ref={setMediaElement}
      />
    </PlayerProvider>
  );
};
