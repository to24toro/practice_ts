import gql from 'graphql-tag';


export const CreateChannelMutation = gql`
    mutation CreateChannel($name: String) {
        insert_Channel(objects: { name: $name, group: "" }) {
        returning {
            id
        }
        }
    }
`;

export const CreateMembership = gql`
mutation CreateMembership($userId: String, $channelId: uuid) {
    insert_Membership(objects: { userId: $userId, channelId: $channelId }) {
        returning {
            id
        }
    }
}
`;

export const submitMessageMutation = gql`
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

export const joinChannel = gql`
  mutation JoinChannel($userId: String!, $channelId: uuid!) {
    insert_Membership(
      objects: { channelId: $channelId, userId: $userId, direct: false }
    ) {
      returning {
        id
        Channel {
          id
          name
        }
      }
    }
  }
`;