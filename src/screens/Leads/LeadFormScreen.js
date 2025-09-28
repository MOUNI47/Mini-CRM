
import React from 'react';
import { View } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { createLead } from '../../redux/slices/leadsSlice';

const LeadSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string(),
  status: Yup.string().oneOf(['New','Contacted','Converted','Lost']).required(),
  value: Yup.number().min(0)
});

export default function LeadFormScreen({ route, navigation }) {
  const { customerId } = route.params || {};
  const dispatch = useDispatch();

  return (
    <View style={{ padding: 12 }}>
      <Formik
        initialValues={{ title: '', description: '', status: 'New', value: 0, customerId }}
        validationSchema={LeadSchema}
        onSubmit={async (values) => {
          await dispatch(createLead({ ...values, createdAt: new Date().toISOString() }));
          navigation.goBack();
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput label="Title" onChangeText={handleChange('title')} onBlur={handleBlur('title')} value={values.title} />
            {touched.title && errors.title && <HelperText type="error">{errors.title}</HelperText>}
            <TextInput label="Description" onChangeText={handleChange('description')} value={values.description} />
            <TextInput label="Status" onChangeText={handleChange('status')} value={values.status} />
            <TextInput label="Value" onChangeText={handleChange('value')} value={String(values.value)} keyboardType="numeric" />
            <Button mode="contained" onPress={handleSubmit} style={{ marginTop: 12 }}>Save</Button>
          </>
        )}
      </Formik>
    </View>
  );
}
