
import React, { useEffect, useState } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { TextInput, List, FAB } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers } from '../../redux/slices/customersSlice';

export default function CustomerListScreen({ navigation }) {
  const dispatch = useDispatch();
  const { list, loading } = useSelector(s => s.customers);
  const [q, setQ] = useState('');

  useEffect(()=> { dispatch(fetchCustomers({page:1, limit:20, q})); }, [q]);

  return (
    <View style={{flex:1}}>
      <TextInput placeholder="Search by name/email" value={q} onChangeText={setQ} style={{margin:8}}/>
      <FlatList
        data={list}
        keyExtractor={(item)=>item.id.toString()}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={()=> dispatch(fetchCustomers({page:1,q}))} />}
        renderItem={({item})=> (
          <List.Item
            title={item.name}
            description={`${item.email} • ${item.phone}`}
            onPress={()=> navigation.navigate('CustomerDetails', { id: item.id })}
          />
        )}
      />
      <FAB icon="plus" onPress={()=> navigation.navigate('CustomerDetails')} style={{ position: 'absolute', right: 16, bottom: 16 }} />
    </View>
  );
}
