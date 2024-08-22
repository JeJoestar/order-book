import { HubContext } from "@/boot/signalr";
import { useContext } from "react";

const useHubContext = () => useContext(HubContext);

export default useHubContext;
