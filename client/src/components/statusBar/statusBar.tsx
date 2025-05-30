import { Group } from "@mantine/core"
import { Cont, Mess } from "../../pages/MainPage"

export const StatusBar = ({containers, searchResult, findMessage}: any) => {

    const showSearchResult = () => {
        if(searchResult){
            return (
                <div>
                    Сообщение " {findMessage} " в контейнере № {searchResult.id}
                </div>
            )
        }
       
    }
    return (
        <Group justify="space-between" style={{marginLeft: '1vmax', marginRight: '1vmax'}}>
            <div>
                Количество контейнеров: {containers.length} Количество сообщений: {containers.map((cont: Cont) => cont.messages).flat().map((mes: Mess) => mes.message).length}
            </div>
            <div>
                {showSearchResult()}
            </div> 
        </Group>
    )
}