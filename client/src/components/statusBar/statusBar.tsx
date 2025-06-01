import { Group, Text } from "@mantine/core";

export const StatusBar = ({currentError, statusBarData, searchResult, findMessage}: any) => {

    const showSearchResult = () => {
        if(searchResult){
            return (
                <Text c='red'>
                    Сообщение " {findMessage} " в контейнере № {searchResult}
                </Text>
            )
        }
       
    }

    const showCurrentError = () => {
        if(currentError){
            return (
                <Text c='red'>
                    Ошибка: {currentError}
                </Text>
            )
        }
       
    }

    return (
        <Group justify="space-between" style={{marginLeft: '1vmax', marginRight: '1vmax'}}>
            <div>
                Количество контейнеров: {statusBarData.countConts}  |  Количество сообщений: {statusBarData.countMessages}
            </div>
            <div>
                {showCurrentError()}
            </div>
            <div>
                {showSearchResult()}
            </div> 
        </Group>
    )
}