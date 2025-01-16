import { useMediaQuery } from "@mui/material";

const useScreenSize = (options?: { withSummary?: boolean }) => {
  const isSmallScreen = useMediaQuery("(max-width:1920px)");
  const isMediumScreen = useMediaQuery("(max-width:2560px)");
  const isLargeScreen = useMediaQuery("(min-width:2561px)");

  const baseHeight = isSmallScreen ? 473 : isMediumScreen ? 734 : 1461;
  const baseHeightWithoutSummary = isSmallScreen
    ? 629
    : isMediumScreen
      ? 1149
      : 1877;

  const adjustedHeight = options?.withSummary
    ? baseHeight
    : baseHeightWithoutSummary;

  const rowWithSummary = isSmallScreen ? 7 : isMediumScreen ? 12 : 26;
  const rowWithoutSummary = isSmallScreen ? 10 : isMediumScreen ? 20 : 35;

  const rowPerPage = options?.withSummary ? rowWithSummary : rowWithoutSummary;

  return {
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
    dataGridHeight: `${adjustedHeight}px`,
    rowPerPage,
  };
};

export default useScreenSize;
