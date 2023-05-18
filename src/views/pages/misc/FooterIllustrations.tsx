// ** React Imports
import { styled, useTheme } from "@mui/material/styles";
// ** MUI Components
import useMediaQuery from "@mui/material/useMediaQuery";
import { Fragment, ReactNode } from "react";

interface FooterIllustrationsProp {
  image?: ReactNode;
}

// Styled Components
const MaskImg = styled("img")(() => ({
  bottom: 0,
  zIndex: -1,
  width: "100%",
  position: "absolute",
}));

const TreeImg = styled("img")(({ theme }) => ({
  left: "2.25rem",
  bottom: "4.25rem",
  position: "absolute",
  [theme.breakpoints.down("lg")]: {
    left: 0,
    bottom: 0,
  },
}));

const FooterIllustrations = (props: FooterIllustrationsProp) => {
  // ** Props
  const { image } = props;

  // ** Hook
  const theme = useTheme();

  // ** Vars
  const hidden = useMediaQuery(theme.breakpoints.down("md"));

  if (!hidden) {
    return (
      <Fragment>
        {image || <TreeImg alt="tree" src="/image/pages/tree-2.png" />}
        <MaskImg
          alt="mask"
          src={`/image/pages/misc-mask-${theme.palette.mode}.png`}
        />
      </Fragment>
    );
  } else {
    return null;
  }
};

export default FooterIllustrations;
