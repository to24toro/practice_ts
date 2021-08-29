import * as React from 'react';
import styled from 'styled-components';
import { Actions, StoreContext } from '../store/store';
import { Item } from './styles/SidebarItem.styles';

import { Finder } from './Sidebar/Channels/CreateChannel.component';

const ChannelsTitles = styled.div`
  margin: 2rem 0 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  h2 {
    font-size: 1rem;
  }
`;


const Button = styled.button`
  background-color: transparent;
  padding: 5px;
  color: ${props => props.theme.textColorLight};
  border: none;
  font-size: 1rem;
  &.channel-button {
    margin-top: 1rem;
    i {
      margin-right: 5px;
    }
  }
`;

export interface Channel {
    id: string;
    name: string;

}

interface ChannelProps {
    channels: Channel[]
}


export function Channels({channels}: ChannelProps) {
    const {  dispatch }=React.useContext(StoreContext);
    const [isMordalOpen, setModal] = React.useState(false);


    const selectChannel = (channel: {id: string, name:string}) => {
        dispatch({type: Actions.SELECTED_CHANNEL, payload:channel})
    }
    return (
        <>
        {isMordalOpen ? <Finder exitCallback={()=> setModal(false)}/> : null }
        <ChannelsTitles>
            <h2>Channels</h2><i className="fas fa-plus-circle" onClick={()=>setModal(true)}></i>
        </ChannelsTitles>
        <ul>
            {channels.map(channel =><Item onClick={()=>selectChannel({id: channel.id, name: channel.name})} key = {channel.id}># {channel.name}</Item>)}
        </ul>
        <Button className="channel-button"><i className="fas fa-plus-circle" />Add Channel</Button>
        </>      
    );
}