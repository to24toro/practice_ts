/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ExistingMembership
// ====================================================

export interface ExistingMembership_Membership_Channel {
  __typename: 'Channel';
  name: string;
  id: any;
}

export interface ExistingMembership_Membership {
  __typename: 'Membership';
  id: any;
  /**
   * An object relationship
   */
  Channel: ExistingMembership_Membership_Channel;
}

export interface ExistingMembership {
  /**
   * fetch data from the table: "Membership"
   */
  Membership: ExistingMembership_Membership[];
}

export interface ExistingMembershipVariables {
  user1?: string | null;
  user2?: string | null;
}
