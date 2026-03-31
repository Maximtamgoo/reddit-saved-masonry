import shared from "./Shared.module.css";
import { useSettingsStore } from "@src/store/settings";
import { Scaling } from "lucide-react";
import { MaxCardWidth } from "./MaxCardWidth";
import { MaxCardHeight } from "./MaxCardHeight";
import { cn } from "@src/utils/cn";

export function MaxCardSize() {
  const { resetCardSizes } = useSettingsStore((s) => s.actions);

  return (
    <div className={shared.section}>
      <span className={shared.title}>
        <Scaling />
        Max Card Size
        <button className={cn("btn", shared.reset)} onClick={() => resetCardSizes()}>
          Reset
        </button>
      </span>
      <MaxCardWidth />
      <MaxCardHeight />
    </div>
  );
}
