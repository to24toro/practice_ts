import * as React from 'react';
import styled from 'styled-components';

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

export function MessageBox() {
    const messageListRef = React.createRef<HTMLDivElement>();
    React.useEffect(() => {
        messageListRef.current!.scrollTo(messageListRef.current!.scrollTop,messageListRef.current!.scrollHeight)
    }, [messageListRef]);
    const messages = [
        { message: 'TOTORO intamon', user: 'Mei', date:'Sat May 11 2019 06:02:23 GMT*0200 (CEST)'},
        { message: 'TOTORO intamon', user: 'May', date:'Sat May 11 2019 06:02:23 GMT*0200 (CEST)'},
        { message: 'TOTORO intamon', user: 'Satsuki', date:'Sat May 11 2019 06:02:23 GMT*0200 (CEST)'},
        { message: 'TOTORO intamon', user: 'May', date:'Sat May 11 2019 06:02:23 GMT*0200 (CEST)'},
        { message: 'TOTORO intamon', user: 'May', date:'Sat May 11 2019 06:02:23 GMT*0200 (CEST)'},
        { message: 'TOTORO intamon', user: 'Mei', date:'Sat May 11 2019 06:02:23 GMT*0200 (CEST)'},
        { message: 'TOTORO intamon', user: 'May', date:'Sat May 11 2019 06:02:23 GMT*0200 (CEST)'},
        { message: 'TOTORO intamon', user: 'May', date:'Sat May 11 2019 06:02:23 GMT*0200 (CEST)'},
        { message: 'TOTORO intamon', user: 'May', date:'Sat May 11 2019 06:02:23 GMT*0200 (CEST)'},
        { message: 'TOTORO intamon', user: 'Mei', date:'Sat May 11 2019 06:02:23 GMT*0200 (CEST)'},
        { message: 'TOTORO intamon', user: 'May', date:'Sat May 11 2019 06:02:23 GMT*0200 (CEST)'},
        { message: 'TOTORO intamon', user: 'Satsuki', date:'Sat May 11 2019 06:02:23 GMT*0200 (CEST)'},
        { message: 'TOTORO intamon', user: 'Mei', date:'Sat May 11 2019 06:02:23 GMT*0200 (CEST)'},
        { message: 'TOTORO intamon', user: 'May', date:'Sat May 11 2019 06:02:23 GMT*0200 (CEST)'},
        { message: 'TOTORO intamon', user: 'Satsuki', date:'Sat May 11 2019 06:02:23 GMT*0200 (CEST)'},
        { message: 'TOTORO intamon', user: 'Mei', date:'Sat May 11 2019 06:02:23 GMT*0200 (CEST)'},
        { message: 'TOTORO intamon', user: 'May', date:'Sat May 11 2019 06:02:23 GMT*0200 (CEST)'},
        { message: 'TOTORO intamon', user: 'Satsuki', date:'Sat May 11 2019 06:02:23 GMT*0200 (CEST)'},
        { message: 'TOTORO intamon', user: 'Satsuki', date:'Sat May 11 2019 06:02:23 GMT*0200 (CEST)'},
        { message: 'TOTORO intamon', user: 'Mei', date:'Sat May 11 2019 06:02:23 GMT*0200 (CEST)'},
        { message: 'TOTORO intamon', user: 'May', date:'Sat May 11 2019 06:02:23 GMT*0200 (CEST)'},
        { message: 'TOTORO intamon', user: 'Satsuki', date:'Sat May 11 2019 06:02:23 GMT*0200 (CEST)'},
        { message: 'TOTORO intamon', user: 'Mei', date:'Sat May 11 2019 06:02:23 GMT*0200 (CEST)'},
        { message: 'TOTORO intamon', user: 'May', date:'Sat May 11 2019 06:02:23 GMT*0200 (CEST)'},
        { message: 'TOTORO intamon', user: 'Satsuki', date:'Sat May 11 2019 06:02:23 GMT*0200 (CEST)'},
    ]
    return (
        <Container ref={messageListRef}>
            <ul>
                {messages.map((message, index)=><li key={index}>
                    <Username>{message.user}</ Username>
                    <DataSpan>{new Intl.DateTimeFormat('en-GB').format(new Date(message.date))}</DataSpan>
                    <p>{message.message}</p>
                </li>)}
            </ul>
        </Container>
    )
}