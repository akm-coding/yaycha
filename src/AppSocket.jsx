import React, { useEffect } from "react";
import { queryClient, useApp } from "./context/ThemedApp";
import useWebSocket, { ReadyState } from "react-use-websocket";

export default function AppSocket() {
  const { auth } = useApp();

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    import.meta.env.VITE_WS
  );

  useEffect(() => {
    if (auth && readyState === ReadyState.OPEN) {
      sendJsonMessage({
        token: localStorage.getItem("token"),
      });
      console.log("WS: connection ready & token sent");
    }
  }, [readyState, auth]);

  useEffect(() => {
    console.log("WS: new message received");
    if (lastJsonMessage && lastJsonMessage.event) {
      queryClient.invalidateQueries(lastJsonMessage.event);
    }
  }, [lastJsonMessage]);
  return <></>;
}
