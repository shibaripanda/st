import { Space, TextInput } from '@mantine/core';
import axios from 'axios';
import classes from './inputMaxCount.module.css';

export function InputMaxCount({openAlertModal, setMaxCountMessages, maxCountMessages}: any) {

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
                    openAlertModal("Ошибка ввода")
                }
            }
        }
        />
        <Space h={'xs'}/>
        </>
    );
}