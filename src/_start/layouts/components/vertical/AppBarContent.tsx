// ** MUI Imports
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { Theme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import Magnify from "mdi-material-ui/Magnify";
// ** Icons Imports
import Menu from "mdi-material-ui/Menu";

// ** Type Import
import { Settings } from "@app/src/_start/@core/context/settingsContext";
// ** Components
import ModeToggler from "@app/src/_start/@core/layouts/components/shared-components/ModeToggler";
import NotificationDropdown from "@app/src/_start/@core/layouts/components/shared-components/NotificationDropdown";
import UserDropdown from "@app/src/_start/@core/layouts/components/shared-components/UserDropdown";

interface Props {
  hidden: boolean;
  settings: Settings;
  toggleNavVisibility: () => void;
  saveSettings: (values: Settings) => void;
}

const AppBarContent = (props: Props) => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props;

  // ** Hook
  const hiddenSm = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        className="actions-left"
        sx={{ mr: 2, display: "flex", alignItems: "center" }}
      >
        {/* // ** Abaixo é o input de pesquisa */}
        {/* {hidden ? (
          <IconButton
            color="inherit"
            onClick={toggleNavVisibility}
            sx={{ ml: -2.75, ...(hiddenSm ? {} : { mr: 3.5 }) }}
          >
            <Menu />
          </IconButton>
        ) : null} */}
        {/* <TextField
          size="small"
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 4 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Magnify fontSize="small" />
              </InputAdornment>
            ),
          }}
        /> */}
      </Box>
      <Box
        className="actions-right"
        sx={{ display: "flex", alignItems: "center" }}
      >
        {/* Abaixo é o botão de mudança de tema */}
        <Chip label={`30.000 Tokens`} color="success" variant="outlined" />
        <ModeToggler settings={settings} saveSettings={saveSettings} />
        <NotificationDropdown />
        <UserDropdown />
      </Box>
    </Box>
  );
};

export default AppBarContent;
