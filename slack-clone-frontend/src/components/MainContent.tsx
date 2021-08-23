import * as React from 'react';
import styled from 'styled-components';
import { InputMessage } from './input';
import { MainContentHeader } from './MainContentHeader';
import { MessageBox } from './MessageBox';


const Container = styled.div`
    padding: 1rem;
    color: balck;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-size: border-box;
`;

export function MainContent() {
    return (
        <Container>
            <MainContentHeader />
            <MessageBox />
            <InputMessage />
        </Container>
    )
}