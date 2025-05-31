import { MainTable } from "../components/table/MainTable"
import { useEffect, useState } from "react"
import axios from "axios"
import { StatusBar } from "../components/statusBar/statusBar"
import { ControlPanel } from "../components/controlPanel/ControlPanel"
import { useDisclosure } from "@mantine/hooks"
import { ShowModal } from "../components/showModal/ShowModal"

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
    const [newMessage, setNewMessage] = useState<string>(sessionStorage.getItem('newMessage') || '')
    const [maxCountMessages, setMaxCountMessages] = useState<Number | undefined>(undefined)
    const [findMessage, setFindMessage] = useState<string>(sessionStorage.getItem('findMessage') || '')
    const [searchResult, setSearchResult] = useState<Cont | undefined>(undefined)
    const [statusBarData, setStatusBarData] = useState<{countMessages: number, countConts: number}>({countMessages: 0, countConts: 0})
    const [opened, showModal] = useDisclosure(false);
    const [alertMessage, setAlertMessage] = useState('')

    useEffect(() => {
        getDataForStartApp()
    }, []);

    const getDataForStartApp = async () => {
        const appData = await axios.post(import.meta.env.VITE_SERVER_LINK + '/use/getdataforstartapp', {limit: 100, offset: 0})
        setStatusBarData({countMessages: appData.data.countMessages, countConts:appData.data.countConts})
        setContainers(appData.data.conts)
        setMaxCountMessages(appData.data.max)
    }

    const openAlertModal = (message: string) => {
        setAlertMessage(message)
        showModal.open()
    }

    return (
        <>
        <ControlPanel
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        maxCountMessages={maxCountMessages} 
        setMaxCountMessages={setMaxCountMessages} 
        setContainers={setContainers} 
        containers={containers} 
        setSearchResult={setSearchResult} 
        findMessage={findMessage} 
        setFindMessage={setFindMessage}
        setStatusBarData={setStatusBarData}
        openAlertModal={openAlertModal}
        />
        <hr></hr>
        <StatusBar statusBarData={statusBarData} searchResult={searchResult} findMessage={findMessage}/>
        <hr></hr>
        <MainTable containers={containers}/>
        <ShowModal opened={opened} showModal={showModal} alertMessage={alertMessage}/>
    </>
    )
}