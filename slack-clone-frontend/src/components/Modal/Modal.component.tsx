import * as React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

// fixed 固定
// vw,vh その画面全てに対してnの幅高さ %とは異なる。%はその要素の中での割合
// border-box paddingとborderがwidth,heightに含まれる
// rem　html要素のサイズを継承, emは親要素を継承
const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: ${props => props.theme.backgroundColorLight};
  z-index: 10;
  padding: 2rem;
  color: ${props => props.theme.textColorDark};
  box-sizing: border-box;
  font-size: 2rem;
`;

const ExitButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ButtonClose = styled.button`
  outline: none;
  border: none;
  border-radius: 100%;
  padding: 1rem;
  cursor: pointer;
  text-align: center;
  font-size: inherit;
  i {
    width: 100%;
  }
  &:hover {
    background-color: ${props => props.theme.backgroundColorGrey};
  }
`;

const Title = styled.h1`
  margin: 1.5rem 0;
`;

const ModalBody = styled.div`
  max-width: 500px;
  margin: 0 auto;
  max-height: calc(100vh - 110px);
  overflow-y: auto;
`;


interface Props {
    children: React.ReactNode[] | React.ReactNode;
    close: ()=>void,
    title: string,
}

export class Modal extends React.Component<Props> {
    modalRoot: HTMLDivElement;
    constructor(props: Props) {
      super(props);
  
      this.modalRoot = document.createElement('div');
      this.modalRoot.id = 'modal-root';
      document.body.appendChild(this.modalRoot);
    }
  
    componentWillUnmount() {
      document.body.removeChild(this.modalRoot);
    }
    render() {
      return ReactDOM.createPortal(
        <Container>
          <>
            <ExitButtonContainer>
              <ButtonClose onClick={this.props.close}>
                <i className="far fa-times-circle" />
                esc
              </ButtonClose>
            </ExitButtonContainer>
            <ModalBody>
              <Title>{this.props.title}</Title>
              {this.props.children}
            </ModalBody>
          </>
        </Container>,
        this.modalRoot
      );
    }
  }