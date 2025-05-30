import { Grid } from "@mantine/core"
import { InputMaxCount } from "../components/inputMaxCount/InputMaxCount"
import { MainTable } from "../components/table/MainTable"
import { useEffect, useState } from "react"
import { InputNewMessage } from "../components/inputNewMessage/InputNewMessage"
import axios from "axios"
import { StatusBar } from "../components/statusBar/statusBar"
import { InputFindMessage } from "../components/inputFindMessage/InputFindMessage"

export interface Mess {
    id: number
    message: string
}

export interface Cont {
    id: number
    messages: Mess[]
}

export const MainPage = () => {

    const [containers, setContainers] = useState<Cont[]>([])
    const [maxCountMessages, setMaxCountMessages] = useState<Number | undefined>(undefined)
    const [findMessage, setFindMessage] = useState<string>('')
    const [searchResult, setSearchResult] = useState<Cont | undefined>(undefined)

    useEffect(() => {
        getAllConts()
    }, []);

    const getAllConts = async () => {
        const conts = await axios.get(import.meta.env.VITE_SERVER_LINK + '/use/getallconts')
        console.log(conts.data)
        setContainers(conts.data.conts.reverse())
        setMaxCountMessages(conts.data.max)
    }

    return (
        <>
        <Grid style={{margin: '15px'}} align="center">
            <Grid.Col span={1}>
                <></>
            </Grid.Col>
            <Grid.Col span={2}>
                <InputMaxCount maxCountMessages={maxCountMessages} setMaxCountMessages={setMaxCountMessages}/>
            </Grid.Col>
            <Grid.Col span={1}>
                <></>
            </Grid.Col>
            <Grid.Col span={3}>
                <InputNewMessage setContainers={setContainers} maxCountMessages={maxCountMessages} containers={containers}/>
            </Grid.Col>
            <Grid.Col span={1}>
                <></>
            </Grid.Col>
            <Grid.Col span={3}>
                <InputFindMessage setSearchResult={setSearchResult} maxCountMessages={maxCountMessages} containers={containers} findMessage={findMessage} setFindMessage={setFindMessage}/>
            </Grid.Col>
            <Grid.Col span={1}>
                <></>
            </Grid.Col>
        </Grid>
        <hr></hr>
        <StatusBar containers={containers} searchResult={searchResult} findMessage={findMessage}/>
        <hr></hr>
        <MainTable containers={containers}/>
    </>
    )
}