import * as React from 'react';
import styled from 'styled-components';

import { Channel } from './channels';

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

const MessageItem = styled.li`
    margin: 0.25rem 0
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
    return (
        <>
        <MessagesTitles>
            <h2>Messages</h2><i className="fas fa-plus-circle"></i>
        </MessagesTitles>
        <ul>
            {channels.map(channel =><MessageItem key = {channel.id}><Status></Status> {channel.name}</MessageItem>)}
        </ul>
        </>
    )
}
