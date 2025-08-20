export function cn(...classes: (string | false | undefined)[]) {
  let classStr = "";
  for (const c of classes) {
    if (c === undefined) continue;
    if (typeof c === "boolean") continue;
    if (typeof c === "string") {
      classStr += " " + c;
    }
  }
  return classStr === "" ? undefined : classStr.trimStart();
}
