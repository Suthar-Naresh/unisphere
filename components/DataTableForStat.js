import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { DataTable, IconButton } from 'react-native-paper';

const DataTableForStat = ({ dataForTable }) => {
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([5, 6, 7]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );

  const [items] = useState(dataForTable);
  /*
  {
     key: 1,
     name: 'Devesy',
     email: 'devesy@nirma.ac.in',
     university: 'Nirma University',
   }

  */

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const showDataOnTap = (item) => {
    const cnt = `
    👤 : ${item.name}\n
    🪪 : ${item.roll}\n
    📱 : ${item.contact}\n
    🎓 : ${item.university}\n
    📩 : ${item.email}
    `;
    Alert.alert('Student details',cnt)
  }

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Name</DataTable.Title>
        <DataTable.Title>University</DataTable.Title>
        <DataTable.Title>Mobile</DataTable.Title>
        <DataTable.Title>Roll number</DataTable.Title>
      </DataTable.Header>

      {items.slice(from, to).map((item) => (
        <DataTable.Row key={item.key} onPress={()=>showDataOnTap(item)}>
          <DataTable.Cell>{item.name}</DataTable.Cell>
          <DataTable.Cell>{item.university}</DataTable.Cell>
          <DataTable.Cell>{item.contact}</DataTable.Cell>
          <DataTable.Cell>{item.roll}</DataTable.Cell>
          {/* <DataTable.Cell numeric>
            <IconButton
              icon="eye-outline"
              onPress={() => console.log(item)}
            />
          </DataTable.Cell> */}
        </DataTable.Row>
      ))}

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(items.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${items.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={'Rows per page'}
      />
    </DataTable>
  );
};

export default DataTableForStat;