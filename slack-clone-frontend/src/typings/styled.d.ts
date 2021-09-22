import 'styled-components'

declare module 'styled-components' {
    export interface DefaultTheme {
      borderColorDark: string;
      borderColorLight: string;
      hoverBorderColor: string;
      textColorLight: string;
      textColorDark: string;
      backgroundColorLight: string;
      backgroundColorGrey: string;
    }
  }
  

  // declare module: d.tsの場合のモジュールの宣言・型定義
