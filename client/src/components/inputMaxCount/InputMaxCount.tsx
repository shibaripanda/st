import { Button, Modal, Space, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';
import classes from './inputMaxCount.module.css';

export function InputMaxCount({setMaxCountMessages, maxCountMessages}: any) {

    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
        <TextInput
        error={!maxCountMessages}
        classNames={classes}
        placeholder=''
        value={maxCountMessages || ''}
        label="Объём контейнера"
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