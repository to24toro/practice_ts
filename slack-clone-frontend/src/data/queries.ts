import gql from 'graphql-tag';


export const messageQuery = gql`
  query MessageQuery($channelId: uuid) {
    Message(where: { channelId: { _eq: $channelId } }) {
      id
      body
      date
      User {
        username
      }
    }
  }
`;

export const membershipQuery = gql`
{
    Membership(where: {userId: {_eq:"user1"}}) {
      id
      direct
      Channel {
        id
        name
      }
    }
  }
`;