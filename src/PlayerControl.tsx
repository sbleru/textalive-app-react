import React, { useCallback, useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import { Player, PlayerListener } from "textalive-app-api";
import { PlayerSeekbar } from "textalive-react-api";

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
    <div className="control">
      <Button
        content={status !== "play" ? "再生" : "一時停止"}
        onClick={status !== "play" ? handlePlay : handlePause}
        size="small"
        disabled={disabled}
      />
      <Button
        content="停止"
        onClick={handleStop}
        size="small"
        disabled={disabled || status === "stop"}
      />
      <div className="seekbar">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <PlayerSeekbar player={disabled ? undefined : (player as any)} />
      </div>
    </div>
  );
};
