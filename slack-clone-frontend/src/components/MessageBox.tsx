import * as React from 'react';
import styled from 'styled-components';
import { Query, QueryResult } from '@apollo/react-components';
import gql from 'graphql-tag';
import { MessageQuery } from '../generated/MessageQuery';

const messageQuery = gql`
    query MessageQuery{
        Message(where: {channelId: {_eq: "c0c8e439-3a86-4d19-9641-67fa02e05593" } }
        ) {
            body
            date
            User {
                username
            }
        }
    }
`;

const messageSubscription = gql`
    subscription MessageSubscription {
        Message(where: {channelId: {_eq: "c0c8e439-3a86-4d19-9641-67fa02e05593" } }
        ) {
            id
            date
            body
            User {
                username
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

    const subscription = (subscribeToMore: any) => {
        subscribeToMore({
            document: messageSubscription,
            updateQuery: (prev: Message[], { subscriptionData }: any) => {
                if (!subscriptionData.data) return prev;
                return subscriptionData.data;
            }
        });
    };

    return (
        <Query query={messageQuery}>
            {({loading,error,data, subscribeToMore}:QueryResult<MessageQuery>) => {
                subscription(subscribeToMore);
                return (
                <Container ref={messageListRef}>
                <ul>
                    {!loading && data!.Message ?( data!.Message as Message[]).map(
                        (message,index) => {
                           return (
                        <li key={message.id}>
                            <Username>{message.User.username}</ Username>
                            <DataSpan>{message.date}</DataSpan>
                        <p>{message.body}</p>
                        </li>
                    )}): null }
                </ul>
            </Container>
            )}
            }
        
        </Query>
    )
}