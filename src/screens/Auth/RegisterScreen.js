
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Title, Text } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/slices/authSlice';

const RegSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  name: Yup.string().required('Required'),
  password: Yup.string().min(4, 'Too short').required('Required')
});

export default function RegisterScreen({ navigation }) {
  const dispatch = useDispatch();
  const auth = useSelector(s => s.auth);

  return (
    <View style={styles.container}>
      <Title>Register</Title>
      <Formik
        initialValues={{ email: '', password: '', name: '' }}
        validationSchema={RegSchema}
        onSubmit={(values) => { dispatch(register(values)); }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput label="Name" onChangeText={handleChange('name')} onBlur={handleBlur('name')} value={values.name} />
            {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}
            <TextInput label="Email" onChangeText={handleChange('email')} onBlur={handleBlur('email')} value={values.email} />
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
            <TextInput label="Password" secureTextEntry onChangeText={handleChange('password')} onBlur={handleBlur('password')} value={values.password} />
            {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}
            <Button mode="contained" onPress={handleSubmit} loading={auth.loading} style={{ marginTop: 16 }}>Create account</Button>
            <Button onPress={() => navigation.navigate('Login')}>Back to login</Button>
            {auth.error && <Text style={styles.error}>{auth.error}</Text>}
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  error: { color: 'red', marginTop: 4 }
});
