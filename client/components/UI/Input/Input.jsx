import { Text, View, StyleSheet, TextInput } from 'react-native';
import { ErrMsg } from '../..';
import { useFormikContext } from 'formik';

const Input = ({ name, type, placeholder, ...props }) => {
  const { setFieldTouched, values, setFieldValue, touched, errors } =
    useFormikContext();
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        {...props}
      />
      <ErrMsg error={errors[name]} visible={touched[name]} />
    </View>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#f0c13f',
    padding: 15,
    marginBottom: 5,
    borderRadius: 25,
    width: '100%',
  },
});

export default Input;
