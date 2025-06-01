import { Button, Space, TextInput } from '@mantine/core';
import { IconSquareX } from '@tabler/icons-react';
import axios from 'axios';

export function InputFindMessage({setCurrentError, openAlertModal, findMessage, setFindMessage, maxCountMessages, setSearchResult}: any) {

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
                    setSearchResult(undefined)
                    sessionStorage.removeItem('findMessage')
                    setFindMessage('')
                    setCurrentError('')
                    }
                }
                >
                <IconSquareX />
                </span>
            }
        disabled={!maxCountMessages}
        placeholder=''
        value={findMessage}
        label="Поиск сообщения"
        onChange={(event) => {
            setSearchResult(undefined)
            sessionStorage.setItem('findMessage', event.target.value)
            setFindMessage(event.target.value)
            setCurrentError('')
            }
        }
        />
        <Space h={'xs'}/>
        <Button
        variant='default'
        disabled={!findMessage || !maxCountMessages}
        onClick={async () => {
            const contId = await axios.post(import.meta.env.VITE_SERVER_LINK + '/use/findcontbymessage', {message: findMessage})
            if(contId.data){
                setCurrentError('')
                setSearchResult(contId.data)
            }
            else{
                setSearchResult(undefined)
                setCurrentError('')
                openAlertModal("Сообщение не найдено")
            }
        }}
        >
        Найти сообщение
        </Button>
        </>
    );
}