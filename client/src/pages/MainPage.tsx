import { Grid } from "@mantine/core"
import { InputMaxCount } from "../components/inputMaxCount/InputMaxCount"
import { MainTable } from "../components/table/MainTable"
import { useEffect, useState } from "react"
import { InputNewMessage } from "../components/inputNewMessage/InputNewMessage"
import axios from "axios"

export interface Mess {
    id: number
    message: string
}

export interface Cont {
    id: number
    messages: Mess[]
}

export const MainPage = () => {

    const [conteiniers, setConteiniers] = useState<Cont[]>([])
    const [countMessage, setCountMessage] = useState<Number | undefined>(undefined)

    useEffect(() => {
        getAllConts()
    }, []);

    const getAllConts = async () => {
        const conts = await axios.get(import.meta.env.VITE_SERVER_LINK + '/use/getallconts')
        console.log(conts.data)
        setConteiniers(conts.data.conts.reverse())
        setCountMessage(conts.data.max)
    }

    return (
        <>
        <Grid style={{margin: '15px'}}>
            <Grid.Col span={2}>
                <InputMaxCount setCountMessage={setCountMessage}/>
            </Grid.Col>
            <Grid.Col span={1}>
                {/* <InputMaxCount/> */}
            </Grid.Col>
            <Grid.Col span={4}>
                <InputNewMessage setConteiniers={setConteiniers} countMessage={countMessage}/>
            </Grid.Col>
            <Grid.Col span={1}>
                {/* <InputMaxCount/> */}
            </Grid.Col>
            <Grid.Col span={4}>
                <InputMaxCount/>
            </Grid.Col>
        </Grid>
        <hr></hr>
        <MainTable conteiniers={conteiniers}/>
    </>
    )
}