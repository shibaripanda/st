import { Button, Space, TextInput } from '@mantine/core';
import { useState } from 'react';
// import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';
import { Cont, Mess } from '../../pages/MainPage';

export function InputNewMessage({setContainers, maxCountMessages, containers}: any) {

    const [newMessage, setNewMessage] = useState<string>('')
    // const [opened, { close }] = useDisclosure(false);
    const regMessage = /^[A-Za-z0-9 .,!?'"@#$%^&*()\-_=+]*$/
    const existMessages = containers.map((cont: Cont) => cont.messages).flat().map((mes: Mess) => mes.message)

    return (
        <>
        <TextInput
        disabled={!maxCountMessages}
        placeholder=''
        value={newMessage ? newMessage.toString() : ''}
        label="Новое сообщение"
        onChange={(event) => {
            if(regMessage.test(event.target.value))
                setNewMessage(event.target.value)
            }
        }
        />
        <Space h={'xs'}/>
        <Button
        variant='default'
        disabled={!newMessage || !maxCountMessages || newMessage.length > 10 || existMessages.includes(newMessage)}
        onClick={async () => {
            const updatedContFromServer = await axios.post(import.meta.env.VITE_SERVER_LINK + '/use/addnewmessage', {newmessage: newMessage})
            console.log(updatedContFromServer)
            setContainers((current: Cont[]) => {
                return [updatedContFromServer.data, ...current.filter((item: Cont) => item.id !== updatedContFromServer.data.id)]
            })
        }}
        >
        Добавить сообщение
        </Button>
        {/* <Modal opened={opened} onClose={close} title="Ошибка сообщения">
        <Button
        onClick={close}
        >
        Ok
        </Button>
        </Modal> */}
        </>
    );
}