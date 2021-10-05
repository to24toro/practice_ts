import { Mutation, MutationFunction, Query,QueryResult } from '@apollo/react-components';
import * as React from 'react';
import styled from 'styled-components';
import { allChannelsQuery } from '../../../data/queries';
import { Modal } from '../../Modal/Modal.component';
import { Input } from '../../styles/input.styles';
import { Form } from '../../styles/ModalButtons';
import { DataContainer, DataItem } from 'components/styles/DataModal.styles';
import { debounce } from 'lodash';
import { Actions, StoreContext } from '../../../store/store';
import { joinChannel } from '../../../data/mutations';

interface Props {
    exitCallback: ()=> void;
}



const SearchInput = styled(Input) `
    width: 100%;
    box-sizing: border-box;
`;
export function JoinChannel (props: Props) {
    const { user, dispatch }= React.useContext(StoreContext)
    const refetchRef = React.useRef<Function>()
    const createMembershipRef = React.useRef<MutationFunction>()
    const fetchData  = debounce((e:React.ChangeEvent<HTMLInputElement>) => {
        (refetchRef as any).current({channelName:`%${e.target.value}%`});
        },300)
    const filterChannels = (e:React.ChangeEvent<HTMLInputElement>) => {
        e.persist()
        fetchData(e)
    }
    function selectChannel(channel: {id: string, name:string},memberships: {userId: string}[]){
        if (memberships.some(membership => membership.userId===user)) {
            dispatch({type: Actions.SELECTED_CHANNEL,payload:channel})
            props.exitCallback()
        } else {
            (createMembershipRef as any).current(
                {variables: {channelId: channel.id, userId:user}}).then((resp:any) => {
                    const channelAffilication = resp.data.insert_Membership.returning[0].Channel
                    dispatch({type:Actions.SELECTED_CHANNEL,payload:channelAffilication})
                })
        }
        props.exitCallback()
    }
    return (
        <Modal close = {props.exitCallback} title ="Browse channels">
            <>
            <Form>
                <SearchInput 
                name="channelName" 
                id = "channelName" 
                placeholder="Search channels" 
                onChange = {filterChannels} />
            </Form>
            <Mutation mutation = {joinChannel}>
                {(createMembershipFn: MutationFunction) => {
                    createMembershipRef.current = createMembershipFn
                    return (
                    <Query query = {allChannelsQuery}
                    variables = {{channelName: '%%'}}>
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
                                {data.Channel.map((channel: {id: string, name: string, Memberships: any}) =>
                                    (<DataItem 
                                        key = {channel.id} 
                                        onClick={() => selectChannel(
                                            {id:channel.id, name:channel.name},
                                            channel.Memberships
                                            )} >
                                        # {channel.name}
                                    </DataItem>
                                    ))}
                                </DataContainer>
                            </>
                            )
                        }}
                    </Query>
                )}}
            </Mutation>
            </>
        </Modal>
    )
}