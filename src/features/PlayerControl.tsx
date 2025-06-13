import React, { useCallback, useState } from "react";
import { PlayerSeekbar } from "textalive-react-api";

import { usePlayer, usePlayerListener } from "./player";

import { Button } from "@/components/ui/button";

type PlayerControlProps = {
  disabled: boolean;
};

export const PlayerControl: React.FC<PlayerControlProps> = ({ disabled }) => {
  const { player } = usePlayer();
  const [status, setStatus] = useState<"play" | "pause" | "stop">("stop");

  usePlayerListener(player, {
    onPlay: () => setStatus("play"),
    onPause: () => setStatus("pause"),
    onStop: () => setStatus("stop"),
  });

  const handlePlay = useCallback(
    () => player && player.requestPlay(),
    [player],
  );
  const handlePause = useCallback(
    () => player && player.requestPause(),
    [player],
  );
  const handleStop = useCallback(
    () => player && player.requestStop(),
    [player],
  );

  return (
    <div className="flex items-center">
      <Button
        onClick={status !== "play" ? handlePlay : handlePause}
        size="sm"
        disabled={disabled}
        className="mr-1.5 flex-shrink-0"
      >
        {status !== "play" ? "再生" : "一時停止"}
      </Button>
      <Button
        onClick={handleStop}
        size="sm"
        disabled={disabled || status === "stop"}
        className="mr-0 flex-shrink-0"
      >
        停止
      </Button>
      <div className="flex-grow px-2.5">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <PlayerSeekbar player={disabled ? undefined : (player as any)} />
      </div>
    </div>
  );
};
