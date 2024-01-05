import { switchAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(switchAnatomy.keys);
const customVariant = definePartsStyle({
  track: {
    bgSize: {
      ll: '42px',
    },
  },
});

export const alertTheme = defineMultiStyleConfig({
  variants: { custom: customVariant },
});
