/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChannelsQuery
// ====================================================

export interface ChannelsQuery_Channel_Memberships {
  __typename: 'Membership';
  userId: string;
}

export interface ChannelsQuery_Channel {
  __typename: 'Channel';
  id: any;
  name: string;
  /**
   * An array relationship
   */
  Memberships: ChannelsQuery_Channel_Memberships[];
}

export interface ChannelsQuery {
  /**
   * fetch data from the table: "Channel"
   */
  Channel: ChannelsQuery_Channel[];
}

export interface ChannelsQueryVariables {
  channelName?: string | null;
}
