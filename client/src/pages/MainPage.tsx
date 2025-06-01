import { MainTable } from "../components/table/MainTable"
import { useEffect, useState } from "react"
import axios from "axios"
import { StatusBar } from "../components/statusBar/statusBar"
import { ControlPanel } from "../components/controlPanel/ControlPanel"
import { useDisclosure } from "@mantine/hooks"
import { ShowModal } from "../components/showModal/ShowModal"
import { Center, Pagination } from "@mantine/core"

export interface Mess {
    id: number
    message: string
}

export interface Cont {
    id: number
    messages: Mess[]
}

export const MainPage = () => {

    const limitContInTable = 10
    const [containers, setContainers] = useState<Cont[]>([])
    const [newMessage, setNewMessage] = useState<string>(sessionStorage.getItem('newMessage') || '')
    const [maxCountMessages, setMaxCountMessages] = useState<Number | undefined>(undefined)
    const [findMessage, setFindMessage] = useState<string>(sessionStorage.getItem('findMessage') || '')
    const [searchResult, setSearchResult] = useState<Cont | undefined>(undefined)
    const [statusBarData, setStatusBarData] = useState<{countMessages: number, countConts: number}>({countMessages: 0, countConts: 0})
    const [opened, showModal] = useDisclosure(false);
    const [alertMessage, setAlertMessage] = useState('')
    const [page, setPage] = useState(1)
    const [currentError, setCurrentError] = useState('')

    useEffect(() => {
        getDataForStartApp(page)
    }, []);

    const getDataForStartApp = async (page: number) => {
        const appData = await axios.post(import.meta.env.VITE_SERVER_LINK + '/use/getdataforstartapp', {limit: limitContInTable, offset: (page - 1) * limitContInTable})
        setStatusBarData({countMessages: appData.data.countMessages, countConts:appData.data.countConts})
        setContainers(appData.data.conts)
        setMaxCountMessages(appData.data.max)
    }

    const paginationStep = async (page: number) => {
        setPage(page)
        await getDataForStartApp(page)
    }

    const openAlertModal = (message: string) => {
        setAlertMessage(message)
        showModal.open()
    }

    const ifNotFullPage = (num: number) => {
        if(!Number.isInteger(num)){
            return 1
        }
        return 0
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
        paginationStep={paginationStep}
        page={page}
        limitContInTable={limitContInTable}
        setCurrentError={setCurrentError}
        />
        <hr></hr>
        <StatusBar currentError={currentError} statusBarData={statusBarData} searchResult={searchResult} findMessage={findMessage}/>
        <hr></hr>
        <MainTable containers={containers}/>
        {(() => {
            if(statusBarData.countConts > limitContInTable){
                return (
                    <Center>
                        <Pagination 
                        total={(statusBarData.countConts / limitContInTable) + ifNotFullPage(statusBarData.countConts / limitContInTable)} 
                        value={page} 
                        onChange={async (event) => await paginationStep(event)} 
                        size="xs" 
                        radius="xs" />
                    </Center>
                )
            }
        })()}
        <ShowModal opened={opened} showModal={showModal} alertMessage={alertMessage}/>
    </>
    )
}