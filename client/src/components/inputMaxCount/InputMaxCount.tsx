import { Button, Modal, Space, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';
import { useState } from 'react';

export function InputMaxCount({setCountMessage}: any) {

    
    const [opened, { open, close }] = useDisclosure(false);
    const [max, setMax] = useState<number | undefined>(undefined)

    return (
        <>
        <TextInput
        placeholder=''
        value={max}
        label="Количество собщений в контейнере"
        onChange={(event) => {
                const maxCount = Number(event.target.value)
                if(!isNaN(maxCount) && maxCount > 0){
                    setMax(maxCount)
                }
                else if(event.target.value === ''){
                    setMax(undefined)
                }
                else{
                    open()
                }
            }
        }
        />
        <Space h={'xs'}/>
        <Button
        variant='default'
        disabled={!max}
        onClick={async () => {
            if(max && !isNaN(Number(max))){
                const maxRes = await axios.post(import.meta.env.VITE_SERVER_LINK + '/use/setmaxmessages', {maxmessages: max})
                setCountMessage(maxRes.data)
            }
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