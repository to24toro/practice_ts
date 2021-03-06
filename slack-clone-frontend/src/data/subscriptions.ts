import gql from 'graphql-tag';

export const messageSubscription = gql`
  subscription MessageSubscription($channelId: uuid) {
    Message(where: { channelId: { _eq: $channelId } }) {
      id
      date
      body
      User {
        username
      }
    }
  }
`;

export const membershipSubscription = gql`
subscription SidebarSubscription {
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
