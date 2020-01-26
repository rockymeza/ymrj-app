import { dark, swiss } from "@theme-ui/presets";

export default {
  ...swiss,
  colors: {
    ...swiss.colors,
    modes: {
      dark: dark.colors
    }
  },
  buttons: {
    primary: {
      color: "background",
      bg: "primary",
      "&:hover": {
        bg: "text"
      }
    },
    secondary: {
      color: "background",
      bg: "secondary"
    }
  },
  images: {
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 99999
    }
  }
};
