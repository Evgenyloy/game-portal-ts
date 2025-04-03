export function selectPlatform(platform: string) {
  let selectedPlatform;
  switch (platform) {
    case "pc":
      selectedPlatform = "PC (Windows)";
      break;
    case "browser":
      selectedPlatform = "web browser";
      break;
    case "all":
      selectedPlatform = "All Platforms";
      break;
    default:
      selectedPlatform = "All Platforms";
      break;
  }
  return selectedPlatform;
}
