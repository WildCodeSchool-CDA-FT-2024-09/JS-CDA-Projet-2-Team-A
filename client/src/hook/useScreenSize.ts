import { useMediaQuery } from "@mui/material";

const useScreenSize = () => {
  const isSmallScreen = useMediaQuery("(max-width:1920px)");
  const isMediumScreen = useMediaQuery("(max-width:2560px)");
  const isLargeScreen = useMediaQuery("(min-width:2561px)");

  return { isSmallScreen, isMediumScreen, isLargeScreen };
};

export default useScreenSize;
