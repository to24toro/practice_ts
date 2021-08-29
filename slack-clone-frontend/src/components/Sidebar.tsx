import * as React from 'react';
import styled from 'styled-components';
import { Channels, Channel } from './Channels';
import { DirectMessages } from './DirectMessage';
import { Query, QueryResult } from '@apollo/react-components';
import { membershipQuery } from '../data/queries';
import { SidebarQuery } from '../generated/SidebarQuery';
import { membershipSubscription } from '../data/subscriptions';



const SidebarContainer = styled.div`
    height: 100%;
    background: rebeccapurple;
    padding: 1rem;
    color: white;
    box-size: border-box;
`;

const Header = styled.header`
    display: grid;
    grid-template-columns: 1fr 25px;
    font-size: 1.2rem;
`;

const H1 = styled.h1`
    font-weight: 900;
    font-size: 1.3rem;
`;

const UsernameContainer = styled.div`
    font-size: 1rem;
    grid-column-start: 1;
    grid-column-end: 3;
    margin-top: 0.5rem;
`;

const Status = styled.span`
    height: 0.7rem;
    width: 0.7rem;
    border-radius: 100%;
    background-color: green;
    margin-right: 0.5rem;
    display: inline-block;
`;

interface Membership {
    direct: boolean;
    id: string;
    Channel: Channel
}

export function Sidebar () {
    const subscription = (subscribeToMore: any) => {
        subscribeToMore({
            // variables: membershipSubscription,
            document: membershipSubscription,
            updateQuery: (prev: SidebarQuery[], { subscriptionData }: any) => {
                if (!subscriptionData.data) return prev;
                return Object.assign({},prev, subscriptionData.data);
            }
        });
    };
    return (
        <Query query={membershipQuery}>
            {({loading,error, data, subscribeToMore}:
            QueryResult<SidebarQuery>) => {
                subscription(subscribeToMore)
                return (
                <SidebarContainer>
                <Header>
                    <H1>Slack Clone</H1>
                    <div>
                        <i className ="far fa-bell"></i>
                    </div>
                    <UsernameContainer>
                        <Status></Status>
                        TOTORO
                    </UsernameContainer>
                </Header>
                {!loading && data && data.Membership? (
                <>
                <Channels channels={(data.Membership as Membership[]).filter(membership => !membership.direct).map(membership => membership.Channel)}/>
                <DirectMessages channels={(data.Membership as Membership[]).reduce((acc,value) => {
                    if (value.direct){
                        return [...acc,value.Channel]
                    }
                    return acc
                },[] as Channel[])}/>
                </>
                ): null}
                </SidebarContainer>
                )}}
        </Query>
    )
}