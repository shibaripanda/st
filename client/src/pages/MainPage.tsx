import { MainTable } from "../components/table/MainTable"
import { useEffect, useState } from "react"
import axios from "axios"
import { StatusBar } from "../components/statusBar/statusBar"
import { ControlPanel } from "../components/controlPanel/ControlPanel"

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
        <ControlPanel 
        maxCountMessages={maxCountMessages} 
        setMaxCountMessages={setMaxCountMessages} 
        setContainers={setContainers} 
        containers={containers} 
        setSearchResult={setSearchResult} 
        findMessage={findMessage} 
        setFindMessage={setFindMessage}
        />
        <hr></hr>
        <StatusBar containers={containers} searchResult={searchResult} findMessage={findMessage}/>
        <hr></hr>
        <MainTable containers={containers}/>
    </>
    )
}