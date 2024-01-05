import { Global, css } from '@emotion/react';
const Fonts = () => (
  <Global
    styles={css`
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 100;
        src: local('Inter'), url('./fonts/Inter/Inter-Thin.ttf');
      }
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 200;
        src: local('Inter'), url('./fonts/Inter/Inter-ExtraLight.ttf');
      }
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 300;
        src: local('Inter'), url('./fonts/Inter/Inter-Light.ttf');
      }
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        src: local('Inter'), url('./fonts/Inter/Inter-Regular.ttf');
      }
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        src: local('Inter'), url('./fonts/Inter/Inter-Medium.ttf');
      }
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        src: local('Inter'), url('./fonts/Inter/Inter-SemiBold.ttf');
      }
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 700;
        src: local('Inter'), url('./fonts/Inter/Inter-Bold.ttf');
      }
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 800;
        src: local('Inter'), url('./fonts/Inter/Inter-ExtraBold.ttf');
      }
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 900;
        src: local('Inter'), url('./fonts/Inter/Inter-Black.ttf');
      }
    `}
  />
);

export default Fonts;
