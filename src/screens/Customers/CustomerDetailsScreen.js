
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Title, Paragraph, Button, List } from 'react-native-paper';
import api from '../../api/api';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeadsByCustomer } from '../../redux/slices/leadsSlice';

export default function CustomerDetailsScreen({ route, navigation }) {
  const { id } = route.params || {};
  const [customer, setCustomer] = useState(null);
  const dispatch = useDispatch();
  const leads = useSelector(s => s.leads.byCustomer[id] || []);

  useEffect(()=> {
    if (id) {
      api.get(`/customers/${id}`).then(r => setCustomer(r.data));
      dispatch(fetchLeadsByCustomer({ customerId: id }));
    }
  }, [id]);

  return (
    <ScrollView style={{ padding: 12 }}>
      {customer ? (
        <>
          <Title>{customer.name}</Title>
          <Paragraph>Email: {customer.email}</Paragraph>
          <Paragraph>Phone: {customer.phone}</Paragraph>
          <Button mode="outlined" onPress={()=> navigation.navigate('LeadForm', { customerId: id })}>Add Lead</Button>
          <Title style={{marginTop: 12}}>Leads</Title>
          {leads.map(l=> (
            <List.Item key={String(l.id)} title={l.title} description={`${l.status} • $${l.value}`} />
          ))}
        </>
      ) : (
        <Paragraph>Loading...</Paragraph>
      )}
    </ScrollView>
  );
}
