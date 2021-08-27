/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MessageQuery
// ====================================================

export interface MessageQuery_Message_User {
  __typename: 'User';
  username: string;
}

export interface MessageQuery_Message {
  __typename: 'Message';
  id: any;
  body: string;
  date: any;
  /**
   * An object relationship
   */
  User: MessageQuery_Message_User;
}

export interface MessageQuery {
  /**
   * fetch data from the table: "Message"
   */
  Message: MessageQuery_Message[];
}

export interface MessageQueryVariables {
  channelId?: any | null;
}
