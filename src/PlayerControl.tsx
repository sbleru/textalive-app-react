import React, { useCallback, useEffect, useState } from "react";
import { Player, PlayerListener } from "textalive-app-api";
import { PlayerSeekbar } from "textalive-react-api";
import { Button } from "@/components/ui/button";

type PlayerControlProps = {
  disabled: boolean;
  player: Player;
};

export const PlayerControl: React.FC<PlayerControlProps> = ({
  disabled,
  player,
}) => {
  const [status, setStatus] = useState<"play" | "pause" | "stop">("stop");

  useEffect(() => {
    const listener: PlayerListener = {
      onPlay: () => setStatus("play"),
      onPause: () => setStatus("pause"),
      onStop: () => setStatus("stop"),
    };
    player.addListener(listener);
    return () => {
      player.removeListener(listener);
    };
  }, [player]);

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
