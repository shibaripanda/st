import { Button, Space, TextInput } from '@mantine/core';
import axios from 'axios';
import { Cont, Mess } from '../../pages/MainPage';
import { IconSquareX } from '@tabler/icons-react';

export function InputNewMessage({setCurrentError, limitContInTable, page, paginationStep, setNewMessage, newMessage, setContainers, maxCountMessages, containers, setStatusBarData}: any) {

    const regMessage = /^[A-Za-z0-9 .,!?'"@#$%^&*()\-_=+]*$/
    const existMessages = containers.map((cont: Cont) => cont.messages).flat().map((mes: Mess) => mes.message)

    return (
        <>
        <TextInput
        rightSection={
            <span
                style={{
                cursor: 'pointer',
                userSelect: 'none',
                padding: '8px',           
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                }}
                onClick={() => {
                    sessionStorage.removeItem('newMessage')
                    setNewMessage('')
                    setCurrentError('')
                }}
                >
                <IconSquareX />
                </span>
            }
        disabled={!maxCountMessages}
        placeholder=''
        value={newMessage ? newMessage.toString() : ''}
        label="Новое сообщение"
        onChange={(event) => {
            if(regMessage.test(event.target.value))
                sessionStorage.setItem('newMessage', event.target.value)
                setNewMessage(event.target.value)
                setCurrentError('')
            }
        }
        />
        <Space h={'xs'}/>
        <Button
        variant='default'
        disabled={!newMessage || !maxCountMessages || newMessage.length > 10 || existMessages.includes(newMessage)}
        onClick={async () => {
            await axios.post(import.meta.env.VITE_SERVER_LINK + '/use/addnewmessage', {newmessage: newMessage})
            .then(async (appData) => {
                    setStatusBarData({countMessages: appData.data.countMessages, countConts:appData.data.countConts})
                    if(page === 1){
                        setContainers((current: Cont[]) => {
                            return [appData.data.newOrUpdatedCont, ...current.filter((item: Cont) => item.id !== appData.data.newOrUpdatedCont.id)].splice(0, limitContInTable)
                        })
                    }
                    else{
                        await paginationStep(1)
                    }
                }
            )
            .catch((e) => setCurrentError(e.response.data.message))
        }}
        >
        Добавить сообщение
        </Button>
        </>
    );
}