import { Query, QueryResult } from '@apollo/react-components';
import { DataContainer, DataItem } from 'components/styles/DataModal.styles';
import { allUsersQuery } from 'data/queries';
import * as React from 'react';
import { StoreContext } from '../../../store/store';
import { Modal } from '../../Modal/Modal.component';
import { Input } from '../../styles/input.styles';
import { debounce } from 'lodash';
import { CloseButton, Form, SubmitButton } from '../../styles/ModalButtons';



interface Props {
    exitCallback: () => void;
}

export function JoinDM(props: Props) {
    const { user, dispatch }= React.useContext(StoreContext)
    const [inputValue, setInputValue] = React.useState<string>('')
    const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>)=> setInputValue(e.target.value);
    const refetchRef = React.useRef<Function>()
    const fetchData  = debounce((e:React.ChangeEvent<HTMLInputElement>) => {
        (refetchRef as any).current({currentUserId: user,filter: `%${e.target.value}%` })}
        ,300)

    return (
        <Modal close={props.exitCallback} title="Create channel">
            
            <>
            {/* <h1>Create channel</h1> */}
            <Form onSubmit={(e: any)=> {
                // e.preventDefault();
                // createChannel({variables: {name: e.target.channelName.value}});
                (e.target as any).reset()
            }}>  
                <label htmlFor="userName">Username</label>
                <Input name="userName" id = "userName" placeholder="eg leads" onChange ={onChangeInputValue}/>
                <CloseButton onClick={props.exitCallback}>Cancel</CloseButton>
                <SubmitButton disabled={inputValue === ''} type = "submit"> Join DM </SubmitButton>
            </Form>
            <Query query = {allUsersQuery}
                variables = {{currentUserId: user, filter: "%%"}}>
                {({loading, error, data, refetch}:
                QueryResult) => {
                    console.log(data)
                    refetchRef.current = refetch
                    if (loading) {
                        return <p>loading</p>
                    }
                    return (
                    <>
                        <DataContainer>
                        {data.User.map((user: {id: string, username: string, Memberships: any}) =>
                            (<DataItem 
                                key = {user.id} 
                                >
                                @ {user.username}
                            </DataItem>
                            ))}
                        </DataContainer>
                    </>
                    )
                }}
            </Query>
            </>
        </Modal>
        
    )
}