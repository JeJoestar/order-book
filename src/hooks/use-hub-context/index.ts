import { HubContext } from "@/boot/signalr-default";
import { useContext } from "react";

const useHubContext = () => useContext(HubContext);

export default useHubContext;
