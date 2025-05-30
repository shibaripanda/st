import { Button, Modal, Space, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';
// import { useState } from 'react';

export function InputMaxCount({setMaxCountMessages, maxCountMessages}: any) {

    const [opened, { open, close }] = useDisclosure(false);
    // const [max, setMax] = useState<number | undefined>(undefined)

    return (
        <>
        <TextInput
        placeholder=''
        value={maxCountMessages || ''}
        label="Количество собщений в контейнере"
        onChange={async (event) => {
                const maxCount = Number(event.target.value)
                if(event.target.value === ''){
                    setMaxCountMessages(undefined)
                }
                else if(!isNaN(maxCount) && maxCount > 0){
                    const maxCountFromServer = await axios.post(import.meta.env.VITE_SERVER_LINK + '/use/setmaxmessages', {maxmessages: maxCount})
                    setMaxCountMessages(maxCountFromServer.data)
                }
                else{
                    open()
                }
            }
        }
        />
        <Space h={'xs'}/>
        {/* <Button
        variant='default'
        disabled={!max}
        onClick={async () => {
            if(max && !isNaN(Number(max))){
                
                setMaxCountMessages(maxRes.data)
            }
        }}
        >
        Установить
        </Button> */}
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