import React, {useRef, useState} from 'react';

import {StyleSheet, Text, TextInput, View, TextInputProps} from 'react-native';

interface InputProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
}

const Input = ({
  label,
  value,
  onChangeText,
  style,
  ...restProps
}: InputProps) => {
  const [labelStyle, setLabelStyle] = useState<any>([styles.labelContainer]);
  const [labelTextStyle, setLabelTextStyle] = useState<any>(
    styles.placeholderText,
  );
  const inputRef = useRef<TextInput>(null);

  const handleInputFocus = () => {
    setLabelStyle(labelStyle.concat(styles.activeLabel));
    setLabelTextStyle(styles.activeText);
  };

  const handleInputBlur = () => {
    if (!value) {
      setLabelStyle([styles.labelContainer]);
      setLabelTextStyle(styles.placeholderText);
    }
  };

  const handlePressLabel = () => {
    inputRef.current?.focus();
  };

  return (
    <View style={style}>
      <View style={labelStyle}>
        <Text
          style={[{fontSize: 16}, labelTextStyle]}
          onPress={handlePressLabel}
          suppressHighlighting>
          {label}
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={[{fontSize: 16}]}
          value={value}
          onChangeText={onChangeText}
          ref={inputRef}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          autoCapitalize="none"
          {...restProps}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    margin: 10,
    zIndex: 1,
    elevation: 1,
    shadowColor: 'white',
    position: 'absolute',
    selectTextOnFocus: false,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    zIndex: 0,
  },
  activeLabel: {
    top: -18,
    paddingHorizontal: 4,
  },
  activeText: {
    color: '#000',
    fontSize: 14,
  },
  placeholderText: {
    color: 'lightgray',
  },
});

export default Input;
