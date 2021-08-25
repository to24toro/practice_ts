import * as React from 'react';
import styled from 'styled-components';
import { Query, Subscription } from '@apollo/react-components';
import gql from 'graphql-tag';

const messageQuery = gql`
{


    Message(where: {channelId: {_eq: "c0c8e439-3a86-4d19-9641-67fa02e05593"}}) {
      body
      date
      User {
        username
        Messages {
          id
        }
      }
    }
  }
`;

const Container = styled.div`
    margin-top: 85px;
    overflow-y: auto;
    height: calc(100vh - 145px);
    li {
        margin: 0.25rem 0;
    }
    p {
        margin-top: 0.25rem;
    }
`;

const Username = styled.span`
    font-weight: 800;
    margin-right: 5px;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
`;

const DataSpan = styled.span`
    color: darkgrey;
`;


interface Message {
    id: string;
    body: string;
    date: string;
    User: {
        username: string
    }
}
export function MessageBox() {
    const messageListRef = React.createRef<HTMLDivElement>();
    React.useEffect(() => {
        messageListRef.current!.scrollTo(messageListRef.current!.scrollTop,messageListRef.current!.scrollHeight)
    }, [messageListRef]);



    return (
        <Subscription subscription={messageQuery}>
            {({loading,error,data}: any) => 
                <Container ref={messageListRef}>
                <ul>
                    {!loading && data.Message ?( data.Message as Message[]).map(
                        (message) => (
                        <li key={message.id}>
                            <Username>{message.User.username}</ Username>
                            <DataSpan>{message.date}</DataSpan>
                        <p>{message.body}</p>
                        </li>
                    )): null }
                </ul>
            </Container>
            }
        
        </Subscription>
    )
}