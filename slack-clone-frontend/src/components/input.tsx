import gql from 'graphql-tag';
import * as React from 'react';
import styled from 'styled-components';
import { Mutation } from '@apollo/react-components';
import { StoreContext } from '../store/store';


const InputStyle = styled.input`
    padding: 1rem;
    border-radius: 7px;
    border: 3px solid darkgrey;
    font-size: 1rem;
    outline: none;
    &:hover,
    &:active,
    &:focus{
        border: 3px solid DimGrey;
    }
    box-sizing: border-box;
    position: fixed;
    bottom: 10px;
    width: calc(100vw - 220px);
`;

const SubmitButton = styled.button`
    border-radius: 7px;
    outline: none;
    background-color: transparent;
    border: none;
    border-left: 3px solid darkgrey;
    height: 56px;
    position: fixed;
    box-sizing: border-box;
    padding; 1.125rem;
    right: 25px;
    bottom: 10px;
    cursor: pointer;
`;

const submitMessageMutation = gql`
mutation SubmitMessage($userId: String!, $body: String, $channelId: uuid!){
    insert_Message(objects: {userId: $userId, body: $body, channelId: $channelId}) {
      returning {
        userId
        id
        body
        channelId
      }
    }
  }
`;

export function InputMessage () {
    const { selectedChannel, user } = React.useContext(StoreContext)
    return <Mutation mutation={submitMessageMutation}>
        {(submitMessage: any, { data }: any) => (
            <form onSubmit={
                e => {
                    e.preventDefault();
                    submitMessage({variables: { userId: user,channelId: selectedChannel.id, body: (e.target as any).message.value}});
                    (e.target as any).reset()
                }}
            >
                <InputStyle name="message" type="text" placeholder="Message John Doe" />
                <SubmitButton type="submit">
                    <i className="fas fa-arrow-alt-circle-right"></i>
                </SubmitButton>
            </form>
        )}
        </Mutation>
    
}