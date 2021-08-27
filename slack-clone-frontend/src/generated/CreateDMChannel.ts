/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateDMChannel
// ====================================================

export interface CreateDMChannel_insert_Channel_returning {
  __typename: 'Channel';
  id: any;
  name: string;
}

export interface CreateDMChannel_insert_Channel {
  __typename: 'Channel_mutation_response';
  /**
   * data of the affected rows by the mutation
   */
  returning: CreateDMChannel_insert_Channel_returning[];
}

export interface CreateDMChannel {
  /**
   * insert data into the table: "Channel"
   */
  insert_Channel: CreateDMChannel_insert_Channel | null;
}

export interface CreateDMChannelVariables {
  user1: string;
  user2: string;
  title?: string | null;
}
