import * as React from 'react';
import styled from 'styled-components';
import { Mutation } from '@apollo/react-components';
import { StoreContext } from '../store/store';
import { submitMessageMutation } from '../data/mutations';

const SubmitButton = styled.button`
    border-radius: 7px;
    outline: none;
    background-color: transparent;
    border: none;
    border-left: ${props => `3px solid ${props.theme.borderColorDark}`};
    height: 56px;
    position: fixed;
    box-sizing: border-box;
    padding; 1.125rem;
    right: 25px;
    bottom: 10px;
    cursor: pointer;
`;

const InputStyle = styled.input`
    padding: 1rem;
    border-radius: 7px;
    border: 3px solid ${props => props.theme.borderColorDark};
    font-size: 1rem;
    outline: none;
    &:hover,
    &:active,
    &:focus{
        border: 3px solid ${props => props.theme.hoverBorderColor};
        & + ${SubmitButton} {
            border-left: 3px solid ${props => props.theme.hoverBorderColor};
        }
    }
    box-sizing: border-box;
    position: fixed;
    bottom: 10px;
    width: calc(100vw - 220px);
`;



export function InputMessage () {
    const { selectedChannel, user } = React.useContext(StoreContext)
    const [inputValue, setInputValue] = React.useState('');

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }
    return <Mutation mutation={submitMessageMutation}>
        {(submitMessage: any, { data }: any) => (
            <form onSubmit={
                e => {
                    e.preventDefault();
                    submitMessage({variables: { userId: user,channelId: selectedChannel.id, body: (e.target as any).message.value}});
                    (e.target as any).reset()
                }}
            >
                <InputStyle name="message" type="text" placeholder="Message John Doe" onChange={onChangeInput}/>
                <SubmitButton disabled={inputValue===''} type="submit">
                    <i className="fas fa-arrow-alt-circle-right"></i>
                </SubmitButton>
            </form>
        )}
        </Mutation>
    
}