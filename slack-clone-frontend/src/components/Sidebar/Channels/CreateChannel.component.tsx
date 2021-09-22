import { Mutation } from '@apollo/react-components';
import * as React from 'react';
import { StoreContext } from '../../../store/store';
import { CreateMembership, CreateChannelMutation } from '../../../data/mutations';
import { Modal } from '../../Modal/Modal.component';
import { Input } from '../../styles/input.styles';
import { CloseButton, Form, SubmitButton } from '../../styles/ModalButtons';



interface Props {
    exitCallback: () => void;
}

export function Finder(props: Props) {
    const { user } = React.useContext(StoreContext)
    const [inputValue, setInputValue] = React.useState<string>('')
    const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>)=> setInputValue(e.target.value);
    return (
        <Modal close={props.exitCallback} title="Create channel">

            <Mutation mutation={CreateMembership} update={()=>props.exitCallback()}>
            {(createMembership: any, { data }: any) => (
            <Mutation
                mutation={CreateChannelMutation}
                update={(cache: any,data: any) => {
                createMembership({variables:{channelId: data.data.insert_Channel.returning[0].id,userId: user}});
            }}>
                {(createChannel: any, { data }: any) => (
            <>
            {/* <h1>Create channel</h1> */}
            <Form onSubmit={(e: any)=> {
                e.preventDefault();
                createChannel({variables: {name: e.target.channelName.value}});
                (e.target as any).reset()
            }}>  
                <label htmlFor="channelName">Name</label>
                <Input name="channelName" id = "channelName" placeholder="eg leads" onChange={onChangeInputValue} />
                <CloseButton onClick={props.exitCallback}>Cancel</CloseButton>
                <SubmitButton disabled={inputValue === ''} type = "submit"> Create </SubmitButton>
            </Form>
            </>
            )}
            </ Mutation>
            )}
            </Mutation>
        </Modal>
        
    )
}