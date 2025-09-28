
import React, { useMemo } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { Title } from 'react-native-paper';
import { PieChart, BarChart } from 'react-native-chart-kit';
import { useSelector } from 'react-redux';

export default function DashboardScreen() {
  const leadsByCustomerMap = useSelector(s => s.leads.byCustomer);
  const allLeads = Object.values(leadsByCustomerMap).flat();

  const statusCounts = useMemo(()=> {
    const counts = { New:0, Contacted:0, Converted:0, Lost:0 };
    allLeads.forEach(l => { counts[l.status] = (counts[l.status] || 0) + 1; });
    return counts;
  }, [allLeads]);

  const totalValue = allLeads.reduce((s, l)=> s + (l.value || 0), 0);

  const pieData = Object.keys(statusCounts).map((k, idx)=> ({ name: k, population: statusCounts[k], color: ['#f00','#0f0','#00f','#ff0'][idx], legendFontColor: '#7F7F7F', legendFontSize: 12 }));
  const screenWidth = Dimensions.get('window').width;

  return (
    <ScrollView contentContainerStyle={{ padding: 12 }}>
      <Title>Leads by status</Title>
      <PieChart data={pieData} width={screenWidth-24} height={220} accessor="population" />
      <Title style={{ marginTop: 12 }}>Total value of leads</Title>
      <BarChart
        data={{ labels: ['Total Value'], datasets: [{ data: [totalValue] }] }}
        width={screenWidth-24}
        height={160}
        yAxisLabel="$"
        fromZero
      />
    </ScrollView>
  );
}
