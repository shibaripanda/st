import { Center, Table } from '@mantine/core';
import { Cont, Mess } from '../../pages/MainPage';

export function MainTable({containers} : any) {
  if(containers.length){
    const rows = containers.map((cont: Cont) => {
      return (
        <Table.Tr key={cont.id}>
          <Table.Td width={'10%'}>
            <Center>{cont.id}</Center>
          </Table.Td>
          <Table.Td>
            {cont.messages.map((item: Mess) => item.message).join(', ')}
          </Table.Td>
        </Table.Tr>
      );
    });

    return (
      <Table.ScrollContainer minWidth={800}>
        <Table verticalSpacing="xs">
          <Table.Thead>
            <Table.Tr>
              <Table.Th><Center>Контейнер</Center></Table.Th>
              <Table.Th><Center>Сообщения</Center></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    );
  }

  return (
    <Center>
      Контейнеров нет в базе данных
    </Center>
  )
}