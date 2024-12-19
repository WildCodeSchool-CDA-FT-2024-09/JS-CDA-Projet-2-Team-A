import { useMediaQuery } from "@mui/material";

const useScreenSize = (options?: { withSummary?: boolean }) => {
  const isSmallScreen = useMediaQuery("(max-width:1920px)");
  const isMediumScreen = useMediaQuery("(max-width:2560px)");
  const isLargeScreen = useMediaQuery("(min-width:2561px)");

  const baseHeight = isSmallScreen ? 473 : isMediumScreen ? 734 : 1461;

  const adjustedHeight = options?.withSummary ? baseHeight - 100 : baseHeight;

  return {
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
    dataGridHeight: `${adjustedHeight}px`,
  };
};

export default useScreenSize;
