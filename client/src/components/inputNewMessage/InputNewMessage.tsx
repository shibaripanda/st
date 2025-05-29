import { Button, Modal, Space, TextInput } from '@mantine/core';
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';
import { Cont } from '../../pages/MainPage';

export function InputNewMessage({setConteiniers, countMessage}: any) {

    const [newMessage, setNewMessage] = useState<string>('')
    const [opened, { close }] = useDisclosure(false);

    return (
        <>
        <TextInput
        disabled={!countMessage}
        placeholder=''
        value={newMessage ? newMessage.toString() : ''}
        label="Новое сообщение"
        onChange={(event) => {
                const maxCount = event.target.value
                setNewMessage(maxCount)
            }
        }
        />
        <Space h={'xs'}/>
        <Button
        variant='default'
        disabled={!newMessage || !countMessage}
        onClick={async () => {
            const cont = await axios.post(import.meta.env.VITE_SERVER_LINK + '/use/addnewmessage', {newmessage: newMessage})
            console.log(cont)
            setConteiniers((current: Cont[]) => {
                return [cont.data, ...current.filter((item: Cont) => item.id !== cont.data.id)]
            })
        }}
        >
        Установить
        </Button>
        <Modal opened={opened} onClose={close} title="Ошибка ввода">
        <Button
        onClick={close}
        >
        Ok
        </Button>
        </Modal>
        </>
    );
}