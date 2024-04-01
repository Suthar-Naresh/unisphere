import { useEffect, useState } from 'react';
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

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Name</DataTable.Title>
        <DataTable.Title>Email</DataTable.Title>
        <DataTable.Title>University</DataTable.Title>
      </DataTable.Header>

      {items.slice(from, to).map((item) => (
        <DataTable.Row key={item.key} onPress={() => alert(`Name:${item.name}\nUniversity:${item.university}\nEmail:${item.email}`)}>
          <DataTable.Cell>{item.name}</DataTable.Cell>
          <DataTable.Cell>{item.email}</DataTable.Cell>
          <DataTable.Cell>{item.university}</DataTable.Cell>
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