import * as React from 'react';
import styled from 'styled-components';
import { MainContent } from './MainContent';
import { Sidebar } from './Sidebar';

const Container = styled.div`
    display: grid;
    grid-template-columns: 180px 1fr;
    width: 100vx;
    height: 100vh;
`;



export function Layout () {
    return (
        <Container>
            <Sidebar />
            <MainContent />
        </Container>
    );
}