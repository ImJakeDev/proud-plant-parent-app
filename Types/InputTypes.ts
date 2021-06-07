export default interface TextInputProps {
  allowFontScaling?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoCompleteType?:
    | "off"
    | "username"
    | "password"
    | "email"
    | "name"
    | "tel"
    | "street-address"
    | "postal-code"
    | "cc-number"
    | "cc-csc"
    | "cc-exp"
    | "cc-exp-month"
    | "cc-exp-year";
  autoCorrect?: boolean;
  autoFocus?: boolean;
  blurOnSubmit?: boolean;
  caretHidden?: boolean;
  clearButtonMode?: "never" | "while-editing" | "unless-editing" | "always";
  clearTextOnFocus?: boolean;
  contextMenuHidden?: boolean;
  dataDetectorTypes?:
    | "phoneNumber"
    | "link"
    | "address"
    | "calendarEvent"
    | "none"
    | "all"
    | ["phoneNumber" | "link" | "address" | "calendarEvent" | "none" | "all"];
  defaultValue?: string;
  disableFullscreenUI?: boolean;
  editable?: boolean;
  enablesReturnKeyAutomatically?: boolean;
  importantForAutofill?:
    | "auto"
    | "no"
    | "noExcludeDescendants"
    | "yes"
    | "yesExcludeDescendants";
  inlineImageLeft?: string;
  inlineImagePadding?: number;
  inputAccessoryViewID?: string;
  keyboardAppearance?: "default" | "light" | "dark";
  keyboardType?:
    | "default"
    | "email-address"
    | "numeric"
    | "phone-pad"
    | "ascii-capable"
    | "numbers-and-punctuation"
    | "url"
    | "number-pad"
    | "name-phone-pad"
    | "decimal-pad"
    | "twitter"
    | "web-search"
    | "visible-password";
  maxFontSizeMultiplier?: number;
  maxLength?: number;
  multiline?: boolean;
  numberOfLines?: number;
  onBlur?: () => any;
  onChange?: () => void;
  onChangeText?: (value?: any) => any;
  onContentSizeChange?: () => void;
  onEndEditing?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  onFocus?: () => void;
  onKeyPress?: () => void;
  onLayout?: () => void;
  onScroll?: () => void;
  onSelectionChange?: () => void;
  onSubmitEditing?: () => void;
  placeholder?: string;
  placeholderTextColor?: string;
  returnKeyLabel?: string;
  returnKeyType?:
    | "done"
    | "go"
    | "next"
    | "search"
    | "send"
    | "none"
    | "previous"
    | "default"
    | "emergency-call"
    | "google"
    | "join"
    | "route"
    | "yahoo";
  rejectResponderTermination?: boolean;
  scrollEnabled?: boolean;
  secureTextEntry?: boolean;
  selection?: { start?: number; end?: number };
  selectionColor?: string;
  selectTextOnFocus?: boolean;
  showSoftInputOnFocus?: boolean;
  spellCheck?: boolean;
  textAlign?: "left" | "center" | "right";
  textContentType?:
    | "none"
    | "URL"
    | "addressCity"
    | "addressCityAndState"
    | "addressState"
    | "countryName"
    | "creditCardNumber"
    | "emailAddress"
    | "familyName"
    | "fullStreetAddress"
    | "givenName"
    | "jobTitle"
    | "location"
    | "middleName"
    | "name"
    | "namePrefix"
    | "nameSuffix"
    | "nickname"
    | "organizationName"
    | "postalCode"
    | "streetAddressLine1"
    | "streetAddressLine2"
    | "sublocality"
    | "telephoneNumber"
    | "username"
    | "password";
  passwordRules?: string;
  style?: {};
  textBreakStrategy?: "simple" | "highQuality" | "balanced";
  underlineColorAndroid?: string;
  value?: string;
}