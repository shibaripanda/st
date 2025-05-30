import { Grid } from "@mantine/core"
import { InputMaxCount } from "../inputMaxCount/InputMaxCount"
import { InputNewMessage } from "../inputNewMessage/InputNewMessage"
import { InputFindMessage } from "../inputFindMessage/InputFindMessage"

export const ControlPanel = ({maxCountMessages, setMaxCountMessages, setContainers, containers, setSearchResult, findMessage, setFindMessage}: any) => {
    return (
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
    )
}