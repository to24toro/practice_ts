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
  query SidebarQuery{
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

export const allChannelsQuery = gql`
  query ChannelsQuery($channelName: String) {
    Channel(
      where: {
        name: { _ilike: $channelName }
        Memberships: { direct: { _eq: false } }
      }
    ) {
      id
      name
      Memberships {
        userId
      }
      Memberships_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

export const allUsersQuery = gql`
  query UsersQuery($currentUserId: String, $filter: String) {
    User(
      where: { id: { _neq: $currentUserId }, username: { _ilike: $filter } }
    ) {
      id
      username
    }
  }
`;