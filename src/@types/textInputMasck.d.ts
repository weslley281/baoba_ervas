declare module 'react-native-text-input-mask' {
  import { Component } from 'react';
  import { TextInputProps } from 'react-native';

  type TextInputMaskTypeProp =
    | 'cel-phone'
    | 'datetime'
    | 'money'
    | 'only-numbers'
    | 'custom';

  interface TextInputMaskProps extends TextInputProps {
    mask: string;
    type?: TextInputMaskTypeProp;
    options?: any;
    value?: string;
    includeRawValueInChangeText?: boolean;
    onChangeText?: (formatted: string, extracted?: string) => void;
    onTextChange?: (text: string) => void;
  }

  class TextInputMask extends Component<TextInputMaskProps> {}

  export default TextInputMask;
}
