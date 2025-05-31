import { Grid } from "@mantine/core"
import { InputMaxCount } from "../inputMaxCount/InputMaxCount"
import { InputNewMessage } from "../inputNewMessage/InputNewMessage"
import { InputFindMessage } from "../inputFindMessage/InputFindMessage"

export const ControlPanel = ({openAlertModal, setNewMessage, newMessage, setStatusBarData, maxCountMessages, setMaxCountMessages, setContainers, containers, setSearchResult, findMessage, setFindMessage}: any) => {
    return (
        <Grid style={{margin: '15px'}} align="center">
            <Grid.Col span={1}>
                <></>
            </Grid.Col>
            <Grid.Col span={2}>
                <InputMaxCount openAlertModal={openAlertModal} maxCountMessages={maxCountMessages} setMaxCountMessages={setMaxCountMessages}/>
            </Grid.Col>
            <Grid.Col span={1}>
                <></>
            </Grid.Col>
            <Grid.Col span={3}>
                <InputNewMessage newMessage={newMessage} setNewMessage={setNewMessage} setStatusBarData={setStatusBarData} setContainers={setContainers} maxCountMessages={maxCountMessages} containers={containers}/>
            </Grid.Col>
            <Grid.Col span={1}>
                <></>
            </Grid.Col>
            <Grid.Col span={3}>
                <InputFindMessage openAlertModal={openAlertModal}  setSearchResult={setSearchResult} maxCountMessages={maxCountMessages} findMessage={findMessage} setFindMessage={setFindMessage}/>
            </Grid.Col>
            <Grid.Col span={1}>
                <></>
            </Grid.Col>
        </Grid>
    )
}
