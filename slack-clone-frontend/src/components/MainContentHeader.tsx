import * as React from 'react';
import styled from 'styled-components';
import { StoreContext } from '../store/store';
import { Input } from './styles/input.styles';


const Container = styled.div`
    position: fixed;
    top: 0;
    z-index: 5;
    background-color: ${props => props.theme.backgroundColorLight};
    width: calc(100vw - 220px);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between; 
    align-items: center;
    padding: 1rem 0;
    border-bottom: 1px solid ${props => props.theme.borderColorLight};
`;

const Title = styled.div`
    h3 {
        font-weight:900;
        font-size:1.3rem;
        margin-bottom:0.75rem;
    }
    i {
        margin-right:0.5rem;
        color: ${props => props.theme.borderColorDark};
    }
`;



export function MainContentHeader() {
    const { selectedChannel} = React.useContext(StoreContext)
    return (
        <Container>
            <Title>
                <h3># {selectedChannel.name}</h3>
                <i className="far fa-user"></i>
                42 members
            </Title>
            <div>
                <Input type="text" placeholder="search"></Input>
            </div>
        </Container>
    )
}