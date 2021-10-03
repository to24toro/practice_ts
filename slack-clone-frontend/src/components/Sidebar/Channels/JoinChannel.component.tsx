import { Query,QueryResult } from '@apollo/react-components';
import * as React from 'react';
import styled from 'styled-components';
import { allChannelsQuery } from '../../../data/queries';
import { Modal } from '../../Modal/Modal.component';
import { Input } from '../../styles/input.styles';
import { Form } from '../../styles/ModalButtons';
import { debounce } from 'lodash';
import { Actions, StoreContext } from '../../../store/store';

interface Props {
    exitCallback: ()=> void;
}

const ChannelItem = styled.div`
    padding: 1rem 2rem;
    borderTop: 1 solid ${props => props.theme.backgroundColorLight}
    box-sizing: border-box;
    cursor: pointer;
`;

const ChannelContainer = styled.div`
    margin-top: 2rem;
    max-height: calc(100vh-200px);
    overflow-y: auto;
    & > ${ChannelItem}: last-child {
        border-bottom: 1px solid ${props => props.theme.backgroundColorLight}
    }
`;

const SearchInput = styled(Input) `
    width: 100%;
    box-sizing: border-box;
`;
export function JoinChannel (props: Props) {
    const { user, dispatch }= React.useContext(StoreContext)
    const refetchRef = React.useRef<Function>()
    const fetchData  = debounce((e:React.ChangeEvent<HTMLInputElement>) => {
        (refetchRef as any).current({channelName:`%${e.target.value}%`})}
        ,300)
    const filterChannels = (e:React.ChangeEvent<HTMLInputElement>) => {
        e.persist()
        fetchData(e)
    }
    function selectChannel(channel: {id: string, name:string},memberships: {userId: string}[]){
        if (memberships.some(membership => membership.userId===user)) {
            dispatch({type: Actions.SELECTED_CHANNEL,payload:channel})
            props.exitCallback()
        }
    }
    return (
        <Modal close = {props.exitCallback} title ="Browse channels">
            <Form 
                onSubmit={(e: any)=> {
                e.preventDefault();
                e.target.reset()
                }}>
                <SearchInput 
                name="channelName" 
                id = "channelName" 
                placeholder="Search channels" 
                onChange = {filterChannels} />
            </Form>
            <Query query = {allChannelsQuery}
            variables = {{channelName: "%%"}}>
                {({loading, error, data, refetch}:
                QueryResult) => {
                    refetchRef.current = refetch
                     if (loading) {
                         return <p>loading</p>
                     }
                    return (
                    <>
                        <ChannelContainer>
                        {data.Channel.map((channel: {id: string, name: string, Memberships: any}) =>
                            (<ChannelItem 
                                key = {channel.id} 
                                onClick={() => selectChannel(
                                    {id:channel.id, name:channel.name},
                                    channel.Memberships
                                    )} >
                                # {channel.name}
                            </ChannelItem>
                            ))}
                        </ChannelContainer>
                    </>
                    )
                }}
            </Query>
        </Modal>
    )
}