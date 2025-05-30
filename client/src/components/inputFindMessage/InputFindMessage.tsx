import { Button, Space, Modal, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Cont, Mess } from '../../pages/MainPage';

export function InputFindMessage({containers, findMessage, setFindMessage, maxCountMessages, setSearchResult}: any) {

    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
        <TextInput
        disabled={!maxCountMessages}
        placeholder=''
        value={findMessage}
        label="Поиск сообщения"
        onChange={(event) => {
            setSearchResult(undefined)
            setFindMessage(event.target.value)
            }
        }
        />
        <Space h={'xs'}/>
        <Button
        variant='default'
        disabled={!findMessage}
        onClick={async () => {
            const result = containers.find((cont: Cont) => cont.messages.some((mes: Mess) => mes.message === findMessage))
            console.log(result)
            if(result){
                setSearchResult(result)
            }
            else{
                setSearchResult(undefined)
                open()
            }
        }}
        >
        Найти сообщение
        </Button>
        <Modal opened={opened} onClose={close} title="Сообщение не найдено">
        <Button
        onClick={close}
        >
        Ok
        </Button>
        </Modal>
        </>
    );
}