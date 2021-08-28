import * as React from 'react';
import styled from 'styled-components';
import { Channel } from './Channels';
import { StoreContext,Actions } from '../store/store';

const MessagesTitles = styled.div`
    margin: 2rem 0 1rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    h2 {
        font-size: 1rem;
    }
`;

export const Item = styled.li`
    margin: 0.25rem 0;
    cursor: pointer;
`;

const Status = styled.span`
    height: 0.7rem;
    width: 0.7rem;
    border-radius: 100%;
    background-color: green;
    margin-right: 0.5rem;
    display: inline-block;
`;


interface DirectMessageProps {
    channels: Channel[]
}
export function DirectMessages({channels} : DirectMessageProps) {
    const {  dispatch }=React.useContext(StoreContext);

    const selectChannel = (channel: {id: string, name: string}) => {
        dispatch({type: Actions.SELECTED_CHANNEL, payload: channel})
    }
    return (
        <>
        <MessagesTitles>
            <h2>Messages</h2><i className="fas fa-plus-circle"></i>
        </MessagesTitles>
        <ul>
            {channels.map(channel =><Item onClick={()=> selectChannel({id: channel.id, name: channel.name})} key = {channel.id}><Status></Status> {channel.name}</Item>)}
        </ul>
        </>
    )
}
