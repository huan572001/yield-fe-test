import { Box as ChakraBox } from "@chakra-ui/react";
import styled from "@emotion/styled";
export const BoxTextGradient = styled(ChakraBox)`
  background: linear-gradient(to bottom right, #6b6bfd 0%, #6aded3 100%);
  background-clip: text;
  color: transparent;
`;
export const GradientLogo = styled(ChakraBox)`
  background: linear-gradient(
    82deg,
    rgba(135, 129, 231, 0.55) 20.23%,
    rgba(164, 236, 234, 0.47) 90.82%
  );
  background-clip: text;
  color: transparent;
`;
export const GradientCart = styled(ChakraBox)`
  border-radius: 24px;
  border: 1px solid var(--gradient-purple-80, rgba(135, 129, 231, 0.69));

  opacity: 0.64;
  background: linear-gradient(
    89deg,
    #645cff 26.34%,
    #0083ae 72.83%,
    #006dbc 102.91%
  );

  backdrop-filter: blur(19.950000762939453px);
`;
export const BoxCartGradient = styled(ChakraBox)`
  background: linear-gradient(80deg, #8781e7 55%, #a4ecea 100%);
`;
export const BackgroundGradient = styled(ChakraBox)`
  background: linear-gradient(80deg, #8781e7 55%, #a4ecea 100%);
`;
